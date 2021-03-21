// eslint-disable-next-line
import React, { useEffect, useState } from 'react';

export default function useDebounce(value, delay) {
    const [deferredValue, setDeferredValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDeferredValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
        //eslint-disable-next-line
    }, [value]);

    return deferredValue;
}
