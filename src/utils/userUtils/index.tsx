import SID, { getSidAddress } from '@siddomains/sidjs';
import { ethers, utils } from 'ethers';
import { useEffect, useState } from 'react';

const Web3 = require('web3');

export const getBaseName = async (address) => {
    if (!address?.length) return null;

    const baseName = localStorage.getItem(`bns-${address}`);
    if (baseName?.length) {
        if (baseName == 'null') return null;
        else return baseName;
    }

    const provider = new ethers.providers.JsonRpcProvider('https://mainnet.base.org', {
        name: 'Base Mainnet',
        chainId: 8453,
        ensAddress: '0xeCBaE6E54bAA669005b93342E5650d5886D54fc7', // bnsAddress mainnet
    });

    const name = await provider.lookupAddress(address);

    if (name) {
        localStorage.setItem(`bns-${address}`, name);
        return name;
    } else {
        return null;
    }
};
export const getSpaceId = async (address) => {
    if (!address?.length) return null;

    const spaceId = localStorage.getItem(`sid-${address}`);
    if (spaceId?.length) {
        if (spaceId == 'null') return null;
        else return spaceId;
    }

    const rpc = 'https://bsc-dataseed2.binance.org';
    const provider = new Web3.providers.HttpProvider(rpc);

    const chainId = '56';
    const sid = new SID({ provider, sidAddress: getSidAddress(chainId) });

    const name = await sid.getName(address);
    if (name.name) {
        localStorage.setItem(`sid-${address}`, name.name);
        return name.name;
    } else {
        return null;
    }
};

/**
 * Usage:
 * getEnsNames([
 * '0xa729addefe1fa7bce87053ed55d55edddd13de60',
 * '0xcc719d0ef7c044543efd2686695ded5f24978cf3',
 * '0x0e555F9393C9BBd91096f8b8A3668ECF0375BeB4'
 * ])
 */

export const getArb = async (address) => {
    if (!address?.length) return null;

    const arb = localStorage.getItem(`arb-${address}`);
    if (arb?.length) {
        if (arb == 'null') return null;
        else return arb;
    }

    const rpc = 'https://arb1.arbitrum.io/rpc'; //Arbitrum One rpc
    const provider = new Web3.providers.HttpProvider(rpc);
    const chainId = 42161; //Arbitrum One chain id
    const sid = new SID({ provider, sidAddress: getSidAddress(chainId) });

    const res = await sid.getName(address);
    if (res.name) {
        localStorage.setItem(`arb-${address}`, res.name);
        return res.name;
    } else {
        return null;
    }
};
export const getEns = async (address) => {
    if (!address?.length) return null;
    const ens = localStorage.getItem(address);

    if (ens?.length) {
        if (ens == 'null') return null;
        else return ens;
    }
    return await new ethers.providers.InfuraProvider('mainnet', 'caa2121f41a1419abae10b5f2e4aa367')
        .lookupAddress(address)
        .then((e) => {
            localStorage.setItem(address, e);
        })
        .catch((e) => {
            console.error(e);
            return null;
        });
};

const localMap = {};
export const getAdaptiveUsername = async (owner: string) => {
    if (localMap?.[owner]?.ens) {
        return localMap[owner].ens;
    }
    if (localMap?.[owner]?.spaceId) {
        return localMap[owner].spaceId;
    }
    if (localMap?.[owner]?.base) {
        return localMap[owner].base;
    }
    if (localMap?.[owner]?.bit) {
        return localMap[owner].bit;
    }
    if (localMap?.[owner]?.arb) {
        return localMap[owner].arb;
    }

    const ens = await getEns(owner);

    if (ens) {
        if (!localMap[owner]) localMap[owner] = {};
        localMap[owner].ens = ens;
        return ens;
    }

    const spaceId = await getSpaceId(owner);
    if (spaceId) {
        if (!localMap[owner]) localMap[owner] = {};
        localMap[owner].spaceId = spaceId;
        return spaceId;
    }
    const baseName = await getBaseName(owner);
    if (baseName) {
        if (!localMap[owner]) localMap[owner] = {};
        localMap[owner].base = baseName;
        return baseName;
    }

    const arb = await getArb(owner);
    if (arb) {
        if (!localMap[owner]) localMap[owner] = {};
        localMap[owner].arb = arb;
        return arb;
    }

    return owner;
};

export function cutAddress(address: string, length: number) {
    if (!address || address.length < length) return address;
    const last = 4;
    if (utils.isAddress(address)) {
        return (
            address.substring(0, length - last) + '...' + address.substring(address.length - last)
        );
    }
    const arr = address.split('.');
    if (arr.length > 1) {
        const lastArrItem = arr[arr.length - 1];
        const start = address.length - 1 - (lastArrItem.length + 2);
        const end = address.length - 1 - lastArrItem.length;
        return (
            arr[0].substring(0, last) + '...' + address.substring(start, end) + '.' + lastArrItem
        );
    }
    return address.substring(0, length - last) + '...' + address.substring(address.length - last);
}
export const AdaptiveUsername = (props: {
    owner: string;
    length?: number;
    nameLength?: number;
}) => {
    const { owner, length, nameLength } = props;
    const [username, setUsername] = useState(owner);
    useEffect(() => {
        if (owner) {
            getAdaptiveUsername(owner).then(setUsername);
        }
    }, [owner]);
    return (
        <>
            {length && utils.isAddress(username)
                ? cutAddress(username, length)
                : nameLength && username.length > nameLength
                ? cutAddress(username, nameLength)
                : username}
        </>
    );
};
