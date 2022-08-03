import { Box, Container, Grid, Paper, Typography, TextField, Divider, ListItemText, List, ListItem, ListItemIcon, Button, Toolbar, Tabs, Tab, Stack, Select, MenuItem, FormControl, InputLabel, Snackbar, IconButton } from "@mui/material";
import MobileNav from "../../MobileNav";
import OuterBar from "../../OuterBar";
import NotAuthorized from "../../NotAuthorized";
import { format } from "date-fns";
import NumberFormat from 'react-number-format';
import { createPayoutData, getPayoutData } from "../../../../actions/payoutdata";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from '@mui/icons-material/Close';
import React, { useContext, useState, useEffect, Fragment } from 'react';
import { AccountContext } from '../../../Login/Account';
import { useNavigate } from 'react-router-dom';
import BlurOnIcon from '@mui/icons-material/BlurOn';
import { CSVLink } from "react-csv";
  import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Filters from "./Filters";
import { API } from 'aws-amplify';


const year = new Intl.DateTimeFormat('en-US', { year: 'numeric' }).format(new Date());
  const months = [`January ${year}`, `February ${year}`, `March ${year}`, `April ${year}`, `May ${year}`, `June ${year}`, `July ${year}`, `August ${year}`, `September ${year}`, `October ${year}`, `November ${year}`, `December ${year}`];
  const employees = ['Armando Delgado', 'Barrett Naegele', 'Christian Neuenfeldt', 'Garner Becker', 'Garrett Wriston', 'Ilya Nabutovskiy', 'Jacob Todd', 'Jose Irra', 'Michael Vanderhoof', 'Nathan Kneib', 'Ray Hicks', 'Ryan Ball', 'Savion Sow', 'Wesley Estrada'];

    // API
    const apiName = 'valproperties';
    const path = '/payouts';
    // 

