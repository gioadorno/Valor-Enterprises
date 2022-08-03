import { InnerLeftPanel, TopDiv, TopHeaderDiv, TopHeader, PropertyDiv, AddressDiv, AddressBox, H2, FilterDiv, FilterInput, FilterLabel} from "./styles"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PropertyBox from "./PropertyBox/PropertyBox";
import Paginate from "./Pagination";
import { getProps } from "../../../../actions/properties";
import { useLocation, useNavigate } from "react-router-dom";

function useQuery() {
    return new URLSearchParams(useLocation().search)
}


const LeftPanel = ({ topHeader, secondHeader, filterLabel, classes }) => {

    const query = useQuery();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');

    return (
        <InnerLeftPanel>
            <TopDiv>
                <TopHeaderDiv>
                    <LocationOnIcon />
                    <TopHeader>
                        {topHeader}
                    </TopHeader>
                </TopHeaderDiv>
                <p style={{ textAlign: 'center', fontFamily: 'Rubik' }}>
                    For more information, Call/Text us at <a href={`tel:602-784-3800`}>602-784-3800</a>
                </p>
                {/* <FilterDiv>
                    <FilterLabel>
                        {filterLabel}
                    </FilterLabel>
                    <FilterInput placeholder="Examples: AZ, beds: 4, Carport, 3377 S. Price Rd" className={classes.propertyFilter}/>
                </FilterDiv> */}
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
    topHeader: 'KeygleeDispo Real Estate Map',
    secondHeader: 'KeygleeDispo Properties',
    typeText: 'text',
    filterLabel: 'Filter List',
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
