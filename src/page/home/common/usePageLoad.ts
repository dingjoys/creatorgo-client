import { useState, useRef, useEffect, useCallback } from 'react';
import useScrollBottom from './useScrollBottom';

interface IPageConfig<T> {
    total: number;
    list: T[];
}

type ILoader<T> = (offset: number, size: number, params?) => Promise<IPageConfig<T>>;

interface IProps<T> {
    loader: ILoader<T>;
    pageSize?: number;
    params?: any;
}

export default function usePageLoad<T>(props: IProps<T>) {
    let { loader, pageSize = 10 } = props;

    const [update, setUpdate] = useState({});
    const loading = useRef(false);
    const total = useRef(1);
    const list = useRef([]);
    const [storeParams, setStoreParams] = useState({})

    const load = useCallback(async (params?) => {
        if (loading.current || list.current.length >= total.current) return;

        loading.current = true;
        setUpdate({});
        setStoreParams(params)

        try {
            let config = await loader(list.current.length, pageSize, params);
            loading.current = false;
            list.current = [...list.current, ...config.list];
            total.current = config.total;
            setUpdate({});
        } catch (error) {
            loading.current = false;
            setUpdate({});
            console.log(error);
        }
    }, [loader, pageSize])

    const scrollHandler = useCallback((offset, preOffset) => {
        if (offset < preOffset && offset < 500) {
            load(storeParams);
        }
    }, [load, storeParams])
    useScrollBottom(scrollHandler);

    const reload = async (params?) => {
        if (loading.current) {

        }
        total.current = 1;
        list.current = [];
        setUpdate({});
        setStoreParams(params)
        await load(params);
    };


    // async function load(params?) {
    //     if (loading.current || list.current.length >= total.current) return;

    //     loading.current = true;
    //     setUpdate({});
    //     setStoreParams(params)

    //     try {
    //         let config = await loader(list.current.length, pageSize, params);
    //         loading.current = false;
    //         list.current = [...list.current, ...config.list];
    //         total.current = config.total;
    //         setUpdate({});
    //     } catch (error) {
    //         loading.current = false;
    //         setUpdate({});
    //         console.log(error);
    //     }
    // }

    return {
        list: list.current,
        loading: loading.current,
        total,
        load,
        reload,
    };
}
