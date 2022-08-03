import { Box, Typography, Button, List, ListItem, ListItemText, Divider } from '@mui/material';

const BlankScreen = ({ setOpenSolution, openSolution }) => {
  return (
    openSolution?.name === 'BlankScreen' &&
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', overflowY: 'auto' }}>
        <Typography sx={{ pt: 2 }} variant='h3'>Blank Screen</Typography>
        <Divider sx={{ width: '100%' }} />
        <Button onClick={() => setOpenSolution(null)} sx={{ position: 'absolute', top: 1, left: 1, p: 3 }}>Go back</Button>
        <Box sx={{ width: '70%', height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <Typography variant='h4' sx={{ width: '100%', textAlign: 'left', p: 3, pl: 3 }}>
            The Reason
        </Typography>
            <List>
                <ListItem>
                    <ListItemText sx={{ color: '#0685f1', width: '100%', textAlign: 'center', pt: 5 }} primary='If you click on a tab or are loaded into a blank page, 9/10 times that is a bug or error on the page that needs to be fixed. If this is something you come across, click the "Go Back" button (Top-left) to submit a ticket.' />
                </ListItem>
            </List>
        </Box>
    </Box>
  )
}

export default BlankScreen