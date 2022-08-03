export default ( submittedProps = [], action ) => {
    switch (action.type) {
        case 'CREATESUBMITPROP':
            return [...submittedProps, action.payload];
        default:
            return submittedProps;
    }
}