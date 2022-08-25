import { AppBar, Box, Toolbar, IconButton, ButtonGroup, Button, Typography, Container, Avatar, Tooltip, Menu, MenuItem, BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import React, { useContext, useState, useEffect } from 'react';
import { AccountContext } from '../Login/Account';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { ListItemIcon } from '@mui/material';
import { useNavigate } from 'react-router-dom';
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
import { Auth, API, Storage } from 'aws-amplify';


const MobileNav = () => {
    const { logout, employee } = useContext(AccountContext);
    const navigate = useNavigate();
const [anchorElNav, setAnchorElNav] = useState(null);
const [anchorElUser, setAnchorElUser] = useState(null);
const [anchorElReports, setAnchorElReports] = useState(null);
const [ status, setStatus ] = useState({ status: 'InActive' });
const [value, setValue] = useState(0);
const [profilePhoto, setProfilePhoto] = useState('');

useEffect(() => {
    Storage.get(employee?.attributes?.picture, {
        download: false
    }).then(image => setProfilePhoto(image))
},[])

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
    logout()
};

const openProfile = () => {
    navigate(`/profile/${user.result._id}`)
  }

    

        
  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: '#ffffffeb', zIndex: '50', display: { xs: 'box', sm: 'none' } }} elevation={3}>

        <BottomNavigation showLabels value={value} onChange={(event, newValue) => {setValue(newValue)}} >
        <BottomNavigationAction onClick={() => navigate('/inventory')}  sx={{ color: '#048fb9' }} label='Inventory' icon={<MapIcon sx={{ color: '#048fb9' }} />} />
        <BottomNavigationAction onClick={() => navigate('/acquisitions')} sx={{ whiteSpace: 'nowrap', color: '#048fb9'  }} label='Properties' icon={<HomeIcon sx={{ color: '#048fb9' }}/>} />

        <Box sx={{ flexGrow: 0, m: 0, padding: 0 }}>
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
                <Avatar sx={{ fontSize: '35px' }} alt='Valor' src={profilePhoto} />  
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
                        Properties
                    </MenuItem>
                    <MenuItem onClick={logoutClickEmployee}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>  
        
            </Menu>
        </Box>
        </BottomNavigation>
    </Paper>
  )
}

export default MobileNav