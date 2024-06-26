const chainMap = {
    '0x4': 'Rinkeby',
    '0x1': 'Ethereum',
    '0x3': 'Ropsten',
    '0x5': 'Goerli',
    '0x2a': 'Kovan',
    '0x89': 'Polygon',
    '0x13881': 'Mumbai',
    '0x38': 'BNB Chain',
    '0x61': 'BSC Testnet',
    '0xa86a': 'Avalanche',
    '0xfa': 'Fantom',
    '0xa4b1': 'Arbitrum One',
    '0x2105': 'Base',
    '0x14a34': 'Base Sepolia',
    '0xa': 'Optimism',
    '0xa0c71fd': 'Blast Sepolia',
    '0x13e31': 'Blast',
    0x4: 'Rinkeby',
    0x1: 'Ethereum',
    0x3: 'Ropsten',
    0x5: 'Goerli',
    0x2a: 'Kovan',
    0x89: 'Polygon',
    0x13881: 'Mumbai',
    0x38: 'BNB Chain',
    0x61: 'BSC Testnet',
    0xa86a: 'Avalanche',
    0xfa: 'Fantom',
    0xa4b1: 'Arbitrum One',
    0x2105: 'Base',
    0xa: 'Optimism',
    0xa0c71fd: 'Blast Sepolia',
    0x13e31: 'Blast',
    0x14a34: 'Base Sepolia',
};
const chainRpcMap = {
    '0x1': 'https://mainnet.infura.io/v3/caa2121f41a1419abae10b5f2e4aa367',
    '0x4': 'https://rinkeby.infura.io/v3/',
    '0x5': 'https://goerli.infura.io/v3/',
    '0x38': 'https://polished-dawn-research.bsc.quiknode.pro/00e87ad609448ea0a3635f69bf98c695b938f9fb/',
    '0x89': 'https://damp-ultra-cherry.matic.quiknode.pro/ea613c3695241939749b11ae7efede038aa50152/',
    '0x61': 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    '0xa4b1':
        'https://purple-wider-card.arbitrum-mainnet.quiknode.pro/9194c209a75d6fd67403bc33b1278dc407841a4f/',
    '0x2105':
        'https://lingering-virulent-dinghy.base-mainnet.quiknode.pro/057afecb0d9a981657fec3c0bf94f0bd5075b8fc/',
    '0x13881':
        'https://delicate-orbital-dew.matic-testnet.quiknode.pro/cb412bded538f4dc4c98726b79f84617303da930/',
    '0xa0c71fd':
        'https://greatest-indulgent-lake.blast-sepolia.quiknode.pro/e920c9a69f366dfd52cd7e21a1ac52f85dfb1d23/',
    '0x13e31':
        'https://distinguished-billowing-bridge.blast-mainnet.quiknode.pro/5d9a08fff8d9e2ef49af53e6bd2fb5aef072f376/',

    '0x14a34':
        'https://maximum-spring-daylight.base-sepolia.quiknode.pro/f80c89e1e8f03bdb4eea77aa68bf8546d8862cc5/',
};

const chainExplorerMap = {
    '0x1': 'https://etherscan.io/',
    '0x4': 'https://rinkeby.etherscan.io/',
    '0x5': 'https://goerli.etherscan.io/',
    '0x89': 'https://polygonscan.com/',
    '0x38': 'https://bscscan.com/', // 56
    '0x61': 'https://testnet.bscscan.com/',
    '0xa4b1': 'https://arbiscan.io/',
    '0xa': 'https://optimistic.etherscan.io/',
    0x1: 'https://etherscan.io/',
    0x4: 'https://rinkeby.etherscan.io/',
    0x5: 'https://goerli.etherscan.io/',
    0x89: 'https://polygonscan.com/',
    0x38: 'https://bscscan.com/', // 56
    0x61: 'https://testnet.bscscan.com/',
    0xa4b1: 'https://arbiscan.io/',
    0x2105: 'https://basescan.org/',
    0x13881: 'https://mumbai.polygonscan.com/',
    0xa: 'https://optimistic.etherscan.io/',
    0x13e31: 'https://blastscan.io/',
    '0x13e31': 'https://blastscan.io',

    '0x14a34': 'https://sepolia.basescan.org/',
    0x14a34: 'https://sepolia.basescan.org/',
};

