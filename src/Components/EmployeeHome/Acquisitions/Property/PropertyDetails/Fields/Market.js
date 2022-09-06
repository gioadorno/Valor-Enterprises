import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { API } from 'aws-amplify';
import { useState, useEffect } from 'react';

const Market = ({ prop, id, setOpenUpdate, markets, employee }) => {
        // Props API
        const apiName = 'valproperties';
        const path = `/properties/${prop.id}/market`;
        // 

        const [ market, setMarket ] = useState(prop.market)
    const handleMarket = (e) => {
        API.put(apiName, path, {
            body: {
                id: prop.id,
                market: e.target.value
            }
            })
            .then(() => {
            setOpenUpdate(true)
            setMarket(e.target.value)
            })
    };

        useEffect(() => {
        setMarket(prop.market)
    },[prop])

  return (
    employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Admin') >= 0 || employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Operations') >= 0 ? (
        <FormControl sx={{ width: '100%' }}>
            <Select InputProps={{ disableUnderline: true }} variant="standard" name='market' labelId="market" id="market" label='Market' defaultValue={market} onChange={handleMarket}>
            <MenuItem value={markets.orlando}>
                    {markets.orlando}
                </MenuItem>
                <MenuItem value={markets.tampa}>
                    {markets.tampa}
                </MenuItem>
                <MenuItem value={markets.newark}>
                    {markets.newark}
                </MenuItem>
                <MenuItem value={markets.saltLake}>
                    {markets.saltLake}
                </MenuItem>
                <MenuItem value={markets.charlotte}>
                    {markets.charlotte}
                </MenuItem>
                <MenuItem value={markets.columbus}>
                    {markets.columbus}
                </MenuItem>
                <MenuItem value={markets.kansasCity}>
                    {markets.kansasCity}
                </MenuItem>
                <MenuItem value={markets.stLouis}>
                    {markets.stLouis}
                </MenuItem>
                <MenuItem value={markets.austin}>
                    {markets.austin}
                </MenuItem>
                <MenuItem value={markets.atlanta}>
                    {markets.atlanta}
                </MenuItem>
                <MenuItem value={markets.sanAntonio}>
                    {markets.sanAntonio}
                </MenuItem>
                <MenuItem value='Phoenix, AZ'>
                    Phoenix, AZ
                </MenuItem>
                <MenuItem value={markets.tucson}>
                    {markets.tucson}
                </MenuItem>
                <MenuItem value={markets.northernAZ}>
                    {markets.northernAZ}
                </MenuItem>
                <MenuItem value={markets.lasVegas}>
                    {markets.lasVegas}
                </MenuItem>
                <MenuItem value={markets.indianapolis}>
                    {markets.indianapolis}
                </MenuItem>
                <MenuItem value={markets.birmingham}>
                    {markets.birmingham}
                </MenuItem>
                <MenuItem value={markets.dallas}>
                    {markets.dallas}
                </MenuItem>
                <MenuItem value={markets.houston}>
                    {markets.houston}
                </MenuItem>
            </Select>
        </FormControl>
        ) :
        <FormControl sx={{ width: '100%' }}>
        <TextField InputProps={{ disableUnderline: true }} variant='standard' label='Market' disabled value={prop.market} />
        </FormControl>
  )
}

Market.defaultProps = {
    markets: {
        orlando: 'Orlando, FL',
        memphis: 'Memphis, TN',
        tampa: 'Tampa, FL',
        newark: 'Newark, NJ',
        saltLake: 'Salt Lake City, UT',
        charlotte: 'Charlotte, NC',
        columbus: 'Columbus, OH',
        kansasCity: 'Kansas City, MO',
        stLouis: 'St. Louis, MO',
        austin: 'Austin, TX',
        atlanta: 'Atlanta, GA',
        sanAntonio: 'San Antonio, TX',
        tucson: 'Tucson, AZ',
        northernAZ: 'Northern Arizona',
        lasVegas: 'Las Vegas, NV',
        indianapolis: 'Indianapolis, IN',
        birmingham: 'Birmingham, AL',
        dallas: 'Dallas, TX',
        houston: 'Houston, TX',
    },
}

export default Market