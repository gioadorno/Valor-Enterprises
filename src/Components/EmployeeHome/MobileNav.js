import { AppBar, Box, Toolbar, IconButton, ButtonGroup, Button, Typography, Container, Avatar, Tooltip, Menu, MenuItem, BottomNavigation, BottomNavigationAction } from '@mui/material';
import { forwardRef, useMemo, useState } from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { ListItemIcon } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateEmployee } from '../../actions/employees';
import PeopleIcon from '@mui/icons-material/People';
import PropTypes from 'prop-types';
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import MapIcon from '@mui/icons-material/Map';
import AssignmentIcon from '@mui/icons-material/Assignment';
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
const [anchorElReports, setAnchorElReports] = useState(null);
const [ status, setStatus ] = useState({ status: 'InActive' });
const [value, setValue] = useState(0);

const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
};

const handleOpenReportsMenu = (event) => {
    setAnchorElReports(event.currentTarget);
};

const handleCloseReportsMenu = () => {
    setAnchorElReports(null);
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
        <BottomNavigation sx={{ position: 'fixed' , bottom: 0, backgroundColor: '#ffffffeb', width: { xs: '100%' }, zIndex: '50', alignItems: 'center', justifyContent: 'center', display: { xs: 'flex', sm: 'none' }, boxShadow: '3', }} showLabels value={value} onChange={(event, newValue) => {setValue(newValue)}} >
        <BottomNavigationAction onClick={() => navigate('/map')}  sx={{ color: '#048fb9' }} label='Map' icon={<MapIcon sx={{ color: '#048fb9' }} />} />
        <BottomNavigationAction onClick={() => navigate('/acquisitions')} sx={{ whiteSpace: 'nowrap', color: '#048fb9'  }} label='Properties' icon={<HomeIcon sx={{ color: '#048fb9' }}/>} />

        <Box sx={{ flexGrow: 0, m: 2 }}>
            <BottomNavigationAction onClick={handleOpenReportsMenu} sx={{ color: '#048fb9' }} showLabel label='Reports' icon={<AssignmentIcon sx={{ color: '#048fb9' }} />} />
            <Menu
            sx={{ marginBottom: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElReports}
            anchorOrigin={{
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            open={Boolean(anchorElReports)}
            onClose={handleCloseReportsMenu}
            >
            <MenuItem onClick={() => navigate('/callreports')}>
                <ListItemIcon>
                    <Settings fontSize="small" />
                </ListItemIcon>
                Calls/Texts
            </MenuItem>  
            <MenuItem onClick={() => navigate('/opportunityreports')}>
                <ListItemIcon>
                    <DashboardIcon fontSize="small" />
                </ListItemIcon>
                Opportunities
            </MenuItem>  
            </Menu>
        </Box>
        
        <Box sx={{ flexGrow: 0, m: 1 }}>
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
                {user?.result?.accountLevel === 'Employee' && (
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
                    {user.result.securityLevel === 'System Administrator' && (
                    <MenuItem onClick={() => navigate('/users')}>
                        <ListItemIcon>
                            <GroupsIcon fontSize="small" />
                        </ListItemIcon>
                        Employees
                    </MenuItem>  
                    )}
                    {user.result.securityLevel === 'HR' || user.result.securityLevel === 'System Administrator' && (
                    <MenuItem onClick={() => navigate('/hr/applications')}>
                        <ListItemIcon>
                            <PeopleIcon fontSize="small" />
                        </ListItemIcon>
                        Applications
                    </MenuItem>  
                    )}
                    <MenuItem onClick={logoutClickEmployee}>
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