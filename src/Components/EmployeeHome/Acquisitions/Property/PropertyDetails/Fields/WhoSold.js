import { useEffect, useState } from 'react';
import { TextField, FormControl } from '@mui/material';
import { Autocomplete } from '@mui/material';
import { API } from 'aws-amplify';

const WhoSold = ({ prop, id, setOpenUpdate, employee }) => {

    const [ employees, setEmployees ] = useState([])
    const users = employees?.sort((a,b) => a.name.localeCompare(b.name))
    // API
    const apiName = 'valproperties';
    const path = `/properties/${prop.id}/whoSold`;
    const employeePath = `/employees`;
    // 

    useEffect(() => {
        API.get(apiName, employeePath)
        .then(res => setEmployees(res.Items))
        .catch(error => console.log(error))
    }, [])

  return (
    employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Admin') >= 0 || employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Operations') >= 0 ? 
    <FormControl style={{ width: '100%' }}>
        <Autocomplete defaultValue={prop.whoSold} freeSolo={true} style={{ width: '100%' }} id="combo-box" options={users.map((user) => user.name)} renderInput={(params) => <TextField variant='standard' {...params} label="Who Sold this Property" InputProps={{ disableUnderline: true }}  />} onInputChange={(e, value) => {
        API.put(apiName, path, {
            body: {
                id: prop.id,
                whoSold: value
            }
        })
        .then(() => {
            setOpenUpdate(true)
        })
        }} />
    </FormControl>
    :
        <FormControl style={{ width: '100%' }}>
            <TextField label='Who Sold this Property' variant='standard' InputProps={{
            readOnly: true,
            disableUnderline: true
        }} value={prop.whoSold} />
        </FormControl>
  )
}

export default WhoSold