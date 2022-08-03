import React, { useContext, useState, useEffect } from 'react';
import { AccountContext } from '../Login/Account';
import { useDispatch, useSelector } from 'react-redux';
import { Button, CssBaseline } from '@mui/material';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import OuterBar from './OuterBar';
import { getReports } from '../../actions/closereports';
import OutboundCalls from './Reports/OutboundCalls';
import MobileNav from './MobileNav';
import Events from './EventCalendar/Events';
import { useNavigate } from 'react-router-dom';

  
  function DashboardContent() {

    const { employee, loggedIn, getSession } = useContext(AccountContext);

    const navigate = useNavigate();
    
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getReports())
    },[])
    const {callReports} = useSelector((state) => state?.reports);
    const [ isLoggedIn, setIsLoggedIn ] = useState(loggedIn);
    const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
      setOpen(!open);
    };

    // console.log(employee.signInUserSession.accessToken.payload['cognito:groups'])

  //   useEffect(() => {
  //     // GET request using fetch inside useEffect React hook
  //     fetch('https://api.npms.io/v2/search?q=react')
  //         .then(response => response.json())
  //         .then(data => setTotalReactPackages(data.total));
  
  // // empty dependency array means this effect will only run once (like componentDidMount in classes)
  // }, []);

  useEffect(() => {
    getSession()
}, []);

    // useEffect(() => {
    //   if (loggedIn === false) {
    //     navigate('/');
    //   }
    // },[])

    console.log(`DEmployee-${Math.random().toString(36).substring(2) + Date.now().toString(36)}`)

    
    return (
        <Box sx={{ display: 'flex', height: { xs: '100%' , xl: '100vh'}, bgcolor: '#003558' }}>
            <CssBaseline />
              <OuterBar />
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                height: '100%',
              }}
            >
              <Typography variant='h4' component='h4' sx={{ textAlign: 'center', m: 2 }}>Employee Dashboard</Typography>
              <Toolbar />
              <Container maxWidth="2xl" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                  {/* Announcements */}
                  <Grid item xs={12} xl={8}>
                    <Paper
                      sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 600,
                      }}
                    >
                      <Typography sx={{ mb: 3, textAlign: 'center' }} variant='h4' component='h4'>
                        Calls/Texts
                      </Typography>
                      <OutboundCalls callReports={callReports}/>
                    </Paper>
                  </Grid>
                  {/* Recent Deposits */}
                  <Grid item xs={12} xl={4}>
                    <Paper
                      sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 600,
                      }}
                    >
                      <Events />
                    </Paper>
                    
                  </Grid>
                  {/* Recent Orders */}
                </Grid>
                {/* <Copyright sx={{ pt: 4 }} /> */}
              </Container>
            </Box>
            <MobileNav />
        </Box>
    );
  }
  
  export default function Dashboard() {
    return <DashboardContent />;
  }