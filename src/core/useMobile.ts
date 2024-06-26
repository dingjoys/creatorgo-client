import { useLayoutEffect, useState } from 'react';
import debounce from 'lodash/debounce';

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isPad, setIsPad] = useState(false);
    useLayoutEffect(() => {
        const updateSize = (): void => {
            const smallbreakpoint = window.matchMedia('(max-width: 1024px)');
            const middlebreakpoint = window.matchMedia('(max-width: 1336px)');
            setIsMobile(!!smallbreakpoint.matches);
            setIsPad(!!middlebreakpoint.matches);
        };
        window.addEventListener('resize', debounce(updateSize, 200));
        updateSize();
        return (): void => window.removeEventListener('resize', updateSize);
    }, []);

    return {
        isMobile,
        isPad
    };
};

export default useIsMobile;