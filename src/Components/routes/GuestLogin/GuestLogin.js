import { Avatar, Button, CssBaseline, TextField, Link, Paper, Box, Grid, Typography, Toolbar, ListItemAvatar, ListItemButton } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logo from './Keyglee_Logo.png';
import location from './IMG_9113.jpg';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { guestSignin } from "../../../actions/login";
import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Tooltip from '@mui/material/Tooltip';
import { getBuyers, buyerForgotPassword } from "../../../actions/login";
import { useMemo, forwardRef } from 'react';
import {
    Link as RouterLink,
    Route,
    Routes,
    MemoryRouter,
    useLocation,
} from 'react-router-dom';
import './login.css'

const theme = createTheme();
const initialState = { userName: '', password: '' };

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

const GuestLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState(initialState);
    const [ email, setEmail ] = useState({ email: '' })
    const [ forgotPassword, setForgotPassword ] = useState(false);
    const [ passwordSubmit, setPasswordSubmit ] = useState(false);
    const [ error, setError ] = useState(false);
    useEffect(() => {
      dispatch(getBuyers())
    },[]);
    const buyers = useSelector((state) => state.buyers);
    const emails = buyers.map((buyer) => buyer.email);


    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(guestSignin(loginData)).then(() => navigate('/dashboard'))
      };

      const submitReset = async (databaseEmail) => {
        if(databaseEmail === email.email) {
          dispatch(buyerForgotPassword(email)).then(() => setPasswordSubmit(true))
        } 
      }

    const passwordReset = () => {
      emails.forEach((buyerEmail) => {
        submitReset(buyerEmail)
      })
      
    }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${location})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {forgotPassword === false ? (
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
              <Toolbar>
              <ListItemLink style={{ width: '100%' }} placement='left' title='Go Back' primary="Go Back" to='/' icon={<ArrowBackIcon className='backArrow' variant='filled' />} />
              </Toolbar>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar src={logo} sx={{ m: 1, width: 150, height: 150, mb: -1 }} />
              <Typography component="h1" variant="h5">
                Buyer Login
              </Typography>
              <Box sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="userName"
                  label="Username"
                  name="userName"
                  autoComplete="userName"
                  autoFocus
                  onChange={e => setLoginData({ ...loginData, userName: e.target.value.toLowerCase() })}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={handleChange}
                />
                {/* <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                /> */}
                <Typography className='incorrectPass' style={{ textAlign: 'center', display: 'none' }} variant='body2' color='error'>
                    Incorrect Email or Password. Please try again.
                </Typography>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleSubmit}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Typography onClick={() => setForgotPassword(true)} sx={{ textDecoration: 'underline', textDecorationColor: '#1976d266', color: '#1976d2', cursor: 'pointer', '&:hover' : { textDecorationColor: '#0b60b5bd' } }} variant='body2'>
                      Forgot password?
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Link href="/createaccount" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        ) :
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Toolbar> 
          <ListItemButton sx={{ cursor: 'pointer' }}>
            <ListItemAvatar>
            <ArrowBackIcon className='backArrow' variant='filled' />
            </ListItemAvatar>
        <ListItemText sx={{ width: 'auto' }} placement='left' title='Back to login' primary="Back to login" onClick={() => setForgotPassword(false)} />
          </ListItemButton>
        </Toolbar>
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar src={logo} sx={{ m: 1, width: 150, height: 150, mb: -1 }} />
        <Typography component="h1" variant="h5">
          Forgot Password
        </Typography>
        <Box sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={e => setEmail({ ...email, email: e.target.value.toLowerCase() })}
          />
          {error === true && 
          <Typography className='incorrectPass' style={{ textAlign: 'center' }} variant='body2' color='error'>
              There is no account with that email address
          </Typography>
          }
          {passwordSubmit === true &&
          <Typography sx={{ color: 'green' }} color='success'>A reset password link has been sent to your email. Double check your spam folder, if you do not see an email.</Typography>
          }
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={passwordSubmit === false ? false : true}
            onClick={passwordReset}
          >
            Submit Email
          </Button>
        </Box>
      </Box>
    </Grid>
        }
      </Grid>
    </ThemeProvider>
  )
}

export default GuestLogin