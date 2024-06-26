import useSWR from 'swr';
import { moralisApiToken } from '@/global/constant';

// const fetcher = (url, token) => fetch(url, {
//     headers: {
//         'x-api-key': token
//     }
// }).then((res) => res.json())

export async function nftFetcher(address: string, chainId: string, contract?: string) {
    let cursor = null;
    let result = [];

    do {
        let url = `https://deep-index.moralis.io/api/v2/${address}/nft?chain=${'0x' + parseInt(chainId).toString(16)}&format=decimal${contract ? `&token_addresses=${contract}` : ''}${cursor ? `&cursor=${cursor}` : ''
            }`;
        const response = await fetch(url, {
            headers: {
                'x-api-key': moralisApiToken,
            },
        }).then((res) => res.json());
        cursor = response.cursor;
        result = result.concat(response.result);
    } while (cursor != '' && cursor != null);
    return result.map(item => Object.assign(item, { chainId }));
}

export async function nftFetcherByChains(address: string, chains: string[], contract?: string) {
    const fetcherList = chains.map(chainId => {
        return contract ? nftFetcher(address, chainId, contract) : nftFetcher(address, chainId)
    })
    const result = await Promise.all(fetcherList)
    return result;
}

const useNfts = (address: string, chainId: string, contract?: string) => {
    const { data, error, mutate } = useSWR(address && chainId ? [address, chainId, contract, "nftFetcher"] : null, nftFetcher, {
        refreshInterval: 0,
        revalidateOnFocus: false,
    });
    return {
        data,
        error,
        mutate: (address: string, chainId: string, contract?: string) => mutate(address && chainId ? nftFetcher(address, chainId, contract) : null),
    };
};

const useNftsByChains = (address: string, chainIds: string[], contract?: string) => {
    const { data, error, mutate, isValidating } = useSWR(address && chainIds ? [address, chainIds, contract, "nftFetcherByChains"] : null, nftFetcherByChains, {
        refreshInterval: 0,
        revalidateOnFocus: false,
    });
    return {
        data,
        error,
        isValidating,
        mutate: (address: string, chainId: string, contract?: string) => mutate(address && chainId ? nftFetcher(address, chainId, contract) : null),
    };
};

export { useNfts, useNftsByChains };

// https://deep-index.moralis.io/api/v2/0x3cbAee4F65B64082FD3a5B0D78638Ee11A29A31A/nft?chain=rinkeby&format=decimal&token_addresses=0x7cd5c429b297cb9b64c3b9b700f8602fa02865a2
