import { Box, Button, Card, CardMedia, CircularProgress, Divider, InputLabel, Paper, TextField, Typography } from "@mui/material";
import NavBar from "./NavBar";
import { useParams, useNavigate } from "react-router-dom";
import { getProp } from "../../actions/properties";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import useStyles from './styles';
import MobileNav from "./MobileNav";
import emptyPhoto from './Empty Photo.png';
import { FormControl } from "@material-ui/core";
import { useState } from "react";
import background from './blue.jpg';
import { createOffer } from "../../actions/offers";

const initialOffer = { name: '', company: '', phone: '', email: '' }

const Offer = () => {
    const user = JSON.parse(localStorage.getItem('profile')); //Gets logged in user info
    const { prop, isLoadingProp } = useSelector((state) => state.posts);
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const classes = useStyles();
    useEffect(() => {
        dispatch(getProp(id))
    }, [id]);

    const [ offer, setOffer ] = useState({
        name: user.result.name,
        company: '',
        phone: '',
        email: user.result.email,
        property: prop?.address,
        offer: prop?.salePrice
    });
    const handleChange = (e) => {
        setOffer({ ...offer, [e.target.name]: e.target.value })
    };
    const submitOffer = () => {
        dispatch(createOffer(offer))
    };


    if (isLoadingProp) {
        return <Paper elevation={6} className={classes.loadingPaper}>
            <CircularProgress size='7em' />
        </Paper>
    }
  return (
    <Box >
        <NavBar />
        <Box sx={{ display: 'flex', height: { xs: '100%'} }}>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'column', width: '45%', height: '100%', m: 5, p: 3, boxShadow: 3, borderRadius: '2em', backgroundColor: 'white' }}>
                <Box sx={{ width: '100%', height: '30em', position: 'relative', borderRadius: '2em', p: 1  }}>
                    <CardMedia sx={{ borderRadius: '2em', filter: 'brightness(0.9)', width: '100%', height: '100%' }} component='img' src={prop.propPhoto || emptyPhoto} />
                </Box>
                <Box sx={{ display: 'flex', width: '100%', height: '100%', flexDirection: 'column' }}>
                <Typography sx={{ width: '100%', textAlign: 'center', color: 'black', mt: 1, fontSize: '1.8em' }} variant='h5' component='h3'>
                    {prop?.address.replace(', USA', '')}
                </Typography>
                <Box sx={{ display: 'flex', width: '100%', mt: 2 }}>
                    <Box sx={{ width: '50%' }}>
                        <Typography variant='h6' component='h6'>
                            Beds: {prop.beds}
                        </Typography>
                        <Typography variant='h6' component='h6'>
                            Baths: {prop.baths}
                        </Typography>
                        {prop?.parking != '' && prop.parking != 'No Parking' && (
                        <Typography variant='h6' component='h6'>
                            Parking: {prop.parking}
                        </Typography>
                        )}
                        {prop?.pool != '' && prop.pool != 'No' && (
                        <Typography variant='h6' component='h6'>
                            Has a pool
                        </Typography>
                        )}
                    </Box>
                    <Box sx={{ width: '50%' }}>
                        <Typography variant="h6" component='h6'>
                            Living Area: {prop?.livingArea}
                        </Typography>
                        <Typography variant="h6" component='h6'>
                            Lot Size: {prop?.lotSize}
                        </Typography>
                        <Typography variant="h6" component='h6'>
                            Year Build: {prop?.year}
                        </Typography>
                    </Box>
                </Box>
                
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: { xs: '100%', sm: '55%' }, height: '100%', m: 5, boxShadow: 3, borderRadius: '2em', backgroundColor: 'white'  }}>
                <Typography sx={{ width: '100%', textAlign: 'center', fontFamily: 'Rubik', pt: 4 }} component='h4' variant='h4'>
                    Submission Form
                </Typography>
                <Typography variant='body' component='body' sx={{ width: '100%', textAlign: 'center', pt: 3, display: { xs: 'inline-flex', sm: 'none' }, alignItems: 'center', justifyContent: 'center' }}>
                    {prop?.address.replace(', USA', '')}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', mt: 4, alignItems: 'center' }}>
                    <FormControl style={{ width: '80%', marginBottom: '.75em' }}>
                        <TextField style={{ marginTop: '1em' }} id='name' name='name' variant='standard' label='Your Name' value={offer.name} onChange={handleChange} />
                    </FormControl>
                    <FormControl style={{ width: '80%', marginBottom: '.75em' }}>
                        <TextField style={{ marginTop: '1em' }} id='company' name='company' variant='standard' label='Your Company Name' value={offer.company} onChange={handleChange} />
                    </FormControl>
                    <FormControl style={{ width: '80%', marginBottom: '.75em' }}>
                        <TextField style={{ marginTop: '1em' }} id='phone' name='phone' variant='standard' label='Your Phone Number' value={offer.phone} onChange={handleChange} />
                    </FormControl>
                    <FormControl style={{ width: '80%', marginBottom: '.75em' }}>
                        <TextField style={{ marginTop: '1em' }} id='email' name='email' variant='standard' label='Your Email' value={offer.email} onChange={handleChange} />
                    </FormControl>
                    <Box sx={{ m: 3, display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'center',  }}>
                        <Button className='offerButton' onClick={submitOffer} sx={{ '&:hover' : { transform: 'scale(1.09)', transitionDuration: 100 } }} variant="outlined">
                            Take property at {prop.salePrice}
                        </Button>
                        <Typography className='offerSuccess' sx={{ color: 'green', alignItems: 'center', justifyContent: 'center', display: 'none' }} variant='h6' component='h6'>
                            Thank you! Your information has been submitted
                        </Typography>
                    </Box>
                    <Typography sx={{ mt: 3, pb: 3, textAlign: 'center', width: '90%' }}>
                        Once submitted, we will get in contact with you shortly. Office hours are 8:30am - 5:00pm MST, Monday-Friday.
                    </Typography>
                </Box>
            </Box>
        </Box>
        <MobileNav />
        <Box sx={{ position: { xs: 'fixed', xl: 'absolute' }, zIndex: '-10', backgroundImage: `url(${background})`, bottom: 0, width: '100%', height: '100%', backgroundSize: { xs: 'cover' , xl: 'cover'}, filter: 'contrast(0.7)' }} />
    </Box>
  )
}

export default Offer