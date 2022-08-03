export default (address = '', action) => {
    switch (action.type) {
        case 'GETADDRESS':
            return action.payload;
        case 'CREATEADDRESS':
            return [...address, action.payload];
        default:
            return address;
    }
};

