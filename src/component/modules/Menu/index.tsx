import { useEffect, useMemo, useState } from 'react';
import { localRouterUrl } from '@/core/hooks/useLocalRouter';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ReactComponent as IconArrow } from '@/component/icons/svg/arrow-right-short.svg';
import { ReactComponent as IconDisconnect } from '@/component/icons/svg/disconnect.svg';

import './index.scss';
import walletConfig from '@/walletConfig';
import { injected } from 'wagmi/connectors';
import { reconnect } from '@wagmi/core';
import { useAccount, useDisconnect } from 'wagmi';
import useIsMobile from '@/core/useMobile';
import MintModal from '@/component/modals/MintModal';
import axios from 'axios';
import useSWR from 'swr';

const projectLogoMap = {
    'gas-hero': 'https://oss.metopia.xyz/imgs/hero/logo.png',
    artela: 'https://oss.metopia.xyz/imgs/metopia-logo-text.png',
    vote: 'https://oss.metopia.xyz/imgs/vote/Ethereum-Guatemala.png',
};

export const fetchMyAttestion = (owner) => {
    return axios
        .post('https://base-sepolia.easscan.org/graphql', {
            query: 'query ExampleQuery($where: AttestationWhereInput) { attestations(  where: $where) { id expirationTime data decodedDataJson recipient} }',
            variables: {
                where: { attester: { equals: '0x3cbAee4F65B64082FD3a5B0D78638Ee11A29A31A' } },
            },
        })
        .then((d) => d.data.data?.attestations);
};

const Menu = ({ project }) => {
    const { disconnect } = useDisconnect();
    useEffect(() => {
        const needReConnected = window.localStorage.getItem('isConnected');
        if (needReConnected) {
            reconnect(walletConfig, { connectors: [injected()] })
                .then((re) => {
                    console.log(re);
                })
                .catch((e) => console.log('e', e));
        }
    }, []);
    const projectLogo = useMemo(() => {
        return projectLogoMap[project] || 'https://oss.metopia.xyz/imgs/metopia-logo-text.png';
    }, [project]);
    const [score, setScore] = useState(undefined);
    const [isShowModal, setShowModal] = useState(false);

    const { address } = useAccount();
    const { data: myAttestation } = useSWR(
        address ? [address, 'fetchMyAttestion'] : null,
        fetchMyAttestion,
        {
            refreshInterval: 0,
            refreshWhenHidden: false,
        },
    );
    useEffect(() => {
        if (myAttestation?.length) {
            setScore(parseInt(BigInt(myAttestation[0].data).toString()));
        }
    }, [myAttestation]);
    return (
        <div className={`menu-container`}>
            <div className="wrapper">
                <div className="menu-bar">
                    <div className="container">
                        <img
                            src={'https://oss.metopia.xyz/imgs/creatorgo/logo.png'}
                            style={{
                                height: '24px',
                            }}
                            alt=""
                            onClick={() => {
                                window.open(localRouterUrl('home'));
                            }}
                        />
                        <div className="account-info-container">
                            <ConnectButton.Custom>
                                {({ account, openConnectModal }) =>
                                    account ? (
                                        <>
                                            <div className="connect-wallet-button">
                                                <IconArrow></IconArrow>
                                                {account.ensName || account.displayName}

                                                <div className="drop-down">
                                                    <div
                                                        className="drop-down-content"
                                                        onClick={() => disconnect()}
                                                    >
                                                        <IconDisconnect />
                                                        Disconnect
                                                    </div>
                                                </div>
                                            </div>
                                            {score != undefined ? (
                                                <div
                                                    className="menu-attest-value"
                                                    onClick={() => {
                                                        window.open(
                                                            `https://base-sepolia.easscan.org/attestation/view/${myAttestation[0].id}`,
                                                        );
                                                    }}
                                                >
                                                    <span className="menu-attest-line"></span>
                                                    {score}
                                                </div>
                                            ) : (
                                                <div
                                                    className="menu-attest-btn"
                                                    onClick={() => setShowModal(true)}
                                                >
                                                    Attest
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <div
                                            onClick={openConnectModal}
                                            className="connect-wallet-button"
                                            id="connect-wallet-button"
                                        >
                                            <IconArrow></IconArrow>
                                            Connect Account
                                        </div>
                                    )
                                }
                            </ConnectButton.Custom>
                        </div>
                    </div>
                </div>
            </div>
            <MintModal isShow={isShowModal} hide={() => setShowModal(false)} />
        </div>
    );
};

export { Menu };
