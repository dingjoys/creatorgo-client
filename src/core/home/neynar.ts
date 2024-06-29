import axios from 'axios';
const apiKey = process.env.REACT_APP_NEYNAR_API_KEY || '';
const neynarRequest = axios.create({
    baseURL: 'https://api.neynar.com/v2/farcaster',
    headers: {
        api_key: apiKey,
        'Content-Type': 'application/json',
    },
});

export function getFarcasterByAddresses(addresses: string[]) {
    if (!addresses.length) return { data: {} };
    const url = '/user/bulk-by-address';
    return neynarRequest.get(url, {
        params: {
            addresses: addresses.join(','),
            address_types: 'verified_address',
        },
    });
}

const request = axios.create({
    baseURL: 'http://8.218.161.115:3036/api',
});

export interface CreatorDetail {
    uniqueHolderNumber: number;
    totalAmount: number;
    totalMint: number;
    whaleNumber: number;
    imgs: string[];
    collections: {
        metadata: {};
        tokens: {
            contract: string;
            // '0x00001867c25946a43abd9baed115fcc4bcbb37bb';
            tokenId: string;
            // '1';
            total_amount: string;
            // '1';
            img: {
                name: string;
                // 'stalker1000';
                description: string;
                '';
                image: string;
                // 'ipfs://bafkreiel2zdw5dqy3h6slmaotgx4zwerfvlgw25nikrombuqj2of6qoudy';
                content: {
                    mime: string;
                    //  'image/jpeg';
                    uri: string;
                    // 'ipfs://bafkreiel2zdw5dqy3h6slmaotgx4zwerfvlgw25nikrombuqj2of6qoudy';
                };
            };
        }[];
    }[];
    score: number;
    firstMintBlockNumber: number;
    recentMints: {
        minter: string;
        block_number: number;
    }[];
    uniqueMinters: {
        count: number;
        rows: {
            owner: {
                type: string;
                data: number[];
            };
        }[];
    };
}
export async function getCreatorData(owner: string): Promise<CreatorDetail> {
    try {
        const res = await request.get(`/creator/data?owner=${owner}`);
        if (res.data?.code == 0) {
            return res.data.data as CreatorDetail;
        }
        return {} as any;
    } catch (e) {
        return {} as any;
    }
}
