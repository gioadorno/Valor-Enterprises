export default (announcements = [], action) => {
    switch (action.type) {
        case 'GETANNOUNCEMENTS':
            return action.payload;
        case 'CREATEANNOUNCEMENT':
            return [...announcements, action.payload];
        default:
            return announcements;
    }
};

