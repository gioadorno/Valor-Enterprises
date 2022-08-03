import * as api from '../API';

export const getOffers = () => async (dispatch) => { 
    try {
        const { data } = await api.getOffers(); 
        
        dispatch({ type: 'GETOFFERS', payload: data });
    } catch (error) {
        console.log(error.message)
    }
};

export const createOffer = (offer) => async (dispatch) => {
    try {
        const { data } = await api.createOffer(offer);
        document.querySelector('.offerSuccess').style.display = 'flex';
        document.querySelector('.offerButton').style.display = 'none';
        dispatch({ type: 'CREATEOFFER', payload: data })
    } catch (error) {
        console.log(error)
    }
};
