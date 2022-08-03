import { Box, Container, Paper, Fade, Typography, Grid, Divider, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, ListItemButton, TextField } from '@mui/material';
import MobileNav from '../MobileNav';
import OuterBar from '../OuterBar';
import { useState, useEffect, cloneElement, useContext } from 'react';
import { AccountContext } from '../../Login/Account';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import MicIcon from '@mui/icons-material/Mic';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import HeadsetOffIcon from '@mui/icons-material/HeadsetOff';
import TimelineIcon from '@mui/icons-material/Timeline';
import EmailIcon from '@mui/icons-material/Email';
import PhonelinkEraseIcon from '@mui/icons-material/PhonelinkErase';
import MonitorIcon from '@mui/icons-material/Monitor';
import ResetTvIcon from '@mui/icons-material/ResetTv';
import DevicesIcon from '@mui/icons-material/Devices';
import HeadphonesBatteryIcon from '@mui/icons-material/HeadphonesBattery';
import BluetoothConnectedIcon from '@mui/icons-material/BluetoothConnected';
import BallotIcon from '@mui/icons-material/Ballot';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import SdCardAlertIcon from '@mui/icons-material/SdCardAlert';
import BugReportIcon from '@mui/icons-material/BugReport';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import Ticket from './Ticket';

import MicNotWorking from './Index/MicNotWorking';
import BackgroundNoise from './Index/BackgroundNoise';
import HeadsetCantHear from './Index/HeadsetCantHear';
import Bluetooth from './Index/Bluetooth';
import FormSubmit from './Index/FormSubmit';
import BlankScreen from './Index/BlankScreen';
import IncorrectInfo from './Index/IncorrectInfo';
import CloseStats from './Index/CloseStats';
import CloseEmail from './Index/CloseEmail';
import CallsNotWorking from './Index/CallsNotWorking';
import DuplicatingDisplays from './Index/DuplicatingDisplays';
import MouseToScreen from './Index/MouseToScreen';
import SlackPause from './Index/SlackPause';
import SlackStatus from './Index/SlackStatus';
import SlackTag from './Index/SlackTag';





