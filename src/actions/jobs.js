import * as api from '../API';

export const createJob = (jobs) => async (dispatch) => {
    try {
        const { data } = await api.createJob(jobs);

        dispatch({ type: 'CreateJob', payload: data })
    } catch (error) {
        console.log(error)
    }
};

export const getJobs = () => async (dispatch) => { //Has to use thunk to load the action properly utilizing async and dispatch
    try {
        const { data } = await api.getJobs(); // First getting response from the api, which is data that represents the posts.

        dispatch({ type: 'FetchJob', payload: data}); //Successfuly using redux to pass the action from the data in api.fetchpost
    } catch (error) {
        console.log(error.message)
    }
};

export const deleteJob = (id) => async (dispatch) => {
    try {
        await api.deleteJob(id);

        dispatch({ type: 'DeleteJob', payload: id })
    } catch (error) {
        console.log(error);
    }
};