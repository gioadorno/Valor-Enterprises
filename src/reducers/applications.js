export default (applications = [], action) => {
    switch (action.type) {
        case 'DELETEAPPLICATION':
            return applications.filter((application) => application._id != action.payload);
        case 'UPDATEAPPLICATION':
            return applications.map((application) => application._id == action.payload._id ? action.payload : application)
        case 'GETAPPLICATIONS':
            return action.payload;
        case 'CREATEAPPLICATION':
            return [...applications, action.payload];
        default:
            return applications;
    }
};