const currencyMap = {
    '0x1': 'ETH',
    '0x4': 'ETH',
    '0x5': 'ETH',
    '0x89': 'MATIC',
    '0x38': 'BNB', // 56
    '0x61': 'TBNB',
    '0xa4b1': 'ARB',
    '0x2105': 'ETH',
    0x1: 'ETH',
    0x4: 'ETH',
    0x5: 'ETH',
    0x89: 'MATIC',
    0x38: 'BNB', // 56
    0x61: 'TBNB',
    0xa4b1: 'ARB',
    0x2105: 'ETH',
    0x13e31: 'ETH',
    '0x13e31': 'ETH',

    0x14a34: 'ETH',
    '0x14a34': 'ETH',
};

const aiErrors = {
    '1': 'Face is not recognized by AI', // image = None(ai server error)
    '2': 'Metadata is not tracked by Metopia',
    '3': 'Image format is not supported',
    '4': 'Face is not recognized by AI',
};

const pinataApiKey = process.env.REACT_APP_PINATA_API_KEY;
const pinataSecretApiKey = process.env.REACT_APP_PINATA_SECRET_API_KEY;
const moralisApiToken = process.env.REACT_APP_MORALIS_API_TOKEN;
const isDevelopment =
    (process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'test') &&
    !process.env.REACT_APP_MOCK_PROD;
export const CREATE_SPACE_KEY = 'createSpace';
export const ISSUE_BADGE_COLLECTION_KEY = 'issueBadgeCollection';
export const UPDATE_BADGE_COLLECTION_KEY = 'updateBadgeCollection';
export const MINT_BADGE_KEY = 'mintBadge';
export const UPDATE_BADGE_KEY = 'updateBadge';
export const VLTN = 'vltn';
export const CREATE_ACHIEVEMENT_KEY = 'createAchievement';
export const CREATE_ACHIEVEMENT_POOL_KEY = 'createAchievementPool';
export const CLAIM_REWARD_POOL_KEY = 'claimAchievementPool';

export const SPACE_REGISTRATION_CONTRACTS = {
    0x38: '0x70e99E15F8449F7579B122078Eba6B92bBD0F470',
    0x61: '0x9700c3ca5f9BCE420C8DA7c9795966f8558f16AB',
    0x89: '0x1b7e2fbF8831607ad4Dd4A2A536E517f0F1991df',
    0x2105: '0x0964AA7CF5cbcC682922ab2fCEc55B9B28d1771C',
};

export const BADGE_FACTORY_CONTRACTS = {
    0x38: '0xEA0A9bFe214cd4f6571a25ce18008B6f5D801E13',
    0x61: '0xeA066198BBC0Ac011E8AD55D2908657d7559AdfA',
    0x89: '0x6873C99AA47851D43c3d2eBCc4be2fF23D66446F',
    0x2105: '0xD62a98815857CcbB4f000588295a06684458cbE4',
};

export const BADGE_CONTRACTS = {
    0x38: '0xf5329DEd56185469712f817B690AC4D10a5309E7',
    0x61: '0x5fB1Ca064DB1E1e3fD429Ed79196462765707c41',
    0x89: '0x9242e08B621729C0E311E5c158F10f03C41d681E',
    0x2105: '0xfAf56B87CAeB8DD65Ba869a5eC06Dc5DB4E491d0',
};

export const isOldBadgeContract = (contract) => {
    let result = null;
    Object.keys(BADGE_CONTRACTS).forEach((network) => {
        if (BADGE_CONTRACTS[network] == contract || BADGE_FACTORY_CONTRACTS[network] == contract)
            result = network;
    });
    return result;
};

export const getBadgeContract = (from) => {
    let to = from;
    Object.keys(BADGE_FACTORY_CONTRACTS).forEach((network) => {
        if (BADGE_FACTORY_CONTRACTS[network] == from) to = BADGE_CONTRACTS[network];
    });
    return to;
};

export const ADVANCED_BADGE_FACTORY = {
    0x38: '0xf26b70DeA87961e916231efb41FaCeF96796e8f7',
};

// isDevelopment ? '0x407e7D3f0A09feC32bc5C0458ba9812C6e4bDb67' : '0x70e99E15F8449F7579B122078Eba6B92bBD0F470';
// export const BADGE_FACTORY_CONTRACT = isDevelopment ? '0xebf9C6256b5267d5EB6C7E3906Df33a24824e7eD' : '0x6266658EE95b88cA3b632C054c25afE9951E83fB';
// export const BADGE_CONTRACT = isDevelopment ? '0xd315c349f4d16783B7eA394b02EFEF7B06564c6A' : '0x976D657aa6492f6508E154D084c5A60d0411d2fc';

