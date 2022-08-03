import { Grid, Paper, Box, Typography, Toolbar, TextField, FormControl, FormControlLabel, Radio, RadioGroup, Input, FormLabel, Button, Snackbar, IconButton } from "@mui/material";
import { Autocomplete } from "@mui/material";
import OuterBar from '../../OuterBar';
import { useState, useEffect, forwardRef, Fragment, useContext } from "react";
import { AccountContext } from '../../../Login/Account';
import { usePlacesWidget } from 'react-google-autocomplete';
import PropTypes from 'prop-types';
import { IMaskInput } from 'react-imask';
import NumberFormat from 'react-number-format';
import { LocalizationProvider, DatePicker} from '@mui/lab';
import AdapterDateFns from "@mui/lab/modern/AdapterDateFns";
import enLocale from 'date-fns/locale/en-US';
import { format } from "date-fns";
import { API } from 'aws-amplify';
import './style.css';
import MobileNav from "../../MobileNav";
import CloseIcon from '@mui/icons-material/Close';
require('dotenv').config();

        // Dispo API
        const dispoAPI = 'valproperties';
        const dispoPath = `/dispo`;
        // 


const TextMaskCustom = forwardRef(function TextMaskCustom(props, ref) {

    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="(#00) 000-0000"
        definitions={{
          '#': /[1-9]/,
        }}
        inputRef={ref}
        onAccept={(value) => onChange({ target: { name: props.name, value } })}
        overwrite
      />
    );
  });

  TextMaskCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };



