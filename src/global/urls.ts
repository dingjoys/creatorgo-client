import { encodeQueryData } from '../utils/restUtils';

const ossPrefix = process.env.REACT_APP_CDN_PREFIX;
export const documentLink =
    'https://docs.metopia.xyz/metopia/world-cup-campaign/metopia-world-cup-2022-voting-campaign-rule';
// export const ossImageThumbnailPrefix = (width, height) => `?x-oss-process=image/resize,w_${width},h_${height},m_fill`
export const thumbnail = (src, width, height) => {
    if (src.indexOf('svg') > 0) {
        return src;
    }
    return encodeQueryData(src, {
        'x-oss-process': `image/resize,w_${width},h_${height},m_fill`,
        width,
    });
};

export const removeThumbnail = (src) => {
    let index = src.indexOf('x-oss-process');

    if (index > 0) {
        return src.substring(0, index - 1);
    }
    return src;
};

const dataCenterRoot = process.env.REACT_APP_DATA_CENTER_API_PREFIX;
const snapshotScoreApiRoot = process.env.REACT_APP_SNAPSHOT_SCORE_API_PREFIX;
const snapshotCoreRoot = process.env.REACT_APP_SNAPSHOT_CORE_API_PREFIX;
const metopiaServiceRoot = process.env.REACT_APP_METOPIA_SERVICE_API_PREFIX;
const metopiaHost = process.env.REACT_APP_HOST;
const blastHost = process.env.REACT_APP_BLAST_API_HOST
export const followApi = {
    followSpace: dataCenterRoot + 'follows',
};

const userApi = {
    user_create: dataCenterRoot + 'owners',
    user_update: dataCenterRoot + 'owners/',
    user_updateReferral: dataCenterRoot + 'owners/updateReferral',
    user_selectByOwner: dataCenterRoot + 'owners/',
    user_selectByOwners: dataCenterRoot + 'owners',
    delegate_select: dataCenterRoot + 'users',

    delegate_event_select: dataCenterRoot + 'delegates/events',

    delegate_insert: dataCenterRoot + 'users',

    user_history: metopiaServiceRoot + 'history/select',

    user_cacheActiveList: dataCenterRoot + 'users/compute',
    user_activeList: dataCenterRoot + 'users/list',

    login: dataCenterRoot + "owners/login",
    email_sendVerification: dataCenterRoot + '/email/sendVerification',
    email_verify: dataCenterRoot + '/email/verify',

    notification_select: dataCenterRoot + 'notification/select',
    notification_read: dataCenterRoot + 'notification/read',

    referrals: dataCenterRoot + 'owners/referred'
};

export const agentApi = {
    agent_create: dataCenterRoot + 'agents',
    agent_select: dataCenterRoot + 'agents',
    agent_update: (id) => dataCenterRoot + `agents/${id}`,
    agent_delete: (id) => dataCenterRoot + `agents/${id}`,
};

const draftApi = {
    create_draft: dataCenterRoot + 'drafts',
    update_draft: dataCenterRoot + 'drafts',
    get_drafts: dataCenterRoot + 'drafts',
    delete_draft: dataCenterRoot + 'drafts',
};

const discordApi = {
    guild_selectAll: dataCenterRoot + 'discord/bot/guilds',
    role_select: dataCenterRoot + 'discord/guilds/roles',
    personal_auth: dataCenterRoot + 'discord/auth',
    unbound: dataCenterRoot + 'discord/unbound',
    update: dataCenterRoot + 'discord/guilds/update',
};

const twitterApi = {
    twitter_auth: dataCenterRoot + 'twitter/auth',
    unbound: dataCenterRoot + 'twitter/unbound',
    follow_verify: dataCenterRoot + 'twitter/unsign/is-followed',
    tweet_verify: dataCenterRoot + 'twitter/unsign/verify',
    retweet_verify: dataCenterRoot + 'twitter/unsign/retweeted',
};

const nftDataApi = {
    nft_image: dataCenterRoot + 'nfts/image',
    nft_cache: dataCenterRoot + 'nfts/cache',
    nft_cacheAll: dataCenterRoot + 'nfts/cache-all',
    nft_transfer_cacheAll: dataCenterRoot + 'nfts/transfers/cache-all',
    nft_attributes: dataCenterRoot + 'nfts/attributes',
    goverance_selectByOwner: dataCenterRoot + 'owners/governance-records',
    nft_fetch: dataCenterRoot + 'nfts/transfers/received-count',
};

