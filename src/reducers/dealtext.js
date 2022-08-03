export default (dealtext = [], action) => {
    switch (action.type) {
        case 'CREATEDEALTEXT':
            return [...dealtext, action.payload];
        default:
            return dealtext;
    }
};

