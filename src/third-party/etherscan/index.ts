import { compareIgnoringCase } from '@/utils/stringUtils';

export const fetchAbi = async (network, address) => {
    if (parseInt(localStorage.getItem('etherscan') || '0') + 5000 > new Date().getTime()) {
        await sleep(6000);
    }
    localStorage.setItem('etherscan', new Date().getTime().toString());
    let link = 'https://api.etherscan.io/api';
    if (parseInt(network) == 0x38) {
        link = 'https://api.bscscan.com/api';
    } else if (parseInt(network) == 0x61) {
        link = 'https://api-testnet.bscscan.com/api';
    } else if (parseInt(network) == 1) {
        link = 'https://api.etherscan.io/api';
    } else if (parseInt(network) == 0xa4b1) {
        link = 'https://api.arbiscan.io/api';
    } else if (parseInt(network) == 0x2105) {
        link = 'https://api.basescan.org/api';
    }
    let apikey =
        parseInt(network) == 1
            ? process.env.REACT_APP_ETHERSCAN_API_TOKEN
            : parseInt(network) == 0xa4b1
            ? process.env.REACT_APP_ARBITRUM_API_TOKEN
            : process.env.REACT_APP_BSCSCAN_API_TOKEN;
    if (network == 0x2105) {
        apikey = process.env.REACT_APP_BASE_API_TOKEN;
    }
    return await fetch(
        `${link}?module=contract&action=getsourcecode&address=${address}&apikey=${apikey}`,
    )
        .then((r) => r.json())
        .then(async (r) => {
            if (r?.result[0]) {
                if (r.result[0].Proxy == '1') {
                    if (
                        parseInt(localStorage.getItem('etherscan') || '0') + 5000 >
                        new Date().getTime()
                    ) {
                        await sleep(6000);
                    }
                    localStorage.setItem('etherscan', new Date().getTime().toString());

                    if (compareIgnoringCase(r.result[0].Implementation, address)) {
                        return JSON.parse(r.result[0].ABI);
                    } else {
                        return await fetchAbi(network, r.result[0].Implementation);
                    }
                } else {
                    if (r.result[0].ABI == 'Contract source code not verified') {
                        return null;
                    } else return JSON.parse(r.result[0].ABI);
                }
            } else {
                return null;
            }
        });
};

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
