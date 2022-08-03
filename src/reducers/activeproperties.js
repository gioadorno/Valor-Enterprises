import { ACTIVE_PROPERTIES_LOADING, END_ACTIVE_LOADING, FETCH_BY_MARKETS, FETCH_ACTIVE_PROPERTY } from "../constants/actionTypes";

export default (state = { activePropertiesLoading: true, activeProps: [] }, action) => {
    switch (action.type) {
        case ACTIVE_PROPERTIES_LOADING:
            return {  ...state, activePropertiesLoading: true };
        case END_ACTIVE_LOADING:
            return { ...state, activePropertiesLoading: false };
        case 'fetchactive':
            return {
                ...state,
                activeProps: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            };
        case FETCH_BY_MARKETS:
            return {
                ...state,
                activeProps: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages
            };
        case FETCH_ACTIVE_PROPERTY:
            return {
                ...state,
                prop: action.payload
            };
        default:
            return state;
    }
};

