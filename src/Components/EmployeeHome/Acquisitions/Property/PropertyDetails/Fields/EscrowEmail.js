import { useState, useEffect } from 'react';
import { TextField, FormControl } from "@mui/material";
import { Autocomplete } from '@mui/material';
import { API } from 'aws-amplify';

const EscrowEmail = ({ prop, setOpenUpdate, employee }) => {
    // Props API
    const apiName = 'valproperties';
    const path = `/properties/${prop.id}/escrowemail`;
    // 

    const [ props, setProps ] = useState([]);

                // Removes Duplicates of Escrow Officers
                const escrowEmail = props?.filter((value, index, self) => 
                index === self.findIndex((t) => (
                    t.escrowEmail === value.escrowEmail
                ))
                );
    
                const escrow = escrowEmail?.map(prop => prop.escrowEmail != undefined ? prop.escrowEmail : '');

  useEffect(() => {
      API.get(apiName, '/properties')
      .then(res => setProps(res.Items))
  },[])

  return (
    employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Admin') >= 0 || employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Operations') >= 0 ? 
    <FormControl style={{ width: '100%' }}>
 <Autocomplete defaultValue={prop.escrowEmail} freeSolo={true} style={{ width: '100%' }} options={escrow} renderInput={(params) => <TextField InputProps={{ disableUnderline: true }} variant='standard' {...params} label="Escrow Officer Email"  />} onInputChange={(e, value) => {
        API.put(apiName, path, {
        body: {
            id: prop.id,
            escrowEmail: value
        }
    })
    .then(() => {
        setOpenUpdate(true)
    })
        }} />
    </FormControl>
    :
        <FormControl style={{ width: '100%' }}>
            <TextField id='standard-search' label='Escrow Officer' variant='standard' InputProps={{
            readOnly: true,
            disableUnderline: true
        }} value={prop.escrowEmail} />
        </FormControl>
  )
}

export default EscrowEmail