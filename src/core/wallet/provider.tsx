import walletConfig from '@/walletConfig';
import { useMemo } from 'react';
import { useAccount, useConnect, useDisconnect, usePublicClient } from 'wagmi';
import type { IWalletContext } from './context';
import { WalletContext } from './context';
import { useEthersSigner } from './utils';
interface Props {
    children?: React.ReactNode;
}
export default function WalletProvider(props: Props) {
    const { children } = props;
    const contextValue = useWalletContextValue();

    return <WalletContext.Provider value={contextValue}>{children}</WalletContext.Provider>;
}

function useWalletContextValue(): IWalletContext {
    const { address, isConnected, status } = useAccount();
    const { connect, connectAsync } = useConnect({ config: walletConfig });

    const provider = usePublicClient();
    const signer = useEthersSigner();

    const { chain } = useAccount();
    const chainId = useMemo(() => {
        return chain && '0x' + chain?.id.toString(16);
    }, [chain]);

    const { disconnect } = useDisconnect();

    return useMemo(
        () => ({
            address,
            isConnected,
            connectAsync,
            status,
            connect,
            disconnect,
            signer,
            provider,
            chainId,
        }),
        [
            address,
            isConnected,
            connect,
            disconnect,
            connectAsync,
            status,
            chainId,
            signer,
            provider,
        ],
    );
}
