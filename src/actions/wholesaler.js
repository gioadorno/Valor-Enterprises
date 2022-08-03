import * as api from '../API/index';
import { AUTH } from "../constants/actionTypes";

export const wholesaleSignin = (loginData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.wholesaleSignin(loginData);

        dispatch({ type: AUTH, data });

        navigate('/wholesaledashboard');
    } catch (error) {
        console.log(error);
        document.querySelector('.incorrectPass').style.display = 'flex';
    }
};


export const wholesalerUserCreate = (createWholesaler) => async (dispatch) => {
    try {
        const { data } = await api.wholesalerUserCreate(createWholesaler);

        dispatch({ type: 'CREATEWHOLESALER', payload: data });

        document.querySelector('.userCreated').style.display = 'flex';
        document.querySelector('.userButton').style.display = 'none';
        
    } catch (error) {
        console.log(error);
    }
};

// Update Buyer

export const updateWholesaler = (id, wholesaler, navigate) => async (dispatch) => {
    try {
        const { data } = await api.updateWholesaler(id, wholesaler);

        dispatch({ type: 'UPDATEWHOLESALER', payload: data })

        navigate('/wholesaledashboard');
    } catch (error) {
        console.log(error);
    }
};

export const getWholesalers = () => async (dispatch) => { 
    try {
        const { data } = await api.getWholesalers(); 

        dispatch({ type: 'GETWHOLESALER', payload: data}); 
    } catch (error) {
        console.log(error.message)
    }
};