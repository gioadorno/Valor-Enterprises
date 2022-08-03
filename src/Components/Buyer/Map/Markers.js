import { Marker, InfoWindow } from '@react-google-maps/api';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import { InfoDiv, PhotoBox, Photo, InfoAddress, Info, LabelDiv, Label, Photos, InfoLink } from './styles';
import { getBuyerProperties } from '../../../actions/buyerproperties';
import icon from './Icons/icons8-home-40.png';
import emptyPhoto from '../Empty Photo.png';
import { Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const Markers = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    // Get Properties from database
    const { buyerProps } = useSelector((state) => state.buyerproperties);
    
    
    // Allows the info box to be open and closed
    const [selected, setSelected] = useState(null);

    return (
        <>
        {buyerProps.map((marker) => (
                    marker.status === 'Active' && 
                        <Marker icon={icon} key={marker._id} animation={4} title={marker.address.replace(', USA', '')} center={{ lat: marker.lat, lng: marker.lng}} position={{ lat: marker.lat, lng: marker.lng}} onClick={() => {setSelected(marker)}} />
                ))}
        {selected && ( 
        <InfoWindow onCloseClick={() => {setSelected(null)}} key={selected._id} position={{ lat: selected.lat, lng: selected.lng}}>
            <InfoDiv >
                <PhotoBox >
                    <Photo  src={selected.propPhoto || emptyPhoto}/>
                </PhotoBox>
                <LabelDiv >
                    <InfoAddress >
                        {selected.address.replace(', USA', '')}
                    </InfoAddress>
                </LabelDiv>
                <LabelDiv >
                    <Label >Beds: </Label>
                    <Info >{selected.beds}</Info>
                </LabelDiv>
                <LabelDiv >
                    <Label >Baths: </Label>
                    <Info >{selected.baths}</Info>
                </LabelDiv>
                {/* <LabelDiv >
                    <Label >
                        Condition: 
                    </Label>
                    <Info >  
                        {selected.condition}
                    </Info>
                </LabelDiv> */}
                <LabelDiv >
                    <Label >Property Rep: </Label>
                    <Info >{selected.dispoName}</Info>
                </LabelDiv>
                <LabelDiv >
                    <Label >
                        Call/Text: 
                    </Label>
                    <InfoLink href={`tel:${selected.dispoPhone}`} >  
                        {selected.dispoPhone}
                    </InfoLink>
                </LabelDiv>
                <LabelDiv >
                    <Label >
                        Email: 
                    </Label>
                    <InfoLink href={`mailto:${selected.dispoEmail}`} >  
                        {selected.dispoEmail}
                    </InfoLink>
                </LabelDiv>
                {/* {selected.dispoName2 != '' && (
                    <LabelDiv >
                    <Label >Property Rep: </Label>
                    <Info >{selected.dispoName2}</Info>
                </LabelDiv>
                )}
                {selected.dispoPhone2 != '' && (
                    <LabelDiv >
                    <Label >Call/Text: </Label>
                    <InfoLink href={`tel:${selected.dispoPhone2}`} >{selected.dispoPhone2}</InfoLink>
                </LabelDiv>
                )}
                {selected.dispoEmail2 != '' && (
                    <LabelDiv >
                    <Label >Email: </Label>
                    <InfoLink href={`mailto:${selected.dispoEmail2}`} >{selected.dispoEmail2}</InfoLink>
                </LabelDiv>
                )} */}
                {selected.pictureLink != '' && 
                <LabelDiv >
                    <Label >
                        Photos: 
                    </Label>
                    <Photos href={selected.pictureLink} >  
                        Pictures
                    </Photos>
                </LabelDiv>
                }
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', mt: 1, pb: 2 }}>
                    <Button onClick={() => navigate(`/dashboard/${selected._id}`)}>Take it at&nbsp;  
                    {Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(selected.salePrice.replace('$', '').replace(',', '')) === `$${NaN}` ? selected.salePrice || 'Contact for Price'
                                    : Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(selected.salePrice.replace('$', '').replace(',', '')).replace('.00', '')}</Button>
                </Box>
            </InfoDiv>
        </InfoWindow>)}
</>
    )
}

export default Markers
