import { createContext } from 'react';
import { useAccount, usePublicClient, UseConnectReturnType, UseDisconnectReturnType, UseWalletClientReturnType } from 'wagmi';
type WalletProps = Pick<ReturnType<typeof useAccount>, 'address' | 'status'>;
type Connect = UseConnectReturnType['connect'];
type Disconnect = UseDisconnectReturnType['disconnect'];
type Signer = UseWalletClientReturnType['data'];
type Provider = ReturnType<typeof usePublicClient>;

export interface IWalletContext extends WalletProps {
    isConnected: boolean;
    connect: Connect;
    connectAsync: UseConnectReturnType['connectAsync']
    disconnect: Disconnect;
    signer: Signer,
    provider: Provider,
    chainId: string
}

export const WalletContext = createContext<IWalletContext | null>(null);
