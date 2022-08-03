export default (photos = [], action) => {
    switch (action.type) {
        case 'GETPHOTOS':
            return action.payload;
        case 'CREATEPHOTOS':
            return [...photos, action.payload];
        case 'GETPROPPHOTOS':
            return photos.map((photo) => photo._id == action.payload._id ? action.payload : photo)
        default:
            return photos;
    }
};