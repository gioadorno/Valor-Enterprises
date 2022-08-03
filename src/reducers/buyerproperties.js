import { START_BUYER_LOADING, END_BUYER_LOADING, DELETE_BUYER_LOADING, END_BUYER_DELETE } from "../constants/actionTypes";

export default (state = { isBuyerLoading: true, isBuyerDeleting: false, isCreating: false, buyerProps: [] }, action) => {
    switch (action.type) {
        case START_BUYER_LOADING:
            return {  ...state, isBuyerLoading: true };
        case END_BUYER_LOADING :
            return { ...state, isBuyerLoading: false };
        case DELETE_BUYER_LOADING:
            return {  ...state, isBuyerDeleting: true };
        case END_BUYER_DELETE :
            return { ...state, isBuyerDeleting: false };
        case 'BUYERPROPDELETE':
            return { ...state, buyerProps: state.buyerProps.filter((prop) => prop._id != action.payload) };
        case 'UPDATE':
            return { ...state, buyerProps: state.buyerProps.map((prop) => prop._id == action.payload._id ? action.payload : prop) };
        case 'BUYERPROPFETCH':
            return {
                ...state,
                buyerProps: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            };
        case 'BUYERPROPCREATE':
            return [...state, action.payload];
        default:
            return state;
    }
};