const PayoutData = () => {
    const { employee, getSession } = useContext(AccountContext);
    const [ submitted, setSubmitted ] = useState(false);
    const [ filterEmployees, setFilterEmployees ] = useState([])
    const [ data, setData ] = useState([]);

    useEffect(() => {
        API.get(apiName, path)
        .then(res => {
        setData(res.Items)})
    },[]);


    // Get current month
    const options = { month: 'long', year: 'numeric' };
    const month = new Intl.DateTimeFormat('en-US', options).format(new Date());
    
    const [ filterMonth, setFilterMonth ] = useState(month);

    const [ employeeData, setEmployeeData ] = useState({
        month: '',
        name: '', 
        paid: '',
        grossProfit: ''
    })

    const handleSubmit = async () => {
        const apiData = {
            body: employeeData,
        };
        await API.post(apiName, path, apiData)
        .then(() => setSubmitted(true))
    }


    // Empty array to initialize data for table
    let series = [];
    let csvArray = [];
    let initialPaid = [];
    let initialGross = [];
    const initialValue = 0;
    data?.filter(person => {
        if(filterMonth != null && filterMonth === person.month && person.name == filterEmployees.filter(employee => person.name === employee)) {
            initialPaid.push(person.paid);
            initialGross.push(person.grossProfit);
            csvArray.push({
                'Month': person.month,
                'Employee': person.name,
                'Amount Paid': `$${person.paid}`,
                'Gross Profit': `$${person.grossProfit}`,
            });
            return series.push({
                name: person.name,
                paid: person.paid,
                profit: person.grossProfit,
                difference: person.profit - person.paid
            })
        };   
    });

    let totalPaid = initialPaid.reduce((a, b) => a + b, initialValue);
    let totalGross = initialGross.reduce((a, b) => a + b, initialValue);
    let totalProfit = totalGross - totalPaid;

    csvArray.push({
        'Total Amount Paid': `$${totalPaid}`,
        'Total Gross Profit': `$${totalGross}`,
        'Total Profit Margin': `$${totalProfit}`
    })


    filterEmployees.forEach(employee => console.log(employee))




       // SnackBar

       const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setSubmitted(false);
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

    useEffect(() => {
        getSession()
        if (employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('HR') >= 0) {
            return <NotAuthorized />
        }
      },[]);
    
  return (
    <Box sx={{ display: 'flex', backgroundColor: '#003558' }}>
        <Snackbar open={submitted} autoHideDuration={10000} onClose={handleClose} message='Employee Data has been saved' action={propertyAction} />
        <OuterBar />
        <Container maxWidth='2xl' sx={{ display: 'flex', pt: 5, flexDirection: 'column', pb: 10 }}>
            <Toolbar sx={{ overflowX: 'auto', display: 'flex', alignItems: 'center', width: '100%', px: 4, py: 5 }}>
                    <Filters year={year} months={months} employees={employees} filterMonth={filterMonth} filterEmployees={filterEmployees} setFilterMonth={setFilterMonth}  setFilterEmployees={setFilterEmployees} />
            </Toolbar>
            <Grid container maxWidth='2xl' spacing={3}>
                <Grid item xs={12} md={9}>
                    <Paper sx={{ boxShadow: 4, display: 'flex', padding: 2, flexDirection: 'column', alignItems: 'center', pb: 10, pl: 5, height: '100%'  }}>
                        <Typography variant='h4' sx={{ textAlign: 'center', py: 2 }}>
                                {filterMonth === null ? month : filterMonth.replace(year, '')}
                        </Typography>
                        <Divider sx={{ width: '90%' }} />
                        <Toolbar sx={{ overflowX: 'auto', display: 'flex', alignItems: 'center', width: '100%', px: 4, pb: 0, overflowY: 'hidden', justifyContent: 'center' }}>
                                    <ListItem sx={{ width: 'auto', pl: 15 }}>
                                        <BlurOnIcon />
                                        <ListItemText primaryTypographyProps={{ fontWeight: 'bold' }} sx={{ whiteSpace: 'nowrap', fontWeight: 'bold' }} primary={`Total Paid: $${totalPaid}`} />
                                    </ListItem>
                                    <ListItem sx={{ width: 'auto' }}>
                                    <BlurOnIcon />
                                        <ListItemText primaryTypographyProps={{ fontWeight: 'bold' }} sx={{ whiteSpace: 'nowrap', fontWeight: 'bold'  }} primary={`Total Grossed: $${totalGross}`} />
                                    </ListItem>
                                    <ListItem sx={{ width: 'auto' }}>
                                    <BlurOnIcon />
                                        <ListItemText primaryTypographyProps={{ fontWeight: 'bold' }} sx={{ whiteSpace: 'nowrap', fontWeight: 'bold'  }} primary={`Profit Margin: $${totalProfit}`} />
                                    </ListItem>
                        </Toolbar>
                        <Container maxWidth='2xl' sx={{ height: { md:'60%' ,xl: '70%'}, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                            <ResponsiveContainer>
                                <BarChart data={series} >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend iconSize={24} />
                                <Bar
                                    dataKey={"paid"}
                                    fill='#d900008a'
                                />
                                <Bar dataKey="profit" fill='#0c995aab' />
                                </BarChart>
                            </ResponsiveContainer>
                        </Container>
                        {/* <Stack direction='row' spacing={5} > */}
                            {/* <ListItem sx={{ width: 'auto' }}>
                                <Box sx={{ width: 15, height: 15, borderRadius: '50%', backgroundColor: '#d900008a', mr: 2 }} />
                                <ListItemText sx={{ whiteSpace: 'nowrap' }} primary='How much we paid' />
                            </ListItem>
                            <ListItem sx={{ width: 'auto' }}>
                                <Box sx={{ width: 15, height: 15, borderRadius: '50%', backgroundColor: '#0c995aab', mr: 2  }} />
                                <ListItemText sx={{ whiteSpace: 'nowrap' }} primary='Gross Profit' />
                            </ListItem> */}
                            {/* <ListItem sx={{ width: 'auto' }}>
                                <Box sx={{ width: 15, height: 15, borderRadius: '50%', backgroundColor: '#0c699991', mr: 2  }} />
                                <ListItemText sx={{ whiteSpace: 'nowrap' }} primary='Target (Goal)' />
                            </ListItem> */}
                        {/* </Stack> */}
                        <Button variant='outlined' >
                        <CSVLink filename={`${month} Payout Data`} style={{ textDecoration: 'none', color: '#4e90d3' }} data={csvArray} separator={","}>
                            Export to CSV
                        </CSVLink>
                        </Button>

                    </Paper>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Paper sx={{ boxShadow: 4, display: 'flex', padding: 2, flexDirection: 'column', alignItems: 'center', pb: 5 }}>
                        <Typography variant='h4' sx={{ textAlign: 'center', py: 2 }}>Employee Data</Typography>
                        <FormControl sx={{ py: 1, width: '90%' }}>
                            <InputLabel id='month'>Month</InputLabel>
                            <Select onChange={e => setEmployeeData({ ...employeeData, month: e.target.value })} label='Month' labelId="month" id='month' >
                                {months.map((month) => (
                                    <MenuItem value={month} key={month}>{month}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl sx={{ py: 1, width: '90%' }}>
                            <InputLabel id='employee'>Employee</InputLabel>
                            <Select onChange={e => setEmployeeData({ ...employeeData, name: e.target.value })} label='Employee' labelId="employee" id='employee' >
                                {employees.map((employees) => (
                                    <MenuItem value={employees} key={employees}>{employees}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl sx={{ width: '90%', py: 1 }}>
                            <NumberFormat id='paid' label='Employee Got Paid' customInput={TextField} value={employeeData.paid} onValueChange={({ value }) => setEmployeeData({ ...employeeData, paid: Number(value) })} thousandSeparator isNumericString />
                        </FormControl>
                        <FormControl sx={{ width: '90%', py: 1, pb: 3 }}>
                            <NumberFormat id='grossProfit' label='Gross Profit' customInput={TextField} value={employeeData.grossProfit} onValueChange={({ value }) => setEmployeeData({ ...employeeData, grossProfit: Number(value) })} thousandSeparator isNumericString />
                        </FormControl>
                        {submitted === false ?
                        <Button disabled={employeeData.grossProfit != '' ? false : true} onClick={handleSubmit} size='large' variant='outlined'>Save</Button>
                        :
                        <Button size='large' disabled>Saved</Button>
                        }

                    </Paper>
                </Grid>
            </Grid>
        </Container>
        <MobileNav />
    </Box>
  )
}

export default PayoutData