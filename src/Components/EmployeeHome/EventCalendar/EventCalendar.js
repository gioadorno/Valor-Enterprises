import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useState, useEffect, useContext, Fragment } from 'react';
import { Box, SpeedDial, SpeedDialAction, Modal, Typography, TextField, Button, FormControl, Select, InputLabel, MenuItem, Snackbar, IconButton } from "@mui/material";
import DateRangeIcon from '@mui/icons-material/DateRange';
import CloseIcon from '@mui/icons-material/Close';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import OuterBar from '../OuterBar';
import MobileNav from "../MobileNav";
import './styles.css';
import { API } from 'aws-amplify';
import { LocalizationProvider, DateTimePicker} from '@mui/lab';
import AdapterDateFns from "@mui/lab/modern/AdapterDateFns";
import { format } from "date-fns";

import { AccountContext } from "../../Login/Account";

const actions = [
    { icon: <DateRangeIcon />, name: 'Add Event' },
  ];

const EventCalendar = () => {
        // API
        const apiName = 'valproperties';
        const path = '/events';
        // 
    const [ events, setEvents ] = useState([]);
    const { employee, getSession } = useContext(AccountContext);
    const [ openSubmit, setOpenSubmit ] = useState(false);
    const [ openEvent, setOpenEvent ] = useState(null);
    const [ event, setEvent ] = useState({ title: '', start: '', end: '', display: 'background', backgroundColor: '#b30000d9', allDay: false, textColor: 'black', fontWeight: 1000 })
    useEffect(() => {
        API.get(apiName, path)
        .then(res => {
            setEvents(res.Items)})
        },[])
    useEffect(() => {
        getSession()
    },[])


    const closeModal = () => {
        setOpenEvent(null)
    };
    const handleSubmit = () => {
        if(event.allDay === false) {
            event.display = null;
            event.backgroundColor = null
        }
        API.post(apiName, path, {
            body: event
        })
        .then(() => {
            setOpenSubmit(true)
        })
        .catch(err => console.log(err))
        setOpenEvent(null);
    }

    const closeSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
    
        setOpenSubmit(false);
    };

    const updateAction = (
        <Fragment>
            <Button color="error" size="large" onClick={closeSnackBar}>
            Close
            </Button>
            <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={closeSnackBar}
            >
            <CloseIcon fontSize="small" />
            </IconButton>
        </Fragment>
        );

  return (
      <Box sx={{ display: 'flex', height: '100vh', width: '100%' }}>
          <OuterBar />
          <Snackbar open={openSubmit} autoHideDuration={5500} onClose={closeSnackBar} message='Event has been submitted' action={updateAction} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} />
            <Modal sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} open={openEvent} onClose={closeModal} aria-labelledby="Create Event" aria-describedby="Keyglee Events">
                <Box sx={{ bgcolor: 'white', boxShadow: 3, width: '50%', height: '70%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography sx={{ mt: 1 }} variant='h4' component='h4'>
                        Add an Event
                    </Typography>
                    <TextField
                        margin="normal"
                        required
                        sx={{ width: '70%' }}
                        id="title"
                        label="Event Name(Thomas's Birthday, End of the Month Meeting, Luke PTO)"
                        name="title"
                        autoComplete="title"
                        autoFocus
                        value={event.title}
                        onChange={(e) => setEvent({ ...event, title: e.target.value })}
              />
            <FormControl sx={{ width: '70%', mt: 2 }}>
                <InputLabel id='allday'>Is this an all day event?</InputLabel>
                <Select id='allday' value={event.allDay} label='Is this an all day event?' onChange={e => setEvent({ ...event, allDay: e.target.value })}>
                    <MenuItem value='false'>No</MenuItem>
                    <MenuItem value='true'>Yes</MenuItem>
                </Select>
            </FormControl>
              <LocalizationProvider dateAdapter={AdapterDateFns} >
                    <DateTimePicker
                    label="Choose Start Date/Time"
                    value={event.start}
                    onChange={(newValue) => setEvent({ ...event, start: newValue })}
                    renderInput={(params) => <TextField style={{ width: '70%', marginTop: '2em' }} {...params} />} />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDateFns} >
                    <DateTimePicker
                    label="Choose End Date/Time"
                    value={event.end}
                    onChange={(newValue) => setEvent({ ...event, end: newValue })}
                    renderInput={(params) => <TextField style={{ width: '70%', marginTop: '2em' }} {...params} />} />
                </LocalizationProvider>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button onClick={handleSubmit}>Submit</Button>
                </Box>
                </Box>
            </Modal>
          <Box sx={{ display: 'flex', width: '100%', height: '100%', m: 4, boxShadow: 3, mt: 10, position: 'relative' }}>
              {employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Admin') && 
              <SpeedDial ariaLabel="Event Calendar" sx={{ position: 'fixed', bottom: 10, right: 10 }} icon={<SpeedDialIcon />}>
                  {actions.map((action) => (
                      <SpeedDialAction onClick={() => setOpenEvent(true)} key={action.name} icon={action.icon} tooltipTitle={action.name} />
                  ))}
              </SpeedDial>
              }
            {employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('HR') && 
              <SpeedDial ariaLabel="Event Calendar" sx={{ position: 'fixed', bottom: 10, right: 10 }} icon={<SpeedDialIcon />}>
                  {actions.map((action) => (
                      <SpeedDialAction onClick={() => setOpenEvent(true)} key={action.name} icon={action.icon} tooltipTitle={action.name} />
                  ))}
              </SpeedDial>
              }
            {employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Management') && 
              <SpeedDial ariaLabel="Event Calendar" sx={{ position: 'fixed', bottom: 10, right: 10 }} icon={<SpeedDialIcon />}>
                  {actions.map((action) => (
                      <SpeedDialAction onClick={() => setOpenEvent(true)} key={action.name} icon={action.icon} tooltipTitle={action.name} />
                  ))}
              </SpeedDial>
              }
            <FullCalendar
                defaultView="dayGridMonth"
                header={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay"
                }}
                themeSystem="Simplex"
                plugins={[dayGridPlugin]}
                events={events}
            />
          </Box>
      <MobileNav />
      </Box>
  )
}


export default EventCalendar