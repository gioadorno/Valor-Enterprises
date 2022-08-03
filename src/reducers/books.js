export default (books = [], action) => {
    switch (action.type) {
        case 'GETBOOKS':
            return action.payload;
        case 'CREATEBOOK':
            return [...books, action.payload];
        default:
            return books;
    }
};

// export default (state = [], action) => {
//     switch (action.type) {
//         case 'GETBOOKS':
//             return {
//                 ...state,
//                 books : action.payload.data,
//                 currentPage: action.payload.currentPage,
//                 numbeOfPages: action.payload.numbeOfPages
//             };
//         case 'CREATEBOOK':
//             return [...state, action.payload];
//         default:
//             return state;
//     }
// };