const spaceApi = {
    space_create: metopiaServiceRoot + 'club/create',
    space_update: metopiaServiceRoot + 'club/update',
    space_select: metopiaServiceRoot + 'club/select',
    space_selectById: metopiaServiceRoot + 'club/selectById',
    space_selectByIds: metopiaServiceRoot + 'club/selectByIds',
    proposal_selectLatest: metopiaServiceRoot + 'proposal/selectLatest',
    proposal_scores: (proposalId) => `${snapshotCoreRoot}api/scores/${proposalId}`,
    uploadImage: metopiaServiceRoot + 'uploadImage',
    uploadImageAvatar: metopiaServiceRoot + 'uploadImage/avatar',
    score: snapshotScoreApiRoot + 'scores',
    graphql: snapshotCoreRoot + 'graphql',
    msg: snapshotCoreRoot + 'api/msg',
    loadSpaces: snapshotCoreRoot + 'api/loadspaces',
    history_selectCountByUserList: metopiaServiceRoot + 'history/selectCountByUserList',

    selectSpaceIdOnchain: dataCenterRoot + 'spaces',
    createSpaceIdOnchain: dataCenterRoot + 'spaces',
    createSpaceVerified: dataCenterRoot + 'space-verifieds',
};

export const raffleApi = {
    select: dataCenterRoot + 'activities',
    selectById: (id) => dataCenterRoot + 'activities/' + id,
    create: dataCenterRoot + 'activities',
    join: (id) => dataCenterRoot + 'activities/' + id + '/play',
    draw: (id) => dataCenterRoot + 'activities/' + id + '/lotto',
    selectSbts: dataCenterRoot + 'sbts',
    winnerSign: (id) => dataCenterRoot + `activities/${id}/player/sign`,
    selectCredits: dataCenterRoot + "/credit/selectCredits",
    creditRaffle: dataCenterRoot + '/creditRaffle'
};
export const raffleApiV2 = {
    select: dataCenterRoot + 'raffle/select',
    join: dataCenterRoot + 'raffle/join',
    validate: dataCenterRoot + 'raffle/validate',
    participants: dataCenterRoot + 'raffle/participants',
    winners: dataCenterRoot + 'raffle/winners',
    records: dataCenterRoot + 'raffle/records',
    verifyQuests: dataCenterRoot + 'raffle/validateQuest'
};

export const scoreApi = {
    selectLogs: dataCenterRoot + "scores/selectLog",
    checkinEvent: dataCenterRoot + "scores/checkin/event",
    select: dataCenterRoot + 'scores/select',
    selectRankBySpace: dataCenterRoot + 'scores/select/rankBySpace',
    selectRankBySbt: dataCenterRoot + 'scores/select/leaderboardRankBySbt',
    selectRankByAchievement: dataCenterRoot + 'scores/select/rankByAchievement',
    selectIsReferralLogged: dataCenterRoot + "scores/select/isReferralLogged",
    claim: dataCenterRoot + 'scores',
    achvOwnerCount: dataCenterRoot + 'scores/select/count',
};

