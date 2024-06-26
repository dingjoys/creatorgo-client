import { userApi } from '@/global/urls';
import { Signer, ethers } from 'ethers';
import { useMemo } from 'react';
import { Cookies } from 'react-cookie';
import { SiweMessage, generateNonce } from 'siwe';
import { encodeQueryData } from './restUtils';
import * as crypto from 'crypto';
import moment from 'moment';

const cookie = new Cookies();
const tokenPrefix = '_token_web3_';

export interface IRequestOption extends RequestInit {
    type?: 'json' | 'urlencoded';
    data?: Record<string, any>;
    method?: 'GET' | 'DELETE' | 'POST' | 'PUT';
    signer?: ethers.Signer;
    // 是否要权限
    auth?: boolean;
    owner?: string
}

export function setToken(owner: string, token: string) {
    // 默认 过期时间7天
    let expires = new Date(Date.now() + 1000 * 3600 * 24 * 7 - 60000);
    cookie.set(`${tokenPrefix}${owner}`, token, { expires });
}

export function getToken(owner: string,) {
    return cookie.get(`${tokenPrefix}${owner}`);
}

export const generateSIWEMsg = (owner) => {
    const siweMessage = new SiweMessage({
        domain: window.location.host,
        address: owner,
        statement: "Sign in with Ethereum to the app.",
        uri: `https://${window.location.host}`,
        version: '1',
        chainId: 1,
        // nonce: uuidv4().split("-")[4]
        nonce: generateNonce(),
        issuedAt: moment().toISOString(),
        expirationTime: moment().add(7, "days").toISOString()
    });
    return siweMessage.prepareMessage();
}

let loggingin = false
export const login = async (signer: Signer, referral?: string) => {
    if (signer && !loggingin) {
        loggingin = true
        try {
            let owner = await signer.getAddress()
            if (getToken(owner)) {
                return
            }
            let msg = generateSIWEMsg(owner)
            let signature = await signer.signMessage(msg)
            const params = {
                msg, signature, owner
            } as any
            if (referral) {
                params.referral = referral
            }
            return await request(userApi.login, { method: "POST", data: params, owner })
        } finally {
            loggingin = false
        }
    }
}

const isLoggedin = (owner) => {
    return getToken(owner)?.length
}

export const useIsLoggedIn = (owner, isUpdate) => {
    const flag = useMemo(() => {
        return owner && isLoggedin(owner)
    }, [owner, isUpdate])
    return flag
}

export async function request(url, options: IRequestOption) {
    // 
    let signer = options.signer;

    // default config
    let defaultOption: IRequestOption = {
        type: signer ? 'urlencoded' : 'json',
        method: 'GET',
        data: {},
        auth: true,
        headers: {
            Accept: 'application/json',
        },
    };

    options.headers = Object.assign({}, defaultOption.headers, options.headers || {});
    options = Object.assign({}, defaultOption, options);
    let token = signer ? getToken(await signer.getAddress()) : null
    let owner = signer ? await signer.getAddress() : null;
    if (!token && signer) {
        let newData = {
            ...options.data,
            owner,
            timestamp: parseInt(new Date().getTime() / 1000 + ''),
        };
        let msg = JSON.stringify(newData);
        return signer
            .signMessage(msg)
            .then((signature) => {
                options.headers['signature'] = signature;
                // 添加msg
                newData['msg'] = msg;
                options.data = newData;
                return _request(options, owner);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    } else if (token) {
        // token
        options.headers['token'] = token;
        // options.headers['Authorization'] = token;
        return _request(options, owner);
    } else if (options.headers['signature'] || options.data["signature"]) {
        return _request(options, owner);
    }
    else {
        if (options.auth) {
            // invalid
            return Promise.reject(new Error('no-token-no-signer'));
        } else {
            return _request(options, owner);
        }
    }

    function _request(options, owner?) {
        if (/^(GET|DELETE|HEAD|OPTIONS)$/i.test(options.method) && options.data) {
            url = encodeQueryData(url, options.data);
        } else if (/^(POST|PUT)$/i.test(options.method)) {
            if (options.type === 'urlencoded') {
                options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
                options.body = encodeQueryData(null, options.data);
            } else if (options.type === 'json') {
                options.headers['Content-Type'] = 'application/json';
                options.body = JSON.stringify(options.data);
            }
        }
        return fetch(url, options)
            .then((response) => {
                return response.json();
            })
            .then((data = {}) => {
                if (data.code !== 0) {
                    throw new Error(data.msg || 'Error');
                }
                // save token
                if (data.auth && data.auth.token) {
                    let token = data.auth.token;
                    // let expireAt = data.auth.expireAt;
                    setToken(owner || options?.owner, token);
                }
                return data;
            })
            .catch((err) => {
                console.log(err)
                return Promise.reject(err);
            });
    }
}

export function httpGet(url: string, data?: Record<string, any>, options?: IRequestOption) {
    return request(url, {
        method: 'GET',
        data,
        ...options,
    });
}

export function httpPost(url: string, data?: Record<string, any>, options?: IRequestOption) {
    return request(url, {
        method: 'POST',
        data,
        ...options,
    });
}

export function httpPut(url: string, data?: Record<string, any>, options?: IRequestOption) {
    return request(url, {
        method: 'PUT',
        data,
        ...options,
    });
}

export function httpDelete(url: string, data?: Record<string, any>, options?: IRequestOption) {
    return request(url, {
        method: 'DELETE',
        data,
        ...options,
    });
}
