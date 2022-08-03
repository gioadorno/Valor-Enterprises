import { MapDiv, LeftDiv, Image} from './styles';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { useState } from 'react';
import LeftPanel from './LeftPanel/LeftPanel';
import { useDispatch } from 'react-redux';
import { getMapProps, getActiveProps, getAllProperties } from '../../../actions/properties';
import { useEffect } from 'react';
import Markers from './LeftPanel/Markers';
import { getAddress } from '../../../actions/address';
import { GoogleAPI } from './keys';
import { getMarkers } from '../../../actions/markers';
import { useSelector } from "react-redux";
import OuterBar from '../OuterBar';
import { Autocomplete, Box, Container, Paper, TextField } from '@mui/material';


import dotenv from 'dotenv';
import { FormControl, FormLabel } from '@material-ui/core';
import Login from '../../Login/Login';
import MobileNav from '../MobileNav';
dotenv.config({
    path: `${__dirname}./Map/.env.local`
});


const libraries = ["places"];
// Centers map on load to Chandler, AZ
const center = {
    lat: 38.500000,
    lng: -98.000000
};


const Map = ({ style }) => {
    const { props }  = useSelector((state) => state.posts);

     // Allows the info box to be open and closed
     const [selected, setSelected] = useState(null);


    // Receiving Dispo Properties from Database
    const addressMarkers = useSelector((state) => state.address);

    const [getMarker, setGetMarker] = useState({
        address: '',
        lat: '',
        lng: ''
    });

    const markerPin = useSelector((state) => state.address);

    // Get logged in user info
    const user = JSON.parse(localStorage.getItem('profile'));

    // const [getMarker, setGetMarker] = useState('');
    
    const markers = useSelector((state) => state);

    const dispatch = useDispatch();


    useEffect(() => {
        setGetMarker(getMarker);
    },[]);

    useEffect(() => {
        dispatch(getAllProperties());
    }, []);



    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: GoogleAPI,
        libraries,
    });
    
    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading Maps";
    
    if(!user?.result?.name || user?.result?.accountLevel != 'Employee') {
        return (
            <Login />
        )
    };

           // Removes Duplicates of Supplier Emails
           const addressActiveList = props.filter((value, index, self) => 
           index === self.findIndex((t) => (
               t.address === value.address
           ))
           );


    return (
        <Box sx={{ display: 'flex' }}>
            <OuterBar />
        <Container maxWidth="2xl" sx={{ mt: 10, mb: 4, display: 'flex', alignItems: 'center', width: '-webkit-fill-available', height: '95%' }} >
            <Paper style={{ width: '-webkit-fill-available', height: '100%' }} elevation={16}>
                <GoogleMap setGetMarker={setGetMarker} mapContainerStyle={style.map} zoom={getMarker.lat === '' ? 5 : 18 } center={getMarker.lat == '' ? center : {lat: getMarker.lat, lng: getMarker.lng} } >
                    <FormControl  style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Autocomplete sx={{ display: { xs: 'none', md: 'flex'} }} freeSolo={true} style={{ width: '50%' }} options={addressActiveList.map((prop) => prop.address)} renderInput={(params) => <TextField color='primary' focused style={{ color: 'white' }} variant='filled' {...params} label="Find Property"  />} onInputChange={(e, value) => setGetMarker({ ...getMarker, address: value })} />
                            </FormControl>
                    <Markers getMarker={getMarker} setGetMarker={setGetMarker} selected={selected} setSelected={setSelected}  />
                </GoogleMap>
            </Paper>
        </Container>
        <MobileNav />
        </Box>
    ) 

}

Map.defaultProps = {
    style: {
        loadscript: {
            display: 'none',
        },
        map: {
            width: '100%',
            height: '92vh',
        },
        body: {
            backgroundColor: 'blue',
            width: '100%',
            height: '80em',
            position: 'fixed',
            top: '.1em'
        }
    },
}

export default Map
