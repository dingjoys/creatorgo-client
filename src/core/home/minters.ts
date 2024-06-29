import axios from 'axios';

export async function getTopMinters(owner: string) {
    try {
        // https://mint.fun/
        const res = await axios.get(`/mint-fun-api/mintfun/contract/8453:${owner}/details`);
        if (res.data?.details) {
            const details = res.data?.details;
            const profiles = res.data?.profiles;
            return {
                topMinters: details?.topMinters.map((top) => {
                    const profile = profiles?.find((item) => top?.minter == item?.id);
                    return {
                        count: top?.count,
                        username: profile?.name,
                        address: profile?.address?.value || top?.minter?.split(':')?.[1],
                    };
                }),
                minterCount: details?.minterCount,
                totalTxFees: details?.totalTxFees,
                totalValue: details?.totalValue,
                profiles,
            };
        }
        return null;
    } catch (e) {
        return null;
    }
}
