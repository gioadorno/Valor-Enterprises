import { Box, AppBar,  Container, ButtonGroup, Button, Avatar, Tooltip, Menu, MenuItem, ListItemIcon, Typography, IconButton  } from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import React, { useContext, useState, useEffect } from 'react';
import { AccountContext } from "../../../../Login/Account";
import { useNavigate } from "react-router-dom";
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { Storage, Auth } from 'aws-amplify';

const Header = ({ prop }) => {
    const pathname = window.location.pathname;
    const { logout } = useContext(AccountContext);
    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [profilePhoto, setProfilePhoto] = useState('');
    const [ employee, setEmployee ] = useState('');

    const getSession = async () => {
        await Auth.currentAuthenticatedUser().then((user) => {
            setEmployee(user)
        })
        .catch(() => {
            navigate('/');
            // setLoggedIn(false)
        });
    };
    useEffect(() => {
        getSession()
    },[employee])

    useEffect(() => {
      Storage.get(employee?.attributes?.picture, {
          download: false
      }).then(image => setProfilePhoto(image))
  },[])
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const openProfile = () => {
        navigate(`/profile/${employee.username}`)
      }

    const logoutClick = () => {
            logout()
      };

  return (
    <div className='w-full'>
        <AppBar sx={{ zIndex: 50, boxShadow: 5, backgroundColor: 'white', position: 'sticky', display: { xs: 'none', sm: 'flex' }, width: '100%', top: 0, alignItems: 'center', justifyContent: 'center', height: '5em' }}>
            <div className='flex w-full'>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ButtonGroup sx={{ display: 'flex', justifyContent: 'space-evenly', }}>
                            <Button onClick={() => navigate('/internal')} sx={{ fontSize: 13, letterSpacing: 1, px: 2, "&:hover": { transform: 'scale(1.05)' }, color: '#1976d2' }} variant='text'>
                            Back to Properties
                        </Button>
                        <Button onClick={() => navigate(`/acquisitions/${prop?.id}`)} sx={{ fontSize: 13, letterSpacing: 1, px: 2, "&:hover": { transform: 'scale(1.05)' }, color: `${pathname === `/acquisitions/${prop?.id}` ? 'red' : '#1976d2'}`  }} variant='text'>
                            Property Details
                        </Button>
                        <Button onClick={() => navigate(`/dealtext/${prop?.id}`)} sx={{ fontSize: 13, letterSpacing: 1, px: 2, "&:hover": { transform: 'scale(1.05)' }, color: `${pathname === `/dealtext/${prop?.id}` ? 'red' : '#1976d2'}`  }} variant='text'>
                            Deal Text
                        </Button>
                        {/* {employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Operations') >= 0 &&
                        <Button onClick={() => navigate(`/emailblast/${prop?.id}`)} sx={{ fontSize: 13, letterSpacing: 1, px: 2, "&:hover": { transform: 'scale(1.05)' }, color: `${pathname === `/emailblast/${prop?.id}` ? 'red' : '#1976d2'}` }} variant='text'>
                            Email Blast
                        </Button>
                        } */}
                    </ButtonGroup>
                </Box>
                <Box sx={{ display: { sm: 'none' , md: 'flex' }, justifyContent: 'center' }} flexGrow={1}>
                    {/* <Typography sx={{ color: '#1ea1ff' }} variant='h4' component='h5'>
                        KeylgeeDispo
                    </Typography> */}
                </Box>
                {/* <Box sx={{ flexGrow: 0, pr: 3, display: 'flex', alignItems: 'center' }}>
                <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar sx={{ "&:hover": { transform: 'scale(1.2)' } }} src={profilePhoto} />  
                </IconButton>
                </Tooltip>
                <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                >

                        <>
                        <MenuItem onClick={openProfile}>
                            <ListItemIcon>
                                <Settings fontSize="small" />
                            </ListItemIcon>
                            Profile
                        </MenuItem>  
                        <MenuItem onClick={() => navigate('/acquisitions')}>
                            <ListItemIcon>
                            <DashboardIcon fontSize="small" />
                            </ListItemIcon>
                            Home
                        </MenuItem>  
                        <MenuItem onClick={logoutClick}>
                            <ListItemIcon>
                            <Logout fontSize="small" />
                            </ListItemIcon>
                            Logout
                        </MenuItem>  
                        </>

                </Menu>
                </Box> */}
            </div>
        </AppBar>
    </div>
  )
}

export default Header