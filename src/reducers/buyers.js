export default (buyers = [], action) => {
    switch (action.type) {
        case 'UPDATEBUYER':
            return buyers.map((buyer) => buyer._id == action.payload._id ? action.payload : buyer)
        case 'GETBUYER':
            return action.payload;
        case 'create':
            return [...buyers, action.payload];
        default:
            return buyers;
    }
};

