import * as api from '../API/index';

export const createPayoutData = (payout) => async (dispatch) => {
    try {
        const { data } = await api.postPayoutData(payout);

        dispatch({ type: 'CREATEPAYOUT', payload: data });
    } catch (error) {
        console.log(error)
    }
};

export const getPayoutData = (month) => async (dispatch) => {
try {
    const { data } = await api.fetchPayoutData(month);

    dispatch({ type: 'GETPAYOUTS', payload: data });
} catch (error) {
    console.log(error.message)
}
};

export const deletePayout = (id) => async (dispatch) => {
    try {
        const { data } = await api.removePayout(id);

        dispatch({ type: 'DELETEPAYOUT', payload: id });
    } catch (error) {
        console.log(error.message)
    }
};