const DispoPaperwork = ({ markets }) => {
    const { employee, getSession } = useContext(AccountContext);

    const [ open, setOpen ] = useState(false);
    const [ dispoProps, setDispoProps ] = useState([]);
    console.log(dispoProps)

    useEffect(() => {
        API.get(dispoAPI, dispoPath)
        .then(res => setDispoProps(res.Items))
    },[])

    console.log(employee)
    
    const GoogleAPI = "AIzaSyBat1MaRl7stoHN62WZ7f9aGYWYOqHnBtU";
        // Get current Date and format it to mm/dd/yyyy
        let today = new Date();
        let date = parseInt(today.getMonth()+1) + '-' + today.getDate() + "-" + today.getFullYear();
        // Input Values for properties
        const [dispoData, setDispoData] = useState({
            date: today,
            name: employee?.attributes?.name,
            address: ''.replace(', USA', ''),
            buyer: '',
            doubleEscrow: '',
            titleCompany: '',
            titleOfficer: '',
            titleEmail: '',
            titlePhone: '',
            signersName: '',
            vesting: '',
            contractPricing: '',
            emd: '',
            closing: '',
            coe: '',
            beds: '',
            closeSooner: '',
            contractExecuted: '',
            buyersPhone: '',
            emailSignature: '',
            contractSignature: '',
            emDeposit: '',
            buyerType: '',
            projectedProfit: '',
        });

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

    const handleChange = (e) => {
        setDispoData({ ...dispoData, [e.target.name]: e.target.value })
    };
    const handleSubmit = async () => {

        // Post to Slack Dispo Paperwork Channel
        const response = await fetch(process.env.REACT_APP_DISPO_PAPERWORK, {
            method: 'post',
            body: JSON.stringify(
                {
                    blocks: [
                        {
                            type: 'header',
                            text: {
                                type: 'plain_text',
                                text: `New form created by ${dispoData.name}`,
                                emoji: true
                            }
                        },
                        {
                            type: 'section',
                            text: {
                                    type: 'mrkdwn',
                                    text: `*Property:*\n${dispoData.address}\n*Wholesaler/Agent:*\n${dispoData.buyer}\n*Double Escrow:*\n${dispoData.doubleEscrow}\n*Title Agency*\n${dispoData.titleCompany}\n*Title Officer:*\n${dispoData.titleOfficer}\n*Phone #:*\n${dispoData.titlePhone}\n*Email Address:*\n${dispoData.titleEmail}\n*Signer's Name:*\n${dispoData.signersName}\n*Vesting:*\n${dispoData.vesting}\n*Price:*\n${dispoData.contractPricing}\n*EMD:*\n${dispoData.emd}\n*Contract Executed Date:*\n${dispoData.contractExecuted}\n*Who Sold?*\n${dispoData.name}\n*Close of Escrow?*\n${dispoData.coe}\n*Buyer's Phone #:*\n${dispoData.buyersPhone}\n*Docusign to:*\n${dispoData.emailSignature}\n*When will Earnest Money be Deposited?*\n${dispoData.emDeposit}\n*Buyer Type:*\n${dispoData.buyerType}\n*Projected Gross Profit:*\n${dispoData.projectedProfit}`
                                },
                            
                        },
                        {
                            "type": "divider"
                        }
                    ]
                }
            )
        });
        
        const apiData = {
            body: dispoData,
        };
        try {
            const data = await API.post(dispoAPI, dispoPath, apiData);
            console.log(data)
            setOpen(true);
        } catch (error) {
            console.log(error)
        }
        };


            // Removes Duplicates of Title Companies
            const titleCompanyList = dispoProps?.filter((value, index, self) => 
            index === self.findIndex((t) => (
                t.titleCompany === value.titleCompany
            ))
            );
    
            // Removes Duplicates of Title Emails
            const titleEmailList = dispoProps?.filter((value, index, self) => 
            index === self.findIndex((t) => (
                t.titleEmail === value.titleEmail
            ))
            );
    
            // Removes Duplicates of Title Officers
            const titleOfficerList = dispoProps?.filter((value, index, self) => 
            index === self.findIndex((t) => (
                t.titleOfficer === value.titleOfficer
            ))
            );

        // Send user to login screen if not logged in
        useEffect(() => {
            getSession();
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
            <CloseIcon fontSize="large" />
            </IconButton>
        </Fragment>
        );
        

  return (
        <div style={{ display: 'flex', height: '100%', paddingBottom: '2em'}}>
            <Snackbar open={open} autoHideDuration={10000} onClose={handleClose} message='Form has been submitted' action={propertyAction} />
            <OuterBar />
            <Box component='form' maxWidth='2xl' sx={{ marginTop: '5em', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', flexWrap: 'wrap' }}>
                <Paper sx={{ width: '95%', paddingBottom: '3em' }} elevation={12}>
                <Toolbar sx={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography variant='h3' component='h4' sx={{ width: '100%', textAlign: 'center' }}>
                            Dispo Paperwork
                        </Typography>
                </Toolbar>
                    <Grid container sx={{ marginTop: '1em' }} spacing={4}>
                        <Grid item xs={12} sm={6} >
                                <FormControl sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                <FormLabel sx={{ marginBottom: '1em', color: '#607d8b', fontWeight: '550', textAlign: 'center', width: '100%' }}>Your Name</FormLabel>
                                    <TextField sx={{ width: '90%' }} variant='outlined' value={employee?.attributes?.name} InputProps={{ readOnly: true }} />
                                </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} >
                                <FormControl sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                <FormLabel sx={{ marginBottom: '1em', color: '#607d8b', fontWeight: '550', textAlign: 'center', width: '100%' }}>Property Address</FormLabel>
                                    <TextField inputRef={ref} sx={{ width: '90%' }} variant='outlined' aria-describedby='address' label='Property Address' onBlur={(e) => setDispoData({ ...dispoData, address: e.target.value })} />
                                </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} >
                                <RadioGroup aria-describedby='buyer' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} value={dispoData.buyer} onChange={e => setDispoData({ ...dispoData, buyer: e.target.value })} row>
                                <FormLabel sx={{ marginBottom: '1em', color: '#607d8b', fontWeight: '550', textAlign: 'center', width: '100%' }}>What is the Buyer?</FormLabel>
                                    <FormControlLabel name="buyer" color="primary" value='Wholesaler' control={<Radio />} label='Wholesaler' />
                                    <FormControlLabel name="buyer" value='Agent' control={<Radio />} label='Agent' />
                                    <FormControlLabel name="buyer" value='Investor' control={<Radio />} label='Investor' />
                                </RadioGroup>
                        </Grid>
                        <Grid item xs={12} sm={6} >
                                <RadioGroup sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} onChange={e => setDispoData({ ...dispoData, doubleEscrow: e.target.value })} row>
                                <FormLabel sx={{ marginBottom: '1em', color: '#607d8b', fontWeight: '550', textAlign: 'center', width: '100%' }}>Double Escrow?</FormLabel>
                                    <FormControlLabel name="doubleEscrow" value='Yes' control={<Radio />} label='Yes' />
                                    <FormControlLabel name="doubleEscrow" value='No' control={<Radio />} label='No' />
                                </RadioGroup>
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                            <FormLabel sx={{ marginBottom: '1em', color: '#607d8b', fontWeight: '550', textAlign: 'center', width: '100%' }}>Title Company</FormLabel>
                                <Autocomplete id='titleCompany' key='titleCompany' freeSolo={true} sx={{ width: '90%' }}  options={titleCompanyList.map((prop) => prop.titleCompany)} renderInput={(params) => <TextField {...params} variant='outlined' label="Title Company" />} onInputChange={(e, value) => setDispoData({ ...dispoData, titleCompany: value })} />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            <FormControl aria-describedby='supplierName' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                            <FormLabel sx={{ marginBottom: '1em', color: '#607d8b', fontWeight: '550', textAlign: 'center', width: '100%' }}>Title Officer</FormLabel>
                                <Autocomplete freeSolo={true} sx={{ width: '90%' }} options={titleOfficerList.map((prop) => prop.titleOfficer)} renderInput={(params) => <TextField variant='outlined' {...params} label="Title Officer"  />} onInputChange={(e, value) => setDispoData({ ...dispoData, titleOfficer: value })} />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            <FormControl sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                            <FormLabel sx={{ marginBottom: '1em', color: '#607d8b', fontWeight: '550', textAlign: 'center', width: '100%' }}>Title Email</FormLabel>
                                <Autocomplete freeSolo={true} sx={{ width: '90%' }} options={titleEmailList.map((prop) => prop.titleEmail)} renderInput={(params) => <TextField variant='outlined' {...params} label="Ttile Email"  />} onInputChange={(e, value) => setDispoData({ ...dispoData, titleEmail: value })} />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            <FormControl sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '3em' }}>
                            <FormLabel sx={{ marginBottom: '1em', color: '#607d8b', fontWeight: '550', textAlign: 'center', width: '100%' }}>Title Phone</FormLabel>
                            <TextField InputProps={{ inputComponent: TextMaskCustom }} name='titlePhone' sx={{ width: '90%' }} variant='outlined' label='Title Phone' value={dispoData.titlePhone} onBlur={handleChange} />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} >
                                <FormControl sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                    <FormLabel sx={{ marginBottom: '1em', color: '#607d8b', fontWeight: '550' }}>Signer's Name</FormLabel>
                                    <TextField sx={{ width: '90%' }} name='signersName' variant='outlined' label='Signers Name' onChange={(e => setDispoData({ ...dispoData, signersName: e.target.value }))} />
                                </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} >
                                <FormControl sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                    <FormLabel sx={{ marginBottom: '1em', color: '#607d8b', fontWeight: '550' }}>Vesting</FormLabel>
                                    <TextField sx={{ width: '90%' }} name='vesting' variant='outlined' label='Vesting' onChange={(e => setDispoData({ ...dispoData, vesting: e.target.value }))} />
                                </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            <FormControl sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '3em' }}>
                                <FormLabel sx={{ marginBottom: '1em', color: '#607d8b', fontWeight: '550', textAlign: 'center', width: '100%' }}>Contract Price</FormLabel>
                                <NumberFormat label='Contract Price' customInput={TextField} style={{ width: '90%' }} defaultValue={dispoData.contractPricing} onValueChange={({ value }) => setDispoData({ ...dispoData, contractPricing: Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(value).replace('.00', '') })} thousandSeparator isNumericString prefix='$'  />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            <FormControl sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '3em' }}>
                                <FormLabel sx={{ marginBottom: '1em', color: '#607d8b', fontWeight: '550', textAlign: 'center', width: '100%' }}>Earnest Money Deposit</FormLabel>
                                <NumberFormat label='Earnest Money Deposit' customInput={TextField} style={{ width: '90%' }} defaultValue={dispoData.emd} onValueChange={({ value }) => setDispoData({ ...dispoData, emd: Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(value).replace('.00', '') })} thousandSeparator isNumericString prefix='$'  />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} >
                                <RadioGroup sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} onChange={e => setDispoData({ ...dispoData, closing: e.target.value })} row>
                                <FormLabel sx={{ marginBottom: '1em', color: '#607d8b', fontWeight: '550', textAlign: 'center', width: '100%' }}>Are we Paying Closing Costs?</FormLabel>
                                    <FormControlLabel name="closing" value='Yes' control={<Radio />} label='Yes' />
                                    <FormControlLabel name="closing" value='No' control={<Radio />} label='No' />
                                </RadioGroup>
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            <FormControl sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '3em', py: 3, mt: 3 }}>
                            <FormLabel sx={{ marginBottom: '1em', color: '#607d8b', fontWeight: '550', textAlign: 'center', width: '100%' }}>When is COE?</FormLabel>
                                <LocalizationProvider locale={enLocale} dateAdapter={AdapterDateFns}>
                                    <DatePicker name='coe' label="COE" sx={{ width: '90%' }} value={dispoData.coe} onChange={(newValue) => setDispoData({ ...dispoData, coe: format(newValue, 'MM/dd/yyyy') })} renderInput={(params) => <TextField variant="outlined" sx={{ width: '90%' }} {...params}/> } />
                                </LocalizationProvider>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            <FormControl sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '3em' }}>
                            <FormLabel sx={{ marginBottom: '1em', color: '#607d8b', fontWeight: '550', textAlign: 'center', width: '100%' }}>Contract Executed Date</FormLabel>
                                <LocalizationProvider locale={enLocale} dateAdapter={AdapterDateFns}>
                                    <DatePicker name='contractExecuted' label="Contract Executed Date" sx={{ width: '90%' }} value={dispoData.contractExecuted} onChange={(newValue) => setDispoData({ ...dispoData, contractExecuted: format(newValue, 'MM/dd/yyyy') })} renderInput={(params) => <TextField variant="outlined" sx={{ width: '90%', }} {...params}/> } />
                                </LocalizationProvider>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            <FormControl sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '3em', mt: 2 }}>
                            <FormLabel sx={{ marginBottom: '1em', color: '#607d8b', fontWeight: '550', textAlign: 'center', width: '100%' }}>Buyer's Phone Number</FormLabel>
                            <TextField InputProps={{ inputComponent: TextMaskCustom }} name='buyersPhone' sx={{ width: '90%' }} variant='outlined' label="Buyer's Phone Number" value={dispoData.buyersPhone} onChange={handleChange} />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} >
                                <FormControl sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                    <FormLabel sx={{ marginBottom: '1em', color: '#607d8b', fontWeight: '550' }}>Email Docusign</FormLabel>
                                    <TextField sx={{ width: '90%' }} name='emailDocusign' variant='outlined' label='Docusign Email' onChange={(e => setDispoData({ ...dispoData, emailSignature: e.target.value }))} />
                                </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            <FormControl sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '3em', py: 3, mt: 3 }}>
                            <FormLabel sx={{ marginBottom: '1em', color: '#607d8b', fontWeight: '550', textAlign: 'center', width: '100%',  }}>When will contract be signed?</FormLabel>
                                <LocalizationProvider locale={enLocale} dateAdapter={AdapterDateFns}>
                                    <DatePicker name='contractSign' label="Contract Sign" sx={{ width: '90%' }} value={dispoData.contractSignature} onChange={(newValue) => setDispoData({ ...dispoData, contractSignature: format(newValue, 'MM/dd/yyyy') })} renderInput={(params) => <TextField variant="outlined" sx={{ width: '90%', }} {...params}/> } />
                                </LocalizationProvider>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            <FormControl sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '3em' }}>
                            <FormLabel sx={{ marginBottom: '1em', color: '#607d8b', fontWeight: '550', textAlign: 'center', width: '100%' }}>When will earnest money be deposited?</FormLabel>
                                <LocalizationProvider locale={enLocale} dateAdapter={AdapterDateFns}>
                                    <DatePicker name='emDeposit' label="EM Deposit" sx={{ width: '90%' }} value={dispoData.emDeposit} onChange={(newValue) => setDispoData({ ...dispoData, emDeposit: format(newValue, 'MM/dd/yyyy') })} renderInput={(params) => <TextField variant="outlined" sx={{ width: '90%', }} {...params}/> } />
                                </LocalizationProvider>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} >
                                <RadioGroup sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} onChange={e => setDispoData({ ...dispoData, buyerType: e.target.value })} row>
                                <FormLabel sx={{ marginBottom: '1em', color: '#607d8b', fontWeight: '550', textAlign: 'center', width: '100%' }}>Buyer Type</FormLabel>
                                    <FormControlLabel name="closing" value='Repeat Buyer' control={<Radio />} label='Repeat Buyer' />
                                    <FormControlLabel name="closing" value='First-time Buyer' control={<Radio />} label='First-time Buyer' />
                                </RadioGroup>
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            <FormControl sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '3em' }}>
                            <FormLabel sx={{ marginBottom: '1em', color: '#607d8b', fontWeight: '550', textAlign: 'center', width: '100%' }}>Projected Gross Profit</FormLabel>
                            <NumberFormat label='Projected Gross Profit' customInput={TextField} style={{ width: '90%' }} defaultValue={dispoData.projectedProfit} onValueChange={({ value }) => setDispoData({ ...dispoData, projectedProfit: Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(value).replace('.00', '') })} thousandSeparator isNumericString prefix='$'  />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 4 }}>
                            <Button disabled={open === false ? false : true} onClick={handleSubmit} color='primary' variant='contained'>{open === false ? 'Submit' : 'Form Submitted'}</Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
            <MobileNav />
        </div>
  )
}


export default DispoPaperwork