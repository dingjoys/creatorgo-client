import axios from 'axios';
import ethers from 'ethers';

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
export interface CollectionItem {
    metadata: {
        name: string;
        image: string;
    };
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
    mintfun: {
        details: {
            topMinters: {}[];
            minterCount: string;
        };
        profiles: {
            id: string; //'ethereum:0xf70da97812cb96acdf810712aa562db8dfa3dbef';
            address: {
                kind: string; //'ethereum';
                value: string; //'0xf70da97812cb96acdf810712aa562db8dfa3dbef';
            };
            name: string; //'0xf70da9';
        }[];
    };
}
export interface CreatorDetail {
    uniqueHolderNumber: number;
    totalAmount: number;
    totalMint: number;
    whaleNumber: number;
    imgs: string[];
    collections: CollectionItem[];
    score: number;
    firstMintBlockNumber: number;
    recentMints: {
        minter: string;
        contract: string;
        token_id: string;
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
    zora: any;
}
export async function getCreatorData(owner: string): Promise<CreatorDetail> {
    try {
        const res = await request.get(`/creator/data?owner=${owner}`, {
            timeout: 20000,
        });
        if (res.data?.code == 0) {
            return res.data.data as CreatorDetail;
        }
        return {} as any;
    } catch (e) {
        return {} as any;
    }
}
export async function getHomeList() {
    try {
        const res = await request.get(`/creators/random`, {
            timeout: 20000,
        });
        if (res.data?.code == 0) {
            return res.data.data as CreatorDetail[];
        } else {
            return [];
        }
    } catch (e) {
        return [];
    }
}
// export const getCollectionData = async (contract, provider) => {
//     console.log(contract);
//     const tokenIds: any = await NftTransfer.findAll({
//         attributes: ['token_id', [literal('sum(amount)'), 'total_amount']],
//         where: {
//             contract: hexStringToBinary(contract),
//             [Op.and]: [literal("`from`=x'0000000000000000000000000000000000000000'")],
//         },
//         group: ['token_id'],
//         limit: 100000,
//         raw: true,
//     });
//     const data: any[] = [];
//     for (let i = 0; i < 3 && i < tokenIds.length; i++) {
//         let tokenIdObj = tokenIds[i];
//         const img = await getNftMetadata(contract, binaryToNumber(tokenIdObj.token_id), provider);
//         data.push({
//             contract,
//             tokenId: binaryToNumber(tokenIdObj.token_id).toString(),
//             total_amount: tokenIdObj.total_amount,
//             img,
//         });
//     }
//     return data;
// };

// export const nftAbi = [
//     {
//         inputs: [],
//         name: 'totalSupply',
//         outputs: [
//             {
//                 internalType: 'uint256',
//                 name: '',
//                 type: 'uint256',
//             },
//         ],
//         stateMutability: 'view',
//         type: 'function',
//     },
//     {
//         inputs: [],
//         name: 'contractURI',
//         outputs: [
//             {
//                 internalType: 'string',
//                 name: '',
//                 type: 'string',
//             },
//         ],
//         stateMutability: 'view',
//         type: 'function',
//     },
//     {
//         inputs: [
//             {
//                 internalType: 'uint256',
//                 name: 'tokenId',
//                 type: 'uint256',
//             },
//         ],
//         name: 'uri',
//         outputs: [
//             {
//                 internalType: 'string',
//                 name: '',
//                 type: 'string',
//             },
//         ],
//         stateMutability: 'view',
//         type: 'function',
//     },
//     {
//         inputs: [
//             {
//                 internalType: 'uint256',
//                 name: 'tokenId',
//                 type: 'uint256',
//             },
//         ],
//         name: 'tokenURI',
//         outputs: [
//             {
//                 internalType: 'string',
//                 name: '',
//                 type: 'string',
//             },
//         ],
//         stateMutability: 'view',
//         type: 'function',
//     },
//     {
//         inputs: [],
//         name: 'name',
//         outputs: [
//             {
//                 internalType: 'string',
//                 name: '',
//                 type: 'string',
//             },
//         ],
//         stateMutability: 'view',
//         type: 'function',
//     },
//     {
//         inputs: [],
//         name: 'owner',
//         outputs: [
//             {
//                 internalType: 'address',
//                 name: '',
//                 type: 'address',
//             },
//         ],
//         stateMutability: 'view',
//         type: 'function',
//     },
// ];
// export const getNftMetadata = async (contract, tokenId: BigNumberish, provider) => {
//     const contractObj = new ethers.Contract(contract, nftAbi, provider);
//     try {
//         const uri = await contractObj.uri(tokenId);
//         if (uri) {
//             const result = await fetchAPiOrIpfsData(uri);
//             return result;
//             if (result.image) {
//                 return result.image;
//             }
//         }
//     } catch (e) {
//         try {
//             const uri = await contractObj.tokenURI(tokenId);
//             if (uri) {
//                 const result = await fetchAPiOrIpfsData(uri);
//                 return result;
//                 if (result.image) {
//                     return result.image;
//                 }
//             }
//         } catch (e2) {
//             return null;
//         }
//     }
// };

// const ipfsHead = 'https://metopia.quicknode-ipfs.com/ipfs';
// export const fetchAPiOrIpfsData = (uri) => {
//     if (uri.startsWith('ipfs://')) {
//         return axios.get(`${ipfsHead}/${uri.replace('ipfs://', '')}`).then((res) => res.data);
//     } else {
//         return axios.get(uri).then((res) => res.data);
//     }
// };
