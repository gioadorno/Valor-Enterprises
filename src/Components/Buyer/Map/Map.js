import { MapDiv, MapTitle} from "./styles"
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import Markers from "./Markers";
import { useState } from "react";
import GoogleAPI from './API';
import Paginate from "./Pagination";
import { useLocation } from 'react-router-dom';

function useQuery() {
    return new URLSearchParams(useLocation().search)
  };
  
  const Map = ({ style }) => {
    const query = useQuery();
    const page = query.get('page') || 1; // Getting page info
    const [libraries] = useState(["places"]);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const center = {
        lat: 38.500000,
        lng: -98.000000
    };


    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: GoogleAPI,
        libraries,
    });
    
    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading Maps";

    return (
        <MapDiv>
            <GoogleMap mapContainerStyle={style.map} zoom={5} center={center} >
                <MapTitle>
                    <Paginate page={page} />
                </MapTitle>
                <Markers />
            </GoogleMap>
        </MapDiv>
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
