import {
    ADD_FRIEND,
    DELETE_FRIEND,
    SEARCH_FRIEND,
    FAVORITE_FRIEND,
    NEXT_PAGE,
    PREVIOUS_PAGE,
} from './constants';

const step = 4;
const data = [
    {
        title: 'Mitul Shah',
        active: false,
    },
];

export const INITIAL_STATE = {
    page: {
        offset: 0,
        limit: step,
        total: data.length,
    },
    data,
};

export function reducer(state, action) {
    switch (action.type) {
        case ADD_FRIEND: {
            return {
                ...state,
                data: [
                    { title: action.value, active: false },
                    ...state.data,
                ].sort((a, b) => b.active - a.active),
            };
        }

        case DELETE_FRIEND: {
            const data = state.data.filter(
                (item) => action.item.title !== item.title
            );
            return {
                ...state,
                page: {
                    ...state.page,
                    offset: data.length - 1 === step ? 0 : state.page.offset,
                    limit: data.length - 1 === step ? step : state.page.limit,
                },
                data,
            };
        }

        case SEARCH_FRIEND: {
            return {
                ...state,
                page: {
                    ...state.page,
                    offset: 0,
                    limit: step,
                },
            };
        }

        case FAVORITE_FRIEND: {
            return {
                ...state,
                data: state.data
                    .map((item, _) =>
                        action.item.title === item.title
                            ? { ...item, active: !item.active }
                            : item
                    )
                    .sort((a, b) => b.active - a.active),
            };
        }

        case NEXT_PAGE: {
            return {
                ...state,
                page: {
                    ...state.page,
                    offset: state.page.offset + step,
                    limit: state.page.limit + step,
                },
            };
        }

        case PREVIOUS_PAGE: {
            return {
                ...state,
                page: {
                    ...state.page,
                    offset: state.page.offset - step,
                    limit: state.page.limit - step,
                },
            };
        }

        default:
            return state;
    }
}
