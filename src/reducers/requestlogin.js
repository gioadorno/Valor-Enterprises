export default (requestlogin = [], action) => {
    switch (action.type) {
        case 'CREATEREQUESTACCOUNT':
            return [...requestlogin, action.payload];
        default:
            return requestlogin;
    }
};

