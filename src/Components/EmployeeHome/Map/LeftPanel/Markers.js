import { Marker, InfoWindow, } from '@react-google-maps/api';
import { useSelector, useDispatch } from "react-redux";
import { InfoDiv, PhotoBox, Photo, InfoAddress, Info, LabelDiv, Label, PropertyLink } from './styles';
import { useEffect, useState } from 'react';
import { getMarkers } from '../../../../actions/markers';
import { getActiveProps, getAllProperties } from '../../../../actions/properties';
import icon from '../Icons/icons8-home-40.png';
import wholesaleIcon from '../Icons/icons8-home-40-wholesale.png';
import noImage from '../Icons/Empty Photo.png';
import { getAddress } from '../../../../actions/address';
import { Paper } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';


const Markers = ({ labels, infoBox, getMarker, setGetMarker, selected, setSelected }) => {

    const navigate = useNavigate();
    
    // Usings Markers in Database
    const markers = useSelector((state) => state.markers);
    const { props, isLoading } = useSelector((state) => state.posts);
    // const { activeProps, activePropertiesLoading }  = useSelector((state) => state.activeproperties);
    const searchAddress = useSelector((state) => state.address);

    
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getAllProperties());
    },[])

    useEffect(() => {
        getAddress();
    },'');

    const openProperty = () => {
        navigate(`/acquisitions/${selected._id}`)
    };
    
    
    console.log(selected)

    props.map((marker) => (
        marker.status === 'Active' && getMarker.address === marker.address ? setSelected(marker) : null
    ));
    
    return (
        <>
                {props.map((marker) => (
                    marker.status === 'Active' && marker.submitBy != 'Wholesaler' ?
                        <Marker icon={icon} key={marker._id} center={{ lat: marker.lat, lng: marker.lng}} position={{ lat: marker.lat, lng: marker.lng}} onClick={() => {setSelected(marker)}} />
                        : null
                ))}
                {props.map((marker) => (
                    marker.status === 'Active' && marker.submitBy === 'Wholesaler' ?
                        <Marker icon={wholesaleIcon}  center={{ lat: marker.lat, lng: marker.lng}} position={{ lat: marker.lat, lng: marker.lng}} onClick={() => {setSelected(marker)}} />
                        : null
                ))}
                {getMarker && (
                    <Marker  center={{ lat: getMarker.lat, lng: getMarker.lng}} position={{ lat: getMarker.lat, lng: getMarker.lng}} />
                )}
                    {selected && ( 
                    <InfoWindow onCloseClick={() => {setSelected(null)}} key={selected._id} position={{ lat: selected.lat, lng: selected.lng}}>
                        <InfoDiv >
                            <PhotoBox >
                                {selected.propPhoto != '' ? (
                                    <Photo  src={selected.propPhoto}/>
                                ) : <Photo  src={noImage}/>}
                            </PhotoBox>
                            <LabelDiv >
                                <PropertyLink onClick={openProperty} >
                                    View Property Details
                                </PropertyLink>
                            </LabelDiv>
                            <LabelDiv >
                                <InfoAddress >
                                    {selected.address.replace(', USA', '')}
                                </InfoAddress>
                            </LabelDiv>
                            <LabelDiv >
                                <Label >Wholesale: </Label>
                                <Info >{selected.salePrice}</Info>
                            </LabelDiv>
                            <LabelDiv >
                                <Label >ARV: </Label>
                                <Info >{selected.arv}</Info>
                            </LabelDiv>
                            <LabelDiv >
                                <Label >Acquistion: </Label>
                                <Info >{selected.name}</Info>
                            </LabelDiv>
                            {selected.dispoName != '' &&
                            <LabelDiv >
                                <Label >Dispositions: </Label>
                                <Info >{selected.dispoName}</Info>
                            </LabelDiv>
                            }
                        </InfoDiv>
                    </InfoWindow>)}
            
        </>
    )
}

Markers.defaultmarkers = {
    infoBox: 'infoBox',
    infoBoxStyle: {
        display: 'none',
    },
    labels: {
        beds: 'Beds: ',
        baths: 'Baths: ',
        garage: 'Garage: ',
        pool: 'Pool: ',
        sqFoot: 'Sq. Foot: ',
        lotSize: 'Lot Size: ',
        year: 'Year Built: ',
        wholesale: 'Wholesale: ',
        arv: 'ARV: ',
        market: 'Market: ',
        employee: 'Employee: ',
        photos: 'Photos: '
    }
}

export default Markers
