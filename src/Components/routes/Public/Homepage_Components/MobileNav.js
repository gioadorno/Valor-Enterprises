import { Box, IconButton, Avatar, Tooltip, Menu, MenuItem, ListItemIcon, BottomNavigation, BottomNavigationAction } from '@mui/material';
import { useState, Fragment } from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateEmployee } from '../../../../actions/employees';
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import {
    Link as RouterLink,
    Route,
    Routes,
    MemoryRouter,
    useLocation,
} from 'react-router-dom';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';


const MobileNav = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const navigate = useNavigate();
    const dispatch = useDispatch();
const [anchorElNav, setAnchorElNav] = useState(null);
const [anchorElUser, setAnchorElUser] = useState(null);
const [ status, setStatus ] = useState({ status: 'InActive' });
const [value, setValue] = useState(0);

const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
};

const handleCloseNavMenu = () => {
    setAnchorElNav(null);
};

const handleCloseUserMenu = () => {
    setAnchorElUser(null);
};



// Logout Function
const logoutClickEmployee = () => {
  dispatch(updateEmployee(user.result._id, status))
  dispatch({ type: 'LOGOUT' })

  navigate('/');

  setUser(null);
};

const openProfile = () => {
    navigate(`/profile/${user.result._id}`)
  }

const logoutClick = () => {
    dispatch({ type: 'LOGOUT' })
  
    navigate('/');
  
    setUser(null);
  };
    

        
  return (
        <BottomNavigation sx={{ position: 'fixed' , bottom: 0, backgroundColor: '#ffffffeb', width: { xs: '100%' }, zIndex: '50', alignItems: 'center', justifyContent: 'space-between', display: { xs: 'flex', sm: 'none' }, boxShadow: '3' }} showLabels value={value} onChange={(event, newValue) => {setValue(newValue)}} >
        <BottomNavigationAction onClick={() => navigate('/')} sx={{ color: '#048fb9' }} label='Home' icon={<HomeIcon sx={{ color: '#048fb9' }} />} />
        <BottomNavigationAction onClick={() => navigate('/submitproperty')} sx={{ whiteSpace: 'nowrap', color: '#048fb9'  }} label='Submit a Property' icon={<AssignmentIcon sx={{ color: '#048fb9' }}/>} />
        <BottomNavigationAction onClick={() => navigate('/careers')} sx={{ color: '#048fb9' }} label='Careers' icon={<GroupsIcon sx={{ color: '#048fb9' }} />} />
        <Box sx={{ flexGrow: 0, mr: 2, pl: 1 }}>
            <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {user?.result?.name ? 
                <Avatar sx={{ fontSize: '35px' }} alt={user.result.name} src={user.result.profilePhoto} />  
                :  
                <Avatar sx={{ fontSize: '35px' }} alt="Keyglee" src="/static/images/avatar/2.jpg" />
            }
            </IconButton>
            </Tooltip>
            <Menu
            sx={{ marginBottom: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
            >
                {user?.result?.accountLevel === 'Employee' ? (
                    <>
                    <MenuItem onClick={openProfile}>
                        <ListItemIcon>
                            <Settings fontSize="small" />
                        </ListItemIcon>
                        Profile
                    </MenuItem>  
                    <MenuItem onClick={() => navigate('/employeedashboard')}>
                        <ListItemIcon>
                          <DashboardIcon fontSize="small" />
                        </ListItemIcon>
                        Dashboard
                    </MenuItem>  
                    <MenuItem onClick={logoutClickEmployee}>
                        <ListItemIcon>
                          <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>  
                    </>
                ) : user?.result?.accountLevel === 'Buyer' ?
                (
                    <>
                    <MenuItem onClick={() => navigate(`/buyerprofile/${user.result._id}`)}>
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
                    <MenuItem onClick={() => navigate('/support')}>
                        <ListItemIcon>
                          <ContactSupportIcon fontSize="small" />
                        </ListItemIcon>
                        Support
                    </MenuItem> 
                    <MenuItem onClick={logoutClick}>
                        <ListItemIcon>
                          <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                    </>
                ) : 
                <Fragment>
                    <MenuItem onClick={() => navigate('/user/login')}>
                        <ListItemIcon>
                            <DashboardIcon fontSize="small" />
                        </ListItemIcon>
                        Employee Login
                    </MenuItem>  
                    <MenuItem onClick={() => navigate('/buyerlogin')}>
                        <ListItemIcon>
                        <DashboardIcon fontSize="small" />
                        </ListItemIcon>
                        Buyer Login
                    </MenuItem>  
                    <MenuItem onClick={() => navigate('/support')}>
                            <ListItemIcon>
                            <ContactSupportIcon fontSize="small" />
                            </ListItemIcon>
                            Support
                    </MenuItem> 
                </Fragment>
            }
           
            </Menu>
        </Box>
        </BottomNavigation>
  )
}

export default MobileNav