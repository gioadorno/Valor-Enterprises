import { Box,Typography, TextField, Button } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTicket } from '../../../actions/tickets';

const Ticket = () => {
    const user = JSON.parse(localStorage.getItem('profile')); 
    const date = new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' ,hour12: true });
    const [ ticket, setTicket ] = useState({
        name: user.result.name,
        date: date,
        title: '',
        description: ''
    });

    const dispatch = useDispatch();

    const submitTicket = async () => {
        dispatch(createTicket(ticket));
        document.querySelector('.ticketButton').style.display = 'none';
        document.querySelector('.ticketButton2').style.display = 'flex';
    }
  return (
    <Box sx={{ boxShadow: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '100%', overflowY: 'auto' }}>
        <Typography variant='h4' sx={{ pt: 2 }}>
            Submit a Ticket
        </Typography>
        <TextField sx={{ my: 3, width: '90%' }} label='Name' disabled value={user.result.name} />
        <TextField sx={{ my: 3, width: '90%' }} label='Title' onChange={e => setTicket({ ...ticket, title: e.target.value })} />
        <TextField sx={{ my: 3, width: '90%' }} multiline={true} rows={4} label='Description' onChange={e => setTicket({ ...ticket, description: e.target.value })} />
        <Button disabled={ticket.description === '' ? true : false} onClick={submitTicket} className='ticketButton' variant='outlined'>Submit</Button>
        <Button sx={{ display: 'none' }} className='ticketButton2' disabled variant='outlined'>Ticket Submitted</Button>
    </Box>  
  )
}

export default Ticket