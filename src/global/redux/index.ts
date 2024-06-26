import { CSSProperties, ReactNode } from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Achievement, BadgeCollection } from '../type/badgeTypes';
import { formSlice } from './formSlice';
import { modalController } from './modalControllerSlice';
import userReducer from './userSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        modalController: modalController.reducer,
        form: formSlice.reducer,
    },
});

// export const useWallet = (): {
//     wallet: Wallet,
//     chainId: string,
//     account: string,
//     setWallet: { (Wallet): any },
//     setAccount: { (string): any },
//     setChainId: { (string): any },
//     disconnect: { (): any },
//     requestWallet: { (boolean?: any): any }
// } => {

//     const chainChangedHander = useRef(null)
//     const accountsChangedHander = useRef(null)
//     const [cookies, setCookies] = useCookies(["account"])
//     const dispatch = useDispatch()

//     useEffect(() => {
//         if (!wallet) {
//             connect({ autoSelect: { label: 'MetaMask', disableModals: true } })
//         } else {
//             dispatch(setAccount(wallet.accounts[0].address))
//             dispatch(setChainId(wallet.chains[0].id))
//             chainChangedHander.current = (chainId) => {
//                 dispatch(setChainId(chainId))
//             }
//             accountsChangedHander.current = (account) => {
//                 if (account[0]) {
//                     dispatch(setAccount(account[0]))
//                     setCookies("account", account[0], { path: '/' })
//                 }
//             }
//             wallet.provider.on('chainChanged', chainChangedHander.current)
//             wallet.provider.on('accountsChanged', accountsChangedHander.current)
//         }

//         return () => {
//             if (wallet) {
//                 wallet.provider.removeListener('chainChanged', chainChangedHander.current);
//                 wallet.provider.removeListener('accountsChanged', accountsChangedHander.current);
//             }
//         }
//     }, [wallet])

//     const requestWallet = async (force?: boolean) => {
//         connect()
//     }

//     const user = useSelector((state: RootState) => {
//         return state.user
//     })

//     return {
//         wallet: user,
//         chainId: user.chainId,
//         account: user.account,
//         setWallet: (wallet: Wallet) => dispatch(setWallet(wallet)),
//         setChainId: (chainId: string) => dispatch(setChainId(chainId)),
//         setAccount: (account: string) => dispatch(setAccount(account)),
//         disconnect: () => {
//             setCookies("account", null, { path: '/' })
//             if (window.location.href.indexOf("space/create") > -1 ||
//                 window.location.href.indexOf("settings/proposal") > -1
//             ) {
//                 disconnect(wallet)
//                 dispatch(setWallet({ account: null, chainId: null }))
//                 window.location.href = localRouter('home')
//             } else {
//                 disconnect(wallet)
//                 dispatch(setWallet({ account: null, chainId: null }))
//             }
//         },
//         requestWallet
//     }
// }

declare type Wallet = {
    account?: string;
    chainId?: string;
};

declare type RootState = {
    user: Wallet;
    modalController: {
        loginModal: { isShow: boolean; stepRequired: number };
        userProfileEditorModal: { isShow: boolean; user: any };
        loadingModal: { isShow: boolean; tip?: string };
        alertModal: { isShow: boolean; title: string; body: string; warning: boolean, cb?: () => void };
        profileCompleteModal: { isShow: boolean; state?: number };
        congratsModal: { isShow: boolean; introduction: string; image: string };
        confirmModal: { isShow: boolean; title: string; body: string | ReactNode; onCancel; onConfirm, portalClassName: string, style: { content?: CSSProperties, overlay?: CSSProperties } };
        badgeSynchronizeModal: { isShow: boolean };
        badgeCreationModal: { isShow: boolean; data: BadgeCollection };
        joinLuckyDrawModal: { isShow: boolean; amount: number };
        joinLatestLuckyDrawModal: { isShow: boolean; raffleId: number; requirement: number };
        claimAchievementModal: { isShow: boolean; badgeId: boolean; data: Achievement };
        achievementRedeemModal: { isShow: boolean; badge: BadgeCollection; achievement: Achievement };
        promptModal: {
            isShow: boolean;
            value: string;
            placeholder: string;
            title: string;
            content: any;
            callback;
        };
    };
    form: any;
};

export { type RootState };
export type AppDispatch = typeof store.dispatch;
export default store;
