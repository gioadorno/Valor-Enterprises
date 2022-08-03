import { FETCH_BY_SEARCH, START_LOADING, END_LOADING, DELETE_LOADING, END_DELETE, START_CREATING, END_CREATING, FETCH_PROPERTY, START_LOADING_PROP, END_LOADING_PROP, START_UPDATING, END_UPDATING } from "../constants/actionTypes";

export default (state = { isLoading: true, isDeleting: false, isLoadingProp: true, isCreating: false, isUpdating: false, props: [], prop: null }, action) => {
    switch (action.type) {
        case START_UPDATING:
            return { ...state, isUpdating: true };
        case END_UPDATING:
            return { ...state, isUpdating: false };
        case START_LOADING:
            return {  ...state, isLoading: true };
        case DELETE_LOADING:
            return { ...state, isDeleting: true };
        case END_LOADING:
            return { ...state, isLoading: false };
        case END_DELETE:
            return { ...state, isDeleting: false };
        case START_CREATING:
            return { ...state, isCreating: true };
        case END_CREATING:
            return { ...state, isCreating: false };
        case START_LOADING_PROP:
            return {  ...state, isLoadingProp: true };
        case END_LOADING_PROP:
            return { ...state, isLoadingProp: false }
        case 'DELETE':
            return { ...state, props: state.props.filter((prop) => prop._id != action.payload) };
        case 'UPDATE':
            return { ...state, props: state.props.map((prop) => prop._id == action.payload._id ? action.payload : prop) };
        case 'fetch':
            return {
                ...state,
                props: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            };
        case 'fetchall':
            return {
                ...state,
                props: action.payload,
            };
        case 'fetchactive':
            return {
                ...state,
                props: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            };
        case FETCH_BY_SEARCH:
            return {
                ...state,
                props: action.payload
            };
        case FETCH_PROPERTY:
            return {
                ...state,
                prop: action.payload
            };
        case 'create':
            return [...state, action.payload];
        default:
            return state;
    }
};

