import { Box, Typography, Button, List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider } from '@mui/material';
import closeSettings from './Photos/CloseEmail/Close-Settings.png';
import connectedAccounts from './Photos/CloseEmail/Connected-Accounts.png';
import email from './Photos/CloseEmail/Account.png';
import removeAccount from './Photos/CloseEmail/Remove-Account.png';

const CloseEmail = ({ setOpenSolution, openSolution }) => {
  return (
    openSolution?.name === 'EmailSync' &&
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', overflowY: 'auto' }}>
        <Typography sx={{ pt: 2 }} variant='h3'>Email not synced with Close</Typography>
        <Divider sx={{ width: '100%' }} />
        <Button onClick={() => setOpenSolution(null)} sx={{ position: 'absolute', top: 1, left: 1, p: 3 }}>Go back</Button>
        <Box sx={{ width: '70%', height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <Typography variant='h4' sx={{ width: '100%', textAlign: 'left', p: 3, pl: 3 }}>
            Troubleshooting
        </Typography>
            <List>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar sx={{ cursor: 'pointer', '&:hover' : { width: 'auto', height: 'auto', borderRadius: 0, pr: 2, mr: 2, position: 'absolute', top: 0, zIndex: 100 } }} src={closeSettings} />
                    </ListItemAvatar>
                    <ListItemText sx={{ color: '#0685f1' }} primary='If you are receiving an error message that your email is not synced in Close, click "Settings" on the left-hand side in the Close App.' />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar sx={{ cursor: 'pointer', '&:hover' : { width: 'auto', height: 'auto', borderRadius: 0, pr: 2, mr: 2, position: 'absolute', top: 0, zIndex: 100  } }} src={connectedAccounts} />
                    </ListItemAvatar>
                    <ListItemText sx={{ color: '#0685f1' }} primary='Next, click on "Connected Accounts".' />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar sx={{ cursor: 'pointer', '&:hover' : { width: 'auto', height: 'auto', borderRadius: 0, pr: 2, mr: 2, position: 'absolute', top: 0, zIndex: 100  } }} src={email} />
                    </ListItemAvatar>
                    <ListItemText sx={{ color: '#0685f1' }} primary="If you don't have an email connected already, you will click Add Account, then type in your work email address. If you already have an email address in Close, you will click the Edit Button on the right hand side." />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar sx={{ cursor: 'pointer', '&:hover' : { width: 'auto', height: 'auto', borderRadius: 0, pr: 2, mr: 2, position: 'absolute', top: 0, zIndex: 100  } }} src={removeAccount} />
                    </ListItemAvatar>
                    <ListItemText sx={{ color: '#0685f1' }} primary="Once you're in edit, you will scroll down to the bottom and click Remove Account." />
                </ListItem>
                <ListItem>
                    <ListItemText sx={{ color: '#0685f1' }} primary="Last step is to go back to Connected Accounts, if you're not in there already, and click Add Account. Re-add your account and your account should now be connected." />
                </ListItem>
                <ListItem>
                    <ListItemText sx={{ color: '#0685f1', width: '100%', textAlign: 'center', pt: 5 }} primary='If you still have trouble connecting to your account, click "Go Back" (Top-left) to submit a ticket for further assistance.' />
                </ListItem>
            </List>
        </Box>
    </Box>
  )
}

export default CloseEmail