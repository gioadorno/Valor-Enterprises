import { Box, Typography, Button, List, ListItem, ListItemText, Divider } from '@mui/material';

const IncorrectInfo = ({ setOpenSolution, openSolution }) => {
  return (
    openSolution?.name === 'IncorrectInfo' &&
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', overflowY: 'auto' }}>
        <Typography sx={{ pt: 2 }} variant='h3'>Incorrect info being displayed to Slack</Typography>
        <Divider sx={{ width: '100%' }} />
        <Button onClick={() => setOpenSolution(null)} sx={{ position: 'absolute', top: 1, left: 1, p: 3 }}>Go back</Button>
        <Box sx={{ width: '70%', height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <Typography variant='h4' sx={{ width: '100%', textAlign: 'left', p: 3, pl: 3 }}>
            Troubleshooting
        </Typography>
            <List>
                <ListItem>
                    <ListItemText sx={{ color: '#0685f1', width: '100%', textAlign: 'center', pt: 5 }} primary='If you are seeing incorrect info being displayed in Slack after submitting a form, first try refreshing the browser as updates are constantly being pushed out. If there is still an issue, then please click "Go Back" (Top-left) to submit a ticket.' />
                </ListItem>
            </List>
        </Box>
    </Box>
  )
}

export default IncorrectInfo