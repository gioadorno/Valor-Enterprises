import { Box, Button, Toolbar, Typography, Divider, CardMedia, ButtonBase  } from "@mui/material"
import NavBar from "./NavBar";
import image from './background.jpg';
import Markets from "./Markets";
import { getAllActiveProperties } from "../../actions/properties";
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import photo from './Empty Photo.png';
import Paginate from "./Pagination";
import { useLocation, useNavigate } from 'react-router-dom';
import { getActiveMarkets } from "../../actions/properties";
import MobileNav from "./MobileNav";
import { CircularProgress } from "@material-ui/core";
import GuestLogin from "../routes/GuestLogin/GuestLogin";


// For querying the properties
function useQuery() {
    return new URLSearchParams(useLocation().search)
  };
  const initialArray = [];

const BuyerDashboard = () => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const query = useQuery();
    const page = query.get('page') || 1; // Getting page info
    const [markets, setMarkets] = useState(initialArray);

    useEffect(() => {
        dispatch(getAllActiveProperties())
    },[]);

    const [ prop, setProp ] = useState(null);

    const { activeProps, activePropertiesLoading } = useSelector((state) => state.activeproperties);
    const {data} = useSelector((state) => state.allprops);
    
    // Removes Duplicates of Markets
    const marketList = data?.filter((value, index, self) => 
    index === self.findIndex((t) => (
        t.market === value.market
    ))
    );

    
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    };

    const openOffer = () => {
        navigate(`/dashboard/${prop._id}`)
    };
    
    const resetFilter = () => {
        setMarkets(null);
        navigate('/dashboard');
        window.location.reload(false);
    };

    if(!user?.result?.name || user?.result?.accountLevel != 'Buyer') {
        return (
            <GuestLogin />
        )
    };

  return (
      <Box sx={{ ml: { xs: 0, sm: 0 }, pb: { xs: 8, sm: 5 }, display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', overflowx: 'hidden' }} >
        <NavBar />
        <Box sx={{ width: '100%', height: { xs: '20em' , sm: '30em' }, display: 'flex' }}>
            <CardMedia sx={{ width: { xs: '103%', sm: '100%' }, height: '100%' }} component='img' src={image} />
        </Box>
        <Box sx={{ backgroundColor: 'white', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Toolbar sx={{ width: '100%', mt: 2, flexDirection: 'column' }}>
                <Paginate page={page} />
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', width: '100%', alignItems: 'center', mb: 3, flexDirection: { xs: 'column', sm: 'row' } }}>
                <Typography variant='h4' component='h4' sx={{ textAlign: { xs: 'center', sm: 'left' }, pl: { xs: 2, sm: 6 }, mt: { xs: 3, sm: 0 }, mb: 1 }}>
                    Markets
                </Typography>
                <Button size='large' sx={{ ml: 5, whiteSpace: 'nowrap' }} onClick={resetFilter}>
                        Reset Filter
                </Button>
                </Box>
                <Box sx={{ width: '100%', overflowX: 'auto', display: 'flex', flexWrap: { xs: 'flex-wrap', sm: 'nowrap' }, scrollbarWidth: 'none', ":-webkit-scrollbar" : { width: 0, height: 0 }, msOverflowStyle: 'none', mx: {sm: 1}, justifyContent: 'flex-start', py: 2, pl: {xs: 0, sm: 8}}}>
                    {data != undefined && (
                        <Markets marketList={marketList} markets={markets} setMarkets={setMarkets} dispatch={dispatch} navigate={navigate} />
                    )}
                </Box>
            <Divider sx={{ width: '90%', mt: 5, alignItems: 'center' }} />
            </Toolbar>
            {activePropertiesLoading ? <Box sx={{ display: 'flex', width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}><CircularProgress /><Typography>Loading properties...</Typography> </Box> : 
            activeProps?.map((props) => (
                <Box onMouseOver={() => setProp(props)} sx={{ display: 'flex', height: { xs: 'auto' ,sm: '20em' }, width: { xs: '100%', sm: '95%' }, alignItems: 'center', flexDirection: 'column', '&:hover': { transform: 'scale(1.01)', boxShadow: 2, filter: 'opacity(0.7)' }, transition: { easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)' }, borderRadius: '2em'  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: { xs: 'column' , sm: 'row' }, height: '100%', width: '100%', px: 5}}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', px: 5, flexShrink: 1 }}>
                            <CardMedia component='img' src={props.propPhoto != "data:application/octet-stream" && props.propPhoto || photo} sx={{ borderRadius: '2em', height: '85%', width: { xs: '27em' , sm: '25em' } }} />
                        </Box>
                        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: { xs: 'center' , sm: 'flex-start'}, justifyContent: 'flex-start', height: '85%', ml: { xs: 0 , sm: 3 }, }}>
                            <Typography component='h5' variant='h5' sx={{ fontFamily: 'Rubik', textAlign: 'center' }}>
                                {props.address.replace(', USA', '')}
                            </Typography>
                            <Divider sx={{ width: '5%', mt: 2, borderBlockColor: '#00000061' }} />
                            <Box sx={{ display: 'flex', mt: 2, color: '#858585', whiteSpace: 'nowrap', flexWrap: 'wrap', pb: 2, justifyContent: { xs: 'center', sm: 'flex-start' } }}>
                                <Typography>
                                    {props.beds} bedrooms,&nbsp;
                                </Typography>
                                <Typography>
                                    {props.baths} baths,&nbsp;
                                </Typography>
                                {props.parking != '' && props.parking != 'No Parking' && (
                                    <Typography>
                                        {props.parking},&nbsp; 
                                    </Typography>
                                )}
                                {props.pool === 'yes' && (
                                    <Typography>
                                        Pool,&nbsp;
                                    </Typography>
                                )}
                                <Typography>
                                    Living Area: {props.livingArea} sqft,&nbsp;
                                </Typography>
                                <Typography>
                                    Lot Size: {props.lotSize} sqft,&nbsp;
                                </Typography>
                                <Typography>
                                    Year Build: {props.year}
                                </Typography>
                            </Box>
                            {props.pictureLink != '' && (
                                <Box sx={{ display: 'flex', alignItems: { xs: 'center', sm: 'flex-start'}, justifyContent: 'flex-start', whiteSpace: 'nowrap', flexWrap: 'wrap', pb: { xs: 3, sm: 0 }  }}>
                                    <Typography>
                                        <a style={{ color: '#18bfff', '&:hover': { color: 'blue' }}} href={props.pictureLink}>Property Photos</a>
                                    </Typography>
                                </Box>
                            )}
                            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '100%', alignItems: 'center' }}>
                                {props.dispoName != '' && (
                                    <Typography sx={{ mb: 2, textAlign: 'center' }}>
                                        For more information on this property, call or text <strong>{props.dispoName}</strong> at <a href={`tel:${props.dispoPhone}`}>{props.dispoPhone}</a>. Email <a href={`mailto:${props.dispoEmail}`}>{props.dispoEmail}</a>.
                                        {props.dispoName2 != null && (
                                            <>
                                            <br/>
                                            <strong>{props.dispoName2}</strong> at <a href={`tel:${props.dispoPhone2}`}>{props.dispoPhone2}</a>. Email <a href={`mailto:${props.dispoEmail2}`}>{props.dispoEmail2}</a>.
                                            </>
                                        )}
                                    </Typography>
                                )}
                            </Box>
                        </Box>
                        <ButtonBase onClick={openOffer} sx={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', m: 3, cursor: 'pointer', alignItems: 'center', border: { xs: '1px solid #80808040', sm: 'none' }, borderRadius: { xs: '2em' }, p: { xs: 1, sm: 0 }, px: { xs: 8, sm: 0 }, '&:hover': { color: '#ed6c02' } }}>
                                <Typography component='h5' variant='h5'>
                                    Take it at
                                </Typography>
                                <Typography sx={{ color: '#18bfff' }} component='h4' variant='h4'>
                                    {Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(props.salePrice.replace('$', '').replace(',', '')) === `$${NaN}` ? props.salePrice || 'Contact for Price'
                                    : Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(props.salePrice.replace('$', '').replace(',', '')).replace('.00', '')}
                                </Typography>
                        </ButtonBase>
                    </Box>
                        <Divider sx={{ width: { xs: '100%', sm: '95%' } }} />
                </Box>
            ))}
            <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', mt: 4 }}>
                <Button onClick={scrollToTop}>
                    Scroll to Top
                </Button>
            </Box>
        </Box>
        <MobileNav />
    </Box>
  )
}

export default BuyerDashboard