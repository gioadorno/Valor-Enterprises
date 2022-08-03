import { PropertyDiv, ImageDiv, Image, BoxDiv, Address, BottomDiv, LeftDiv, RightDiv, LabelDiv, Labels, Details, Photos } from "./styles";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid' //For Keys
import { getBuyerProperties } from "../../../../../actions/buyerproperties";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const PropertyBox = ({ labels, details, classes }) => {

    const dispatch = useDispatch();

    const { buyerProps } = useSelector((state) => state.buyerproperties);


    useEffect(() => {
        dispatch(getBuyerProperties());
    },[])


    return (
        <>
        {buyerProps.map((prop) => {
            return(
            <PropertyDiv className={classes.propertyBox} key={uuidv4()}>
                <ImageDiv key={uuidv4()}>
                    <Image key={uuidv4()} src={prop.propPhoto} />
                </ImageDiv>
                <BoxDiv key={uuidv4()}>
                    <Address key={uuidv4()}>
                        {prop.address.replace(', USA', '')}
                    </Address>
                    <BottomDiv key={uuidv4()}>
                    <LeftDiv key={uuidv4()}>
                            <LabelDiv key={uuidv4()}>
                                <Labels key={uuidv4()}>
                                    {labels.beds}
                                </Labels>
                                <Details key={uuidv4()}>  
                                    {prop.beds}
                                </Details>
                            </LabelDiv>
                            <LabelDiv key={uuidv4()}>
                                <Labels key={uuidv4()}> 
                                    {labels.baths}
                                </Labels>
                                <Details key={uuidv4()}>  
                                    {prop.baths}
                                </Details>
                            </LabelDiv>
                            {prop.parking != '' ? (
                                <LabelDiv key={uuidv4()}>
                                    <Labels key={uuidv4()}>
                                        {labels.garage}
                                    </Labels>
                                    <Details key={uuidv4()}>  
                                        {prop.parking}
                                    </Details>
                                </LabelDiv>
                            ) : null}
                            {prop.pool != '' ? (
                                <LabelDiv key={uuidv4()}>
                                    <Labels key={uuidv4()}>
                                        {labels.pool}
                                    </Labels>
                                    <Details key={uuidv4()}>  
                                        {prop.pool}
                                    </Details>
                                </LabelDiv>
                            ) : null}
                            <LabelDiv key={uuidv4()}>
                                <Labels key={uuidv4()}>
                                    {labels.yearBuilt}
                                </Labels>
                                <Details key={uuidv4()}>  
                                    {prop.year}
                                </Details>
                            </LabelDiv>
                            {prop.condition != '' ? (
                                <LabelDiv key={uuidv4()}>
                                    <Labels key={uuidv4()}>
                                        {labels.condition}
                                    </Labels>
                                    <Details key={uuidv4()}>  
                                        {prop.condition}
                                    </Details>
                                </LabelDiv>
                            ) : null}
                        </LeftDiv>
                        <RightDiv key={uuidv4()}>
                            <LabelDiv key={uuidv4()}>
                            <Labels key={uuidv4()}>
                                    {labels.sqFoot}
                                </Labels>
                                <Details key={uuidv4()}>  
                                    {prop.livingArea + details.sqft}
                                </Details>
                            </LabelDiv>
                            <LabelDiv key={uuidv4()}>
                                <Labels key={uuidv4()}>
                                    {labels.lotSize}
                                </Labels>
                                <Details key={uuidv4()}>  
                                    {prop.lotSize + details.sqft}
                                </Details>
                            </LabelDiv>
                            <LabelDiv key={uuidv4()}>
                                <Labels key={uuidv4()}>
                                    {labels.employee}
                                </Labels>
                                <Details key={uuidv4()}>  
                                    {prop.dispoName}
                                </Details>
                            </LabelDiv>
                            <LabelDiv key={uuidv4()}>
                                <Labels key={uuidv4()}>
                                    {labels.photos}
                                </Labels>
                                <Photos key={uuidv4()} href={prop.pictureLink}>  
                                    {details.photos}
                                </Photos>
                            </LabelDiv>
                            <LabelDiv key={uuidv4()}>
                                <Labels key={uuidv4()}>
                                    {labels.callText}
                                </Labels>
                                <Details key={uuidv4()}>  
                                    {prop.dispoPhone}
                                </Details>
                            </LabelDiv>
                            <LabelDiv key={uuidv4()}>
                                <Labels key={uuidv4()}>
                                    {labels.email}
                                </Labels>
                                <Details key={uuidv4()}>  
                                    {prop.dispoEmail}
                                </Details>
                            </LabelDiv>
                        </RightDiv>
                    </BottomDiv>
                </BoxDiv>
            </PropertyDiv>
            )
        })

            }
        </>
    )
}

PropertyBox.defaultProps = {
    classes: {
        propertyBox: 'propertyBox'
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
}

export default PropertyBox
