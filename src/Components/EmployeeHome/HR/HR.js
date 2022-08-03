import { Box, Container } from '@mui/material';
import React, { useContext, useState, useEffect } from 'react';
import { AccountContext } from '../../Login/Account';
import { useNavigate } from 'react-router-dom';
import MobileNav from '../MobileNav';
import NotAuthorized from '../NotAuthorized';
import OuterBar from '../OuterBar';

const HR = () => {
    const { employee, loggedIn } = useContext(AccountContext);
    const navigate = useNavigate();
    const [ isLoggedIn, setIsLoggedIn ] = useState(loggedIn);

    useEffect(() => {
        if (isLoggedIn === false) {
          navigate('/');
        }
        if (employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('HR') >= 0) {
            return <NotAuthorized />
        }
      },[]);

    return (
        <Box sx={{ display: 'flex' }}>
            <OuterBar />
            <Container maxWidth="2xl" sx={{ mt: 10, mb: 4, display: 'flex', alignItems: 'center', height: '100vh', justifyContent: 'flex-start', flexDirection: 'column'   }} >
                HR Dashboard
            </Container>
            <MobileNav />
        </Box>
    )
}

export default HR