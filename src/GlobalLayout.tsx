import { CookiesProvider } from 'react-cookie';

import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-tooltip/dist/react-tooltip.css';

import { BaseModalProvider } from './component/modals/BaseModal';
import AlertModal from './component/modals/AlertModal';
import LoadingModal from './component/modals/LoadingModal';
import store from './global/redux';
import './index.scss';
import './svgstyle.css';

import '@rainbow-me/rainbowkit/styles.css';

import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'swiper/swiper-bundle.css';
import WalletProvider from './core/wallet/provider';
import { WagmiProvider } from 'wagmi';
import config from './walletConfig';
import { FavoriteProvider } from './core/hooks/useFavoriteMap';
const queryClient = new QueryClient();

const GlobalLayout = ({ children }) => {
    return (
        <Provider store={store}>
            <div className="root">
                <WagmiProvider config={config}>
                    <QueryClientProvider client={queryClient}>
                        <RainbowKitProvider>
                            <WalletProvider>
                                {/* <Web3OnboardProvider web3Onboard={web3Onboard}> */}
                                <CookiesProvider>
                                    {/* <BaseModal /> */}

                                    <BaseModalProvider>
                                        <FavoriteProvider>{children}</FavoriteProvider>
                                    </BaseModalProvider>
                                    <LoadingModal />
                                    <AlertModal />
                                    <ToastContainer
                                        position="top-right"
                                        autoClose={5000}
                                        hideProgressBar={false}
                                        newestOnTop={false}
                                        closeOnClick
                                        rtl={false}
                                        pauseOnFocusLoss
                                        draggable
                                        pauseOnHover
                                        theme="colored"
                                    />
                                </CookiesProvider>
                                {/* </Web3OnboardProvider> */}
                            </WalletProvider>
                        </RainbowKitProvider>
                    </QueryClientProvider>
                </WagmiProvider>
            </div>
        </Provider>
    );
};

export default GlobalLayout;
