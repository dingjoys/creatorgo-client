import { useNavigate } from 'react-router-dom';

interface IRoutParams {
    home: any;
    'gas-hero': any;
    vote: any;
    'vote.detail': { id: number };
}

const localUrls: Record<keyof IRoutParams, any> = {
    home: '/',
    'gas-hero': '/gas-hero',
    'vote.detail': '/vote/:id',
    vote: '/vote',
};

export default function useLocalRouter() {
    // useScrollToTop()
    const navigate = useNavigate();
    return function <T extends keyof IRoutParams>(url: T, args?: IRoutParams[T]) {
        let routeUrl = localUrls[url];
        if (args) {
            routeUrl = makeUrl(routeUrl, args);
        }

        navigate(routeUrl, { state: { prev: window.location.href } });
    };
}

export const Navigate = (url) => {
    const navigate = useNavigate();
    return navigate(url);
};

export const localRouterUrl = <T extends keyof IRoutParams>(
    url: T,
    args?: IRoutParams[T],
): string => {
    let routeUrl = localUrls[url];
    if (args) {
        routeUrl = makeUrl(routeUrl, args);
    }
    return routeUrl;
};

function makeUrl(routeUrl: string, data: Record<string, any> = {}) {
    let queryParams = {};
    Object.entries(data).forEach(([key, value]) => {
        if (routeUrl.indexOf(`:${key}`) > -1) {
            routeUrl = routeUrl.replace(`:${key}`, value);
        } else {
            queryParams[key] = value;
        }
    });
    let tmpIndex = routeUrl.indexOf(':');
    if (tmpIndex > -1) {
        routeUrl = routeUrl.substring(0, tmpIndex);
    }
    let queryArr = [] as string[];
    Object.keys(queryParams).forEach((name) => {
        let value = data[name];
        if (Array.isArray(value)) {
            value.forEach((e) => {
                queryArr.push(`${name}=${e}`);
            });
        } else {
            queryArr.push(`${name}=${value}`);
        }
    });

    return `${routeUrl}?${queryArr.join('&')}`;
}
