import * as api from '../API';

export const getMarkers = () => async (dispatch) => { 
    try {
        const { data } = await api.getMarkers(); 
        
        dispatch({ type: 'GETMARKERS', payload: data });
    } catch (error) {
        console.log(error.message)
    }
};



export const createMarker = (marker) => async (dispatch) => {
    try {
        const { data } = await api.createMarker(marker);

        dispatch({ type: 'CREATEMARKER', payload: data })
    } catch (error) {
        console.log(error)
    }
};

export const updateMarker = (id, prop) => async (dispatch) => {
    try {
        const { data } = await api.updateMarker(id, prop);
        dispatch({ type: 'UPDATEMARKERS', payload: data })
    } catch (error) {
        console.log(error);
    }
};

export const deleteMarker = (id) => async (dispatch) => {
    try {
        await api.deleteMarker(id);

        dispatch({ type: 'DELETE', payload: id })
    } catch (error) {
        console.log(error);
    }
}
;