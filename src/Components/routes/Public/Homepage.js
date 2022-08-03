import { AppBar, Box, Toolbar, IconButton, ButtonGroup, Button, Typography, Container, Avatar, Tooltip, Grid, Card, Divider, FormControlLabel, Slide, Paper } from '@mui/material';
import { Image } from './styles'
import { useState, useEffect, useRef } from 'react';
import GuestMap from '../GuestMap/GuestMap';
import { usePlacesWidget } from 'react-google-autocomplete';
import { createSubmitProp } from '../../../actions/submitprop';
import { useDispatch } from 'react-redux';
import NavBar from './Homepage_Components/NavBar';
import backgroundImage from './pexels-pixabay-221540.jpg';
import TypeWriterEffect from 'react-typewriter-effect';
import MobileNav from './Homepage_Components/MobileNav'

const Homepage = () => {
    const [activeWeDo, setActiveWeDo] = useState(false);
    const [activeWeAre, setActiveWeAre] = useState(false);
    const containerRef = useRef(null);
    const { ref } = usePlacesWidget({
        apiKey: "AIzaSyBat1MaRl7stoHN62WZ7f9aGYWYOqHnBtU",
        onPlaceSelected: (place) => {
            
        },
        options: {
            types: ["address"],
            componentRestrictions: { country: "us" },
        },
        });


    
    //Gets logged in user info
    const user = JSON.parse(localStorage.getItem('profile')); 

    const openWeAre = () => {
        setActiveWeAre(!activeWeAre);
        setActiveWeDo(false)
    };
    const openWeDo = () => {
        setActiveWeDo(!activeWeDo)
        setActiveWeAre(false);
    };

    const meta = {
        title: 'KeygleeDispo ',
        description: 'KeygleeDispo is a real estate investment property provider that is focused on creating the most streamlined and friendly process for both seasoned investors and those looking to take the plunge into their first investment.',
        meta: {
            name: {
                keywords: 'real estate, wholesale, wholesale real estate, sales, market, real estate market, arizona, phoenix'
            }
        }
    }

    return (
        <Box sx={{ width: { xs: '100%', sm: '100%' }, height: { xs: '90%', sm: '70%' } }} >
            <Box ref={containerRef} sx={{ height: { xs: 550, sm: 600, md: 700, xl: 900 }, position: { xs: 'relative' }, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
                <NavBar />
                    <Card sx={{ mt: 0, backgroundColor: '#ffffff00', outline: 'none', border: 'none', boxShadow: 'none' }}>
                        
                        <Box style={{ cursor: 'default' }}>
                        <TypeWriterEffect
                        textStyle={{ fontFamily: 'Red Hat Display', fontSize: '3em', color: '#2DA2DC' }}
                        startDelay={100}
                        cursorColor="#ffffff00"
                        text="KeygleeDispo"
                        typeSpeed={100}
                        hideCursorAfterText={true}
                        />
                        </Box>
                    </Card>
                    <Box sx={{ position: 'absolute', ml: 'auto', mr: 'auto', top: { xs:'90%', sm: '75%' , xl: '65%' } }} aria-label="text button group">
                        <Button variant='text'>
                            <Button onClick={openWeAre} sx={{ color: 'white', fontSize: { xs: '1.2em' , sm: '1.6em', xl: '2em' }, "&:hover": { transform: 'scale(1.1)' }, "&:active": { transform: 'scale(.9)' } }}>
                                Who are we?
                            </Button>
                            <Divider orientation="vertical" flexItem sx={{ borderColor: 'white', height: { xs: '3em' , sm: '4.5em', xl: '6em' }, mx: 2 }} />
                            <Button onClick={openWeDo} sx={{ color: 'white', fontSize: { xs: '1.2em' , sm: '1.6em', xl: '2em' }, "&:hover": { transform: 'scale(1.1)' }, "&:active": { transform: 'scale(.9)' } }}>
                                What do we do?
                            </Button>
                        </Button>
                    </Box>
                <Image src={backgroundImage} />
                {activeWeAre && (
                        <Slide direction='up' in={activeWeAre} container={containerRef.current}>
                        <Box sx={{ backgroundColor: '#00000099', width: '85%', mt: { xs: 2, xl: 8 }, borderRadius: '1em', display: 'flex', alignItems: 'center', justifyContent: 'center', p: { xs: 2, md: 5 }, flexDirection: 'column' }}>
                            <Typography sx={{ color: 'white', mb: { xs: 1 , sm: 3 }, fontSize: { xs: '1.3em' , md: '2.1em' , xl: '2.7em' } }} variant='h3' component='h3'>Who we are</Typography>
                            <Typography sx={{ color: 'white', fontSize: { xs: '.83em' , md: '1.2em' , xl: '1.5em' }}} variant='body1' component='body1'>
                                KeyGlee Dispo is a proud member of the KeyGlee family and owns and operates 19 KeyGlee Franchises. Our national HQ is located in beautiful Phoenix, AZ, with franchise locations in Las Vegas (NV), Tucson (AZ), Northern AZ ( serving Gila, Yavapai, Mohave, Coconino & surrounding counties), Orlando (FL), Tampa (FL), Atlanta (GA), Indianapolis (IN), St. Louis (MO), Kansas City (MO), Birmingham (AL), Charlotte (NC), Columbus (OH), Memphis (TN), Dallas (TX), Houston (TX), Austin (TX), San Antonio (TX), and Salt Lake City (UT).

                            Our mission is to revolutionize real estate by creating a God-fearing industry that pursues business relationships built on integrity. Our company is built on a foundation of love and respect for every person we work with.
                            </Typography>
                        </Box>
                    </Slide>
                )}
                {activeWeDo && (
                    <Slide direction='up' in={activeWeDo} container={containerRef.current}>
                        <Box sx={{ backgroundColor: '#00000099', width: '85%', mt: { xs: 2, xl: 8 }, borderRadius: '1em', display: 'flex', alignItems: 'center', justifyContent: 'center', p: { xs: 2, md: 5 }, flexDirection: 'column' }}>
                            <Typography sx={{ color: 'white', mb: { xs: 2 , sm: 3 }, fontSize: { xs: '1.5em' , md: '2.1em' , xl: '2.7em' } }} variant='h3' component='h3'>What we do</Typography>
                            <Typography sx={{ color: 'white', fontSize: { xs: '.95em' , md: '1.2em' , xl: '1.5em' }}} variant='body1' component='body1'>
                            We make purchasing investment properties easy, and we do it with a loving team that wants to help you make intelligent decisions. Whatever your personal investment goals are, we are here to help you accomplish them. With thousands of successful transactions and happy customers, KeyGlee has the concrete experience you can depend on.

                            KeyGlee is a real estate investment property provider that is focused on creating the most streamlined and friendly process for both seasoned investors and those looking to take the plunge into their first investment.
                            </Typography>
                        </Box>
                    </Slide>
                )}
            </Box>
            <Box sx={{ height: { xs: '100%', sm: 600, xl: 800 }, display: 'flex', width: '100%'}} >
                <GuestMap />
            </Box>
            <MobileNav />
        </Box>
    )
}


Homepage.defaultProps = {
    names: {
        name: 'name',
        phone: 'phone',
        address: 'address',
        email: 'email',
        pictureLink: 'pictureLink',
        bedBath: 'bedBath',
        pool: 'pool',
        livingSpace: 'livingSpace',
        lotSize: 'lotSize',
        year: 'year',
        condition: 'condition',
        occupancy: 'occupancy',
        rentRate: 'rentRate',
        access: 'access',
        askingPrice: 'askingPrice',
        coe: 'coe',
        additionalNotes: 'additionalNotes',
        howOld: 'howOld',
        issues: 'issues',
        file: 'file',
        contract: 'contract'
    },
    confirm: 'Your information has been submitted. One of our experts will contact you shortly!'
}

const fadeStyle = {
    width: '100%',
    height: '270%',
    marginBottom: '10em',
    zIndex: '-1',
    position: 'fixed'
}
export default Homepage
