export default (AllProperties = [], action) => {
    switch (action.type) {
        case 'GETALLPROPERTIES':
            return action.payload;
        default:
            return AllProperties;
    }
};