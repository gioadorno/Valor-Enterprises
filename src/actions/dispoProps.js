import * as api from '../API';
import { FETCH_BY_SEARCH, START_LOADING, END_LOADING, DELETE_LOADING, END_DELETE, START_CREATING, END_CREATING, START_DISPO_LOADING, END_DISPO_LOADING } from '../constants/actionTypes';

// Action Creators - functions that return an action
export const getDispoProps = (page) => async (dispatch) => { //Has to use thunk to load the action properly utilizing async and dispatch
    try {
        dispatch({ type: START_DISPO_LOADING })
        const { data } = await api.fetchDispoProps(page); // First getting response from the api, which is data that represents the posts.

        dispatch({ type: 'DISPOFETCH', payload: data}); //Successfuly using redux to pass the action from the data in api.fetchpost
        dispatch({ type: END_DISPO_LOADING  })
    } catch (error) {
        console.log(error.message)
    }
};

export const createDispoProp = (dispoProp, navigate) => async (dispatch) => {
    try {
        const { data } = await api.createDispoProp(dispoProp);
        document.querySelector('.submitComplete2').style = 'display: flex; justify-content: center;';
        document.querySelector('.submitButton2').style.display = 'none';
        dispatch({ type: 'DISPOCREATE', payload: data })
        navigate('/home')
    } catch (error) {
        console.log(error)
    }
};

export const deleteDispoProp = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_LOADING });
        await api.deleteDispoProperty(id);
        console.log()
        dispatch({ type: 'DISPODELETE', payload: id });
        dispatch({ type: END_DELETE  });
    } catch (error) {
        console.log(error);
    }
};