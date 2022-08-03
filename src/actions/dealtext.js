import * as api from '../API';

export const createDealText = (dealText) => async (dispatch) => {
    try {
        const { data } = await api.createDealText(dealText);

        dispatch({ type: 'CREATEDEALTEXT', payload: data })
    } catch (error) {
        console.log(error)
    }
};