import { format } from "date-fns";
import { useState, useEffect } from 'react';
import { createEvent, getEvents } from "../../../actions/events";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, Divider } from "@mui/material";

const Events = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getEvents())
    },[])
    const events = useSelector((state) => state.events);

    const date = new Date().toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'})

    const options = { month: 'long' };
    const month = new Intl.DateTimeFormat('en-US', options).format(new Date());

    const getMonth = (eventDate) => {
        new Intl.DateTimeFormat('en-US', { month: 'long' }).format(eventDate)
    }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', overflowy: 'auto' }}>
        <Typography variant='h4' component='h5'>
            {month}'s Events/PTO
        </Typography>
        <Divider sx={{ width: '100%', mt: 2 }} />
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', justifyContent: 'flex-start', width: '100%', pl: 2 }}>
            {events.map((event) => {
                if(month === new Date(event.start).toLocaleDateString('en-US', { month: 'long' }))
                return (
                    <>
                    <Box key={event._id} sx={{ display: 'flex', alignItems: 'left', width: '100%', mt: 4, flexDirection: 'column'  }}>
                    <Typography variant='h6' component='h6'>
                        <strong>{event.title}</strong>
                    </Typography>
                    {new Date(event.start).toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'}) === new Date(event.end).toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'}) ? (
                        event.allDay === true ?
                        <Typography variant='h6' component='h6'>
                        {new Date(event.start).toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit', weekday:"long" })}&nbsp;
                        </Typography>
                        :
                        <Typography variant='h6' component='h6'>
                        {new Date(event.start).toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit', weekday:"long", hour: '2-digit', minute:'2-digit'})}&nbsp;
                        </Typography>
                    ) :
                    <Typography variant='h6' component='h6'>
                        {new Date(event.start).toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'})} - {new Date(event.end).toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'})}
                    </Typography>
                    }
                    </Box>
                    <Divider sx={{ width: '50%', pt: 1, borderBlockColor: 'black' }} />
                    </>
                )
            })}
        </Box>
    </Box>
  )
}

export default Events