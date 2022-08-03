import * as api from '../API';

export const createRequestLogin = (requestLogin) => async (dispatch) => {
    try {
        const { data } = await api.createRequestLogin(requestLogin);
        
        document.querySelector('.requestConfirm').style.display = 'flex';
        document.querySelector('.requestButton').style.display = 'none';

        dispatch({ type: 'CREATEREQUESTACCOUNT', payload: data })
    } catch (error) {
        console.log(error)
    }
};