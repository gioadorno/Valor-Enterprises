export default (files = [], action) => {
    switch (action.type) {
        case 'CREATEFILE':
            return [...files, action.payload];
        case 'GETFILES':
            return action.payload;
        case 'DELETEFILE':
            files.filter((file) => file._id != action.payload);
        default:
            return files;
    }
}