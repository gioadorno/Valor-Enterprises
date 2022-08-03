import { Box, Typography, Button, List, ListItem, ListItemText, Divider } from '@mui/material';

const CloseStats = ({ setOpenSolution, openSolution }) => {

  return (
    openSolution?.name === 'CloseStats' &&
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', overflowY: 'auto' }}>
        <Typography sx={{ pt: 2 }} variant='h3'>Close Stats not updating</Typography>
        <Divider sx={{ width: '100%' }} />
        <Button onClick={() => setOpenSolution(null)} sx={{ position: 'absolute', top: 1, left: 1, p: 3 }}>Go back</Button>
        <Box sx={{ width: '70%', height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <Typography variant='h4' sx={{ width: '100%', textAlign: 'left', p: 3, pl: 3 }}>
            The Reason
        </Typography>
            <List>
                <ListItem>
                    <ListItemText sx={{ color: '#0685f1', width: '100%', textAlign: 'center', pt: 5 }} primary="If you see your stats not reflecting what actual calls/texts you made and recieved, this is a Close-related issue. Click the link below to see if Close is having any recent issues on their end." />
                </ListItem>
                <ListItem>
                    <a style={{ fontSize: '1.2em', textAlign: 'center', width: '100%' }} href={'https://status.close.com/'}>https://status.close.com/</a>
                </ListItem>
            </List>
        </Box>
    </Box>
  )
}

export default CloseStats