import * as api from '../API';

export const createFile = (file) => async (dispatch) => {
    try {
        const { data } = await api.createFile(file);
        document.querySelector('.fileUpload').style.display = 'flex';

        dispatch({ type: 'CREATEFILE', payload: data })
    } catch (error) {
        console.log(error)
    }
};

export const deleteFile = (id) => async (dispatch) => {
    try {
        await api.deleteFile(id);
        document.querySelector('.fileDelete').style.display = 'flex';
        dispatch({ type: 'DELETEFILE', payload: id });
    } catch (error) {
        console.log(error);
    }
};

export const getFiles= () => async (dispatch) => { //Has to use thunk to load the action properly utilizing async and dispatch
    try {
        const { data } = await api.getFiles(); // First getting response from the api, which is data that represents the posts.

        dispatch({ type: 'GETFILES', payload: data}); //Successfuly using redux to pass the action from the data in api.fetchpost
    } catch (error) {
        console.log(error.message)
    }
};