import { useEffect, useState, useRef } from 'react';
import { throttle } from 'lodash';

export default function useScrollBottom(handler: (offset: number, preOffset: number) => void) {
    useEffect(() => {
        let preOffset = 0;
        let offset = 0;
        const handleScroll = throttle(() => {
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
            let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;

            preOffset = offset;
            offset = scrollHeight - (scrollTop + windowHeight);

            handler(offset, preOffset);
        }, 200);
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handler]);
}
