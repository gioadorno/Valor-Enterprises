import React, { useContext, useState, useEffect } from 'react';
import { AccountContext } from '../Login/Account';
import { Box, Avatar, Typography } from "@mui/material";
import logo from './Valor Logo.png'
import background from './changepasswordbackground.jpg';
import { useNavigate } from "react-router-dom";
import { Auth } from 'aws-amplify';

const NewPassword = () => {
    const navigate = useNavigate();
    const [ password, setPassword ] = useState('');
    const [ newPassword, setNewPassword ] = useState('');
    const [ noMatch, setNoMatch ] = useState('');
    const [ require, setRequire ] = useState(false);

    const { employee, setUserChangePassword, setLoggedIn } = useContext(AccountContext);

    const onSubmit = (e) => {
        e.preventDefault();
        Auth.completeNewPassword(
            employee,               // the Cognito User Object
            newPassword,       // the new password
            // OPTIONAL, the required attributes
            // {
            //   email: 'xxxx@example.com',
            //   phone_number: '1234567890'
            // }
        ).then(user => {
            setLoggedIn(true);
            navigate('/acquisitions');
        }).catch(e => {
            setRequire(true)
        });
    };


  return (
<div className='flex flex-col relative h-[700px] xl:h-full w-full items-center justify-center'>
        <div className='w-full h-screen flex items-center justify-center bg-[#00000025] z-[100]'>
        <form onSubmit={onSubmit} className='flex flex-col items-center w-full sm:w-3/4 lg:w-2/4 2xl:w-1/3 h-3/4'>
        <Box sx={{ width: '100%', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 40 }}>
          <Avatar src={logo} sx={{ width: 250, height: 200, }} />
        </Box>
        <h1 className=" text-xl text-white pt-4">Create a New Password</h1>
        
            <div className="relative z-0 focus-within:shadow-lg w-full group pt-8">
                <i className='absolute left-4 top-12 z-50 '>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-7" viewBox="0 0 20 20" fill="#2ca1db">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
            </svg>
            </i>
            <input type='password' name='passwordConfirm' placeholder="New password" value={password} onChange={e => setPassword(e.target.value)} className='block text-md placeholder-black peer border-[1px] bg-[#f3f1f1d9] h-14 shadow-sm focus:outline-none pl-14 text-black text-md focus:border-blue-300 border-gray-700 transform duration-150 ease-in-out w-full rounded-full' />
            <label htmlFor='passwordConfirm' className="absolute text-md text-[#90868600] duration-300 transform -translate-y-8 scale-100 top-10 -z-10 origin-[0] peer-focus:left-8 font-bold peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-8 peer-focus:scale-100 peer-focus:-translate-y-8 ">New Password</label>
            </div>
            <div className="relative z-0 focus-within:shadow-lg w-full group pt-8">
                <i className='absolute left-4 top-12 z-50 '>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-7" viewBox="0 0 20 20" fill="#2ca1db">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
            </svg>
            </i>
            <input type='password' name='passwordConfirm' placeholder="Confirm new password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className='block text-md placeholder-black peer border-[1px] bg-[#f3f1f1d9] h-14 shadow-sm focus:outline-none pl-14 text-black text-md focus:border-blue-300 border-gray-700 transform duration-150 ease-in-out w-full rounded-full' />
            <label htmlFor='passwordConfirm' className="absolute text-md text-[#90868600] duration-300 transform -translate-y-8 scale-100 top-10 -z-10 origin-[0] peer-focus:left-8 font-bold peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-8 peer-focus:scale-100 peer-focus:-translate-y-8 ">Confirm Password</label>
            </div>
            {newPassword.length >= 8 && password === newPassword ?
            <button onClick={onSubmit} className='bg-[#df2a3c] rounded-full w-4/5 mt-10 text-white font-semibold py-2 hover:scale-105 hover:font-bold transform duration-200 ease-in-out text-xl'>Change Password</button>
            :
            <button className='bg-[#5d5d5d] border-2 border-black rounded-full w-4/5 mt-10 text-white font-semibold py-2 hover:scale-105 hover:font-bold transform duration-200 ease-in-out text-xl'>Requirements must be met</button>
            }
            {noMatch != '' && (
                <h1 className='text-red-500 font-semibold text-xl text-center'>{noMatch}</h1>
            )}
            {newPassword.length < 8 && (
                <h1 className='text-red-500 font-semibold text-xl text-center'>Password must contain at least 8 characters</h1>
            )}
        </form>
    </div>
        <Typography variant='body2' sx={{ position: 'absolute', bottom: 15, right: 30, whiteSpace: 'nowrap', zIndex: 50, color: 'white' }}>
        &copy; Valor Enterprises, LLC | All Rights Reserved
        </Typography>
        <Box sx={{ position: 'absolute', width: '100%', height: '100%', top: 0, bgcolor: '#0000002e', zIndex: 1 }} />
              <img src={background} style={{ position: 'absolute', width: '100%', height: '100%', top: 0, filter: 'opacity(.8)' }} />
      </div>
  )
}

export default NewPassword