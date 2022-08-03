import * as api from '../API';

export const getReports = () => async (dispatch) => { 
    try {
        const { data } = await api.getCloseReports(); 

        dispatch({ type: 'GETREPORTS', payload: data });
    } catch (error) {
        console.log(error.message)
    }
};

export const getOpportunities = (status) => async (dispatch) => {
    try {
        const { data } = await api.getOpportunityReports(status); 

        dispatch({ type: 'GETOPPORTUNITIES', payload: data });
    } catch (error) {
        console.log(error.message)
    }
}

export const sendOpportunities = (status) => async (dispatch) => {
    try {
        const { data } = await api.getOpportunityReports(status); 

        dispatch({ type: 'GETOPPORTUNITIES', payload: data });
    } catch (error) {
        console.log(error.message)
    }
}