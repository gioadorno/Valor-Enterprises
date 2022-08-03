export default (marker = [], action) => {
    switch (action.type) {
        case 'DELETEMARKER':
            return marker.filter((markers) => markers._id != action.payload)
        case 'UPDATEMARKERS':
            return marker.map((propMarker) => propMarker._id == action.payload._id ? action.payload : propMarker)
        case 'GETMARKERS':
            return action.payload;
        case 'CREATEMARKER':
            return [...marker, action.payload]
        default:
            return marker;
    }
};

