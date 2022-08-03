export default (warehouse = [], action) => {
    switch (action.type) {
        case 'DELETEITEM':
            return warehouse.filter((item) => item._id != action.payload)
        case 'UPDATEITEM':
            return warehouse.map((item) => item._id == action.payload._id ? action.payload : item)
        case 'FETCHITEMS':
            return action.payload;
        case 'CREATEITEM':
            return [...warehouse, action.payload];
        default:
            return warehouse;
    }
};

