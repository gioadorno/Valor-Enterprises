import { InnerLeftPanel, TopDiv, TopHeaderDiv, TopHeader, PropertyDiv, AddressDiv, AddressBox, H2, FilterDiv, FilterInput, FilterLabel} from "./styles"
import { getGeocode, getLatLng } from "use-places-autocomplete";
import PropertyBox from "./LeftPanel/PropertyBox/PropertyBox";
import { usePlacesWidget } from 'react-google-autocomplete';
import $ from 'jquery';
import { useDispatch } from "react-redux";
import { useState } from "react";
import env from "react-dotenv";

const LeftPanel = ({ topHeader, typeText, placeholder, secondHeader, filterLabel, classes}) => {

    // Filter Function
$(document).ready(function() {
    $(".propertyFilter").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $(".propertyBox").filter(function() {
            $(this).toggle($(this).text()
            .toLowerCase().indexOf(value) > -1)
        });
    });
});

const [getMarker, setGetMarker] = useState({
    address: '',
    lat: '',
    lng: ''
});



    const { ref } = usePlacesWidget({
        apiKey: env.GOOGLE,
        onPlaceSelected: (place) => {
            
        },
        options: {
            types: ["address"],
            componentRestrictions: { country: "us" },
        },
        });

    const dispatch = useDispatch();



    return (
        <InnerLeftPanel>
            <TopDiv>
                <TopHeaderDiv>
                    <TopHeader>
                        {topHeader}
                    </TopHeader>
                </TopHeaderDiv>
                <AddressDiv >
                    <AddressBox disabled ref={ref} onBlur={(e) => setGetMarker({ ...getMarker, address: e.target.value })} type={typeText} placeholder={placeholder.address} />
                </AddressDiv>
                <FilterDiv>
                    <FilterLabel>
                        {filterLabel}
                    </FilterLabel>
                    <FilterInput className={classes.propertyFilter}/>
                </FilterDiv>
                <H2>{secondHeader}</H2>
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
    topHeader: 'AEM Real Estate Map',
    secondHeader: 'Locations',
    typeText: 'text',
    filterLabel: 'Filter Through List',
    placeholder: {
        address: 'Autopopulate address'
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
