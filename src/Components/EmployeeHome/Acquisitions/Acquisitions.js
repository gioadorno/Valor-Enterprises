import { createTheme, ThemeProvider} from '@mui/material/styles';
import OuterBar from '../OuterBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { Button, ButtonGroup, Divider, FormControl, FormHelperText, InputLabel, Menu, MenuItem, Select, Slide, Snackbar, IconButton } from '@mui/material';
import Grid from '@mui/material/Grid';
import Grow from '@mui/material/Grow';
import Box from '@mui/material/Box';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AodIcon from '@mui/icons-material/Aod';
import ArticleIcon from '@mui/icons-material/Article';
import { useDispatch } from "react-redux";
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


const mdTheme = createTheme();

function useQuery() {
    return new URLSearchParams(useLocation().search)
};

      // API
      const apiName = 'valproperties';
      const path = '/inventory';
      // 

const Acquisitions = (anchor) => {
    const { getSession } = useContext(AccountContext);
    const [ closeSide, setCloseSide ] = useState(false);
    const [ props, setProps ] = useState([]);
    useEffect(() => {
        API.get(apiName, path)
        .then(res => setProps(res.Items))
    },[])
    const [ open, setOpen ] = useState(false);
        // Get logged in user info
    const navigate = useNavigate();
    const containerRef = useState(null);

    const actions = [
        { icon: <FileCopyIcon onClick={() => navigate('/acqpaperwork')} />, name: 'Acq Paperwork'},
        { icon: <ArticleIcon onClick={() => navigate('/acqoptions')} />, name: 'Acq Options' },
        { icon: <AodIcon onClick={() => navigate('/dispopaperwork')} />, name: 'Dispo Paperwork' },
      ];

    const query = useQuery();
    const page = query.get('page') || 1;

    const dispatch = useDispatch();
    // Receiving properties from Database

    const classes = useStyles();

    const [ openFilter, setOpenFilter ] = useState(false);
    const [ filter, setFilter ] = useState([]);

    const searchProperty = () => {
        if(filter) {
            dispatch(getPropsBySearch({ tags: filter.join(',') })); //search = usestate variable [arizona, alabamba] => (arizona,alabamba)
            navigate(`/acquisitions/search?searchQuery=&tags=${filter.join(',')}`);
            setOpenFilter(false);
        } else {
            navigate('/acquisitions');
        }
    };

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
            const acqNames = props?.filter((value, index, self) => 
            index === self.findIndex((t) => (
                t.name === value.name
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

  return (
    <ThemeProvider theme={mdTheme}>
        <Box ref={containerRef} sx={{ display: 'flex', width: '100%', position: 'relative', overflowx: 'hidden' }}>
            <OuterBar closeSide={closeSide} />
            <Grid mt={2} className={classes.propertyContainer} sx={{ padding: 2, paddingTop: 10, width: '100%' }} container justify='space-between' alignItems='center' spacing={4} >
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