import { Box, Typography, Button, List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider } from '@mui/material';
import micIcon from './Photos/MicNotWorking/Mic-Icon.png';
import micInput from './Photos/MicNotWorking/Mic-Input.png';

const BackgroundNoise = ({ setOpenSolution, openSolution }) => {
  return (
    openSolution?.name === 'BackgroundNoise' &&
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', overflowY: 'auto' }}>
        <Typography sx={{ pt: 2 }} variant='h3'>Background Noise</Typography>
        <Divider sx={{ width: '100%' }} />
        <Button onClick={() => setOpenSolution(null)} sx={{ position: 'absolute', top: 1, left: 1, p: 3 }}>Go back</Button>
        <Box sx={{ width: '70%', height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <Typography variant='h4' sx={{ width: '100%', textAlign: 'left', p: 3, pl: 3 }}>
            Troubleshooting
        </Typography>
            <List>
                <ListItem>
                    <ListItemText sx={{ color: '#0685f1' }} primary="If you're talking on the phone, and they can hear a lot of background noise coming from your end, that mean's the mic input is most likely the problem." />
                </ListItem>
                <ListItem>
                        <ListItemAvatar>
                            <Avatar sx={{ cursor: 'pointer', '&:hover' : {width: 'auto', height: 'auto', borderRadius: 0, pr: 2, mr: 2, position: 'absolute', top: 0, zIndex: 100 } }} src={micIcon} />
                        </ListItemAvatar>
                        <ListItemText sx={{ color: '#0685f1' }} primary='Right click the Sound Icon in the bottom-right screen and click "Sound Settings".' />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar sx={{ cursor: 'pointer', '&:hover' : { width: 'auto', height: 'auto', borderRadius: 0, pr: 2, mr: 2, position: 'absolute', top: 0, zIndex: 100  } }} src={micInput} />
                        </ListItemAvatar>
                        <ListItemText sx={{ color: '#0685f1' }} primary='Be sure headset is selected and not "Microphone Array". Microphone Array is your laptop microphone.' />
                    </ListItem>
                    <ListItem>
                        <ListItemText sx={{ color: '#0685f1', width: '100%', textAlign: 'center', pt: 5 }} primary='If your microphone is still not working, click "Go Back" (Top-left) to submit a ticket for further assistance.' />
                    </ListItem>
            </List>
        </Box>
    </Box>
  )
}

export default BackgroundNoise