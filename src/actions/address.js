import * as api from '../API';

export const getAddress = () => async (dispatch) => { 
    try {
        const { data } = await api.getAddressMarker(); 
        
        dispatch({ type: 'GETADDRESS', payload: data });
    } catch (error) {
        console.log(error.message)
    }
};



export const createAddress = (address) => async (dispatch) => {
    try {
        const { data } = await api.createAddressMarker(address);

        dispatch({ type: 'CREATEADDRESS', payload: data })
    } catch (error) {
        console.log(error)
    }
};
