import { useEffect, useMemo, useState } from 'react';
import { localRouterUrl } from '@/core/hooks/useLocalRouter';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ReactComponent as IconArrow } from '@/component/icons/svg/arrow-right-short.svg';
import { ReactComponent as IconDisconnect } from '@/component/icons/svg/disconnect.svg';

import './index.scss';
import walletConfig from '@/walletConfig';
import { injected } from 'wagmi/connectors';
import { reconnect } from '@wagmi/core';
import { useDisconnect } from 'wagmi';
import useIsMobile from '@/core/useMobile';

const projectLogoMap = {
    'gas-hero': 'https://oss.metopia.xyz/imgs/hero/logo.png',
    artela: 'https://oss.metopia.xyz/imgs/metopia-logo-text.png',
    vote: 'https://oss.metopia.xyz/imgs/vote/Ethereum-Guatemala.png',
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
                                        </>
                                    ) : (
                                        <div
                                            onClick={openConnectModal}
                                            className="connect-wallet-button"
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
        </div>
    );
};

export { Menu };
