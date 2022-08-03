import { MapDiv, LeftDiv, Image, Map, MapTitle } from './styles';
import { GoogleMap, useLoadScript} from '@react-google-maps/api';
import LeftPanel from './LeftPanel/LeftPanel';
import { useDispatch } from 'react-redux';
import { getMapProps } from '../../../actions/properties';
import { useEffect } from 'react';
import Markers from './LeftPanel/Markers';
import { getAddress } from '../../../actions/address';
import GuestLogin from '../GuestLogin/GuestLogin';
import dotenv from 'dotenv';
import { GoogleAPI } from '../../EmployeeHome/Map/keys';
import { Box } from '@mui/material';
import './styles.css'
dotenv.config({
    path: `${__dirname}./Map/.env.local`
})


const libraries = ["places"];
// Center map on this location: Chandler, AZ (Headquarters)
const center = {
    lat: 38.500000,
    lng: -98.000000
};

const GuestMap = ({ key, style, mapClass }) => {

    // Gets logged in user info
    const user = JSON.parse(localStorage.getItem('profile'));
    
    const dispatch = useDispatch();


    // useEffect(() => {
    //     dispatch(getMapProps());
    // },'')


    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: GoogleAPI,
        libraries,
    });
    
    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading Maps";
    
    // If user does not have name from login, reroute back to Guest Login Page
    // if(!user?.result?.name) {
    //     return (
    //         <GuestLogin />
    //     )
    // }


    return (
        <Box sx={{ width: '100%', display: 'flex', position: 'relative', height: '100%', flexWrap: 'nowrap' }}>
            {/* <LeftDiv>
                <LeftPanel />
            </LeftDiv> */}
            <MapTitle>
                KeygleeDispo Real Estate (Our Markets)
            </MapTitle>
            <GoogleMap mapContainerStyle={style.map} zoom={5} center={center} onClick={(e) => {console.log(e)}} >
                {/* <Marker position={{ lat: markerPin[0].lat, lng: markerPin[0].lng }} center={{ lat: markerPin[0].lat, lng: markerPin[0].lng }} /> */}
                <Markers />
            </GoogleMap>
        </Box>
    ) 

}

GuestMap.defaultProps = {
    mapClass: 'googleMap',
    style: {
        loadscript: {
            display: 'none',
        },
        map: {
            width: '100%',
            height: '100%',
        },
        body: {
            backgroundColor: 'blue',
            width: '100%',
            height: '80em',
            position: 'fixed',
            top: '.1em'
        }
    },
    key: 'AIzaSyDZO4-fjim18Q-HauZlwCvMCpZ_HUPjWA8'
}

export default GuestMap
