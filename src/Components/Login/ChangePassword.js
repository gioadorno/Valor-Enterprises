import React, { useContext, useState, useEffect, Fragment } from 'react';
import { AccountContext } from '../Login/Account';
import { Box, Avatar, Typography } from "@mui/material";
import logo from './Valor Logo.png'
import background from './changepasswordbackground.jpg';
import { useNavigate } from "react-router-dom";
import { Auth } from 'aws-amplify';

const ChangePassword = () => {
    const navigate = useNavigate();

    const [ passwordError, setPasswordError ] = useState(false);
    const [ disableButton, setDisableButton ] = useState(false);
    const [ username, setUsername ] = useState('');
    const [ incorrectEmail, setIncorrectEmail ] = useState(false);
    const [ code, setCode ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ confirmation, setConfirmation ] = useState(false);
    const [ confirmationCode, setConfirmationCode ] = useState(false);
    const [ passwordChanged, setPasswordChanged ] = useState(false);

    const { getSession, employee } = useContext(AccountContext);


    const onSubmit = (e) => {
        e.preventDefault();
        Auth.forgotPasswordSubmit(username, code, confirmPassword)
            .then(data => {
                setPasswordChanged(true);
                setTimeout(navigate('/'), 5000);
            })
            .catch((err) => {
                console.log(err);
                setPasswordError(true);
            });
    }

    // Send confirmation code to user's email
    const sendCode = (e) => {
        e.preventDefault();
            Auth.forgotPassword(username)
            .then(data => {
                console.log(data)
                setConfirmation(true)
            })
            .catch(err => {
                console.log(err);
                setIncorrectEmail(true);
            });
    };

    const submitCode = (e) => {
        e.preventDefault();
        setConfirmationCode(true);
    };

    const resendCode = (e) => {
        e.preventDefault();
        Auth.forgotPassword(username);
        setDisableButton(true)

    }



  return (
<div className='flex flex-col relative h-[700px] xl:h-full w-full items-center justify-center'>
        <div className='w-full h-screen flex items-center justify-center bg-[#00000025] z-[100]'>
        {confirmation === false ? (
        <form onSubmit={sendCode} className='flex flex-col items-center w-full sm:w-3/4 lg:w-2/4 2xl:w-1/3 h-3/4'>
        <Box sx={{ width: '100%', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 40 }}>
          <Avatar src={logo} sx={{ width: 250, height: 200, }} />
        </Box>
        <h1 className=" text-xl text-white pt-4">Enter your email address</h1>
        <div className="relative z-0 focus-within:shadow-lg w-full group pt-4">
                <i className='absolute left-4 top-8 z-50 '>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-7" viewBox="0 0 20 20" fill="#2ca1db">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            </i>
            <input type='email' name='email' value={username} onChange={e => setUsername(e.target.value)} placeholder="Email Address" className='block text-md placeholder-black peer border-[1px] bg-[#f3f1f1d9] h-14 shadow-sm focus:outline-none pl-14 text-black text-md focus:border-blue-300  transform duration-150 ease-in-out w-full rounded-full' />
            <label htmlFor='email' className="absolute text-md text-[#90868600] duration-300 transform -translate-y-8 scale-100 top-10 -z-10 origin-[0] peer-focus:left-8 font-bold peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-8 peer-focus:scale-100 peer-focus:-translate-y-12 ">Email address</label>
            </div>
            <button onClick={code != '' && sendCode} className='bg-[#df2a3c] rounded-full w-4/5 mt-10 text-white font-semibold py-2 hover:scale-105 hover:font-bold transform duration-200 ease-in-out text-xl'>Send Confirmation Code</button>
            {incorrectEmail && (
                <h1 className='text-md text-red-600 font-semibold'>
                    Email does not exist in our system
                </h1>
            )}
            </form>
        )
        : confirmationCode === false &&
        <form onSubmit={submitCode} className='flex flex-col items-center w-full sm:w-3/4 lg:w-2/4 2xl:w-1/3 h-3/4'>
            <Box sx={{ width: '100%', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 40 }}>
            <Avatar src={logo} sx={{ width: 250, height: 200, }} />
            </Box>
        <h1 className=" text-xl text-white py-4">Please enter the confirmation code sent to your email</h1>
        <div className="relative z-0 focus-within:shadow-lg w-full group pt-4">
                <i className='absolute left-4 top-8 z-50 '>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-7" viewBox="0 0 20 20" fill="#2ca1db">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            </i>
            <input type='text' name='code' value={code} onChange={e => setCode(e.target.value)} placeholder="Confirmation Code" className='block text-md placeholder-black peer border-[1px] bg-[#f3f1f1d9] h-14 shadow-sm focus:outline-none pl-14 text-black text-md focus:border-blue-300  transform duration-150 ease-in-out w-full rounded-full' />
            <label htmlFor='code' className="absolute text-md text-[#90868600] duration-300 transform -translate-y-8 scale-100 top-10 -z-10 origin-[0] peer-focus:left-8 font-bold peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-8 peer-focus:scale-100 peer-focus:-translate-y-12 ">Email address</label>
            </div>
            <button onClick={submitCode} className='bg-[#df2a3c] rounded-full w-4/5 mt-10 text-white font-semibold py-2 hover:scale-105 hover:font-bold transform duration-200 ease-in-out text-xl'>Submit Confirmation Code</button>
            {disableButton === false ?
            <button onClick={resendCode} className='bg-white rounded-full w-4/5 mt-10 text-black font-semibold py-2 hover:scale-105 hover:font-bold transform duration-200 ease-in-out text-xl'>Resend Confirmation Code</button>
            :
            <button disabled className='bg-white rounded-full w-4/5 mt-10 text-black font-semibold py-2 hover:scale-105 hover:font-bold transform duration-200 ease-in-out text-xl'>Confirmation Code Sent</button>
            }
            </form>
            }
            {confirmationCode && (
        <form onSubmit={onSubmit} className='flex flex-col items-center w-full sm:w-3/4 lg:w-2/4 2xl:w-1/3 h-3/4'>
            <Box sx={{ width: '100%', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 40 }}>
                <Avatar src={logo} sx={{ width: 250, height: 200, }} />
            </Box>
            {passwordChanged === false ? 
            <h1 className=" text-xl text-white pt-4">Change password</h1>
            :
            <h1 className=" text-xl text-white pt-4">Redirecting you back to the login page</h1>
            }
            <div className="relative z-0 focus-within:shadow-lg w-full group pt-8">
                <i className='absolute left-4 top-12 z-50 '>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-7" viewBox="0 0 20 20" fill="#2ca1db">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
            </svg>
            </i>
            <input type='password' name='passwordConfirm' placeholder="Create new password" value={password} onChange={e => setPassword(e.target.value)} className='block text-md placeholder-black peer border-[1px] bg-[#f3f1f1d9] h-14 shadow-sm focus:outline-none pl-14 text-black text-md focus:border-blue-300 border-gray-700 transform duration-150 ease-in-out w-full rounded-full' />
            <label htmlFor='passwordConfirm' className="absolute text-md text-[#90868600] duration-300 transform -translate-y-8 scale-100 top-10 -z-10 origin-[0] peer-focus:left-8 font-bold peer-focus:text-[#2ca1db] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-8 peer-focus:scale-100 peer-focus:-translate-y-8 ">New Password</label>
            </div>
            <div className="relative z-0 focus-within:shadow-lg w-full group pt-8">
                <i className='absolute left-4 top-12 z-50 '>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-7" viewBox="0 0 20 20" fill="#2ca1db">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
            </svg>
            </i>
            <input type='password' name='passwordConfirm' placeholder="Confirm new password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className='block text-md placeholder-black peer border-[1px] bg-[#f3f1f1d9] h-14 shadow-sm focus:outline-none pl-14 text-black text-md focus:border-blue-300 border-gray-700 transform duration-150 ease-in-out w-full rounded-full' />
            <label htmlFor='passwordConfirm' className="absolute text-md text-[#90868600] duration-300 transform -translate-y-8 scale-100 top-10 -z-10 origin-[0] peer-focus:left-8 font-bold peer-focus:text-[#2ca1db] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-8 peer-focus:scale-100 peer-focus:-translate-y-8 ">Confirm Password</label>
            </div>
            {password != '' && password === confirmPassword ?
            <button onClick={onSubmit} className='bg-[#df2a3c] rounded-full w-4/5 mt-10 text-white font-semibold py-2 hover:scale-105 hover:font-bold transform duration-200 ease-in-out text-xl'>Change Password</button>
            :
            <button disabled className='bg-[#464545] rounded-full w-4/5 mt-10 text-white font-semibold py-2 hover:scale-105 hover:font-bold transform duration-200 ease-in-out text-xl'>Passwords must match</button>
            }
            {passwordError === true && 
                <h1 className='font-semibold text-md z-50 text-[#df2a3c] mt-2'>Password does not meet the requirements. Password must be at least 8 characters long. Must have 1 upper case letter. Must have 1 lowercase letter. Must have at least 1 number.</h1>
            }
        </form>

            )}
    </div>
        <Typography variant='body2' sx={{ position: 'absolute', bottom: 15, right: 30, whiteSpace: 'nowrap', zIndex: 50, color: 'white' }}>
        &copy; Valor Enterprises, LLC | All Rights Reserved
        </Typography>
        <Box sx={{ position: 'absolute', width: '100%', height: '100%', top: 0, bgcolor: '#0000002e', zIndex: 1 }} />
              <img src={background} style={{ position: 'absolute', width: '100%', height: '100%', top: 0, filter: 'opacity(.8)' }} />
      </div>
  )
}

export default ChangePassword