import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import OuterBar from '../../OuterBar';
import MobileNav from "../../MobileNav";
import { userCreate } from "../../../../actions/login";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import NotAuthorized from '../../NotAuthorized'

const CreateUser = () => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [createUser, setCreateUser] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '', securityLevel: '', accountLevel: 'Employee', profilePhoto: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(userCreate(createUser, navigate('/users')));
    };

    const handleChange = (e) => {
        setCreateUser({ ...createUser, [e.target.name] : e.target.value })
    };

        // If user has Security Level of Guest or not logged in and doesn't have security level of System Administrator, reroute to Login Page
        if(!user?.result?.name || user?.result?.securityLevel != 'System Administrator') {
            return (
                <NotAuthorized />
            )
        }
  return (
    <Box sx={{ display: 'flex' }}>
        <OuterBar/>
        <Box sx={{ flexGrow: 1, boxShadow: 3, m: 3, width: '100%', height: '100vh', display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'flex-start' }}>
            <Typography sx={{ mt: 8 }} variant='h3' component='h3'>
                Create User
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, px: 10 }}>
                <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Employee Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={e => setCreateUser({ ...createUser, email: e.target.value.toLowerCase() })}
                />
                <TextField
                margin="normal"
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                autoComplete="firstName"
                autoFocus
                onChange={handleChange}
                />
                <TextField
                margin="normal"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lastName"
                autoFocus
                onChange={handleChange}
                />
                <FormControl sx={{ width: '100%', my: 1 }}>
                    <InputLabel id='securityLevel'>Security Level</InputLabel>
                    <Select required name="securityLevel" labelId='securityLevel' id='securityLevel' value={createUser.securityLevel} label='Security Level' onChange={handleChange} >
                        <MenuItem value='System Administrator'>System Administrator</MenuItem>
                        <MenuItem value='Management'>Management</MenuItem>
                        <MenuItem value='HR'>HR</MenuItem>
                        <MenuItem value='Operations'>Operations</MenuItem>
                        <MenuItem value='Acq'>Acq</MenuItem>
                        <MenuItem value='Dispo'>Dispo</MenuItem>
                        <MenuItem value='Auditor'>Auditor</MenuItem>
                    </Select>
                </FormControl>
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
            <Typography className='incorrectPass' style={{ textAlign: 'center', display: 'none' }} variant='body2' color='error'>
                Incorrect Email or Password. Please try again.
            </Typography>
            {createUser.confirmPassword != '' && createUser.password === createUser.confirmPassword ? (
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
            Match passwords to create user
            </Button>
            }
            </Box>
        </Box>
        <MobileNav/>
    </Box>
  )
}

export default CreateUser