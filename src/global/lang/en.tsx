import { capitalizeFirstLetter } from '@/utils/stringUtils';
import { Moment } from 'moment';

/**
 * <page|module>.<label|button|submodule>.<name>
 */
const GlobalMsg = {
    emptyDataHint: {
        default: 'There is no data',
        credential: 'There are no credential available',
        collectionUnissued:
            'You are required to issue the collection before creating the credential',
        owner: 'There are no owners',
        badgeOfOwner: 'The user has not collected any badges',
        credentialOfOwner: 'The user has not collected any credentials',
        pointsOfOwner: 'The user has not collected any points',
    },
    toast: {
        credential: {
            verified: ['You are verified'],
            refreshed: ['Your data has been updated'],
            redeemed: ['You have redeemed your points'],
            updatedOnChain: ['You have updated your credential'],
            claimedOnChain: ['You have claimed your credential'],
        },
    },
    toastError: { failed: ['Failed'], _failed: (t) => ['Failed', t] },
    share: {
        _achievement: (achievementName, issuer) =>
            `I'm claiming the credential issued by ${issuer}. @Metopia_xyz is helping all communities to issue credential based badges!`,
        _badge: (badgeName, issuer) =>
            `I'm claiming the badge issued by ${issuer}, @Metopia_xyz is helping all communities to issue credential based badges!`,
    },
    hint: {
        dataSync: 'Data sync every 24 hours',
    },
};

const calcKeys = (obj): string[] => {
    let result = [];
    Object.keys(obj).forEach((key) => {
        let tmp = obj[key];
        if (typeof tmp == 'string') {
            result.push(key);
        } else {
            result = result.concat(calcKeys(tmp).map((t) => `${key}.${t}`));
        }
    });
    return result;
};

const MsgKeys = calcKeys(GlobalMsg);

const _globalMsg = (key): any => {
    if (!key) return '';
    let indexs = key.split('.');
    let result = GlobalMsg;
    for (let index of indexs) {
        result = result[index];
    }
    return result;
};

export default GlobalMsg;
/** no-use type define */
// function GlobalMsg<T extends (typeof MsgKeys)[number]>(props: { id: T; value?: any }) {
//     const { id, value } = props;
//     if (id.indexOf('_') == -1) {
//         return <>{_globalMsg(props.id)}</>;
//     } else {
//         return <>{_globalMsg(id)(value)}</>;
//     }
// }

// export default GlobalMsg;
