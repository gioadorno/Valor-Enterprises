import { styled, createTheme, ThemeProvider, alpha } from '@mui/material/styles';
import OuterBar from '../OuterBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { CircularProgress } from '@mui/material';
import { Modal, Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import Grow from '@mui/material/Grow';
import Box from '@mui/material/Box';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AodIcon from '@mui/icons-material/Aod';
import ArticleIcon from '@mui/icons-material/Article';
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getProps } from '../../../actions/properties';
import Paginate from './Pagination';
import { useLocation, useNavigate } from "react-router-dom";
import useStyles from './styles';
import { getUsers } from '../../../actions/employees';
import Users from './Users';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import NotAuthorized from '../NotAuthorized';
import MobileNav from '../MobileNav';

function useQuery() {
    return new URLSearchParams(useLocation().search)
}


const Employees = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('profile'));

    
    const query = useQuery();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');

    const dispatch = useDispatch();

    const classes = useStyles();
        useEffect(() => {
        dispatch(getUsers());
    }, []);
    
    const {employees} = useSelector((state) => state.employees)
    
    const actions = [
        { icon: <PersonAddAltIcon onClick={() => navigate(`/createuser`)} />, name: 'Create User'},
      ];

      if(!user?.result?.name || user?.result?.securityLevel != 'System Administrator' && 'HR') {
        return (
            <NotAuthorized />
        )
    };

  return (
    <Box sx={{ display: 'flex' }}>
            <OuterBar />
            <Container maxWidth="xl" sx={{ mt: 8, mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', flexWrap: 'wrap' }} >
                <Toolbar sx={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <Paginate page={page} />
                <Box sx={{ position: 'absolute', right: 3, top: 12, height: 320, zIndex: '5' }}>
                    <SpeedDial
                        ariaLabel="Forms"
                        icon={<SpeedDialIcon />}
                        direction='down'
                        
                    >
                        {actions.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                        />
                        ))}
                    </SpeedDial>
                </Box>
                </Toolbar>
                <Grow in>
                    <Grid mt={2} className={classes.propertyContainer} container justify='space-between' alignItems='center' spacing={4}>
                            <Users employees={employees} />
                    </Grid>
                </Grow>
            </Container>
            <MobileNav />
        </Box>
  )
}

export default Employees