import * as api from '../API';

export const getUsers = (page) => async (dispatch) => {
    try {
        const { data } = await api.getEmployees(page);
        dispatch({ type: 'GETEMPLOYEES', payload: data}); 
    } catch (error) {
        console.log(error.message)
    }
};

export const updateEmployee= (id, userData) => async (dispatch) => {
    try {
        const { data } = await api.updateUser(id, userData);

        dispatch({ type: 'UPDATEEMPLOYEES', payload: data}); 
    } catch (error) {
        console.log(error.message)
    }
};

export const updateProp = (id, prop) => async (dispatch) => {
    try {
        // dispatch({ type: START_UPDATING });

        const { data } = await api.updateProp(id, prop);
        dispatch({ type: 'UPDATE', payload: data });
        // window.location.reload();
        // dispatch({ type: END_UPDATING  });
    } catch (error) {
        console.log(error);
    }
};

export const deleteUser = (id) => async (dispatch) => {
    try {
        await api.removeUser(id);

        dispatch({ type: 'DELETEUSER', payload: id })
    } catch (error) {
        console.log(error)
    }
};
