import * as api from '../API';

export const getDispoEmployees = () => async (dispatch) => {
    try {
        const { data } = await api.getDispoReps();

        dispatch({ type: 'GETDISPOEMPLOYEES', payload: data}); 
    } catch (error) {
        console.log(error.message)
    }
};