export const questApi = {
    select: dataCenterRoot + 'quest/select',
    selectLogs: dataCenterRoot + 'quest/selectLogs',
    verify: dataCenterRoot + 'quest/verify',
    redeem: dataCenterRoot + 'quest/redeem',
}
export const exploreApi = {
    getTransactionsByGroupBy: dataCenterRoot + 'transactions/groupedByDate',
    getTransactionsGeneralData: dataCenterRoot + 'transactions/generalData',
    getRecommendedCreds: dataCenterRoot + 'credential/recommended',
    getGeneralValue: dataCenterRoot + 'credential/generalValue',
}
export const opportunityApi = {
    list: dataCenterRoot + 'opportunity/select'
}
export const badgeApi = {
    expiry: dataCenterRoot + 'expiry',
    leaderboard: {
        getCreds: dataCenterRoot + 'credential',
        getTxs: dataCenterRoot + 'credential/txs',
        getValueListById: dataCenterRoot + 'credential/value/ofCredential',
        getValueListByOwner: dataCenterRoot + 'credential/value/ofOwner',
        verifyOwner: dataCenterRoot + 'credential/verify',
        updateValue: dataCenterRoot + 'credential/value/update',
        getPromoPrice: dataCenterRoot + 'promotionSignature'
    },
    freemint: {
        getCredentails: dataCenterRoot + 'freemint/credentials',
        checkStatus: dataCenterRoot + 'freemint/status',
        mint: dataCenterRoot + 'freemint',
        getFreemintSigner: dataCenterRoot + 'freemintV2',
    },
    sbts: {
        select: dataCenterRoot + 'sbts',
        create: dataCenterRoot + 'sbts',
        achievement: dataCenterRoot + `sbts/tokens/update-logs/achievement/count`,
    },
    homeCollection: dataCenterRoot + 'questCollections',
    achievement: {
        create: dataCenterRoot + `achievements`,
        update: dataCenterRoot + `achievements`,
        select: dataCenterRoot + `achievements`,
        verify: dataCenterRoot + 'achievements/verify',
        sig: dataCenterRoot + 'achievements/get-badge-sig',
        recache: dataCenterRoot + 'achievements/recache',
        onChainValueRank: dataCenterRoot + 'sbts/tokens/selectOnchainValueRank',
    },
    avatar: {
        getLearderboardAvatar: dataCenterRoot + `metadata/avatar`,
        getLeaderboardLevels: dataCenterRoot + 'metadata/levelInfo',
        getUserLeaderboardLevel: dataCenterRoot + 'metadata/level',
        upgradeLevel: dataCenterRoot + 'metadata/upgradeLevel',
    },
    tokens: {
        count: dataCenterRoot + 'sbts/tokens/count',
        select: dataCenterRoot + 'sbts/tokens',
    },
    credentialLogs: {
        select: dataCenterRoot + "sbts/claimedAchievementLogs",
        selectGroupedCount: dataCenterRoot + "sbts/claimedAchievementLogs/groupedCount"
    },
    scoreLogs: {
        select: dataCenterRoot + 'sbts/tokens/score-logs',
        // temporary; credential score claim
        claim: dataCenterRoot + `sbts/tokens/score-logs/claim`,
    },
    whitelist: {
        create: dataCenterRoot + `whitelists`,
        select: dataCenterRoot + `whitelists`,
    },

    setAchvCover: dataCenterRoot + 'sbts/tokens/achievements',
    sig: dataCenterRoot + 'sbts/tokens/sig-mint-or-update',
    sig2: dataCenterRoot + 'sbts/tokens/sig-mint-or-update-2',
    sig3: dataCenterRoot + 'sbts/tokens/sig-mint-or-update-v3',
    sig4: dataCenterRoot + 'sbts/tokens/sig-mint-or-update-v4',
    // cacheToken: dataCenterRoot + 'sbts/tokens/cache',
    cacheTokenv3: dataCenterRoot + 'sbts/tokens/v3/cache',
    transactions: dataCenterRoot + 'transactions',

    metadata: metopiaHost + "metadata/",
    blastMetadata: blastHost + "metadata/"
};

const thirdpartyApi = {
    snapshot_api_graphql: 'https://hub.snapshot.org/graphql',
};

const pinataApiPrefix = 'https://api.pinata.cloud/';
const publicIpfsPrefix = 'https://ipfs.io/';

const ipfsApi = {
    pinata_pinFileToIPFS: pinataApiPrefix + 'pinning/pinFileToIPFS',
};

const testApi = {
    image_store: metopiaServiceRoot + 'uploadImage',
    membership_mint: metopiaServiceRoot + 'test/membership/mint',
    membership_select: metopiaServiceRoot + 'test/membership/select/',
    subscription_create: metopiaServiceRoot + 'subscription/create',
    feedback_create: dataCenterRoot + 'feedback/create',
};

const ceramicNode = process.env.REACT_APP_CERAMIC_API;

export const keywords = [
    'aether',
    'astroport',
    'bril',
    'dagora',
    'dmail',
    'eclipse',
    'fuzio',
    'kryptonite',
    'levana',
    'seaswap',
    'sei id',
    'seiid',
    'simba',
    'sensei',
    'sparrow',
    'tatami',
];
export const _criteria_img_urls = (name) => {
    if (!name) {
        return null;
    }
    for (let key of keywords) {
        if (name.toLowerCase().indexOf(key) > -1) {
            return `https://oss.metopia.xyz/imgs/${key.replaceAll(' ', '')}logo.png`;
        }
    }
    return null;
};

// localRouter,
export {
    ossPrefix as cdnPrefix,
    draftApi,
    nftDataApi,
    spaceApi,
    ipfsApi,
    ceramicNode,
    thirdpartyApi,
    testApi,
    discordApi,
    userApi,
    twitterApi,
};

// {"network":42161,"contract":"0x1efCF12010d33a5b0B41172A1c3EA7d056Fc832D","abi":"{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"sender\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"address\",\"name\":\"user\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"itype\",\"type\":\"uint256\"}],\"name\":\"Operator\",\"type\":\"event\"}","criteria":"eventdata::0","type":"count","filters":[{"criteria":"eventdata::1","method":"eq","value":5,"type":"number"}]}


