import axios from 'axios';

export async function getProfile(owner: string) {
    try {
        const res = await axios.get(
            `/zora-api/trpc/profile.getProfile?input=${encodeURIComponent(`{"json":"${owner}"}`)}`,
        );
        if (res.data?.result?.data) {
            const userInfo = res.data?.result?.data?.json;
            return {
                username: userInfo?.displayName,
                userAvatar: userInfo?.avatarUri,
                description: userInfo?.description,
                socialAccounts: userInfo?.socialAccounts as {
                    twitter: string | null;
                    farcaster: string | null;
                },
            };
        }
        return null;
    } catch (e) {
        return null;
    }
}
