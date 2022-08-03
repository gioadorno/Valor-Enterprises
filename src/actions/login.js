import { AUTH } from "../constants/actionTypes";
import * as api from '../API/index';


export const signin = (loginData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signIn(loginData);

        dispatch({ type: AUTH, data });

        navigate('/employeedashboard');
    } catch (error) {
        console.log(error);
        document.querySelector('.incorrectPass').style.display = 'flex';
    }
};

export const guestSignin = (loginData) => async (dispatch) => {
    try {
        const { data } = await api.guestSignin(loginData);

        dispatch({ type: AUTH, data });

    } catch (error) {
        console.log(error);
        document.querySelector('.incorrectPass').style.display = 'flex';
    }
};

export const buyerForgotPassword = (emailAddress) => async (dispatch) => {
    try {
        const { data } = await api.getBuyerEmail(emailAddress);

        dispatch({ type: AUTH, data });
    } catch (error) {
        console.log(error)
    }
};

export const forgotPassword = (forgotPass) => async (dispatch) => {
    try {
        const { data } = await api.forgotPassword(forgotPass);

        dispatch({ type: AUTH, data });
    } catch (error) {
        console.log(error);
    }
};

export const userCreate = (createUser, navigate) => async (dispatch) => {
    try {
        const { data } = await api.userCreation(createUser);

        document.querySelector('.createConfirm').style.display = 'flex';

        dispatch({ type: AUTH, data });

        navigate('/user/createuser');
    } catch (error) {
        console.log(error);
    }
};

export const buyerUserCreate = (createBuyer) => async (dispatch) => {
    try {
        const { data } = await api.buyerUserCreate(createBuyer);

        dispatch({ type: AUTH, data });
    } catch (error) {
        console.log(error);
    }
};

// Update Buyer

export const updateBuyer = (id, buyer) => async (dispatch) => {
    try {
        const { data } = await api.updateBuyerAccount(id, buyer);

        dispatch({ type: 'UPDATEBUYER', payload: data })

        // document.querySelector('.passwordUpdate').style.display = 'flex';
    } catch (error) {
        console.log(error);
    }
};

export const changeBuyerPassword = (token, password) => async (dispatch) => {
    try {
        const { data } = await api.changeBuyerPass(token, password);

        dispatch({ type: 'UPDATEBUYER', payload: data })
    } catch (error) {
        console.log(error);
    }
}

export const changeEmployeePassword = (token, password) => async (dispatch) => {
    try {
        const { data } = await api.changeEmployeePass(token, password);

        dispatch({ type: 'UPDATEEMPLOYEES', payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const getBuyers = () => async (dispatch) => { 
    try {
        const { data } = await api.getBuyers(); 

        dispatch({ type: 'GETBUYER', payload: data}); 
    } catch (error) {
        console.log(error.message)
    }
};

// export const getEmployees = () => async (dispatch) => { 

//     try {
//         const { data } = await api.getEmployees(); 

//         dispatch({ type: 'GETEMPLOYEES', payload: data}); 
//     } catch (error) {
//         console.log(error.message)
//     }
// };

export const updatePassword = (updatePass, navigate) => async (dispatch) => {
    try {
        const { data } = await api.updatePassword(updatePass);

        dispatch({ type: AUTH, data });

        navigate('/');
    } catch (error) {
        console.log(error);
    }
};

