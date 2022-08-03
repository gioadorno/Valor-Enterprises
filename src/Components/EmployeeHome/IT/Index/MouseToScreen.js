import { Box, Typography, Button, List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider } from '@mui/material';
import search from './Photos/DuplicatingScreens/Search.png';
import displaySettings from './Photos/DuplicatingScreens/Multiple-Screens.png';

const MouseToScreen = ({ setOpenSolution, openSolution }) => {
  return (
    openSolution?.name === 'MouseToScreen' &&
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', overflowY: 'auto' }}>
        <Typography sx={{ pt: 2 }} variant='h3'>Displays are reversed/Mouse won't move to second screen</Typography>
        <Divider sx={{ width: '100%' }} />
        <Button onClick={() => setOpenSolution(null)} sx={{ position: 'absolute', top: 1, left: 1, p: 3 }}>Go back</Button>
        <Box sx={{ width: '70%', height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <Typography variant='h4' sx={{ width: '100%', textAlign: 'left', p: 3, pl: 3 }}>
            Troubleshooting
        </Typography>
            <List>
                <ListItem>
                    <ListItemText sx={{ color: '#0685f1' }} primary='If your mouse is not moving over to the second screen, then most likely your displays are duplicating. Go back and follow the steps to fix a duplicating screen. If your screens are reversed, follow these next steps.' />
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
                    <ListItemText sx={{ color: '#0685f1' }} primary="Once you're in the display settings, you will see screens labeled 1 and 2 (If you have more than two, you will see more). All you have to do next is drag screen one to the opposite side of screen two, and click apply. Now your mouse should move in correlation to your movement that you want." />
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
                    <ListItemText sx={{ color: '#0685f1'}} primary="Once you're in the display settings, you will see screens labeled 1 and 2 (If you have more than two, you will see more). All you have to do next is drag screen one to the opposite side of screen two, and click apply. Now your mouse should move in correlation to your movement that you want." />
                </ListItem>
                <ListItem>
                    <ListItemText sx={{ color: '#0685f1', width: '100%', textAlign: 'center', pt: 5 }} primary='If you are still having trouble with your screens being reversed, click "Go Back" (Top-left) to submit a ticket for further assistance.' />
                </ListItem>
            </List>
        </Box>
    </Box>
  )
}

export default MouseToScreen