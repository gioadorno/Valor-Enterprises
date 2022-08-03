import { Box, Typography, Button, List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider } from '@mui/material';
import search from './Photos/DuplicatingScreens/Search.png';
import displaySettings from './Photos/DuplicatingScreens/Display-Settings.png';
import extend from './Photos/DuplicatingScreens/Extend.png';

const DuplicatingDisplays = ({ setOpenSolution, openSolution }) => {
  return (
    openSolution?.name === 'DuplicatingDisplays' &&
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', overflowY: 'auto' }}>
        <Typography sx={{ pt: 2 }} variant='h3'>Duplicating Displays</Typography>
        <Divider sx={{ width: '100%' }} />
        <Button onClick={() => setOpenSolution(null)} sx={{ position: 'absolute', top: 1, left: 1, p: 3 }}>Go back</Button>
        <Box sx={{ width: '70%', height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <Typography variant='h4' sx={{ width: '100%', textAlign: 'left', p: 3, pl: 3 }}>
            Troubleshooting
        </Typography>
            <List>
                <ListItem>
                    <ListItemText sx={{ color: '#0685f1' }} primary='If you just connected your monitor to your laptop and your screens are duplicating (Seeing the same exact screen on your laptop and montior), follow the steps below.' />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar sx={{ cursor: 'pointer', '&:hover' : { width: 'auto', height: 'auto', borderRadius: 0, pr: 2, mr: 2, position: 'absolute', top: 0, zIndex: 100  } }} src={search} />
                    </ListItemAvatar>
                    <ListItemText sx={{ color: '#0685f1' }} primary='On Windows: hit the "Windows Key"+S at the same time to bring up the search menu and type in display. Click on the setting "Duplicate or extend to a connected display" ' />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar sx={{ cursor: 'pointer', '&:hover' : { width: 'auto', height: 'auto', borderRadius: 0, pr: 2, mr: 2, position: 'absolute', top: 0, zIndex: 100  } }} src={displaySettings} />
                    </ListItemAvatar>
                    <ListItemText sx={{ color: '#0685f1' }} primary="Once you're in the display settings, you will see a button that will say Duplicate Displays on your screen." />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar sx={{ cursor: 'pointer', '&:hover' : { width: 'auto', height: 'auto', borderRadius: 0, pr: 2, mr: 2, position: 'absolute', top: 0, zIndex: 100  } }} src={extend} />
                    </ListItemAvatar>
                    <ListItemText sx={{ color: '#0685f1' }} primary='Click the dropdown menu and select the option related to "Extend Displays". Now your displays are extended and can be used as seperate screens.'  />
                </ListItem>
                <ListItem>
                <ListItemAvatar>
                        <Avatar />
                    </ListItemAvatar>
                    <ListItemText sx={{ color: '#0685f1'}} primary='On Mac: Click the Apple Icon (Apple Menu) and click "System Preferences". Click Displays. Click Display Settings.' />
                </ListItem>
                <ListItem>
                <ListItemAvatar>
                        <Avatar />
                    </ListItemAvatar>
                    <ListItemText sx={{ color: '#0685f1'}} primary='Finally click the name of your display, then choose Extend Display from the pop-up menu' />
                </ListItem>
                <ListItem>
                    <ListItemText sx={{ color: '#0685f1', width: '100%', textAlign: 'center', pt: 5 }} primary='If you still have trouble with your displays duplicating, click "Go Back" (Top-left) to submit a ticket for further assistance.' />
                </ListItem>
            </List>
        </Box>
    </Box>
  )
}

export default DuplicatingDisplays