import { PropertyDiv, ImageDiv, Image, BoxDiv, Address, BottomDiv, LeftDiv, RightDiv, LabelDiv, Labels, Details, Photos, Wholesaler, Loading, LoadingDiv } from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { getActiveProps } from "../../../../../actions/properties";
import { useEffect } from "react";
import { CircularProgress } from "@mui/material";
import noImage from '../../Icons/Empty Photo.png';

const PropertyBox = ({ labels, details, classes }) => {

    const dispatch = useDispatch();

    // Active Properties
    const { activeProps, activePropertiesLoading }  = useSelector((state) => state.activeproperties);


    return (
        <>
        {activePropertiesLoading ? <LoadingDiv><CircularProgress /><Loading>Properties Loading...</Loading> </LoadingDiv> : (
    activeProps.map((prop) => {
    if(prop.status === 'Active') {
        return(
        <PropertyDiv className={classes.propertyBox} key={prop._id}>
            <ImageDiv >
                {prop.propPhoto != '' ? (
                    <Image  src={prop.propPhoto} />
                ) : <Image  src={noImage} />}
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
                        <LabelDiv >
                            <Labels >
                                {labels.garage}
                            </Labels>
                            <Details >  
                                {prop.parking}
                            </Details>
                        </LabelDiv>
                        <LabelDiv >
                            <Labels >
                                {labels.pool}
                            </Labels>
                            <Details >  
                                {prop.pool}
                            </Details>
                        </LabelDiv>
                        <LabelDiv >
                            <Labels >
                                {labels.yearBuilt}
                            </Labels>
                            <Details >  
                                {prop.year}
                            </Details>
                        </LabelDiv>
                        <LabelDiv >
                            <Labels >
                                {labels.condition}
                            </Labels>
                            <Details >  
                                {prop.condition}
                            </Details>
                        </LabelDiv>
                    </LeftDiv>
                    <RightDiv >
                        <LabelDiv >
                            <Labels >
                                {labels.wholesale}
                            </Labels>
                            <Details >  
                                {prop.salePrice}
                            </Details>
                        </LabelDiv>
                        <LabelDiv >
                            <Labels >
                                {labels.arv}
                            </Labels>
                            <Details >  
                                {prop.arv}
                            </Details>
                        </LabelDiv>
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
                        {prop.submitBy === 'Wholesaler' ? (
                        <LabelDiv >
                            <Labels >
                                {labels.wholesaler}
                            </Labels>
                            <Details >  
                                {prop.name}
                            </Details>
                        </LabelDiv>
                        ) : 
                        <LabelDiv >
                            <Labels >
                                {labels.employee}
                            </Labels>
                            <Details >  
                                {prop.name}
                            </Details>
                        </LabelDiv>
                        }
                        <LabelDiv >
                            <Labels >
                                {labels.photos}
                            </Labels>
                            <Photos  href={prop.pictureLink}>  
                                {details.photos}
                            </Photos>
                        </LabelDiv>
                    </RightDiv>
                </BottomDiv>
            </BoxDiv>
            {prop.submitBy === 'Wholesaler' && (
                    <Wholesaler>
                        Property submitted by a Wholesaler
                    </Wholesaler>
                )}
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
        condition: 'Condition: ',
        employee: 'Employee: ',
        photos: 'Photos: ',
        wholesaler: 'Wholesaler: '
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
