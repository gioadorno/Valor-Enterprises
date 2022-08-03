import { Box, Typography, Button, List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider } from '@mui/material';
import avatar from './Photos/SlackPause/Avatar.png';
import pause from './Photos/SlackPause/Pause.png';

const SlackPause = ({ setOpenSolution, openSolution }) => {
  return (
    openSolution?.name === 'SlackPause' &&
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', overflowY: 'auto' }}>
        <Typography sx={{ pt: 2 }} variant='h3'>Pause Notifications in Slack</Typography>
        <Divider sx={{ width: '100%' }} />
        <Button onClick={() => setOpenSolution(null)} sx={{ position: 'absolute', top: 1, left: 1, p: 3 }}>Go back</Button>
        <Box sx={{ width: '70%', height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <Typography variant='h4' sx={{ width: '100%', textAlign: 'left', p: 3, pl: 3 }}>
            Solution
        </Typography>
            <List>
                <ListItem>
                        <ListItemAvatar>
                            <Avatar sx={{ cursor: 'pointer', '&:hover' : {width: 'auto', height: 'auto', borderRadius: 0, pr: 2, mr: 2, position: 'absolute', top: 0, zIndex: 100 } }} src={avatar} />
                        </ListItemAvatar>
                        <ListItemText sx={{ color: '#0685f1' }} primary="Once you're logged in to Slack, in the top-right corner you should see a box with your avatar/profile photo. Click that to open up a pop up menu." />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar sx={{ cursor: 'pointer', '&:hover' : { width: 'auto', height: 'auto', borderRadius: 0, pr: 2, mr: 2, position: 'absolute', top: 0, zIndex: 100  } }} src={pause} />
                        </ListItemAvatar>
                        <ListItemText sx={{ color: '#0685f1' }} primary="In that menu, you should see Pause Notifications. Hover over that, and you should see different settings to pause for a certain time, or set a custom parameter." />
                    </ListItem>
                    <ListItem>
                        <ListItemText sx={{ color: '#0685f1', width: '100%', textAlign: 'center', pt: 5 }} primary='If are still having trouble pausing your notifications, click "Go Back" (Top-left) to submit a ticket for further assistance.' />
                    </ListItem>
            </List>
        </Box>
    </Box>
  )
}

export default SlackPause