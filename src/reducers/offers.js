export default (offers = [], action) => {
    switch (action.type) {
        case 'GETOFFERS':
            return action.payload;
        case 'CREATEOFFER':
            return [...offers, action.payload];
        case 'SENDSLACKOFFER':
            return [...offers, action.payload];
        default:
            return offers;
    }
};

