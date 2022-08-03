import * as api from '../API';
import { END_BUYER_DELETE, DELETE_BUYER_LOADING, START_BUYER_LOADING, END_BUYER_LOADING } from '../constants/actionTypes';

export const getBuyerProps = () => async (dispatch) => { 
    try {
        dispatch({ type: START_BUYER_LOADING });

        const { data } = await api.getBuyerProperty(); 
        dispatch({ type: 'BUYERPROPFETCH', payload: data });

        dispatch({ type: END_BUYER_LOADING });
    } catch (error) {
        console.log(error.message)
    }
};

export const getBuyerProperties = (page) => async (dispatch) => { 
    try {
        dispatch({ type: START_BUYER_LOADING });

        const { data } = await api.fetchBuyerProperties(page); 
        dispatch({ type: 'BUYERPROPFETCH', payload: data });

        dispatch({ type: END_BUYER_LOADING });
    } catch (error) {
        console.log(error.message)
    }
};

export const createBuyerProp = (buyerProp) => async (dispatch) => {
    try {
        const { data } = await api.createBuyerProperty(buyerProp);

        dispatch({ type: 'BUYERPROPCREATE', payload: data })
    } catch (error) {
        console.log(error)
    }
};

export const deleteBuyerProp = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_BUYER_LOADING });

        await api.deleteBuyerProperty(id);
        dispatch({ type: 'BUYERPROPDELETE', payload: id });
        
        dispatch({ type: END_BUYER_DELETE  });
    } catch (error) {
        console.log(error);
    }
};