export const STORAGE_KEY_DISCORD_REDIRECT = 'discord_redirect';
export const STORAGE_KEY_TWITTER_REDIRECT = 'twitter_redirect';

export const DISCORD_REDIRECT_URL = isDevelopment
    ? 'https://test.metopia.xyz/'
    : 'https://metopia.xyz/';

export const TWITTER_REDIRECT_URL = isDevelopment
    ? 'https://test.metopia.xyz/'
    : 'https://metopia.xyz/';
export const EVM_HOME_URL = DISCORD_REDIRECT_URL;
export const SEI_HOME_URL = isDevelopment
    ? 'https://test.sei.metopia.xyz/'
    : 'https://sei.metopia.xyz/';

export const METOBADGE_RENDERER_URLS = {
    0x61: 'https://metopia.xyz/metobadge/bsc-testnet',
    0x38: 'https://metopia.xyz/metobadge/bsc',
    0x89: 'https://metopia.xyz/metobadge/matic',
    0x2105: 'https://metopia.xyz/metobadge/base',
    0xa4b1: 'https://metopia.xyz/metobadge/arb',
};

export const getRendererUrl = (url) => {
    return url?.replace(
        isDevelopment ? '/metopia.xyz' : '/test.metopia.xyz',
        isDevelopment ? '/test.metopia.xyz' : '/metopia.xyz',
    );
};

export const defaultCoverUrl = 'https://oss.metopia.xyz/imgs/test-achv.png';

export const QUEST_SPACE_ID = isDevelopment ? 'bora' : 'metopiaspace'; // can change spaceid for development
export const openseaEndpoint = {
    0x38: 'https://opensea.io/assets/bsc/',
    0x61: 'https://testnets.opensea.io/assets/bsc-testnet/',
    0x89: 'https://opensea.io/assets/matic/',
    0x1: 'https://opensea.io/assets/ethereum/',
    0xa4b1: 'https://opensea.io/assets/arbitrum/',
    0x2105: 'https://opensea.io/assets/base/',
    0x13881: 'https://testnets.opensea.io/assets/mumbai/',
};

export const BADGE_NETWORKS = isDevelopment
    ? [0x61, 0x38, 0x89, 0x2105, 0xa4b1]
    : [0x38, 0x89, 0x2105, 0xa4b1];

export const spaceCategories = [
    'General',
    'NFTs',
    'DeFi',
    'DAO',
    'Gaming',
    'Infrastructure',
    'Metaverse',
    'Data',
    'Services',
    'Social',
    'Tools and Utilities',
];

export const achvCategories = [
    'General',
    'NFT',
    'DeFi',
    'DAO',
    'Gaming',
    'Infrastructure',
    'Metaverse',
    'Social Media',
    'Community',
    'Validator',
];

export const criteria_img_urls = [
    'https://oss.metopia.xyz/imgs/allowlist-icon.png',
    'https://oss.metopia.xyz/imgs/discord-join-icon.png',
    'https://oss.metopia.xyz/imgs/twitter-like-icon.png',
    'https://oss.metopia.xyz/imgs/twitter-retweet-icon.png',
    'https://oss.metopia.xyz/imgs/allowlist-icon.png',
    'https://oss.metopia.xyz/imgs/prophouse.jpg',
    'https://oss.metopia.xyz/imgs/allowlist-icon.png',
    'https://oss.metopia.xyz/imgs/allowlist-icon.png',
    'https://oss.metopia.xyz/imgs/allowlist-icon.png',
    'https://oss.metopia.xyz/imgs/allowlist-icon.png',
    'https://oss.metopia.xyz/imgs/allowlist-icon.png',
    'https://oss.metopia.xyz/imgs/allowlist-icon.png',
    'https://oss.metopia.xyz/imgs/allowlist-icon.png',
    'https://oss.metopia.xyz/imgs/allowlist-icon.png',
    'https://oss.metopia.xyz/imgs/allowlist-icon.png',
    'https://oss.metopia.xyz/imgs/allowlist-icon.png',
    'https://oss.metopia.xyz/imgs/allowlist-icon.png',
    'https://oss.metopia.xyz/imgs/allowlist-icon.png',
    'https://oss.metopia.xyz/imgs/allowlist-icon.png',
    'https://oss.metopia.xyz/imgs/allowlist-icon.png',
    'https://oss.metopia.xyz/imgs/allowlist-icon.png',
    'https://oss.metopia.xyz/imgs/allowlist-icon.png',
];

export const ROOT_ADMIN = '0x830732Ee350fBaB3A7C322a695f47dc26778F60d';

