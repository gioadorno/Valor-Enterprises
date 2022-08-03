import { FETCH_BY_SEARCH, START_LOADING, END_LOADING, DELETE_LOADING, END_DELETE, START_CREATING, END_CREATING, START_DISPO_LOADING, END_DISPO_LOADING } from "../constants/actionTypes";

export default (state = { isDispoLoading: true, isDeleting: false, isCreating: false, dispoProps: [] }, action) => {
    switch (action.type) {
        case START_DISPO_LOADING:
            return {  ...state, isDispoLoading: true };
        case DELETE_LOADING:
            return { ...state, isDeleting: true };
        case END_DISPO_LOADING :
            return { ...state, isDispoLoading: false };
        case END_DELETE:
            return { ...state, isDeleting: false };
        case START_CREATING:
            return { ...state, isCreating: true };
        case END_CREATING:
            return { ...state, isCreating: false };
        case 'DISPODELETE':
            return { ...state, dispoProps: state.dispoProps.filter((prop) => prop._id != action.payload) };
        case 'UPDATE':
            return { ...state, dispoProps: state.dispoProps.map((prop) => prop._id == action.payload._id ? action.payload : prop) };
        case 'DISPOFETCH':
            return {
                ...state,
                dispoProps: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            };
        case FETCH_BY_SEARCH:
            return {
                ...state,
                dispoProps: action.payload
            };
        case 'DISPOCREATE':
            return [...state, action.payload];
        default:
            return state;
    }
};
