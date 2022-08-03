import { Box, Container, Grid, Paper, Typography, TextField, Divider, ListItemText, List, ListItem, ListItemIcon, Button, Toolbar, Tabs, Tab, Stack, Select, MenuItem, FormControl, InputLabel, Snackbar, IconButton } from "@mui/material";
import MobileNav from "../../MobileNav";
import OuterBar from "../../OuterBar";
import NotAuthorized from "../../NotAuthorized";
import BlurOnIcon from '@mui/icons-material/BlurOn';
import { format } from "date-fns";
import { useState, useEffect, Fragment, useContext } from "react";
import { AccountContext } from '../../../Login/Account';
import { CSVLink } from "react-csv";
  import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
  } from "recharts";
  import Filters from "./Filters";
  import './chart.css';
  import { API } from 'aws-amplify';
  

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const employees = ['Armando Delgado', 'Barrett Naegele', 'Christian Neuenfeldt', 'Garner Becker', 'Garrett Wriston', 'Ilya Nabutovskiy', 'Jacob Todd', 'Jose Irra', 'Michael Vanderhoof', 'Nathan Kneib', 'Ray Hicks', 'Ryan Ball', 'Savion Sow', 'Wesley Estrada'];

  let randomColor = Math.floor(Math.random()*16777128).toString(16);
  let randomColor2 = Math.floor(Math.random()*16777129).toString(16);

      // API
      const apiName = 'valproperties';
      const path = '/payouts';
      // 

const YearPayout = () => {
    const { employee, getSession } = useContext(AccountContext);


    const [ data, setData ] = useState([]);

    useEffect(() => {
      API.get(apiName, path)
      .then(res => {
      setData(res.Items)})
    },[])
    // Get current month
    const options = { month: 'long' };
    const month = new Intl.DateTimeFormat('en-US', options).format(new Date());
    const year = new Intl.DateTimeFormat('en-US', { year: 'numeric' }).format(new Date());

    const [ value, setValue ] = useState(0);
    const [ barGraph, setBarGraph ] = useState(true);
    const [ labels, setLabels ] = useState(true);
    const [ lines, setLines ] = useState(false);
    const [ ticks, setTicks ] = useState(true);
    const [ submitted, setSubmitted ] = useState(false);
    const [ filterEmployees, setFilterEmployees ] = useState([]);

    const handleTabs = (e, newValue) => {
        setValue(newValue)
    };

    let series = [];
    let csvArray = [];
    let initialPaid = [];
    let initialGross = [];
    const initialValue = 0;
    data.filter(person => {
        console.log(person)
        if(person.name == filterEmployees.filter(employee => person.name === employee)) {
            initialPaid.push(person.paid);
            initialGross.push(person.grossProfit);
            csvArray.push({
                'Month': person.month.replace(year, ''),
                'Employee': person.name,
                'Amount Paid': `$${person.paid}`,
                'Gross Profit': `$${person.grossProfit}`,
            });
            return series.push({
                name: person.month,
                paid: person.paid,
                profit: person.grossProfit,
                difference: person.grossProfit - person.paid
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


    useEffect(() => {
        getSession()
        if (employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('HR') >= 0) {
            return <NotAuthorized />
        }
      },[]);

  return (
<Box sx={{ display: 'flex', backgroundColor: '#003558' }}>
        <OuterBar />
        <Container maxWidth='2xl' sx={{ display: 'flex', pt: 5, flexDirection: 'column', pb: 10 }}>
            <Toolbar sx={{ overflowX: 'auto', display: 'flex', alignItems: 'center', width: '100%', px: 4, py: 5 }}>
                    <Filters employees={employees} filterEmployees={filterEmployees} setFilterEmployees={setFilterEmployees} />
            </Toolbar>
            <Grid container maxWidth='2xl' spacing={3}>
                <Grid item xs={12} >
                    <Paper sx={{ boxShadow: 4, display: 'flex', padding: 2, flexDirection: 'column', alignItems: 'center', pb: 10, pl: 5, height: '100%', overflow: 'auto'  }}>
                        <Typography variant='h4' sx={{ textAlign: 'center', py: 2 }}>
                                Calendar Year of {year}
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
                        <Container maxWidth='2xl' sx={{ height: { md:'60%' ,xl: '70%'}, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '90%' }}>
                            <ResponsiveContainer>
                                <LineChart data={series} >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend iconSize={24} />
                                <Line
                                    type="linear"
                                    dataKey="paid"
                                    stroke={"#" + randomColor}
                                    strokeWidth={2}
                                    activeDot={{ r: 8 }}
                                />
                                <Line strokeWidth={2} type="monotone" dataKey="profit" stroke={"#" + randomColor2} />
                                </LineChart>
                            </ResponsiveContainer>
                        </Container>
                        {/* <Stack direction='row' spacing={5} >
                            <ListItem sx={{ width: 'auto' }}>
                                <Box sx={{ width: 15, height: 15, borderRadius: '50%', backgroundColor: "#" + randomColor, mr: 2 }} />
                                <ListItemText sx={{ whiteSpace: 'nowrap' }} primary='How much we paid' />
                            </ListItem>
                            <ListItem sx={{ width: 'auto' }}>
                                <Box sx={{ width: 15, height: 15, borderRadius: '50%', backgroundColor: "#" + randomColor2, mr: 2  }} />
                                <ListItemText sx={{ whiteSpace: 'nowrap' }} primary='Gross Profit' />
                            </ListItem>
                        </Stack> */}
                        <Button sx={{ mt: 5 }} variant='outlined' >
                        <CSVLink filename={`${month} Payout Data`} style={{ textDecoration: 'none', color: '#4e90d3' }} data={csvArray} separator={","}>
                            Export to CSV
                        </CSVLink>
                        </Button>

                    </Paper>
                </Grid>
            </Grid>
        </Container>
        <MobileNav />
    </Box>
  )
}

export default YearPayout