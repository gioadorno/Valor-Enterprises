import MobileNav from '../Homepage_Components/MobileNav';
import { usePlacesWidget } from 'react-google-autocomplete';

import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Paper, Box, Grid, Typography, Toolbar, RadioGroup, FormLabel, Radio } from "@mui/material";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logo from './Keyglee_Logo.png'
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import PropTypes from 'prop-types';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Tooltip from '@mui/material/Tooltip';
import { createSubmitProp } from '../../../../actions/submitprop';
import { useMemo, forwardRef } from 'react';
import {
    Link as RouterLink,
    Route,
    Routes,
    MemoryRouter,
    useLocation,
} from 'react-router-dom';
import './login.css'
import GuestMap from '../../GuestMap/GuestMap';

const theme = createTheme();
const initialState = { email: '', address: '', contract: '', pictureLink: '', name: '', phone: '', askingPrice: '' };
const GoogleAPI = "AIzaSyBat1MaRl7stoHN62WZ7f9aGYWYOqHnBtU";

function ListItemLink(props) {
    const { icon, primary, to, placement, title } = props;
    
  
    const renderLink = useMemo(
      () =>
        forwardRef(function Link(itemProps, ref) {
          return <RouterLink to={to} ref={ref} {...itemProps} role={undefined} />;
        }),
      [to],
    );

    return (
        <li style={{ listStyle: 'none' }}>
            <Tooltip placement={placement} title={title}>
                <ListItem button component={renderLink}>
                    {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
                    <ListItemText primary={primary} />
                </ListItem>
            </Tooltip>
        </li>
      );
    }

    ListItemLink.propTypes = {
        icon: PropTypes.element,
        primary: PropTypes.string.isRequired,
        to: PropTypes.string.isRequired,
      };

const SubmitProperty = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [property, setProperty] = useState(initialState);
    const handleChange = (e) => {
        setProperty({ ...property, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createSubmitProp(property))
        document.querySelector('.propButton2').style.display = 'flex';
        document.querySelector('.propButton').style.display = 'none';
        document.querySelector('.propSubmit').style.display = 'flex';
      };

              // Address Input
    const { ref } = usePlacesWidget({
        apiKey: GoogleAPI,
        onPlaceSelected: (place) => {
            
        },
        options: {
            types: ["address"],
            componentRestrictions: { country: "us" },
        },
        });

        const meta = {
          title: 'Submit a Property',
          description: 'Looking to sell property? We make selling properties easy, and we do it with a loving team that wants to help you make intelligent decisions. Whatever your personal investment goals are, we are here to help you accomplish them. With thousands of successful transactions and happy customers, KeyGleeDispo has the concrete experience you can depend on.',
          meta: {
            name: {
                keywords: 'real estate, wholesale, wholesale real estate, sales, homes, real estate market, houses, property, properties, sell, buy'
            }
        }
        }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100%' }}>
        <CssBaseline />
        <Grid
          item
          component={Box}
          xs={false}
          sm={4}
          md={7}
          sx={{ height: '100vh' }}>
              <GuestMap />
        </Grid>
        <Grid sx={{ height: { xs: '100%' ,md: '100vh'  }, overflowY: 'auto' }} item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Toolbar>
            <ListItemLink style={{ width: '100%' }} placement='left' title='Go Back' primary="Go Back" to='/' icon={<ArrowBackIcon className='backArrow' variant='filled' />} />
            </Toolbar>
          <Box
            sx={{
              my: 3,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              pb: { xs: 10, sm: 0 },
            }}
          >
            <Avatar src={logo} sx={{ m: 1, width: 150, height: 150, mb: -1 }} />
            <Typography component="h1" variant="h5">
            Submit a Property
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '80%' }}>
            <TextField variant='standard' inputRef={ref} margin='normal' fullWidth required name='address' id='address' label='Property Address' onBlur={(e) => setProperty({ ...property, address: e.target.value })} />
            <RadioGroup aria-describedby='contract' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1em' }} value={property.contract} onChange={handleChange} row>
                <FormLabel style={{ marginBottom: '1em', color: '#607d8b', fontWeight: '550', textAlign: 'center', width: '100%' }}>Is this property under contract?</FormLabel>
                    <FormControlLabel name="contract" color="primary" value='Yes' control={<Radio />} label='Yes' />
                    <FormControlLabel name="contract" value='No' control={<Radio />} label='No' />
            </RadioGroup>
            <TextField variant='standard' margin='normal' fullWidth name='pictureLink' id='pictureLink' label='Link to Property Photos' onChange={handleChange} />
            <TextField required variant='standard' margin='normal' fullWidth name='askingPrice' id='askingPrice' label='Asking Price' onChange={handleChange} />
            <TextField required variant='standard' margin='normal' fullWidth name='name' id='name' label='Your Name' onChange={handleChange} />
            <TextField required variant='standard' margin='normal' fullWidth name='phone' id='phone' label='Phone Number' onChange={handleChange} />
            <TextField required variant='standard' margin='normal' fullWidth name='email' id='email' label='Email Address' onChange={handleChange} />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Typography className='propSubmit' style={{ textAlign: 'center', display: 'none', color: 'green', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }} variant='body2' color='success'>
                  Property has been submitted. We will get in contact with you shortly. Our office hours are 8:30am to 5:00pm MST, Monday through Friday.
                  <br/>
                  <p onClick={() => navigate('/')} style={{ cursor: 'pointer', color: '#00afd7' }}>Click here to go back</p>
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  className='propButton'
                >
                  Submit Property
                </Button>
                <Button
                disabled
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, display: 'none', alignItems: 'center' }}
                  className='propButton2'
                >
                  Property Submitted
                </Button>

              </Box>
              {/* <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid> */}
            </Box>
          </Box>
        </Grid>
        <MobileNav />
      </Grid>
    </ThemeProvider>
  )
}

export default SubmitProperty