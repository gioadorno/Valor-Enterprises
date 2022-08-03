export default (referrals = [], action) => {
    switch (action.type) {
        case 'DELETEREFERRAL':
            return referrals.filter((referral) => referral._id != action.payload)
        case 'UPDATE':
            return referrals.map((referral) => referral._id == action.payload._id ? action.payload : referral)
        case 'GETREFERRALS':
            return action.payload;
        case 'CREATEREFERRAL':
            return [...referrals, action.payload];
        default:
            return referrals;
    }
};

