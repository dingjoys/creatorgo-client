
import walletConfig from '@/walletConfig'
import { type Config, getClient, getConnectorClient } from '@wagmi/core'
import { providers, Signer } from 'ethers'
import { useEffect, useState } from 'react'
import type { PublicClient, Transport, WalletClient } from 'viem'
import { useWalletClient } from 'wagmi'

export function clientToProvider(client: PublicClient) {
    const { chain, transport } = client
    const network = {
        chainId: chain.id,
        name: chain.name,
        ensAddress: chain.contracts?.ensRegistry?.address,
    } as any
    if (transport.type === 'fallback')
        return new providers.FallbackProvider(
            (transport.transports as ReturnType<Transport>[]).map(
                ({ value }) => new providers.JsonRpcProvider(value?.url, network),
            ),
        )
    return new providers.JsonRpcProvider(transport.url, network)
}

/** Action to convert a viem Public Client to an ethers.js Provider. */
export function getEthersProvider(
    config: Config,
    { chainId }: { chainId?: number } = {},
) {
    const client = getClient(config, { chainId })
    return clientToProvider(client)
}


export function clientToSigner(client: WalletClient) {
    if (!client) return {} as Signer
    const { account, chain, transport } = client || {}
    const network = {
        chainId: chain?.id,
        name: chain?.name,
        ensAddress: chain?.contracts?.ensRegistry?.address,
    }
    // @ts-ignore
    const provider = new providers.Web3Provider(transport, network)
    const signer = provider.getSigner(account?.address)
    return signer
}

/** Action to convert a Viem Client to an ethers.js Signer. */
export async function getEthersSigner(
    config: Config,
    { chainId }: { chainId?: number } = {},
) {
    const client = await getConnectorClient(config, { chainId })
    return clientToSigner(client)
}

export function useEthersSigner({ chainId }: { chainId?: number | undefined } = {}) {
    const { data: { account, chain } = {} } = useWalletClient<Config>();
    const [signer, setSigner] = useState(null)


    useEffect(() => {
        const fetchData = async () => {
            try {
                const signer = await getEthersSigner(walletConfig, { chainId });
                console.log(signer)
                setSigner(signer);
            } catch (error) {
                console.error('Error fetching ethers signer:', error);
            }
        };
        if (account) {
            fetchData();
        }
    }, [account, chain]);

    return signer
}
