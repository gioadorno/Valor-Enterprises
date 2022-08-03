import * as api from '../API';

export const getPhotos = () => async (dispatch) => { 
    try {
        const { data } = await api.getPhotos(); 

        dispatch({ type: 'GETPHOTOS', payload: data}); 
    } catch (error) {
        console.log(error.message)
    }
};

export const createPhotos = (photos) => async (dispatch) => {
    try {
        const { data } = await api.createPhotos(photos);

        dispatch({ type: 'CREATEPHOTOS', payload: data })
    } catch (error) {
        console.log(error)
    }
};

export const getPropPhotos = () => async (dispatch) => { 
    try {
        const { data } = await api.getPropPhotos(); 

        dispatch({ type: 'GETPROPPHOTOS', payload: data}); 
    } catch (error) {
        console.log(error.message)
    }
};



