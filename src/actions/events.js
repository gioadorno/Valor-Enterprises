import * as api from '../API';

export const createEvent = (newEvent) => async (dispatch) => {
    try {
        const { data } = await api.postEvent(newEvent);

        dispatch({ type: 'CREATEEVENT', payload: data });
    } catch (error) {
        console.log(error)
    }
};

export const getEvents = () => async (dispatch) => {
    try {
        const { data } = await api.fetchEvent();

        dispatch({ type: 'GETEVENTS', payload: data });
    } catch (error) {
        console.log(error)
    }
};