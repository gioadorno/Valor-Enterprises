export default (dispoEmployees = [], action) => {
    switch (action.type) {
        case 'UPDATEDISPOEMPLOYEES':
            return dispoEmployees.map((employee) => employee._id == action.payload._id ? action.payload : employee)
        case 'GETDISPOEMPLOYEES':
            return action.payload;
        case 'CREATEDISPOEMPLOYEES':
            return [...dispoEmployees, action.payload];
        default:
            return dispoEmployees;
    }
};

