import { fetchSigner } from '@wagmi/core';
import { useNetwork, useSwitchNetwork } from 'wagmi';
import { useEthersSigner } from '../wallet/utils';
export default function useCheckNetwork() {
    const signer = useEthersSigner();
    const { switchNetworkAsync } = useSwitchNetwork();
    const { chain: { id } } = useNetwork()

    async function checkNetwork(targetNetwork) {
        if (id != parseInt(targetNetwork)) {
            const flag = await switchNetworkAsync(parseInt(targetNetwork))
                .then(async () => {
                    signer = await fetchSigner({ chainId: parseInt(targetNetwork) });

                    return {
                        signer,
                        isPass: true
                    };
                })
                .catch((e) => {
                    return {
                        isPass: false
                    }
                });
            return {
                signer,
                isPass: flag
            };
        }
        return {
            signer,
            isPass: true
        };;
    }

    return {
        signer,
        checkNetwork,
    };
}
