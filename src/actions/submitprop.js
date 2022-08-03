import * as api from '../API';

export const createSubmitProp = (submitProp) => async (dispatch) => {
    try {
        const { data } = await api.createSubmitProp(submitProp);
        document.querySelector('.propSubmit').style.display = 'flex';
        document.querySelector('.propButton').style.display = 'none';

        dispatch({ type: 'CREATESUBMITPROP', payload: data })
    } catch (error) {
        console.log(error)
    }
};