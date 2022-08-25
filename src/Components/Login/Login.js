import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useContext } from "react";
import { AccountContext } from './Account';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Avatar, Box, Typography } from "@mui/material";
import logo from './Valor Logo.png'
import background from './resetBackground.jpg';
import ChangePassword from './ChangePassword';
import Status from './Status';
import { Auth } from 'aws-amplify';
import NewPassword from './NewPassword';


const Login = () => {
  // const { route } = useAuthenticator((context) => [context.route]);
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
;    const location = useLocation();
    const navigate = useNavigate();

    const { authenticate, userChangePassword, setUserChangePassword, setUserName, invalid } = useContext(AccountContext);

  //   let from = location.state?.from?.pathname || '/';
  // useEffect(() => {
  //   if (route === 'authenticated') {
  //     navigate(from, { replace: true });
  //   }
  // }, [route, navigate, from]);


  const login = (e) => {
    e.preventDefault();
    authenticate(email, password);
  };




  return (
    userChangePassword === false ?
      <div className='flex flex-col relative h-[800px] xl:h-full w-full items-center justify-center'>
        <h1 onClick={() => navigate('/careers')} className='absolute left-5 font-sans bottom-4 text-white text-md cursor-pointer hover:animate-pulse hover:scale-105 transform duration-200 ease-in drop-shadow-md z-[500] whitespace-nowrap'>Careers Page</h1>
        <div className='w-full h-screen flex items-center justify-center bg-[#00000025] z-[100] overflow-y-auto'>
        <form onSubmit={login} className='flex flex-col items-center w-full sm:w-3/4 lg:w-2/4 2xl:w-1/3 h-3/4'>
        <Box sx={{ width: '100%', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 40, pt: 5, pb: 5 }}>
          {/* <Status /> */}
          <Avatar src={logo} sx={{ width: 230, height: 200, }} />
        </Box>
            <div className="relative z-0 focus-within:shadow-lg w-full group pt-4">
                <i className='absolute left-4 top-8 z-50 '>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-7" viewBox="0 0 20 20" fill="#2ca1db">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            </i>
            <input type='email' name='email' value={email} onChange={e => setEmail(e.target.value)} placeholder="Email Address" className='block text-md placeholder-black peer border-[1px] bg-[#f3f1f1d9] h-14 shadow-sm focus:outline-none pl-14 text-black text-md focus:border-blue-300  transform duration-150 ease-in-out w-full rounded-full' />
            <label htmlFor='email' className="absolute text-md text-[#90868600] duration-300 transform -translate-y-8 scale-100 top-10 -z-10 origin-[0] peer-focus:left-8 font-bold peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-8 peer-focus:scale-100 peer-focus:-translate-y-12 ">Email address</label>
            </div>
            <div className="relative z-0 focus-within:shadow-lg w-full group pt-8">
                <i className='absolute left-4 top-12 z-50 '>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-7" viewBox="0 0 20 20" fill="#2ca1db">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </i>
            <input type='password' name='password' placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className='block text-md placeholder-black peer border-[1px] bg-[#f3f1f1d9] h-14 shadow-sm focus:outline-none pl-14 text-black text-md focus:border-blue-300 border-gray-700 transform duration-150 ease-in-out w-full rounded-full' />
            <label htmlFor='email' className="absolute text-md text-[#90868600] duration-300 transform -translate-y-8 scale-100 top-10 -z-10 origin-[0] peer-focus:left-8 font-bold peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-8 peer-focus:scale-100 peer-focus:-translate-y-8 ">Password</label>
            </div>
            {invalid === true && <h1 className='font-semibold text-md z-50 text-[#df2a3c] mt-2'>Incorrect email or password</h1>}
            <button className='bg-[#df2a3c] rounded-full w-4/5 mt-10 text-white font-semibold py-2 hover:scale-105 hover:font-bold transform duration-200 ease-in-out text-xl'>Login</button>
            <div onClick={login} className='flex justify-center items-center w-4/5  py-3 px-2'>
                <button onClick={() => navigate('/resetpassword')} className='font-md px-3 mt-2 text-gray-200 hover:scale-105 transform duration-150 ease-in'>
                    Forgot password
                </button>
                {/* <button className='font-sm text-gray-200 hover:scale-105 transform duration-150 ease-in'>
                    Don't have an account? Click here.
                </button> */}
            </div>
            {/* <div className='border-b-[1px] border-white w-full mt-5' /> */}
        </form>
    </div>
        <Typography variant='body2' sx={{ position: 'absolute', bottom: 15, right: 30, whiteSpace: 'nowrap', zIndex: 50, color: 'white' }}>
        &copy; Valor Enterprises, LLC | All Rights Reserved
        </Typography>
        <Box sx={{ position: 'absolute', width: '100%', height: '100%', top: 0, bgcolor: '#0000002e', zIndex: 1 }} />
              <img src={background} style={{ position: 'absolute', width: '100%', height: '100%', top: 0, filter: 'opacity(.8)' }} />
      </div>
      :
      <NewPassword />
  )
}

export default Login