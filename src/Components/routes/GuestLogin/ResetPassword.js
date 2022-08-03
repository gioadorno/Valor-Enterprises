import { useParams, useNavigate } from "react-router-dom";
import { changeBuyerPassword } from "../../../actions/login";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import background from './resetBackground.jpg';


const ResetPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useParams();
    const [ password, setPassword ] = useState({ password: '', confirmPassword: '' });
    const [ passwordConfirm, setPasswordConfirm ] = useState(false);
    const [ changePassword, setChangePassword ] = useState({
        password: '',
    })


    const submit = async () => {
        console.log(password)
        dispatch(changeBuyerPassword(token, { password: password.password, token: token })).then(() => setPasswordConfirm(true))
    };

    const goLogin = () => {
        navigate('/buyerlogin')
    }


  return (
    <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <Paper sx={{ boxShadow: 5, width: { xs: '90%', sm: '35%', xl: '35%' }, height: { xs: '80%', xl: '55%' }, borderRadius: '1em', display: 'flex', flexDirection: 'column', py: 3, alignItems: 'center', zIndex: 10 }}>
            <Typography variant='h4'>Setup New Password</Typography>
            <TextField onChange={e => setPassword({ ...password, password: e.target.value })} label='New Password' type='password' sx={{ width: '80%', mt: 4 , mt: 5}} />
            <TextField onChange={e => setPassword({ ...password, confirmPassword: e.target.value })} label='Confirm Password' type='password' sx={{ width: '80%', my: 4 }} />
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                {passwordConfirm === true && <Typography onClick={goLogin} variant='h6' sx={{ color: 'green', textAlign: 'center', cursor: 'pointer', '&:hover' : { color: 'blue' } }}>Password has been changed. Click here to go back to the login page.</Typography>}
                {password.confirmPassword != '' && password.password === password.confirmPassword ? (
                    <Button onClick={submit} disabled={passwordConfirm === false ? false : true} variant='outlined' size='large'>Change Password</Button>
                    
                ) :
                <Button disabled={true} variant='outlined' size='large'>Passwords must match</Button>
                }
            </Box>
        </Paper>
        <img src={background} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, right: 0, left: 0 }} />
    </Box>
  )
}

export default ResetPassword