export default (tickets = [], action) => {
    switch (action.type) {
        case 'GETTICKETS':
            return action.payload;
        case 'CREATETICKET':
            return [...tickets, action.payload];
        default:
            return tickets;
    }
};

