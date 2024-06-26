import { chainExplorerMap, chainMap, chainRpcMap, currencyMap } from '@/global/constant';
import { Provider } from '@ethersproject/abstract-provider';
import { Signer } from '@ethersproject/abstract-signer';
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers';
import { ethers, utils } from 'ethers';
import useSWR from 'swr';
import { signTypedData as WagmiSignTypedData } from 'wagmi/actions';
import { defaultSWRConfig } from './restUtils';

export const addChain = (chainId, provider: Web3Provider) => {
    let _chainId = '0x' + parseInt(chainId).toString(16);
    return provider.send('wallet_addEthereumChain', [
        {
            chainId: _chainId,
            rpcUrls: [chainRpcMap[_chainId]],
            chainName: chainMap[_chainId],
            nativeCurrency: {
                name: currencyMap[_chainId],
                symbol: currencyMap[_chainId],
                decimals: 18,
            },
            blockExplorerUrls: [chainExplorerMap[_chainId]],
        },
    ]);
};

export const switchChain = (chain: string, provider: Web3Provider) => {
    let chainId = '0x' + (parseInt(chain) || 1).toString(16);
    return (
        provider &&
        provider.send('wallet_switchEthereumChain', [{ chainId }]).catch((e) => {
            if (e.code == 4902) {
                addChain(chainId, provider);
            }
            throw e;
        })
    );
};

export const hashWithPrefix = (msg) => {
    return utils.keccak256('\u0019Ethereum Signed Message:\n' + msg.length + msg);
};

export const signTypedData = async (message, types, domain, signer: Signer) => {
    let address = utils.getAddress(await signer.getAddress());
    message.from = address;
    if (!message.timestamp) message.timestamp = parseInt((Date.now() / 1e3).toFixed());

    const data: any = { domain, types, message };
    const sig = await (signer as JsonRpcSigner)._signTypedData(domain, data.types, message);
    return { address, sig, data };
};

export const signTypedDataFromWagmi = async (message, types, domain) => {
    // let address = utils.getAddress(await signer.getAddress());
    // message.from = address;
    // if (!message.timestamp) message.timestamp = parseInt((Date.now() / 1e3).toFixed());

    const data: any = { domain, types, message };
    const sig = await WagmiSignTypedData({ domain, types: data.types, value: message });
    return { address: message.from, sig, data };
};

export const getContract = (contractAddress, abi, providerOrSigner: Signer | Provider) => {
    return new ethers.Contract(contractAddress, abi, providerOrSigner);
};

export const rejectedByUser = (e) => {
    return (
        e &&
        (e.code == 4001 ||
            e.code == 'ACTION_REJECTED' ||
            e.code == '-32603' ||
            e == 'signature failed')
    );
};
export const fetchETHBalance = async (chainId, owner) => {
    const provider = new ethers.providers.JsonRpcProvider(chainRpcMap['0x' + chainId.toString(16)]);
    return await provider.getBalance(owner);
};

export const useETHBalance = (chainId: number, owner) => {
    return useSWR(owner ? [chainId, owner] : null, fetchETHBalance, defaultSWRConfig);
};


export const getProvider = (chain: any) => {
    chain = parseInt(chain)
    if (chain == 0x1) {
        return new ethers.providers.JsonRpcProvider(
            "https://polished-radial-needle.quiknode.pro/953d51b2526c41b87e54dcfd48c2d9abefb20556/"
        );
    } else if (chain == 0xa) {
        return new ethers.providers.JsonRpcProvider(
            "https://purple-stylish-crater.optimism.quiknode.pro/ff053f49c306ce7c13fb46abed93fa2edbd25043"
        );
    }
    if (chain == 0x89) {
        return new ethers.providers.JsonRpcProvider(
            "https://damp-ultra-cherry.matic.quiknode.pro/ea613c3695241939749b11ae7efede038aa50152/"
        );
    } else if (chain == 0x38) {
        return new ethers.providers.JsonRpcProvider(
            "https://polished-dawn-research.bsc.quiknode.pro/00e87ad609448ea0a3635f69bf98c695b938f9fb/"
        );
    } else if (chain == 0x61) {
        return new ethers.providers.JsonRpcProvider(
            "https://data-seed-prebsc-1-s1.binance.org:8545/"
        );
    } else if (chain == 0x2105) {
        return new ethers.providers.JsonRpcProvider(
            "https://lingering-virulent-dinghy.base-mainnet.quiknode.pro/057afecb0d9a981657fec3c0bf94f0bd5075b8fc/"
        );
    } else if (chain == 0xa4b1) {
        return new ethers.providers.JsonRpcProvider(
            "https://purple-wider-card.arbitrum-mainnet.quiknode.pro/9194c209a75d6fd67403bc33b1278dc407841a4f"
        );
    } else if (chain == 0x13881) {
        return new ethers.providers.JsonRpcProvider(
            "https://rpc.ankr.com/polygon_mumbai"
        );
    } else if (chain == 84532) {
        return new ethers.providers.JsonRpcProvider(
            "https://maximum-spring-daylight.base-sepolia.quiknode.pro/f80c89e1e8f03bdb4eea77aa68bf8546d8862cc5/"
        );
    } else if (chain == 168587773) {
        return new ethers.providers.JsonRpcProvider(
            "https://greatest-indulgent-lake.blast-sepolia.quiknode.pro/e920c9a69f366dfd52cd7e21a1ac52f85dfb1d23/"
        );
    } else if (chain == 0x13e31) {
        return new ethers.providers.JsonRpcProvider("https://distinguished-billowing-bridge.blast-mainnet.quiknode.pro/5d9a08fff8d9e2ef49af53e6bd2fb5aef072f376/")
    }else if (chain == 11822) {
        return new ethers.providers.JsonRpcProvider("https://betanet-rpc1.artela.network/")
    } else {
        throw "invalid chain"
    }
};
