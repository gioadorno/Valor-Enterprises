export default (events = [], action) => {
    switch (action.type) {
        case 'GETEVENTS':
            return action.payload;
        case 'CREATEEVENT':
            return [...events, action.payload];
        default:
            return events;
    }
};