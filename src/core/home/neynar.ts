import axios from 'axios';
const apiKey = process.env.REACT_APP_NEYNAR_API_KEY || '';
const neynarRequest = axios.create({
    baseURL: 'https://api.neynar.com/v2/farcaster',
    headers: {
        api_key: apiKey,
        'Content-Type': 'application/json',
    },
});

export function getFarcasterByAddresses(addresses: string[]) {
    if (!addresses.length) return { data: {} };
    const url = '/user/bulk-by-address';
    return neynarRequest.get(url, {
        params: {
            addresses: addresses.join(','),
            address_types: 'verified_address',
        },
    });
}
