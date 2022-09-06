import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, IconButton, InputLabel, ListItemText, MenuItem, OutlinedInput, Paper, Select, Snackbar, TextField, Toolbar, Typography } from '@mui/material';
import React, { Fragment, useState, useEffect } from 'react'
import OuterBar from '../../OuterBar';
import { Auth } from 'aws-amplify';
import CloseIcon from '@mui/icons-material/Close';
import { usePlacesWidget } from 'react-google-autocomplete';
require('dotenv').config();

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

const reasons = [
    'Buyer backed out',
    'Priced too high',
    'Tenant issues',
    'Ghosted by supplier',
    'Cut out of deal',
    'Other',
    'No buyer before end of IP',
    'Inspection problems',
    'Title issues',
    'Ghosted by buyer'
];

const Cancellation = () => {
    const [ open, setOpen ] = useState(false);
    const [ employee, setEmployee ] = useState('');
    const [ cancelReason, setCancelReason ] = useState([]);
    const [ cancelForm, setCancelForm ] = useState({
        name: '',
        address: '',
        reason: [],
        additionalNotes: ''
    });

    console.log(cancelForm)

    useEffect(() => {
        setCancelForm({ ...cancelForm, reason: cancelReason })
    },[cancelReason])

    const handleChange = (event) => {
        const {
          target: { value },
        } = event;
        setCancelReason(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
      };

    const GoogleAPI = "AIzaSyBat1MaRl7stoHN62WZ7f9aGYWYOqHnBtU";
    // Get current Date and format it to mm/dd/yyyy
    let today = new Date();
    let date = parseInt(today.getMonth()+1) + '-' + today.getDate() + "-" + today.getFullYear();

    // Address Input
    const { ref } = usePlacesWidget({
        apiKey: GoogleAPI,
        onPlaceSelected: (place) => {
            
        },
        options: {
            types: ["address"],
            componentRestrictions: { country: "us" },
        },
        });

        const submitCancel = async(e) => {
            e.preventDefault();

            if(cancelForm.name === undefined){
                cancelForm.name === employee.attributes.name
            }

            // Post to Slack Cancellations Channel
const response = await fetch(process.env.REACT_APP_CANCEL, {
    method: 'post',
    body: JSON.stringify(
        {
            blocks: [
                {
                    type: 'header',
                    text: {
                        type: 'plain_text',
                        text: `Cancellation form created by ${cancelForm.name}`,
                        emoji: true
                    }
                },
                {
                    type: 'section',
                    text: {
                            type: 'mrkdwn',
                            text: `*Property Address:*\n${cancelForm.address.replace(', USA', '')}\n*Why are we cancelling?*\n${cancelForm.reason}\n*Additional Notes:*\n${cancelForm.additionalNotes}`
                        },
                    
                },
                {
                    "type": "divider"
                }
            ]
        }
    )
});
        };

        const getSession = async () => {
            await Auth.currentAuthenticatedUser().then((user) => {
                setEmployee(user)
                setCancelForm({ ...cancelForm, name: user.attributes.name })
            })
        };
    
        useEffect(() => {
            getSession()
        },[])


    // SnackBar

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
    
        setOpen(false);
        };

        const propertyAction = (
        <Fragment>
            <IconButton
            size="large"
            aria-label="close"
            sx={{ color: 'white' }}
            onClick={handleClose}
            >
            <CloseIcon fontSize="medium" />
            </IconButton>
        </Fragment>
        );

  return (
<div onLoad={() => setCancelForm({ ...cancelForm, name: employee?.attributes?.name })} style={{ display: 'flex', height: '100%', paddingBottom: '2em', width: '100%'}}>
            <Snackbar open={open} autoHideDuration={10000} onClose={handleClose} message='Cancel form has been submitted' action={propertyAction} />
            <Box autoComplete={true} component='form' maxWidth='2xl' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', flexWrap: 'wrap', pb: 5 , width: '100%'}}>
                <Paper style={{ width: '95%', paddingBottom: '3em' }} elevation={12}>
                <Toolbar sx={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography variant='h3' component='h4' style={{ width: '100%', textAlign: 'center' }}>
                            Cancellation Form
                        </Typography>
                </Toolbar>
                    <Grid container style={{ marginTop: '1em' }} spacing={4}>
                        <Grid item xs={12}>
                                <FormControl style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                <FormLabel style={{ marginBottom: '1em', color: '#607d8b', fontWeight: '550', textAlign: 'center', width: '100%' }}>Your Name</FormLabel>
                                    <TextField style={{ width: '90%' }} variant='outlined' label='Your Name' value={employee?.attributes?.name} InputProps={{ readOnly: true }} id="name"  />
                                </FormControl>
                        </Grid>
                        <Grid item xs={12} >
                            
                                <FormControl style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                <FormLabel style={{ marginBottom: '1em', color: '#607d8b', fontWeight: '550', textAlign: 'center', width: '100%' }}>Property Address</FormLabel>
                                    <TextField required inputRef={ref} style={{ width: '90%' }} variant='outlined' aria-describedby='address' label='Property Address' onBlur={(e) => setCancelForm({ ...cancelForm, address: e.target.value })} />
                                </FormControl>
                            
                        </Grid>
                        <Grid item xs={12} >
                                <FormControl style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '5em' }}>
                                <FormLabel style={{ marginBottom: '1em', color: '#607d8b', fontWeight: '550', textAlign: 'center', width: '100%' }}>Cancel Reason</FormLabel>
                                    <Select
                                    style={{ width: '90%' }}
                                    labelId="cancel-label"
                                    id="cancel-label"
                                    multiple
                                    value={cancelReason}
                                    onChange={handleChange}
                                    input={<OutlinedInput label="Tag" />}
                                    renderValue={(selected) => selected.join(', ')}
                                    MenuProps={MenuProps}
                                    >
                                    {reasons.map((reason) => (
                                        <MenuItem key={reason} value={reason}>
                                        <Checkbox checked={cancelReason.indexOf(reason) > -1} />
                                        <ListItemText primary={reason} />
                                        </MenuItem>
                                    ))}
                                    </Select>
                                </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                                <FormControl style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                    <FormLabel style={{ marginBottom: '1em', color: '#607d8b', fontWeight: '550' }}>Additional Notes</FormLabel>
                                    <TextField multiline rows={5} style={{ width: '90%' }} name='notes' variant='outlined' label='Additional Notes' onChange={(e => setCancelForm({ ...cancelForm, additionalNotes: e.target.value }))} />
                                </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                <Button disabled={open === false ? false : true} onClick={submitCancel} color='primary' variant='contained'>{open === false ? 'Submit' : 'Cancellation Submitted'}</Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </div>
  )
}

export default Cancellation