import { moralisApiToken } from '@/global/constant';
import useSWR from 'swr';
import { useAccount } from 'wagmi';

const fetcher = (url, token) =>
    fetch(url, {
        headers: {
            'x-api-key': token,
        },
    }).then((res) => res.json());

const useFungibles = (address?, chainId?) => {
    const { address: account } = useAccount();
    const { chain } = useAccount();

    const { data, error } = useSWR(
        account || address ? [`https://deep-index.moralis.io/api/v2/${address || account}/erc20?chain=${chainId || `0x${chain.id?.toString(16)}`}`, moralisApiToken] : null,
        fetcher,
        {
            refreshInterval: 0,
            revalidateOnFocus: false,
        },
    );
    return { data, error };
};
export { useFungibles };

