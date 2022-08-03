

export default (state = {employees: []}, action) => {
    switch (action.type) {
        case 'UPDATEEMPLOYEES':
            return { ...state, employees: state.employees.map((employee) => employee._id == action.payload._id ? action.payload : employee) };
        case 'GETALLEMPLOYEES':
            return {
                ...state,
                employees: action.payload
            };
        case 'GETEMPLOYEES':
            return {
                ...state,
                employees: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages
            };
            case 'SEARCH':
                return {
                    ...state,
                    props: action.payload
                };
        case 'create':
            return [...state, action.payload];
        case 'DELETEUSER':
            return { ...state, employees: state.employees.filter((employee) => employee._id != action.payload ) }
        default:
            return state;
    }
};


