import * as api from '../API';

// Action Creators - functions that return an action
export const getAnnouncements = () => async (dispatch) => { //Has to use thunk to load the action properly utilizing async and dispatch
    try {
        const { data } = await api.getAnnouncements(); // First getting response from the api, which is data that represents the posts.

        dispatch({ type: 'GETANNOUNCEMENTS', payload: data}); //Successfuly using redux to pass the action from the data in api.fetchpost
    } catch (error) {
        console.log(error.message)
    }

}

export const createAnnouncement = (announcement, navigate) => async (dispatch) => {
    try {
        const { data } = await api.createAnnouncement(announcement);

        dispatch({ type: 'CREATEANNOUNCEMENT', payload: data })

        navigate('/home');
    } catch (error) {
        console.log(error)
    }
}