import React, { useEffect, useState } from 'react';
import useDebounce from '../hooks/useDebounce';

function Header(props) {
    const [query, setQuery] = useState('');
    const debouncedQuery = useDebounce(query, 500);

    useEffect(() => {
        props.onChange(debouncedQuery);
        // eslint-disable-next-line
    }, [debouncedQuery]);

    return (
        <div className="header">
            <p className="header-title">Friends List</p>
            <div>
                <input
                    type="search"
                    placeholder="Search"
                    onChange={(e) => setQuery(e.target.value.trim())}
                />
            </div>
        </div>
    );
}
export default Header;
