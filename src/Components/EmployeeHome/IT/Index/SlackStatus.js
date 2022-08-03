import { Box, Typography, Button, List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider } from '@mui/material';
import avatar from './Photos/SlackPause/Avatar.png';
import status from './Photos/SlackPause/Status.png';

const SlackStatus = ({ setOpenSolution, openSolution }) => {
  return (
    openSolution?.name === 'SlackStatus' &&
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', overflowY: 'auto' }}>
        <Typography sx={{ pt: 2 }} variant='h3'>Change your Status in Slack</Typography>
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
                            <Avatar sx={{ cursor: 'pointer', '&:hover' : { width: 'auto', height: 'auto', borderRadius: 0, pr: 2, mr: 2, position: 'absolute', top: 0, zIndex: 100  } }} src={status} />
                        </ListItemAvatar>
                        <ListItemText sx={{ color: '#0685f1' }} primary="In that menu, you should see Update Your Status. Click on that option to open a new menu. Now you are able to select or enter in your current status, so your team can stay up to date on your whereabouts." />
                    </ListItem>
                    <ListItem>
                        <ListItemText sx={{ color: '#0685f1', width: '100%', textAlign: 'center', pt: 5 }} primary='If are still having trouble pausing your notifications, click "Go Back" (Top-left) to submit a ticket for further assistance.' />
                    </ListItem>
            </List>
        </Box>
    </Box>
  )
}

export default SlackStatus