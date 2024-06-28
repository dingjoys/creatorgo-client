import { ethers, utils } from 'ethers';
import { useEffect, useState } from 'react';

export const getEns = async (address) => {
    if (!address?.length) return null;
    const ens = localStorage.getItem(address);

    if (ens?.length && ens != 'null') {
        return ens;
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

export async function getEnsAvatar(address) {
    if (!address?.length) return null;
    const ens = localStorage.getItem(`${address}__avatar`);

    if (ens?.length && ens != 'null') {
        return ens;
    }
    return await new ethers.providers.InfuraProvider('mainnet', 'caa2121f41a1419abae10b5f2e4aa367')
        .getAvatar(address)
        .then((e) => {
            localStorage.setItem(`${address}__avatar`, e);
        })
        .catch((e) => {
            console.error('e2,', e);
            return null;
        });
}

const localMap = {};
export const getAdaptiveUsername = async (owner: string) => {
    if (localMap?.[owner]?.ens) {
        return localMap[owner].ens;
    }

    const ens = await getEns(owner);

    if (ens) {
        if (!localMap[owner]) localMap[owner] = {};
        localMap[owner].ens = ens;
        return ens;
    }

    return owner;
};

const localAvatarMap = {};
export const getAdaptiveUserAvatar = async (owner: string) => {
    if (localAvatarMap?.[owner]?.ens) {
        return localAvatarMap[owner].ens;
    }

    const ens = await getEnsAvatar(owner);
    console.log('dd, ', ens);
    if (ens) {
        if (!localAvatarMap[owner]) localAvatarMap[owner] = {};
        localAvatarMap[owner].ens = ens;
        return ens;
    }

    return '';
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
