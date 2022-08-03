import { Box, Typography, Button, List, ListItem, ListItemText, Divider } from '@mui/material';

const SlackTag = ({ setOpenSolution, openSolution }) => {
  return (
    openSolution?.name === 'SlackTag' &&
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', overflowY: 'auto' }}>
        <Typography sx={{ pt: 2 }} variant='h3'>Tagging in Slack</Typography>
        <Divider sx={{ width: '100%' }} />
        <Button onClick={() => setOpenSolution(null)} sx={{ position: 'absolute', top: 1, left: 1, p: 3 }}>Go back</Button>
        <Box sx={{ width: '70%', height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <Typography variant='h4' sx={{ width: '100%', textAlign: 'left', p: 3, pl: 3 }}>
            Solution
        </Typography>
            <List>
                    <ListItem>
                        <ListItemText sx={{ color: '#0685f1' }} primary="To simply tag someone or a channel in Slack just type the @ symbol and whomever's name. Keep in mind when you are tagging someone, and there are replies to that particular thread, that person will receive every notification since they are tagged in that post. They will have to manually turn off notifications for that particular post." />
                    </ListItem>
                    <ListItem>
                        <ListItemText sx={{ color: '#0685f1' }} primary="@channel - will notify everyone that is a part of that channel." />
                    </ListItem>
                    <ListItem>
                        <ListItemText sx={{ color: '#0685f1' }} primary="@here - will notify everyone that is ONLINE and that is a part of that channel." />
                    </ListItem>
            </List>
        </Box>
    </Box>
  )
}

export default SlackTag