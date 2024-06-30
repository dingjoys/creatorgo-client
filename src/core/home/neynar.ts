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
        // return {
        //     uniqueHolderNumber: 117,
        //     totalAmount: 117,
        //     totalMint: 117,
        //     whaleNumber: 0,
        //     collections: [
        //         {
        //             metadata: {},
        //             tokens: [
        //                 {
        //                     contract: '0x060f3edd18c47f59bd23d063bbeb9aa4a8fec6df',
        //                     tokenId: '1',
        //                     total_amount: '116',
        //                     img: {
        //                         name: 'Farcaster: Giraffe',
        //                         description: 'Released on 2023-01-02',
        //                         image: 'ipfs://bafybeiegrnialwu66u3nwzkn4gik4i2x2h4ip7y3w2dlymzlpxb5lrqbom',
        //                         content: {
        //                             mime: 'image/png',
        //                             uri: 'ipfs://bafybeiegrnialwu66u3nwzkn4gik4i2x2h4ip7y3w2dlymzlpxb5lrqbom',
        //                         },
        //                     },
        //                 },
        //             ],
        //             mintfun: {
        //                 details: {
        //                     topMinters: [
        //                         {
        //                             minter: 'ethereum:0xf70da97812cb96acdf810712aa562db8dfa3dbef',
        //                             count: '8051',
        //                         },
        //                         {
        //                             minter: 'ethereum:0x81f91aca8c05b3eefebc00171139afefac17c9a6',
        //                             count: '1700',
        //                         },
        //                         {
        //                             minter: 'ethereum:0x2d93c2f74b2c4697f9ea85d0450148aa45d4d5a2',
        //                             count: '108',
        //                         },
        //                         {
        //                             minter: 'ethereum:0x855a4621d491ff98bc3d02eadbc108403887561c',
        //                             count: '78',
        //                         },
        //                         {
        //                             minter: 'ethereum:0x3a4afca659f54922a0d7a7b0bebabf641dec66bb',
        //                             count: '71',
        //                         },
        //                         {
        //                             minter: 'ethereum:0x965ef172b303b0bcdc38669df1de3c26bad2db8a',
        //                             count: '71',
        //                         },
        //                         {
        //                             minter: 'ethereum:0xbe0c12b56aa9b4f5dde36c733b3a2997ed775a4f',
        //                             count: '65',
        //                         },
        //                         {
        //                             minter: 'ethereum:0x56ad2cd6ad6f52c72181b93ac66d5dc887c3d0bd',
        //                             count: '64',
        //                         },
        //                         {
        //                             minter: 'ethereum:0x2956be76d7164486ad89aa748db054ff91ffbfcd',
        //                             count: '14',
        //                         },
        //                         {
        //                             minter: 'ethereum:0x3d5750d305f8d9c133faceaa92a2e46558130371',
        //                             count: '11',
        //                         },
        //                     ],
        //                     minterCount: '56953',
        //                     totalTxFees: '3280403640269713521',
        //                     avgGas: '308933676',
        //                     totalValue: '52211982000000000000',
        //                     additionalUrls: [
        //                         {
        //                             label: 'Zora',
        //                             url: 'https://zora.co/collect/zora:0x060f3EDD18c47F59Bd23D063BBEB9aA4A8Fec6DF',
        //                         },
        //                     ],
        //                 },
        //                 profiles: [
        //                     {
        //                         id: 'ethereum:0xf70da97812cb96acdf810712aa562db8dfa3dbef',
        //                         address: {
        //                             kind: 'ethereum',
        //                             value: '0xf70da97812cb96acdf810712aa562db8dfa3dbef',
        //                         },
        //                         name: '0xf70da9',
        //                         nameKind: 'address',
        //                         slug: '0xf70da97812cb96acdf810712aa562db8dfa3dbef',
        //                     },
        //                     {
        //                         id: 'ethereum:0x81f91aca8c05b3eefebc00171139afefac17c9a6',
        //                         address: {
        //                             kind: 'ethereum',
        //                             value: '0x81f91aca8c05b3eefebc00171139afefac17c9a6',
        //                         },
        //                         name: '0x81f91a',
        //                         nameKind: 'address',
        //                         slug: '0x81f91aca8c05b3eefebc00171139afefac17c9a6',
        //                     },
        //                     {
        //                         id: 'ethereum:0x2d93c2f74b2c4697f9ea85d0450148aa45d4d5a2',
        //                         address: {
        //                             kind: 'ethereum',
        //                             value: '0x2d93c2f74b2c4697f9ea85d0450148aa45d4d5a2',
        //                         },
        //                         name: '0x2d93c2',
        //                         nameKind: 'address',
        //                         slug: '0x2d93c2f74b2c4697f9ea85d0450148aa45d4d5a2',
        //                     },
        //                     {
        //                         id: 'ethereum:0x855a4621d491ff98bc3d02eadbc108403887561c',
        //                         address: {
        //                             kind: 'ethereum',
        //                             value: '0x855a4621d491ff98bc3d02eadbc108403887561c',
        //                         },
        //                         name: '0x855a46',
        //                         nameKind: 'address',
        //                         slug: '0x855a4621d491ff98bc3d02eadbc108403887561c',
        //                     },
        //                     {
        //                         id: 'ethereum:0x3a4afca659f54922a0d7a7b0bebabf641dec66bb',
        //                         address: {
        //                             kind: 'ethereum',
        //                             value: '0x3a4afca659f54922a0d7a7b0bebabf641dec66bb',
        //                         },
        //                         name: '0x3a4afc',
        //                         nameKind: 'address',
        //                         slug: '0x3a4afca659f54922a0d7a7b0bebabf641dec66bb',
        //                     },
        //                     {
        //                         id: 'ethereum:0x965ef172b303b0bcdc38669df1de3c26bad2db8a',
        //                         address: {
        //                             kind: 'ethereum',
        //                             value: '0x965ef172b303b0bcdc38669df1de3c26bad2db8a',
        //                         },
        //                         name: 'signer1.floornfts.eth',
        //                         nameKind: 'ens',
        //                         slug: 'signer1.floornfts.eth',
        //                     },
        //                     {
        //                         id: 'ethereum:0xbe0c12b56aa9b4f5dde36c733b3a2997ed775a4f',
        //                         address: {
        //                             kind: 'ethereum',
        //                             value: '0xbe0c12b56aa9b4f5dde36c733b3a2997ed775a4f',
        //                         },
        //                         name: '0xbe0c12',
        //                         nameKind: 'address',
        //                         slug: '0xbe0c12b56aa9b4f5dde36c733b3a2997ed775a4f',
        //                     },
        //                     {
        //                         id: 'ethereum:0x56ad2cd6ad6f52c72181b93ac66d5dc887c3d0bd',
        //                         address: {
        //                             kind: 'ethereum',
        //                             value: '0x56ad2cd6ad6f52c72181b93ac66d5dc887c3d0bd',
        //                         },
        //                         name: '0x56ad2c',
        //                         nameKind: 'address',
        //                         slug: '0x56ad2cd6ad6f52c72181b93ac66d5dc887c3d0bd',
        //                     },
        //                     {
        //                         id: 'ethereum:0x2956be76d7164486ad89aa748db054ff91ffbfcd',
        //                         address: {
        //                             kind: 'ethereum',
        //                             value: '0x2956be76d7164486ad89aa748db054ff91ffbfcd',
        //                         },
        //                         name: '0x2956be',
        //                         nameKind: 'address',
        //                         slug: '0x2956be76d7164486ad89aa748db054ff91ffbfcd',
        //                     },
        //                     {
        //                         id: 'ethereum:0x3d5750d305f8d9c133faceaa92a2e46558130371',
        //                         address: {
        //                             kind: 'ethereum',
        //                             value: '0x3d5750d305f8d9c133faceaa92a2e46558130371',
        //                         },
        //                         name: '0x3d5750',
        //                         nameKind: 'address',
        //                         slug: '0x3d5750d305f8d9c133faceaa92a2e46558130371',
        //                     },
        //                 ],
        //             },
        //         },
        //         {
        //             metadata: {},
        //             tokens: [
        //                 {
        //                     contract: '0x209ef5bb2ca40841b87fa87dd661d622e007a588',
        //                     tokenId: '1',
        //                     total_amount: '1',
        //                     img: null,
        //                 },
        //             ],
        //             mintfun: {
        //                 details: {
        //                     topMinters: [
        //                         {
        //                             minter: 'ethereum:0xbc698ce1933afb2980d4a5a0f85fea1b02fbb1c9',
        //                             count: '1',
        //                         },
        //                     ],
        //                     minterCount: '1',
        //                     totalTxFees: '8598204299100',
        //                     avgGas: '100000050',
        //                     totalValue: '0',
        //                     additionalUrls: [
        //                         {
        //                             label: 'Zora',
        //                             url: 'https://zora.co/collect/zora:0x209EF5bb2Ca40841b87Fa87dD661D622e007A588',
        //                         },
        //                     ],
        //                 },
        //                 profiles: [
        //                     {
        //                         id: 'ethereum:0xbc698ce1933afb2980d4a5a0f85fea1b02fbb1c9',
        //                         address: {
        //                             kind: 'ethereum',
        //                             value: '0xbc698ce1933afb2980d4a5a0f85fea1b02fbb1c9',
        //                         },
        //                         name: '0xbc698c',
        //                         nameKind: 'address',
        //                         slug: '0xbc698ce1933afb2980d4a5a0f85fea1b02fbb1c9',
        //                     },
        //                 ],
        //             },
        //         },
        //     ],
        //     score: 78.5622357236987,
        //     recentMints: [
        //         {
        //             contract: '0x060f3edd18c47f59bd23d063bbeb9aa4a8fec6df',
        //             token_id: '0x01',
        //             minter: '0x8c252529b8b0a49b219abc8ab9000d08fd66cd19',
        //             block_number: 10652495,
        //         },
        //         {
        //             contract: '0x060f3edd18c47f59bd23d063bbeb9aa4a8fec6df',
        //             token_id: '0x01',
        //             minter: '0xb043eb320dfbf21fcfd59def1f356f2e0c163617',
        //             block_number: 10649996,
        //         },
        //         {
        //             contract: '0x060f3edd18c47f59bd23d063bbeb9aa4a8fec6df',
        //             token_id: '0x01',
        //             minter: '0x4bc5574a93b04d78b39a41e94e675eb5f48727ab',
        //             block_number: 10618598,
        //         },
        //         {
        //             contract: '0x060f3edd18c47f59bd23d063bbeb9aa4a8fec6df',
        //             token_id: '0x01',
        //             minter: '0x893e16c3934696c6abe3a615755081e97edace71',
        //             block_number: 10617819,
        //         },
        //         {
        //             contract: '0x060f3edd18c47f59bd23d063bbeb9aa4a8fec6df',
        //             token_id: '0x01',
        //             minter: '0x7775358ec20ce6fcc53ce1a716818e7bf1e6f68d',
        //             block_number: 10617607,
        //         },
        //         {
        //             contract: '0x060f3edd18c47f59bd23d063bbeb9aa4a8fec6df',
        //             token_id: '0x01',
        //             minter: '0x5ead5ecdc7539201a8c6c5a665e6fae419d17700',
        //             block_number: 10617458,
        //         },
        //         {
        //             contract: '0x060f3edd18c47f59bd23d063bbeb9aa4a8fec6df',
        //             token_id: '0x01',
        //             minter: '0xbdc9494184c8e5aef4553469a1553a2046552a0b',
        //             block_number: 10614011,
        //         },
        //         {
        //             contract: '0x060f3edd18c47f59bd23d063bbeb9aa4a8fec6df',
        //             token_id: '0x01',
        //             minter: '0xef32ded1a96abac21d4f8256430d84006061e193',
        //             block_number: 10611216,
        //         },
        //         {
        //             contract: '0x060f3edd18c47f59bd23d063bbeb9aa4a8fec6df',
        //             token_id: '0x01',
        //             minter: '0x238d75a6fcad33ef1c30853f3ffdd4e4281ac853',
        //             block_number: 10606456,
        //         },
        //         {
        //             contract: '0x060f3edd18c47f59bd23d063bbeb9aa4a8fec6df',
        //             token_id: '0x01',
        //             minter: '0xcf0df4a2f06bb653de859369929bc9b17716aa8a',
        //             block_number: 10580376,
        //         },
        //     ],
        //     firstMintBlockNumber: 5181802,
        //     zora: {
        //         address: '0xbc698ce1933afb2980d4a5a0f85fea1b02fbb1c9',
        //         addressShort: '0xbc69...b1c9',
        //         avatar: '/api/avatar/0xbc698ce1933afb2980d4a5a0f85fea1b02fbb1c9',
        //         username: 'farcaster',
        //         displayName: null,
        //         ensName: null,
        //         handle: 'farcaster',
        //         profileId: 'farcaster',
        //         profileName: 'farcaster',
        //         ensRecords: null,
        //         description: null,
        //         totalFollowers: 36713,
        //         totalFollowing: 0,
        //         extension: {
        //             theme: {
        //                 color: {
        //                     background: '#FFFFFF',
        //                     text: '#000000',
        //                     accent: '#000000',
        //                     accentText: '#FFFFFF',
        //                     border: '#000000',
        //                 },
        //                 font: {
        //                     heading: {
        //                         fontFamily: 'Inter Tight',
        //                         fontSize: '32px',
        //                         lineHeight: '1.1',
        //                     },
        //                     body: {
        //                         fontFamily: 'Inter Tight',
        //                         fontSize: '15px',
        //                         lineHeight: '1.3',
        //                     },
        //                     caption: {
        //                         fontFamily: 'Inter Tight',
        //                         fontSize: '12px',
        //                         lineHeight: '1.3',
        //                     },
        //                 },
        //                 button: {
        //                     shape: 'inherit',
        //                 },
        //                 unit: {
        //                     radius: '4px',
        //                     base: '6px',
        //                 },
        //             },
        //             links: {
        //                 twitter: null,
        //                 instagram: null,
        //                 farcaster: null,
        //                 tiktok: null,
        //                 discord: null,
        //                 website: null,
        //             },
        //             options: {
        //                 showMetadataHistories: false,
        //                 useBorders: null,
        //                 textTransform: {
        //                     heading: 'none',
        //                     body: 'none',
        //                     caption: 'none',
        //                 },
        //                 backgroundImage: {
        //                     image: null,
        //                     title: null,
        //                     blur: 0,
        //                     opacity: 1,
        //                     size: 300,
        //                     repeat: false,
        //                     style: 'fill',
        //                 },
        //                 dropShadow: {
        //                     spreadRadius: 0,
        //                     blurRadius: 0,
        //                     color: '#000000',
        //                     opacity: 0,
        //                 },
        //                 textStyling: {
        //                     styleType: 'none',
        //                     horizontalLength: 0,
        //                     verticalLength: 0,
        //                     blurRadius: 0,
        //                     color: '#000000',
        //                     opacity: 0,
        //                 },
        //             },
        //             profile: {
        //                 displayOptions: {
        //                     initialView: null,
        //                 },
        //             },
        //             template: 'Default',
        //         },
        //         extensionUrl: null,
        //     },
        // };
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
