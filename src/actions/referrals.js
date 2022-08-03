import * as api from '../API';

export const getReferrals = () => async (dispatch) => { 
    try {
        const { data } = await api.getReferrals(); 
        
        dispatch({ type: 'GETREFERRALS', payload: data });
    } catch (error) {
        console.log(error.message)
    }
};

export const createReferral = (referral) => async (dispatch) => {
    try {
        const { data } = await api.createReferral(referral);

        dispatch({ type: 'CREATEREFERRAL', payload: data })
    } catch (error) {
        console.log(error)
    }
};

// Update Referral
export const updateReferral = (id, referral, navigate) => async (dispatch) => {
    try {
        const { data } = await api.updateReferral(id, referral);

        dispatch({ type: 'UPDATE', payload: data })

        navigate('/hrportal');
    } catch (error) {
        console.log(error);
    }
};

// Delete Referral
export const deleteReferral = (id) => async (dispatch) => {
    try {
        await api.deleteReferral(id);
        document.querySelector('.deleteReferral').style.display = 'flex';

        dispatch({ type: 'DELETEREFERRAL', payload: id });
    } catch (error) {
        console.log(error);
    }
};