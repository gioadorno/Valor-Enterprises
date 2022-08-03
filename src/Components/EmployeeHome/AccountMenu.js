import React, { useContext, useState, useEffect } from 'react';
import { AccountContext } from '../Login/Account';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import Settings from '@mui/icons-material/Settings';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Logout from '@mui/icons-material/Logout';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import { updateEmployee } from '../../actions/employees';
import Login from '../Login/Login';
import handbook from './Handbook.pdf';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Modal } from '@mui/material';
import { Storage } from 'aws-amplify';
import { Auth, API } from 'aws-amplify';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

export default function AccountMenu() {
  const { logout, employee } = useContext(AccountContext);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [ openHandbook, setOpenHandbook ] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState('');
  useEffect(() => {
    Storage.get(employee?.attributes?.picture, {
        download: false
    }).then(image => setProfilePhoto(image))
},[])
  const open = Boolean(anchorEl);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const openProfile = () => {
    navigate(`/profile/${employee.username}`)
  };
  const openBook = () => {
    setOpenHandbook(true)
  };
  const signOut = () => {
    logout()
  };


  return (
    <React.Fragment>
          <Modal sx={{ display: 'flex', alignItems: 'center', width: '100%', height: '100%', justifyContent: 'center' }} onClose={() => setOpenHandbook(false)} open={openHandbook}>
            <object data={handbook} type='application/pdf' width='80%' height='100%'>
                  <Typography>Employee Handbook</Typography>
            </object>
        </Modal>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Stack direction="row" spacing={2}>
                    <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant="dot"
              >
            <Avatar src={profilePhoto} sx={{ width: 32, height: 32 }}/>
            </StyledBadge>
            </Stack>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={openProfile}>
          <Avatar src={profilePhoto} /> Profile
        </MenuItem>
        {/* <MenuItem>
          <Avatar /> My account
        </MenuItem> */}
        <Divider />
        {/* Stats */}
        <MenuItem onClick={openBook}>
          <ListItemIcon>
            <MenuBookIcon fontSize="small" />
          </ListItemIcon>
          Employee Handbook
        </MenuItem>
        {/* <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem> */}
        <MenuItem onClick={signOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}