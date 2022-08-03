export default ( payouts = [], action ) => {
    switch (action.type) {
        case 'GETPAYOUTS':
            return action.payload;
        case 'CREATEPAYOUT':
            return [...payouts, action.payload];
        case 'DELETEPAYOUT':
            return payouts.filter((payout) => payout._id != action.payload);
        default:
            return payouts;
    }
};