export const REWARD_POOL_ADDRESSES = {
    97: '0x2b77Ac9Fd16B5cDA13406c99C101a4F1158Ca0B2',
    56: '0xA91d861f864E1C158AE8A1579490521Fb184c115',
};

export {
    currencyMap,
    chainMap,
    chainExplorerMap,
    aiErrors,
    pinataApiKey,
    pinataSecretApiKey,
    moralisApiToken,
    chainRpcMap,
    isDevelopment,
};
export const LEADERBOARD_NETWORK = isDevelopment ? 84532 : 0x2105;
export const LEADERBOARD_SBTID = isDevelopment ? 560 : 550;
export const LEADERBOARD_CONTRACT = isDevelopment
    ? '0x8019A773570a83Def72aF3ad502386d9E03E2D02'
    : // : '0xb68666365027Ff1882bfec2403Fdb8E9Edd5B3f7';
      '0xF46A98A1eCaCd90deE3Af11191aF79eDE85a3E86';
export const LEADERBOARD_NFT_CONTRACT = isDevelopment
    ? '0x6D9e5B24F3a82a42F3698c1664004E9f1fBD9cEA'
    : '0xDa6DcE466616832537674C7165D2e4E6d2f01bce';

export const RAFFLE_NETWORK = isDevelopment ? 84532 : 0x2105;
export const CREDIT_CENTER_CONTRACT = isDevelopment
    ? '0x5A1b948A658Ce97a3084eAa1229bFB1513bFD7e3'
    : '0x69337d1898b869E5119BF21Cf8A07845BE079F3b';
export const CREDIT_NFT_CONTRACT = isDevelopment
    ? '0x9C629B6D0c5C3f2c5c1dB6F71C6AfDebA9B8Cc1c'
    : '0x4454191fEf7E503CE40a2110e3F04A4a038192aA';

export const RAFFLE_CONTRACT = '0x5fB8530e9b0ED68E907e5573CC421CE83f48334B';

export const BLAST_LEADERBOARD_SBTID = isDevelopment ? 561 : 551;
export const BLAST_LEADERBOARD_NETWORK = isDevelopment ? 168587773 : 0x13e31;
export const BLAST_LEADERBOARD_CONTRACT = isDevelopment
    ? '0x14169D6F660e95057fFd29452F1f056D4A3CECe9'
    : '0x6D9e5B24F3a82a42F3698c1664004E9f1fBD9cEA';
export const BLAST_LEADERBOARD_NFT_CONTRACT = isDevelopment
    ? '0x7E382E03Fc70939CAB70B156d5c27F73cA5Ee674'
    : '0xA8e1658A671602d1dDbe73Cd7EDcD5A4093ad4F7';

export const BORA_CONTRACT = '0x326aeb7e866a366c4109a6b8e6c4be19676238ca';
export const taskNameMap = {
    1: 'Set username',
    2: 'Set-up Twitter',
    3: 'Set-up Discord',
    4: 'Check-in',
    5: 'Invite',
    7: 'Invite',
    8: 'Credential',
    9: 'Quest',
    11: 'Raffle',
    10: 'Set-up Email',
};

export const usernameTabs = [
    { name: 'Customize', id: 'Customize' },
    { name: 'ENS', id: 'ENS' },
    { name: 'SpaceID', id: 'SpaceID' },
    { name: '.bit', id: '.bit' },
    { name: '.arb', id: '.arb' },
    { name: '.base', id: 'BNS' },
];

export const opportunityTypes = [
    'Product Launch',
    'NFT Mint',
    'Exclusive Access',
    'Point Boost',
    'Alpha',
    'Event',
];

export const tooltipConfig = {
    noArrow: true,
    style: {
        padding: '8px',
        borderRadius: '8px',
        zIndex: 1000,
        background: 'rgba(255, 255, 255, 0.10)',
        border: '1px solid rgba(125, 128, 154, 0.25)',
        boxShadow: '0px 8px 32px 0px rgba(0, 0, 0, 0.10)',
        backdropFilter: 'blur(30px)',
        color: '#FFF',
        fontSize: '12px',
    },
};
export const IS_BASE = process.env.REACT_APP_CHAIN == 'base';
export const IS_BLAST = process.env.REACT_APP_CHAIN == 'blast';
export const BLAST_APP_HOST = isDevelopment
    ? 'https://blast-sepolia.metopia.xyz'
    : 'https://blast.metopia.xyz';
export const BASE_APP_HOST = isDevelopment ? 'https://test.metopia.xyz' : 'https://metopia.xyz';
