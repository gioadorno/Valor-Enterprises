import * as api from '../API';

export const createApplication = (applications) => async (dispatch) => {
    try {
        const { data } = await api.createApplication(applications);

        dispatch({ type: 'CREATEAPPLICATION', payload: data })
    } catch (error) {
        console.log(error)
    }
};

export const getApplications= () => async (dispatch) => { //Has to use thunk to load the action properly utilizing async and dispatch
    try {
        const { data } = await api.getApplications(); // First getting response from the api, which is data that represents the posts.

        dispatch({ type: 'GETAPPLICATIONS', payload: data}); //Successfuly using redux to pass the action from the data in api.fetchpost
    } catch (error) {
        console.log(error.message)
    }
};

export const deleteApplication = (id) => async (dispatch) => {
    try {
        await api.deleteApplication(id);
        document.querySelector('.deleteApplication').style.display = 'flex';

        dispatch({ type: 'DELETEAPPLICATION', payload: id });
    } catch (error) {
        console.log(error);
    }
};

export const updateApplication = (id, newApp) => async (dispatch) => {
    try {
        
        const { data } = await api.putApplication(id, newApp);

        dispatch({ type:'UPDATEAPPLICATION', payload: data });
    } catch (error) {
        console.log(error)
    }
}