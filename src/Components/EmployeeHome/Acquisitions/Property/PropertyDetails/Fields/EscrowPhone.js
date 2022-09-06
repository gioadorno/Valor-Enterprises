import { useState, useEffect } from 'react';
import { TextField, FormControl } from "@mui/material";
import { Autocomplete } from '@mui/material';
import { API } from 'aws-amplify';

const EscrowPhone = ({ prop, setOpenUpdate, employee }) => {
    // Props API
    const apiName = 'valproperties';
    const path = `/properties/${prop.id}/escrowphone`;
    // 

    const [ props, setProps ] = useState([]);

                // Removes Duplicates of Escrow Officers
                const escrowPhone = props?.filter((value, index, self) => 
                index === self.findIndex((t) => (
                    t.escrowPhone === value.escrowPhone
                ))
                );
    
                const escrow = escrowPhone?.map(prop => prop.escrowPhone != undefined ? prop.escrowPhone : '');

  useEffect(() => {
      API.get(apiName, '/properties')
      .then(res => setProps(res.Items))
  },[])

  return (
    employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Admin') >= 0 || employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Operations') >= 0 ? 
    <FormControl style={{ width: '100%' }}>
 <Autocomplete defaultValue={prop.escrowPhone} freeSolo={true} style={{ width: '100%' }} options={escrow} renderInput={(params) => <TextField InputProps={{ disableUnderline: true }} variant='standard' {...params} label="Escrow Officer Phone"  />} onInputChange={(e, value) => {
        API.put(apiName, path, {
        body: {
            id: prop.id,
            escrowPhone: value
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
        }} value={prop.escrowPhone} />
        </FormControl>
  )
}

export default EscrowPhone