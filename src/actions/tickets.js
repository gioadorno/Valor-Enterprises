import * as api from '../API';

export const getTickets = async (dispatch) => {
    try {
        const { data } = await api.getTickets();

        dispatch({ type: 'GETTICKETS', payload: data });
    } catch (error) {
        console.log(error)
    }
};

export const createTicket = (ticket) => async (dispatch) => {
    try {
        const { data } = await api.createTicket(ticket);
        
        document.querySelector('.ticketDiv').style.display = 'none';
        document.querySelector('.ticketConfirm').style.display = 'flex';

        dispatch({ type: 'CREATETICKET', payload: data });
    } catch (error) {
        console.log(error)
    }
};