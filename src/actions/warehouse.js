import * as api from '../API';

export const getItems = () => async (dispatch) => { 
    try {
        const { data } = await api.getItems(); 

        dispatch({ type: 'FETCHITEMS', payload: data}); 
    } catch (error) {
        console.log(error.message)
    }
};

export const updateItem = (id, item) => async (dispatch) => {
    try {
        const { data } = await api.updateItem(id, item);
        console.log(data)
        dispatch({ type: 'UPDATEITEM', payload: data })
    } catch (error) {
        console.log(error);
    }
};

export const createItem = (item) => async (dispatch) => {
    try {
        const { data } = await api.createItem(item);

        dispatch({ type: 'CREATEITEM', payload: data })
    } catch (error) {
        console.log(error)
    }
};