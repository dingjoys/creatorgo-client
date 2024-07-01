import { useState } from 'react';

export const useScrollBar = (wrapperId, scrollbarId) => {
    const [canPrev, setCanPrev] = useState(false);
    const [canNext, setCanNext] = useState(true);

    function scrollBar(type) {
        let offset = 0;
        const warpper = document.getElementById(wrapperId);
        const scrollbar = document.getElementById(scrollbarId);
        const warpperWidth = warpper.getBoundingClientRect().width;
        const scrollbarWidth = scrollbar.getBoundingClientRect().width;
        if (scrollbarWidth <= warpperWidth) return;
        const currentOffset = Number(scrollbar.getAttribute('data-offset') || 0);
        if (type == 'prev') {
            const canScrollOffset =
                Math.abs(currentOffset) > warpperWidth ? warpperWidth : Math.abs(currentOffset);

            setCanNext(true);
            offset = Math.min(currentOffset + canScrollOffset + 23, 0);
            setCanPrev(offset < 0);
        } else {
            const maxPrevOffset = scrollbarWidth - warpperWidth;
            const canScrollOffset = getCanScrollOffset(currentOffset, maxPrevOffset, warpperWidth);

            setCanPrev(true);
            offset = Math.max(currentOffset - canScrollOffset - 23, 0 - maxPrevOffset);
            const nextScrollOffset = getCanScrollOffset(offset, maxPrevOffset, warpperWidth);
            setCanNext(nextScrollOffset > 0);
        }
        scrollBarTo(offset);
    }

    function getCanScrollOffset(currentOffset, maxPrevOffset, warpperWidth) {
        return maxPrevOffset - Math.abs(currentOffset) > warpperWidth
            ? warpperWidth
            : maxPrevOffset - Math.abs(currentOffset);
    }

    function scrollBarTo(offset = 0) {
        const line = document.getElementById(scrollbarId);
        if (line) {
            line.setAttribute('data-offset', `${offset}`);
            line.style.transform = `translateX(${offset}px)`;
        }
    }

    return {
        canPrev,
        canNext,
        scrollBar,
    };
};
