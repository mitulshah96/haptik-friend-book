import './index.css';
import React, { useReducer, useState, useMemo } from 'react';
import {
    ADD_FRIEND,
    DELETE_FRIEND,
    SEARCH_FRIEND,
    FAVORITE_FRIEND,
    NEXT_PAGE,
    PREVIOUS_PAGE,
} from './constants';
import { INITIAL_STATE, reducer } from './reducer';
import Header from '../components/Header';
import AddFriend from '../components/AddFriend';
import ListView from '../components/ListView';
import Footer from '../components/Footer';

function FriendBook() {
    const [query, setQuery] = useState('');
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    function onAddFriend(value) {
        dispatch({ type: ADD_FRIEND, value });
    }

    function onDeleteFriend(item, index) {
        dispatch({ type: DELETE_FRIEND, item, index });
    }

    function onFavoriteFriend(item, index) {
        dispatch({ type: FAVORITE_FRIEND, item, index });
    }

    function onSearch(query) {
        setQuery(query);
        dispatch({ type: SEARCH_FRIEND, query });
    }

    function onPreviousPage() {
        dispatch({ type: PREVIOUS_PAGE });
    }

    function onNextPage() {
        dispatch({ type: NEXT_PAGE });
    }

    const items = useMemo(
        () =>
            state.data.filter((item) =>
                item.title.toLowerCase().includes(query.toLowerCase())
            ),
        [query, state.data]
    );

    const slicedItems = useMemo(
        () => items.slice(state.page.offset, state.page.limit),
        [items, state.page]
    );

    return (
        <>
            <Header onChange={onSearch} />
            <AddFriend
                placeholder="Enter your Friend's Name"
                onSubmit={onAddFriend}
            />
            <ListView
                data={slicedItems}
                onDelete={onDeleteFriend}
                onFavorite={onFavoriteFriend}
            />
            <Footer
                page={{ ...state.page, total: items.length }}
                onNextPage={onNextPage}
                onPreviousPage={onPreviousPage}
            />
        </>
    );
}

export default FriendBook;
