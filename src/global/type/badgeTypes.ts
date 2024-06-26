import { getBadgeContract } from '../constant';

export type ILevel = {
    design: {
        background?: string;
        message?: string;
        image?: string;
    };
    score: number;
    index?: number;
};
export type BadgeCollection = {
    id?: number;
    contract: string;
    name: string;
    network: string;
    expiration?: number;
    description: string;
    /**
     * Off-chain
     */
    spaceId: string;
    signer: {
        name: string;
        avatar: string;
    };
    design?: {
        background?: string;
    };
    /**
     * badgeIdOnChain
     */
    collectionId?: number;
    achievementsCount?: number;
    category: string;
    tokenTypeId?;
    levels: ILevel[];
    token_address?;
};

export const flattenBadgeCollection = (data: BadgeCollection) => {
    let res =
        data.collectionId == null
            ? {
                chain: `0x${parseInt(data.network).toString(16)}`,
                token_address: data.contract,
                space: data.spaceId,
                title: data.name,
                description: data.description,
                signerName: data.signer.name,
                signerAvatar: data.signer.avatar,
                //   design: JSON.stringify(data.design),
                category: data.category,
                levels: JSON.stringify(data.levels),
            }
            : {
                chain: `0x${parseInt(data.network).toString(16)}`,
                token_address: data.contract,
                space: data.spaceId,
                title: data.name,
                description: data.description,
                signerName: data.signer.name,
                signerAvatar: data.signer.avatar,
                //   design: JSON.stringify(data.design),
                tokenTypeId: data.collectionId,
                category: data.category,
                levels: JSON.stringify(data.levels),
            };
    return res;
};

export const parseBadgeCollection = (data): BadgeCollection => {
    let levels = data.levels;
    if (!levels && data.design) {
        levels = [{ score: 0, design: JSON.parse(data.design), index: 1 }];
    }
    return {
        id: data.id,
        contract: getBadgeContract(data.token_address),
        token_address: getBadgeContract(data.token_address),
        network: data.chain,
        spaceId: data.space,
        name: data.title,
        signer: {
            name: data.signerName,
            avatar: data.signerAvatar,
        },
        description: data.description,
        // design: JSON.parse(data.design),
        collectionId: data.tokenTypeId,
        achievementsCount: data.achievementsCount,
        category: data.category,
        tokenTypeId: data.tokenTypeId,
        levels: levels,
    };
};

export const newBadgeCollection = (params: any & { chain: number }): BadgeCollection => {
    return Object.assign(
        {
            name: '',
            network: `0x${params.chain.toString(16)}`,
            description: '',
            spaceId: null,
            signer: {
                name: '',
                avatar: '',
            },
            levels: [
                {
                    score: 0,
                    design: {
                        background: 'https://oss.metopia.xyz/imgs/sbt-default-bg-v2-1.png',
                        message: '',
                        badge: '',
                    },
                    index: 1,
                },
            ],
        },
        params,
    );
};

export const newTxAction = (): ActionParam[0] => {
    return {
        network: '0x38',
        contract: '',
        item: {
            type: 'function',
            name: '',
            criteria: '',
            filters: [],
            abi: null,
        },
        target: {
            type: 'count',
            reference: '',
            referenceIndex: -1,
            topicIndex: -1,
        },
    };
};
export const newOnChainTxAction = (): ActionParam[17] => {
    return {
        network: null,
        contract: '',
        abi: null,
        type: 'count',
        criteria: '',
        criteriaVal: '',
        targetVal: '',
        target: '',
        filters: [],
    };
};
export declare interface ScoreLog {
    id;
    owner;
    achievementId;
    name;
    space;
    score: number;
    value: number;
    createdAt;
    updatedAt;
}

export declare type Achievement = {
    id?: number;
    name: string;
    description: string;
    type: 'number' | 'boolean'; // 储存的数据类型  number = updateable ,boolean = once
    sources: AchievementSource; // value计算方式
    requirements: Requirement[]; // 不满足requirements时，value=0或null
    design?: string;
    link: string;
    sbtId?: string;
    space?: string;
    owner?: string;
    createdAt?: string;
    updatedAt?: string;
    score?: number;
    end?: number;
    project?: string;
    category?: string;
    eligibility?: string;
    // tokenAddress - is null when the reward is ETH & other coins; otherwise ERC20
    // supply - 人数限制
    // amount - 每份奖励数量
    // start/end - length of 10
    rewards?: { network: number, tokenAddress?: string, supply: number, amount: number, start: number, end: number, tokenName: string },
    pool_id?: number
};

export declare type AchievementSource = {
    actions: Action<any>[];
    threshold?: number; // 如果type==boolean, 可能有threshold的值
    snapshot?: number;
    value?: number; // 缓存的value
    currentValue?: number;
    sigValue?: number;
};

export const ACTION_TYPE_DISCORD = 1;
export const ACTION_TYPE_TWITTER_FOLLOW = 2;
export const ACTION_TYPE_RETWEET = 3;
export const ACTION_TYPE_MANUAL = 4;
export const ACTION_TYPE_ONCHAIN = 0;
export const ACTION_TYPE_ONCHAIN_NEW = 17;
export const ACTION_TYPE_TWITTER_LIKE = 13;
// export const ACTION_TYPE_OFFCHAIN = 5;
export const ACTION_TYPE_PROPHOUSE = 5;
export const ACTION_TYPE_HOLDINGS = 6;
export const ACTION_TYPE_BORA = 20;

export const ACTION_TYPE_RETWEET_NEW = 13;

