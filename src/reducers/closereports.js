export default (state = { callReports: [], opportunities: []  }, action) => {
    switch (action.type) {
        case 'GETREPORTS':
            return {
                ...state,
                callReports: action.payload.data
            };
        case 'GETOPPORTUNITIES':
            return {
                ...state,
                opportunities: action.payload.data
            }
        default:
            return state;
    }
};

