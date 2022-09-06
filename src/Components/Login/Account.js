import React, { createContext, useEffect, useState } from 'react';
import { CognitoUser, AuthenticationDetails, AmazonCognitoIdentity } from 'amazon-cognito-identity-js';
import { useNavigate } from 'react-router-dom';
import Pool from '../../UserPool';
import { Auth, API } from 'aws-amplify';

const AccountContext = createContext();

const Account = ({ children }) => {
    const navigate = useNavigate();


    const [ loggedIn, setLoggedIn ] = useState(false);
    const [ userName, setUserName ] = useState('');
    const [ employee, setEmployee ] = useState('');
    const [ userChangePassword, setUserChangePassword ] = useState(false);
    const [ invalid, setInvalid ] = useState(false);

    
    const getSession = async () => {
        await Auth.currentAuthenticatedUser().then((user) => {
            setLoggedIn(true);
            setEmployee(user)
        })
        .catch(() => {
            navigate('/');
            // setLoggedIn(false)
        });
    };
    
    // useEffect(() => {
    //     getSession()
    // }, []);

    

    const authenticate = async (Username, Password) => {
        try {
                const user = await Auth.signIn(Username, Password)
                if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
                    setUserChangePassword(true);
                    setEmployee(user);
                } else {
                    setLoggedIn(true);
                    setEmployee(user);
                    navigate('/internal');
                }
            } catch (error) {
                setInvalid(true)
            }
};


    // Logout
    const logout = async () => {
        try {
            await Auth.signOut();
            setLoggedIn(false);
            navigate('/');
        } catch (error) {
            console.log('error signing out: ', error);
        }
    };


  return (
    <AccountContext.Provider value={{ 
        authenticate, 
        getSession, 
        logout, 
        userChangePassword, setUserChangePassword, 
        employee, 
        setUserName, userName, 
        invalid, 
        loggedIn, setLoggedIn,
        }}>
        {children}
    </AccountContext.Provider>
  )
}

export { Account, AccountContext };