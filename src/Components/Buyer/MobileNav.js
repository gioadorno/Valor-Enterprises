import { Box, IconButton, Avatar, Tooltip, Menu, MenuItem, BottomNavigation, BottomNavigationAction } from '@mui/material';
import { useState } from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { ListItemIcon } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import HomeIcon from '@mui/icons-material/Home';
import MapIcon from '@mui/icons-material/Map';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';


const MobileNav = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const navigate = useNavigate();
    const dispatch = useDispatch();
const [anchorElUser, setAnchorElUser] = useState(null);
// const [ status, setStatus ] = useState({ status: 'InActive' });
const [value, setValue] = useState(0);

const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
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
        <BottomNavigation sx={{ position: 'fixed' , bottom: 0, left: 0, right: 0, backgroundColor: '#ffffffeb', width: { xs: '100%' }, zIndex: '50', alignItems: 'center', justifyContent: 'space-around', display: { xs: 'flex', sm: 'none' }, boxShadow: '3', py: '0.5' }} showLabels value={value} onChange={(event, newValue) => {setValue(newValue)}} >
        <BottomNavigationAction onClick={() => navigate('/dashboard')}  sx={{ color: '#048fb9' }} label='Dashboard' icon={<HomeIcon fontSize='large' sx={{ color: '#048fb9' }} />} />
        <BottomNavigationAction onClick={() => navigate('/propertymap')} sx={{ whiteSpace: 'nowrap', color: '#048fb9', ml: 3  }} label='Map' icon={<MapIcon fontSize='large' sx={{ color: '#048fb9', }}/>} />
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ pr: 1 }}>
                {user?.result?.name ? 
                <Avatar sx={{ width: 50, height: 50 }} alt={user.result.name} src={user.result.profilePhoto} />  
                :  
                <Avatar sx={{ width: 50, height: 50 }} alt="Keyglee" src="/static/images/avatar/2.jpg" />
            }
            </IconButton>
            </Tooltip>
            <Menu
            sx={{ marginBottom: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
                horizontal: 'right',
                vertical: 'top'
            }}
            keepMounted
            transformOrigin={{
                vertical: 'bottom',
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
        </BottomNavigation>
  )
}

export default MobileNav