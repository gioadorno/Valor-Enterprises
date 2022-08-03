import { Container, Toolbar, Paper, Typography } from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';
import { useEffect, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReports } from '../../../actions/closereports';
import Login from '../../Login/Login';
import MobileNav from '../MobileNav';
import OuterBar from '../OuterBar';
import OutboundCalls from './OutboundCalls';
import { AccountContext } from '../../Login/Account';

const mdTheme = createTheme();

const OutboundCallsFull = () => {
  const navigate = useNavigate();
  
  const { loggedIn } = useContext(AccountContext);
  const [ isLoggedIn, setIsLoggedIn ] = useState(loggedIn);
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getReports())
    },[])
    const {callReports} = useSelector((state) => state?.reports);
    // const dataTotal = useSelector((state) => state?.reports?.aggregations);
    // const total = dataTotal?.filter((data) => data.aggregations.totals)

    useEffect(() => {
      if (isLoggedIn === false) {
        navigate('/');
      }
    },[])




  return (
    <ThemeProvider theme={mdTheme}>
    <Box sx={{ display: 'flex' }}>
        <OuterBar />
        <Container maxWidth="2xl" sx={{ mt: 10, mb: 4, display: 'flex', alignItems: 'center', height: '100vh', justifyContent: 'flex-start', flexDirection: 'column'  }} >
            <Toolbar>
                <Typography variant='h3' component = 'h4'>
                    Calls/Texts
                </Typography>
            </Toolbar>
            <Paper style={{ width: '95%', height: '75%' }} elevation={16}>
                <OutboundCalls callReports={callReports} />
            </Paper>
        </Container>
        <MobileNav />
    </Box>
</ThemeProvider>
  )
}

export default OutboundCallsFull