export declare type Transactions = {
    id: number;
    chain: string;
    hash: string;
    token_address: string;
    from_address: string;
    to_address: string;
    value: string;
    block_number: string;
    bloc_timestamp: string;
    createdAt: string;
    updatedAt: string;
}[];
/**
 * Example :
 * 
 * params: {
    "type": "event",
    "contract": "0xcafe1a77e84698c83ca8931f54a755176ef75f2c",
    "item": {
        "name": "Deposit(address,uint256)",
        "criteria": "sender", -> address
        "criteriaIndex": 0 // topic index
    },
    "target": {
        "type": "volume",
        "reference": "value",
        "referenceIndex": 0 // data index
    }
}
 */

export declare type OnChainFilter = {
    id?: number;
    // When type = event & criteria = null, it referring to the msg.sender
    criteriaType?: string;
    criteria: string;
    criteriaIndex: number;
    method: 'lt' | 'lte' | 'eq' | 'gte' | 'gt';
    value: number | 'owner';
    referenceIndex?: number;
};
export declare type NewOnChainFilter = {
    id?: number;
    criteria: string,
    method: "gte" | "gt" | "eq" | "lte" | "lt",
    value?: number,
    criteriaVal?: string,  // for frontend
    type?: "address" | "number",
    decimal?: number
}
export declare type ActionParam = {
    0: {
        network: string;
        contract: string;
        item: {
            type?: 'event' | 'function';
            name: string;
            abi: any;
            criteria: string;
            filters: OnChainFilter[];
        };
        // target stats of the item
        target: {
            type?: 'count' | 'volume';
            reference: string;
            referenceIndex: number;
            topicIndex: number;
        };
        weight?: number;
    };
    17: {
        network: string;
        contract: string;
        abi: string;
        criteria: string;
        criteriaVal?: string // for frontend
        type?: "volume" | "count"
        targetVal?: string
        target?: string
        filters: NewOnChainFilter[];
    };
    1: {
        guildId: string;
        roleIds: string[];
    };
    2: {
        twitterName: string;
    };
    3: {
        tweetId: string;
    };
    13: {
        tweetId: string;
    };
    4: {
        list: string[];
    };
    6: {
        chain: string;
        address: string;
        standard: '721';
        extraRequirements: {
            type?: string; // trait
            period?: number; //  3600 * 24 * 100
            unitTime?: number; // 3600 * 24, (分数 = 满足单位时间数量 * weight)
            weight?: number; //(extraRequirement和trait下都可以有weight, 优先级: trait > extraRequirement)
            traits?: {
                // trait每满足一个即加一个的分(如某个trait只是过滤条件不加分,weight设为0)
                type?: string; //  'include','range'
                field?: string; // 'background','deep',
                valueList?: (string | number)[];
                weight?: string;
            }[];
        }[];
    };
};

// @Return 返回number；如果是判断类型，计算时建议返回0/1，便于计算，e.g.是否转发推特，如果转发返回1
export declare type Action<T extends keyof ActionParam> = {
    id?; //标记该action
    type: T; // 条件类型
    params: ActionParam[T]; // 条件参数
    weight?: number;
    operator?: 'add' | 'multiply';
    /**
     * 1: Cached; 2. Caching; 3. Error
     */
    cacheSyncing?: number;
};

export declare type Requirement = {
    actionId: number;
    threshold: number;
};

// level取最大的满足条件的level，e.g. 同时满足
export declare type Level = {
    level: number;
    requirements: Requirement;
};

// export const ACTION_TYPE_DISCORD = 1;
// export const ACTION_TYPE_TWITTER_FOLLOW = 2;
// export const ACTION_TYPE_RETWEET = 3;
// export const ACTION_TYPE_MANUAL = 4;
// export const ACTION_TYPE_ONCHAIN = 0;
// export const ACTION_TYPE_PROPHOUSE = 5;
// export const ACTION_TYPE_HOLDINGS = 6;

export const flattenAchievement = (data: Achievement) => {
    return {
        name: data.name,
        description: data.description,
        type:
            data.sources.threshold ||
                [
                    ACTION_TYPE_DISCORD,
                    ACTION_TYPE_TWITTER_FOLLOW,
                    ACTION_TYPE_RETWEET,
                    ACTION_TYPE_MANUAL,
                ].indexOf(data.sources.actions?.[0].type)
                ? 'boolean'
                : 'number',
        // sources: data.source
        sources: JSON.stringify(data.sources),
        // design: JSON.stringify(data.design),
        link: JSON.stringify(data.link),
        score: data.score,
        // ext: JSON.stringify(data.ext),
        project: data?.project,
        category: data?.category,
        eligibility: data?.eligibility,
        parentId: null,
        rewards: JSON.stringify(data.rewards),
        pool_id: data.pool_id
    };
};

export declare type BadgeAsset = {
    name: string;
    description: string;
    image: string;
    tokenId: number;
    expire?: string;
    attributes: {
        trait_type: string;
        value: any;
    }[];
};

export declare type SBTLog = {
    owner: string;
    chain: string;
    achievement: string;
    token_address: string;
    token_id: string;
    // 1. mint; 2. update
    type: 1 | 2;
    field: '39';
    prev_value: string;
    value: string;
    // spaceId
    arg: 'new-test1';
    createdAt: string;
    updatedAt: string;
};
export declare type SBTScoreLog = {
    owner: string;
    id?: string;
    type?: string;
    modelId?: string; //  achievement ID
    name?: string; //  achievement name
    space: string; // space ID
    score?: number;
    scores?: number;
    createdAt?: string;
    updatedAt?: string;
    ranking?: number;
};
