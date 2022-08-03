import { PropertyDiv, ImageDiv, Image, BoxDiv, Address, BottomDiv, LeftDiv, RightDiv, LabelDiv, Labels, Details, Photos, Phone, Email, Loading, LoadingDiv } from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { getMapProps, getActiveProps } from "../../../../../actions/properties";
import { useEffect } from "react";
import { CircularProgress } from "@mui/material";
import image from '../../Icons/Empty Photo.png'

const PropertyBox = ({ labels, details, classes }) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getActiveProps());
    },'')

    // Get Properties from Database
    const { props, isLoading } = useSelector((state) => state.posts);

    return (
        <>
        {isLoading ? <LoadingDiv><CircularProgress /><Loading>Properties Loading...</Loading> </LoadingDiv> : (
        props.map((prop) => {
            if (prop.status === 'Active') {

            return(
            <PropertyDiv className={classes.propertyBox} key={prop._id}>
                <ImageDiv >
                    {prop.propPhoto != '' ? (
                        <Image  src={prop.propPhoto} />
                    ) : <Image  src={image} />}
                </ImageDiv>
                <BoxDiv >
                    <Address >
                        {prop.address.replace(', USA', '')}
                    </Address>
                    <BottomDiv >
                        <LeftDiv >
                            <LabelDiv >
                                <Labels >
                                    {labels.beds}
                                </Labels>
                                <Details >  
                                    {prop.beds}
                                </Details>
                            </LabelDiv>
                            <LabelDiv >
                                <Labels > 
                                    {labels.baths}
                                </Labels>
                                <Details >  
                                    {prop.baths}
                                </Details>
                            </LabelDiv>
                            {prop.parking != '' ? (
                                <LabelDiv >
                                    <Labels >
                                        {labels.garage}
                                    </Labels>
                                    <Details >  
                                        {prop.parking}
                                    </Details>
                                </LabelDiv>
                            ) : null}
                            {prop.pool != '' ? (
                                <LabelDiv >
                                    <Labels >
                                        {labels.pool}
                                    </Labels>
                                    <Details >  
                                        {prop.pool}
                                    </Details>
                                </LabelDiv>
                            ) : null}
                            <LabelDiv >
                                <Labels >
                                    {labels.yearBuilt}
                                </Labels>
                                <Details >  
                                    {prop.year}
                                </Details>
                            </LabelDiv>
                        </LeftDiv>
                        <RightDiv >
                            {prop.photos != '' ? (
                                <LabelDiv >
                                    <Labels >
                                        {labels.photos}
                                    </Labels>
                                    <Photos  href={prop.pictureLink}>  
                                        {details.photos}
                                    </Photos>
                                </LabelDiv>
                            ) : null}
                            <LabelDiv >
                            <Labels >
                                    {labels.sqFoot}
                                </Labels>
                                <Details >  
                                    {prop.livingArea + details.sqft}
                                </Details>
                            </LabelDiv>
                            <LabelDiv >
                                <Labels >
                                    {labels.lotSize}
                                </Labels>
                                <Details >  
                                    {prop.lotSize + details.sqft}
                                </Details>
                            </LabelDiv>
                            {prop.condition != '' ? (
                                <LabelDiv >
                                    <Labels >
                                        {labels.condition}
                                    </Labels>
                                    <Details >  
                                        {prop.condition}
                                    </Details>
                                </LabelDiv>
                            ) : null}
                        </RightDiv>
                    </BottomDiv>
                </BoxDiv>
            </PropertyDiv>
            )
            }
        })
        )}
            
        </>
    )
}

PropertyBox.defaultProps = {
    labels: {
        beds: 'Beds: ',
        baths: 'Baths: ',
        garage: 'Garage: ',
        pool: 'Pool: ',
        sqFoot: 'Sq. Foot: ',
        lotSize: 'Lot Size: ',
        year: 'Year Built: ',
        wholesale: 'Wholesale: ',
        yearBuilt: 'Year: ',
        arv: 'ARV: ',
        market: 'Market: ',
        employee: 'Property Rep: ',
        photos: 'Photos: ',
        callText: 'Call/Text: ',
        email: 'Email: ',
        condition: 'Condition: '
    },
    details: {
        sqft: 'sqft',
        photos: 'Pictures'
    },
    classes: {
        propertyBox: 'propertyBox'
    }
}

export default PropertyBox
