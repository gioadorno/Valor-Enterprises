import * as api from '../API';

export const createEmailBlast = (newEmail) => async (dispatch) => {
    try {
        const { data } = await api.createEmail(newEmail);
        console.log(data)
        dispatch({ type: 'CREATEEMAIL', payload: data })
    } catch (error) {
        console.log(error)
    }
};