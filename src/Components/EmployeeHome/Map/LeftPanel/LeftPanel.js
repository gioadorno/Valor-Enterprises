import { InnerLeftPanel, TopDiv, TopHeaderDiv, TopHeader, PropertyDiv, AddressDiv, AddressBox, H2, FilterDiv, FilterInput, FilterLabel, FindAddress} from "./styles"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { getGeocode, getLatLng } from "use-places-autocomplete";
import PropertyBox from "./PropertyBox/PropertyBox";
import { usePlacesWidget } from 'react-google-autocomplete';
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createAddress } from "../../../../actions/address";
import { useState } from "react";
import { GoogleAPI } from "../keys";
import Paginate from "./Pagination";

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

const LeftPanel = ({ topHeader, typeText, placeholder, secondHeader, filterLabel, classes, getMarker, setGetMarker  }) => {

    const query = useQuery();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');


// const [getMarker, setGetMarker] = useState({
//     address: '',
//     lat: '',
//     lng: ''
// });



    const { ref } = usePlacesWidget({
        apiKey: GoogleAPI,
        onPlaceSelected: (place) => {
            
        },
        options: {
            types: ["address"],
            componentRestrictions: { country: "us" },
        },
        });

    const dispatch = useDispatch();


    const onChange = (e) => {
        
            setGetMarker({...getMarker, address: e.target.value})
    
    }

    // Geocoding the address to get Lat and Lng        
    const onSubmit = (e) => {
        e.preventDefault();
        getGeocode({address : getMarker.address})
        .then((results) => getLatLng(results[0]))
        .then((latLng) => {
            const { lat, lng } = latLng;
    
            getMarker.lat = lat;
            getMarker.lng = lng;
    
            const address = {
                lat: lat,
                lng: lng
            }
            
            dispatch(createAddress(address));
        })
    };



    return (
        <InnerLeftPanel>
            <TopDiv>
                <TopHeaderDiv>
                    <LocationOnIcon />
                    <TopHeader>
                        {topHeader}
                    </TopHeader>
                </TopHeaderDiv>
                <AddressDiv >
                    <AddressBox zoom={14} ref={ref} onBlur={onChange} type={typeText} placeholder={placeholder.address} />
                    <FindAddress onClick={onSubmit}>Search</FindAddress>
                </AddressDiv>
                <FilterDiv>
                    <FilterLabel>
                        {filterLabel}
                    </FilterLabel>
                    <FilterInput placeholder="Examples: AZ / Thomas Martinez / Turn Key" className={classes.propertyFilter}/>
                </FilterDiv>
                <Paginate page={page} />
            </TopDiv>
            <PropertyDiv className={classes.leftPanel}>
                <PropertyBox/>
            </PropertyDiv>
        </InnerLeftPanel>
    )
}

LeftPanel.defaultProps = {
    filter: 'filter',
    propertyBox: 'propertyBox',
    topHeader: 'KeygleeDispo Map',
    secondHeader: 'KeygleeDispo Properties',
    typeText: 'text',
    filterLabel: 'Filter Properties',
    placeholder: {
        address: 'Search address on map'
    },
    searchIconStyle : {
        position: 'absolute',
        left: '12.8em',
        top: '6.82em',
    },
    classes: {
        leftPanel: 'leftPanel',
        propertyFilter: 'propertyFilter'
    }
}

export default LeftPanel
