import useSWR from 'swr';
import { moralisApiToken } from '@/global/constant';

const fetcher = (address, chainId) => {
    const url = `https://deep-index.moralis.io/api/v2/${address}/nft/transfers?chain=${'0x' + parseInt(chainId).toString(16)}&limit=100`;
    return fetch(url, {
        headers: { 'x-api-key': moralisApiToken },
    }).then(async (res) => {
        let data = await res.json();
        if (data.total > 500) {
            let ps = [];
            for (let i = 500; i < data.total; i += 500) {
                const urli = `https://deep-index.moralis.io/api/v2/${address}/nft/transfers?chain=${'0x' + parseInt(chainId).toString(16)}&offset=${i}&limit=100`;
                ps.push(fetch(urli, { headers: { 'x-api-key': moralisApiToken } }).then((res) => res.json()));
            }
            let datas = await Promise.all(ps);
            datas.forEach((d) => {
                data.result = [...data.result, ...d.result];
            });
            return new Promise<any>((resolve, reject) => {
                resolve(Object.assign(data, { chainId }));
            });
        } else {
            return new Promise<any>((resolve, reject) => {
                resolve(Object.assign(data, { chainId }));
            });
        }
    });
};
const fetcherByChains = async (address, chainIds) => {
    const fetcherList = chainIds.map(chainId => {
        return fetcher(address, chainId)
    })
    const result = await Promise.all(fetcherList)
    return result
};

const useNftTransactions = (address?: string, chainId?: string) => {
    const data = useSWR(address ? [address, chainId] : null, fetcher, {
        refreshInterval: 0,
        revalidateOnFocus: false,
    });
    return data;
};

const useNftTransactionsByChains = (address?: string, chainIds?: string[]) => {
    const data = useSWR(address ? [address, chainIds] : null, fetcherByChains, {
        refreshInterval: 0,
        revalidateOnFocus: false,
    });
    return data;
};
export { useNftTransactions, useNftTransactionsByChains };
