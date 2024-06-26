import { arbitrum, bsc, mainnet, polygon, } from 'wagmi/chains';
import { http } from 'wagmi';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';

const artelaConfig = {
    id: 11822,
    network: 'Artela',
    name: 'Artela',
    nativeCurrency: {
        name: 'Art',
        symbol: 'Art',
        decimals: 18,
    },
    rpcUrls: {
        default: {
            http: [
                'https://betanet-rpc1.artela.network',
            ],
        },
        public: {
            http: [
                'https://betanet-rpc1.artela.network',
            ],
        },
    },
    blockExplorers: {
        default: {
            name: 'artela scan',
            url: 'https://betanet-scan.artela.network/',
        },
    },
    testnet: true,
};
const base = {
    id: 0x2105,
    network: 'base',
    name: 'Base',
    nativeCurrency: {
        name: 'Base',
        symbol: 'ETH',
        decimals: 18,
    },
    rpcUrls: {
        default: {
            http: [
                'https://lingering-virulent-dinghy.base-mainnet.quiknode.pro/057afecb0d9a981657fec3c0bf94f0bd5075b8fc/',
            ],
        },
        public: {
            http: [
                'https://lingering-virulent-dinghy.base-mainnet.quiknode.pro/057afecb0d9a981657fec3c0bf94f0bd5075b8fc/',
            ],
        },
    },
    blockExplorers: {
        etherscan: {
            name: 'Basescan',
            url: 'https://basescan.org/',
        },
        default: {
            name: 'Basescan',
            url: 'https://basescan.org/',
        },
    },
    testnet: true,
};
const baseSepolia = {
    id: 84532,
    network: 'baseSepolia',
    name: 'Base Sepolia',
    nativeCurrency: {
        name: 'Base',
        symbol: 'ETH',
        decimals: 18,
    },
    rpcUrls: {
        default: {
            http: [
                'https://maximum-spring-daylight.base-sepolia.quiknode.pro/f80c89e1e8f03bdb4eea77aa68bf8546d8862cc5/',
            ],
        },
        public: {
            http: [
                'https://maximum-spring-daylight.base-sepolia.quiknode.pro/f80c89e1e8f03bdb4eea77aa68bf8546d8862cc5/',
            ],
        },
    },
    blockExplorers: {
        etherscan: {
            name: 'Basescan',
            url: 'https://sepolia.basescan.org/',
        },
        default: {
            name: 'Basescan',
            url: 'https://sepolia.basescan.org/',
        },
    },
    testnet: false,
};

const walletConfig = getDefaultConfig({
    appName: 'Metopia',
    projectId: 'e3ac52789e2343ee783380dcb4d9e4e5',
    chains: [mainnet, polygon, arbitrum, bsc, base, baseSepolia, artelaConfig],
    transports: {
        [mainnet.id]: http(),
        [polygon.id]: http(),
        [arbitrum.id]: http(),
        [bsc.id]: http(),
        [base.id]: http(),
        [baseSepolia.id]: http(),
        [11822]: http(),
    },
});

export default walletConfig