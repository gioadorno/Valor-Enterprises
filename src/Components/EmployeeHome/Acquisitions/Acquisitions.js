import { createTheme, ThemeProvider} from '@mui/material/styles';
import OuterBar from '../OuterBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { Button, ButtonGroup, Divider, FormControl, FormHelperText, InputLabel, Menu, MenuItem, Select, Slide, Snackbar, IconButton, Autocomplete, FormLabel, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import Grow from '@mui/material/Grow';
import Box from '@mui/material/Box';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AodIcon from '@mui/icons-material/Aod';
import ArticleIcon from '@mui/icons-material/Article';
import { useState, Fragment, useContext, useEffect } from "react";
import { AccountContext } from '../../Login/Account';
import { getPropsBySearch } from '../../../actions/properties';
import Paginate from './Pagination';
import { useLocation, useNavigate } from "react-router-dom";
import useStyles from './styles';
import Properties from './Properties';
import MobileNav from '../MobileNav';
import CloseIcon from '@mui/icons-material/Close';
import { API } from 'aws-amplify';
import DoDisturbOffIcon from '@mui/icons-material/DoDisturbOff';


const mdTheme = createTheme();

function useQuery() {
    return new URLSearchParams(useLocation().search)
};

      // API
      const apiName = 'valproperties';
      const path = '/inventory';
      // 

const Acquisitions = (anchor) => {
    const location = useLocation();
    const { getSession } = useContext(AccountContext);
    const [ closeSide, setCloseSide ] = useState(false);
    const [ addressFilter, setAddressFilter ] = useState('');
    const [ props, setProps ] = useState([]);
    const [ allProps, setAllProps ] = useState([]);
    useEffect(() => {
        API.get(apiName, path)
        .then(res => setProps(res.Items))
    },[])
    useEffect(() => {
        API.get(apiName, '/properties')
        .then(res => setAllProps(res.Items))
    },[])
    const [ open, setOpen ] = useState(false);
        // Get logged in user info
    const navigate = useNavigate();
    const containerRef = useState(null);

    const actions = [
        { icon: <FileCopyIcon onClick={() => navigate('/acqpaperwork')} />, name: 'Acq Paperwork'},
        { icon: <ArticleIcon onClick={() => navigate('/acqoptions')} />, name: 'Acq Options' },
        { icon: <AodIcon onClick={() => navigate('/dispopaperwork')} />, name: 'Dispo Paperwork' },
        { icon: <DoDisturbOffIcon onClick={() => navigate('/cancellationform')} />, name: 'Cancellation Form' },
      ];

    const query = useQuery();
    const page = query.get('page') || 1;


    // Receiving properties from Database

    const classes = useStyles();

    const [ openFilter, setOpenFilter ] = useState(false);
    const [ filter, setFilter ] = useState([]);


    useEffect(() => {
        getSession()
    }, []);

        // SnackBar
    
        const closeSnackBar = (event, reason) => {
            if (reason === 'clickaway') {
                return;
            }
        
            setOpen(false);
        };
    
        const deleteAction = (
        <Fragment>
            <Button color="error" size="large" onClick={closeSnackBar}>
            Close
            </Button>
            <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={closeSnackBar}
            >
            <CloseIcon fontSize="small" />
            </IconButton>
        </Fragment>
        );


            // Removes Duplicates of Supplier Names
            const address = props?.filter((value, index, self) => 
            index === self.findIndex((t) => (
                t.address === value.address
            ))
            );

            const dispoNames = props?.filter((value, index, self) => 
            index === self.findIndex((t) => 
            t.dispoName === value.dispoName));

            const statusList = props?.filter((value, index, self) =>
            index === self.findIndex((t) =>
            t.status === value.status));

            const auditList = props?.filter((value, index, self) =>
            index === self.findIndex((t) =>
            t.audited === value.audited));

            // Sort latest properties first
            const sortedProps = allProps.sort((a, b) => new Date(b.date) - new Date(a.date));
            
            const selectProperty = (e, value) => {
                allProps.map(prop => {
                    console.log(prop)
                    if (value === prop.address.replace(', USA', '')) {
                        navigate(`/acquisitions/${prop.id}`)
                    }
                })
            }

            console.log(sortedProps)

  return (
    <ThemeProvider theme={mdTheme}>
        <Box ref={containerRef} sx={{ display: 'flex', width: '100%', position: 'relative', overflowx: 'hidden' }}>
            <OuterBar closeSide={closeSide} />
            <Grid mt={2} className={classes.propertyContainer} sx={{ padding: 2, paddingTop: 8, width: '100%' }} container justify='space-between' alignItems='center' spacing={4} >
            <FormControl sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '90%' }} >
                <Autocomplete sx={{ width: '90%' }} onInputChange={selectProperty} disablePortal options={sortedProps.map(prop => prop.address.replace(', USA', ''))} renderInput={(params) => <TextField {...params} label='Properties' />} />
            </FormControl>
            <Snackbar open={open} autoHideDuration={6000} onClose={closeSnackBar} message='Property has been deleted' action={deleteAction} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} />
            <Properties setOpen={setOpen} />
                    {/* <Button  onClick={() => setOpenFilter(!openFilter)} size='large' variant='outlined' sx={{ display: { xs: 'none', sm: 'inline-flex' } ,position: 'absolute', top: '1em', left: 1 }}>
                        Filters
                    </Button> */}
                {/* <Paginate page={page} /> */}
                <Box sx={{ position: 'fixed', right: 5, bottom: 10, zIndex: '5', flexGrow: 1, transform: 'translateZ(0px)' }}>
                    <SpeedDial
                        ariaLabel="Forms" 
                        icon={<SpeedDialIcon />}
                        direction='up'
                        
                    >
                        {actions.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            tooltipOpen
                            sx={{ whiteSpace: 'nowrap' }}
                        />
                        ))}
                    </SpeedDial>
                </Box>
            </Grid>
            <MobileNav />
        </Box>
    </ThemeProvider>
  )
}

export default Acquisitions