const ITDashboard = () => {
    const [ openSolution, setOpenSolution ] = useState(null);
    const { employee, loggedIn } = useContext(AccountContext);
    const navigate = useNavigate();
    const [ isLoggedIn, setIsLoggedIn ] = useState(loggedIn);

    useEffect(() => {
        if (isLoggedIn === false) {
            navigate('/');
        }
        },[])
    

    
  return (
    <Box sx={{ display: 'flex' }}>
        <OuterBar />
        <Container maxWidth="2xl" sx={{ mt: 10, mb: 4, display: 'flex', alignItems: 'center', height: { xs: '100%' , xl: '100vh'}, justifyContent: 'flex-start', flexDirection: 'column', pb: 4   }}>
                    {openSolution === null && (
                    <Fade in={openSolution === null} timeout={600}>
                <Paper sx={{ width: '100%', height: { xs: '100%' , xl: '100vh' }, boxShadow: 4, borderRadius: '1em', overflowY: 'auto' }}>
                        <Grid container spacing={5}>
                            <Grid item xs={12} xl={7}>
                                <Box sx={{ boxShadow: 5, width: '100%', height: { xs: '100%' , xl: '100vh' }, display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
                                    <Typography variant='h4' sx={{ textAlign: 'center' }}>Common Problems & Solutions</Typography>
                                    <Divider sx={{ width: "80%" }} />
                                    <Grid container spacing={3}>
                                        <Grid sx={{ pl: 2 }} item xs={12} md={6}>
                                            <Typography sx={{pl: 4, pt: 2}} variant='h6' component='div'>Microphone Issues</Typography>
                                            <List>
                                                <ListItemButton onClick={() => setOpenSolution({name: 'MicNotWorking'})} sx={{ color: '#0095ff', '&:hover': { bgcolor: '#00beff0d' } }}>
                                                    <ListItemIcon>
                                                        <MicIcon sx={{ color: '#006fbf' }} />
                                                    </ListItemIcon>
                                                    <ListItemText primary='Microphone Not Working' secondary='No one can hear you' />
                                                </ListItemButton>
                                                <ListItemButton onClick={() => setOpenSolution({name: 'BackgroundNoise'})} sx={{ color: '#0095ff', '&:hover': { bgcolor: '#00beff0d' } }}>
                                                    <ListItemIcon>
                                                        <RecordVoiceOverIcon sx={{ color: '#006fbf' }} />
                                                    </ListItemIcon>
                                                    <ListItemText primary='They can hear my background' secondary='A lot of background noise' />
                                                </ListItemButton>
                                            </List>
                                            <Typography sx={{pl: 4, pt: 2}} variant='h6' component='div'>Headset Issues</Typography>
                                            <List>
                                                <ListItemButton onClick={() => setOpenSolution({name: 'HeadsetNotWorking'})} sx={{ color: '#0095ff', '&:hover': { bgcolor: '#00beff0d' } }}>
                                                    <ListItemIcon>
                                                        <HeadsetOffIcon sx={{ color: '#006fbf' }} />
                                                    </ListItemIcon>
                                                    <ListItemText primary="Headset not working" secondary="Can't hear anything"/>
                                                </ListItemButton>
                                                <ListItemButton onClick={() => setOpenSolution({name: 'Bluetooth'})} sx={{ color: '#0095ff', '&:hover': { bgcolor: '#00beff0d' } }}>
                                                    <ListItemIcon>
                                                        <BluetoothConnectedIcon sx={{ color: '#006fbf' }} />
                                                    </ListItemIcon>
                                                    <ListItemText primary="Connect headset to computer" secondary="Bluetooth headset"/>
                                                </ListItemButton>
                                            </List>
                                            <Typography sx={{pl: 4, pt: 2}} variant='h6' component='div'>Website Bugs/Issues</Typography>
                                            <List>
                                                <ListItemButton onClick={() => setOpenSolution({name: 'SubmitForm'})} sx={{ color: '#0095ff', '&:hover': { bgcolor: '#00beff0d' } }}>
                                                    <ListItemIcon>
                                                        <BallotIcon sx={{ color: '#006fbf' }} />
                                                    </ListItemIcon>
                                                    <ListItemText primary="Form not Submitting to Slack" secondary="Form submits, but don't see it in Slack"/>
                                                </ListItemButton>
                                                <ListItemButton onClick={() => setOpenSolution({name: 'BlankScreen'})} sx={{ color: '#0095ff', '&:hover': { bgcolor: '#00beff0d' } }}>
                                                    <ListItemIcon>
                                                        <ChatBubbleIcon sx={{ color: '#006fbf' }} />
                                                    </ListItemIcon>
                                                    <ListItemText primary="Blank screen" secondary="Receiving blank screen when clicking on a new page"/>
                                                </ListItemButton>
                                                <ListItemButton onClick={() => setOpenSolution({name: 'IncorrectInfo'})} sx={{ color: '#0095ff', '&:hover': { bgcolor: '#00beff0d' } }}>
                                                    <ListItemIcon>
                                                        <SdCardAlertIcon sx={{ color: '#006fbf' }} />
                                                    </ListItemIcon>
                                                    <ListItemText primary="Slack displaying incorrect Info" secondary="After submitting a form"/>
                                                </ListItemButton>
                                                <ListItemButton sx={{ color: '#0095ff', '&:hover': { bgcolor: '#00beff0d' } }}>
                                                    <ListItemIcon>
                                                        <BugReportIcon sx={{ color: '#006fbf' }} />
                                                    </ListItemIcon>
                                                    <ListItemText primary="All other issues/bugs" secondary="Please submit a ticket"/>
                                                </ListItemButton>
                                            </List>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Typography sx={{pl: 4, pt: 2}} variant='h6' component='div'>Close Issues</Typography>
                                            <List>
                                                <ListItemButton onClick={() => setOpenSolution({name: 'CloseStats'})} sx={{ color: '#0095ff', '&:hover': { bgcolor: '#00beff0d' } }}>
                                                    <ListItemIcon>
                                                        <TimelineIcon sx={{ color: '#006fbf' }} />
                                                    </ListItemIcon>
                                                    <ListItemText primary="Stats not updating"/>
                                                </ListItemButton>
                                                <ListItemButton onClick={() => setOpenSolution({name: 'EmailSync'})} sx={{ color: '#0095ff', '&:hover': { bgcolor: '#00beff0d' } }}>
                                                    <ListItemIcon>
                                                        <EmailIcon sx={{ color: '#006fbf' }} />
                                                    </ListItemIcon>
                                                    <ListItemText primary="Receiving email error" secondary="Email not synced"/>
                                                </ListItemButton>
                                                <ListItemButton onClick={() => setOpenSolution({name: 'CallsNotWorking'})} sx={{ color: '#0095ff', '&:hover': { bgcolor: '#00beff0d' } }}>
                                                    <ListItemIcon>
                                                        <PhonelinkEraseIcon sx={{ color: '#006fbf' }} />
                                                    </ListItemIcon>
                                                    <ListItemText primary="Call/Texts not working"/>
                                                </ListItemButton>
                                            </List>
                                            <Typography sx={{pl: 4, pt: 2}} variant='h6' component='div'>Monitor/Display</Typography>
                                            <List>
                                                <ListItemButton onClick={() => setOpenSolution({name: 'DuplicatingDisplays'})} sx={{ color: '#0095ff', '&:hover': { bgcolor: '#00beff0d' } }}>
                                                    <ListItemIcon>
                                                        <MonitorIcon sx={{ color: '#006fbf' }} />
                                                    </ListItemIcon>
                                                    <ListItemText primary="Duplicating Displays" secondary='I want to have two different displays'/>
                                                </ListItemButton>
                                                <ListItemButton onClick={() => setOpenSolution({name: 'MouseToScreen'})} sx={{ color: '#0095ff', '&:hover': { bgcolor: '#00beff0d' } }}>
                                                    <ListItemIcon>
                                                        <ResetTvIcon sx={{ color: '#006fbf' }} />
                                                    </ListItemIcon>
                                                    <ListItemText primary="Mouse won't move to second screen" secondary="Displays are in reverse"/>
                                                </ListItemButton>
                                            </List>
                                            <Typography sx={{pl: 4, pt: 2}} variant='h6' component='div'>Slack</Typography>
                                            <List>
                                                <ListItemButton onClick={() => setOpenSolution({name: 'SlackPause'})} sx={{ color: '#0095ff', '&:hover': { bgcolor: '#00beff0d' } }}>
                                                    <ListItemIcon>
                                                        <NotificationsActiveIcon sx={{ color: '#006fbf' }} />
                                                    </ListItemIcon>
                                                    <ListItemText primary="How to pause notifications"/>
                                                </ListItemButton>
                                                <ListItemButton onClick={() => setOpenSolution({name: 'SlackStatus'})} sx={{ color: '#0095ff', '&:hover': { bgcolor: '#00beff0d' } }}>
                                                    <ListItemIcon>
                                                        <ToggleOnIcon sx={{ color: '#006fbf' }} />
                                                    </ListItemIcon>
                                                    <ListItemText primary="Change status" secondary="Away/Active"/>
                                                </ListItemButton>
                                                <ListItemButton onClick={() => setOpenSolution({name: 'SlackTag'})} sx={{ color: '#0095ff', '&:hover': { bgcolor: '#00beff0d' } }}>
                                                    <ListItemIcon>
                                                        <AlternateEmailIcon sx={{ color: '#006fbf' }} />
                                                    </ListItemIcon>
                                                    <ListItemText primary="Tagging" secondary="Individuals/Channels"/>
                                                </ListItemButton>
                                            </List>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                            <Grid item xs={12} xl={5}>
                                <Ticket />
                            </Grid>
                        </Grid>
                </Paper>
                    </Fade>
                    )}
                    {openSolution && (
                        <Fade in={openSolution} timeout={600}>
                            <Paper sx={{ width: '100%', height: { xs: '100%' , xl: '100vh' }, boxShadow: 4, borderRadius: '1em', overflowY: 'auto' }}>
                                <MicNotWorking openSolution={openSolution} setOpenSolution={setOpenSolution} />
                                <BackgroundNoise openSolution={openSolution} setOpenSolution={setOpenSolution} />
                                <HeadsetCantHear openSolution={openSolution} setOpenSolution={setOpenSolution} />
                                <Bluetooth openSolution={openSolution} setOpenSolution={setOpenSolution} />
                                <FormSubmit openSolution={openSolution} setOpenSolution={setOpenSolution} />
                                <BlankScreen openSolution={openSolution} setOpenSolution={setOpenSolution} />
                                <IncorrectInfo openSolution={openSolution} setOpenSolution={setOpenSolution} />
                                <CloseStats openSolution={openSolution} setOpenSolution={setOpenSolution} />
                                <CloseEmail openSolution={openSolution} setOpenSolution={setOpenSolution} />
                                <CallsNotWorking openSolution={openSolution} setOpenSolution={setOpenSolution} />
                                <DuplicatingDisplays openSolution={openSolution} setOpenSolution={setOpenSolution} />
                                <MouseToScreen openSolution={openSolution} setOpenSolution={setOpenSolution} />
                                <SlackPause openSolution={openSolution} setOpenSolution={setOpenSolution} />
                                <SlackStatus openSolution={openSolution} setOpenSolution={setOpenSolution} />
                                <SlackTag openSolution={openSolution} setOpenSolution={setOpenSolution} />
                            </Paper>
                        </Fade>
                    )}
        </Container>
        <MobileNav />
    </Box>
  )
}

export default ITDashboard