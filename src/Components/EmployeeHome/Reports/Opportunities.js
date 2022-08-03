import { Container, Toolbar, Paper, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/system';
import { useEffect, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getOpportunities, sendOpportunities } from '../../../actions/closereports';
import Login from '../../Login/Login';
import MobileNav from '../MobileNav';
import OuterBar from '../OuterBar';
import Opportunity from './Opportunity';
import { AccountContext } from '../../Login/Account';



const mdTheme = createTheme();


const Opportunities = () => {
  let { status } = useParams();
  const { loggedIn } = useContext(AccountContext);
  const [ isLoggedIn, setIsLoggedIn ] = useState(loggedIn);
  const [statusOpportunity, setStatus] = useState({ status: status }); 
  const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getOpportunities(status))
    },[])
    const {opportunities} = useSelector((state) => state?.reports);


  const submitStatus = async (e) => {
    setStatus({ ...statusOpportunity, status: e.target.value });
    navigate(`/opportunityreports/${e.target.value}`);
    window.location.reload(false);
    if (isLoggedIn === false) {
      navigate('/');
    }
  };

  return (
    <ThemeProvider theme={mdTheme}>
    <Box sx={{ display: 'flex' }}>
        <OuterBar />
        <Container maxWidth="2xl" sx={{ mt: 10, mb: 4, display: 'flex', alignItems: 'center', height: '100vh', justifyContent: 'flex-start', flexDirection: 'column'   }} >
            <Toolbar sx={{ position: 'relative', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
              <FormControl sx={{ position: 'absolute', left: 50, top: 2, width: 300 }}>
                <InputLabel id='statusLabel'>Select Opportunity Status</InputLabel>
                <Select value={status} label='Select Opportunity Status' onChange={submitStatus} labelId='statusLabel' >
                  <MenuItem value='Interest in property'>Interest in Property</MenuItem>
                  <MenuItem value='Commit to Purchasing (Vesting)'>Commit to Purchasing (Vesting)</MenuItem>
                  <MenuItem value='Inspection Period (Prop in podio)'>Inspection Period (Prop in podio)</MenuItem>
                  <MenuItem value='Contract Signed'>Contract Signed</MenuItem>
                  <MenuItem value='EMD Deposited'>EMD Deposited</MenuItem>
                  <MenuItem value='Chasing'>Chasing</MenuItem>
                </Select>
              </FormControl>
                <Typography sx={{ alignItems: 'center', display: { xs: 'none' ,sm: 'flex' } }} variant='h3' component = 'h4'>
                    Opportunities
                </Typography>
            </Toolbar>
            <Paper style={{ width: '95%', height: '75%' }} elevation={16}>
                <Opportunity opportunities={opportunities} />
            </Paper>
        </Container>
        <MobileNav />
    </Box>
</ThemeProvider>
  )
}

export default Opportunities