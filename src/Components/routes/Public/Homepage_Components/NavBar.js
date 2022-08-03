import { AppBar, Box, Toolbar, IconButton, ButtonGroup, Button, Typography, Container, Avatar, Tooltip, Menu, MenuItem, ListItemIcon } from '@mui/material';
import { forwardRef, useMemo, useState, useEffect } from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GroupsIcon from '@mui/icons-material/Groups';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateEmployee } from '../../../../actions/employees';
import PropTypes from 'prop-types';
import HomeIcon from '@mui/icons-material/Home';
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
import logo from './logo512.png';


const NavBar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const navigate = useNavigate();
    const dispatch = useDispatch();
const [anchorElNav, setAnchorElNav] = useState(null);
const [anchorElUser, setAnchorElUser] = useState(null);
const [ status, setStatus ] = useState({ status: 'InActive' });


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

const openEmployeeProfile = () => {
    navigate(`/profile/${user.result._id}`)
  }

const openProfile = () => {
    navigate(`/buyerprofile/${user.result._id}`)
  }

const logoutClick = () => {
    dispatch({ type: 'LOGOUT' })
  
    navigate('/');
  
    setUser(null);
  };
    
function ButtonLink(props) {
const { icon, primary, to, placement, title } = props;


const renderLink = useMemo(
    () =>
    forwardRef(function Link(itemProps, ref) {
        return <RouterLink to={to} ref={ref} {...itemProps} role={undefined} />;
    }),
    [to],
);

return (
        <Tooltip placement={placement} title={title}>
            <Button sx={{ mr: 2, "&:hover": { transform: 'scale(1.1)' } }} size='medium' variant='text' onClick={() => navigate(to)} startIcon={icon}>
                    {title}
            </Button>
        </Tooltip>
    );
}

    ButtonLink.propTypes = {
        icon: PropTypes.element,
        primary: PropTypes.string.isRequired,
        to: PropTypes.string.isRequired,
        };
        

        
  return (
    <AppBar sx={{ position: { sm: 'initial' }, bottom: { xs: '0em' }, display: { xs: 'none', sm: 'inline-flex' }, backgroundColor: { xs: "#00000094", sm: '#ffffffa6' }, width: { xs: '100%', sm: '60%' }, zIndex: '50', top: { xs: null, sm: '0em' }, alignItems: 'center', justifyContent: 'center', boxShadow: '4', m: 2, borderRadius: '1em'  }}>
            <Container maxWidth='2xl'>
                <Toolbar disableGutters>
                <Box sx={{ flexGrow: 1, alignItems: 'center', display: 'flex', justifyContent: 'flex-start' }}>
                    <ButtonGroup >
                        <ButtonLink title='Home' to='/' icon={ <HomeIcon /> } />
                        <ButtonLink title='Submit a Property' to='/submitproperty' icon={ <AssignmentIcon /> } />
                        <ButtonLink title='Careers' to='/careers' icon={ <GroupsIcon /> } />
                    </ButtonGroup>
                
                    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center'  }}>
                        {/* <Typography
                            component="div"
                            variant="h4"
                            color="black"
                            noWrap
                            sx={{ mr: 33, display: { xs: 'none', md: 'flex' } }}
                        >
                            KeygleeDispo
                        </Typography> */}
                        <Box sx={{ display: { xs: 'none', xl: 'flex' } }}>
                            <img style={{ width: '3em', height: '3em', marginRight: '16em' }} src={logo} /> 
                        </Box>
                    </Box>
            <Box sx={{ flexGrow: 0 }}>
            <ButtonLink title='Support' to='/support' icon={ <ContactSupportIcon /> } />
                <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {user?.result?.name ? 
                    <Avatar sx={{ "&:hover": { transform: 'scale(1.2)' } }} alt={user.result.name} src={user.result.profilePhoto} />  
                    :  
                    <Avatar sx={{ "&:hover": { transform: 'scale(1.2)' } }} alt="Keyglee" src="/static/images/avatar/2.jpg" />
                }
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
                    {user?.result?.accountLevel === 'Employee' ? (
                        <>
                        <MenuItem onClick={openEmployeeProfile}>
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
                    ) : 
                    <>
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
                    </>
                }
            
                </Menu>
                </Box>
                </Box>
                </Toolbar>          
            </Container>
            
            
    </AppBar>
  )
}

export default NavBar