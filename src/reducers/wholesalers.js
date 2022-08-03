export default (wholesalers = [], action) => {
    switch (action.type) {
        case 'UPDATEWHOLESALER':
            return wholesalers.map((wholesaler) => wholesaler._id == action.payload._id ? action.payload : wholesaler)
        case 'GETWHOLESALER':
            return action.payload;
        case 'CREATEWHOLESALER':
            return [...wholesalers, action.payload];
        default:
            return wholesalers;
    }
};

