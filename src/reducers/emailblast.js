export default (email = [], action) => {
    switch (action.type) {
        case 'CREATEEMAIL':
            return [...email, action.payload];
        default:
            return email;
    }
};