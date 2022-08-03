import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Paper, Box, Grid, Typography, Toolbar, Modal } from "@mui/material";
import { keygleeDocument } from "./document";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logo from '../GuestLogin/Keyglee_Logo.png';
import location from '../GuestLogin/IMG_9113.jpg';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { buyerUserCreate } from "../../../actions/login";
import { useState } from "react";
import PropTypes from 'prop-types';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Tooltip from '@mui/material/Tooltip';
import { useMemo, forwardRef } from 'react';
import {
    Link as RouterLink,
    Route,
    Routes,
    MemoryRouter,
    useLocation,
} from 'react-router-dom';
import TermsAndConditions from "./TermsAndConditions";

        // Get current Date and format it to mm/dd/yyyy
        let today = new Date();
        const date = parseInt(today.getMonth()+1) + '-' + today.getDate() + "-" + today.getFullYear();

const theme = createTheme();

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

      const initialState = { userName: '', name: '', email: '', password: '', confirmPassword: '', securityLevel: 'Buyer', market: [], profilePhoto: '', accountLevel : 'Buyer', agreement: { date: date, agreeToDoc: false, document: keygleeDocument } };
const CreateAccount = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState(initialState);
    const [ terms, setTerms ] = useState(false);
    const [ checked, setChecked ] = useState(false)
    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        loginData.agreement.agreeToDoc = checked;
            dispatch(buyerUserCreate(loginData, navigate('/dashboard')));
      };
      const handleOpen = () => setTerms(true);
      const handleClose = () => setTerms(false);


  return (
    <ThemeProvider theme={theme}>
        {terms && (
            <Modal sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} open={handleOpen} onClose={handleClose}>
                <TermsAndConditions />
            </Modal>
        )}
      <Grid container component="main" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: { xs: '100%', xl: '100vh' }, backgroundImage: `url(${location})`, backgroundRepeat: 'no-repeat', backgroundColor: (t) => t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900], backgroundSize: 'cover', backgroundPosition: 'center', }}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={6} lg={5} component={Paper} sx={{ borderRadius: '1em' }} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: { xs: '100%', overflowY: 'auto' }
            }}
          >
            <Avatar src={logo} sx={{ m: 1, width: 150, height: 150, mb: -1 }} />
            <Typography component="h1" variant="h5">
            Create an Account
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="userName"
                label="Create a username"
                name="userName"
                autoComplete="userName"
                autoFocus
                onChange={e => setLoginData({ ...loginData, userName: e.target.value.toLowerCase() })}
              />
                <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Your name"
                name="name"
                autoComplete="name"
                autoFocus
                onChange={handleChange}
              />
                <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleChange}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Create Password"
                type="password"
                id="password"
                onChange={handleChange}
              />
                <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                onChange={handleChange}
              />
                <Typography onClick={() => setTerms(true)} sx={{ color: 'blue', mt: 1, pl: 1, '&:hover' : { color: '#fd5858', cursor: 'pointer' } }} variant='body2' >
                Terms and Conditions
              </Typography>
                <FormControlLabel label='Do you agree to these Terms and Conditions?*' control={<Checkbox onChange={(e) => setChecked(e.target.checked)} />} />
              <Typography className='incorrectPass' style={{ textAlign: 'center', display: 'none' }} variant='body2' color='error'>
                  Incorrect Email or Password. Please try again.
              </Typography>
              {loginData.confirmPassword != '' && loginData.password === loginData.confirmPassword && checked === true ? (
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                Create Account
              </Button>
              ) : 
              <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled
                  >
                Agree to terms and match passwords to continue
              </Button>
              }
              <Grid container>
                <Grid item xs>
                  <Link href="/" variant="body2">
                    Homepage
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/buyerlogin" variant="body2">
                    Already have an account? Login here
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default CreateAccount

