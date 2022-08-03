import { Box, AppBar,  Container, ButtonGroup, Button, Avatar, Tooltip, Menu, MenuItem, ListItemIcon, Typography, IconButton  } from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';


const NavBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
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
        navigate(`/buyerprofile/${user.result._id}`)
      }

    const logoutClick = () => {
        dispatch({ type: 'LOGOUT' })
      
        navigate('/');
      
        setUser(null);
      };
  return (
    <div style={{ width: '100%' }}>
        <AppBar sx={{ zIndex: 50, boxShadow: 5, backgroundColor: 'white', position: 'sticky', display: { xs: 'none', sm: 'flex' }, width: '100%', top: 0, alignItems: 'center', justifyContent: 'center', height: '5em' }}>
            <Container sx={{ display: 'flex' }} maxWidth='2xl'>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ButtonGroup sx={{ display: 'flex', justifyContent: 'space-evenly', }}>
                        <Button onClick={() => navigate('/dashboard')} sx={{ fontSize: 16, letterSpacing: 1, px: 2, "&:hover": { transform: 'scale(1.1)' }, color: '#1976d2' }} variant='text'>
                            Home
                        </Button>
                        <Button onClick={() => navigate('/propertymap?page=1')} sx={{ fontSize: 16, letterSpacing: 1, px: 2, "&:hover": { transform: 'scale(1.1)' }, color: '#1976d2' }} variant='text'>
                            Map
                        </Button>
                    </ButtonGroup>
                </Box>
                <Box sx={{ display: { sm: 'none' , md: 'flex' }, justifyContent: 'center', pl: 15 }} flexGrow={1}>
                    <Typography sx={{ color: '#1ea1ff' }} variant='h4' component='h5'>
                        KeylgeeDispo
                    </Typography>
                </Box>
                <Box sx={{ flexGrow: 0, pr: 3, display: 'flex', alignItems: 'center' }}>
                    <Typography variant='h6' component='h6' sx={{ mr: 2, color: 'black' }}>
                        Welcome {user.result.name}
                    </Typography>
                <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar sx={{ "&:hover": { transform: 'scale(1.2)' } }} alt={user.result.name} src={user.result.profilePhoto} />  
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
                    {user?.result?.accountLevel === 'Buyer' && (
                        <>
                        <MenuItem onClick={openProfile}>
                            <ListItemIcon>
                                <Settings fontSize="small" />
                            </ListItemIcon>
                            Profile
                        </MenuItem>  
                        <MenuItem onClick={() => navigate('/dashboard')}>
                            <ListItemIcon>
                            <DashboardIcon fontSize="small" />
                            </ListItemIcon>
                            Dashboard
                        </MenuItem>  
                        <MenuItem onClick={logoutClick}>
                            <ListItemIcon>
                            <Logout fontSize="small" />
                            </ListItemIcon>
                            Logout
                        </MenuItem>  
                        </>
                    ) 
                }
                </Menu>
                </Box>
            </Container>
        </AppBar>
    </div>
  )
}

export default NavBar