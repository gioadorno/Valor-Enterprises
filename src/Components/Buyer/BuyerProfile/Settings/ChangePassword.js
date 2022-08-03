import { Box, Typography, FormControl, FormLabel, Button, TextField } from "@mui/material";
import { useState } from "react";
import { updateBuyer } from "../../../../actions/login";
import { useDispatch } from "react-redux";

const ChangePassword = ({ user }) => {
    const [ password, setPassword ] = useState({ password: '', confirmPassword: '' });
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setPassword({ ...password, [e.target.name]: e.target.value })
    };

    const savePassword = () => {
        dispatch(updateBuyer(user.result._id, password));
        document.querySelector('.passButton').style.display = 'none';
        document.querySelector('.passSuccess').style.display = 'flex'
    }
  return (
    <Box sx={{ flexGrow: 1, display: 'flex', m: { sm: 4 }, boxShadow: 3, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '95%', height: '100%' }}>
        <Typography variant='h4' component='h4' sx={{ width: '100%', textAlign: 'center', mt: 2 }}>
            Change Password
        </Typography>
        <FormControl sx={{ pb: 4, pt: 4 }} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
            <TextField name="password" type='password' onChange={handleChange} label='New Password' value={password.password} />
        </FormControl>
        <FormControl sx={{ pb: 4, pt: 2 }} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
            <TextField name="confirmPassword" type='password' onChange={handleChange} label='Confirm Password' value={password.confirmPassword} />
        </FormControl>
        <Box sx={{ pb: 5 }}>
            { password.confirmPassword != '' && password.password === password.confirmPassword ?
            <Button className='passButton' variant='outlined' onClick={savePassword}>
                Change Password
            </Button>
            :
            <Button disabled variant='outlined' >
            Passwords must match 
            </Button>
        }
            <Typography className='passSuccess' sx={{ color: 'green', display: 'none', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                Password has been updated
            </Typography>
        </Box>
    </Box>
  )
}

export default ChangePassword