import { Box, Typography, Button, List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider } from '@mui/material';
import searchBluetooth from './Photos/Bluetooth/Search-Bluetooth.png';
import addDevice from './Photos/Bluetooth/Add-Device.png';
import connected from './Photos/Bluetooth/Connected.png';

const Bluetooth = ({ setOpenSolution, openSolution }) => {
  return (
    openSolution?.name === 'Bluetooth' &&
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', overflowY: 'auto' }}>
        <Typography sx={{ pt: 2 }} variant='h3'>Bluetooth Headset</Typography>
        <Divider sx={{ width: '100%' }} />
        <Button onClick={() => setOpenSolution(null)} sx={{ position: 'absolute', top: 1, left: 1, p: 3 }}>Go back</Button>
        <Box sx={{ width: '70%', height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <Typography variant='h4' sx={{ width: '100%', textAlign: 'left', p: 3, pl: 3 }}>
            How to connect your headset
        </Typography>
            <List>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar sx={{ cursor: 'pointer', '&:hover' : { width: 'auto', height: 'auto', borderRadius: 0, pr: 2, mr: 2, position: 'absolute', top: 0, zIndex: 100 } }} src={searchBluetooth} />
                    </ListItemAvatar>
                    <ListItemText sx={{ color: '#0685f1' }} primary='To access the bluetooth settings, on windows hit the "Windows Key"+R at the same time. This will bring up a search menu (Macs will have a search menu/icon in the bar at the top of your screen). In search type in Bluetooth and click Bluetooth & other devices settings (Bluetooth Settings).' />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar sx={{ cursor: 'pointer', '&:hover' : { width: 'auto', height: 'auto', borderRadius: 0, pr: 2, mr: 2, position: 'absolute', top: 0, zIndex: 100  } }} src={addDevice} />
                    </ListItemAvatar>
                    <ListItemText sx={{ color: '#0685f1' }} primary="Once you're inside the settings, you should see an Add Device button. Click the button, select Blueooth, and select the corresponding bluetooth device (M98 for work headsets)" />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar sx={{ cursor: 'pointer', '&:hover' : { width: 'auto', height: 'auto', borderRadius: 0, pr: 2, mr: 2, position: 'absolute', top: 0, zIndex: 100  } }} src={connected} />
                    </ListItemAvatar>
                    <ListItemText sx={{ color: '#0685f1' }} primary='You should now see your headset under the "Audio" setting as "Connected voice, music, etc".' />
                </ListItem>
                <ListItem>
                    <ListItemText sx={{ color: '#0685f1', width: '100%', textAlign: 'center', pt: 5 }} primary='If you still have trouble connecting your bluetooth device, click "Go Back" (Top-left) to submit a ticket for further assistance.' />
                </ListItem>
            </List>
        </Box>
    </Box>
  )
}

export default Bluetooth