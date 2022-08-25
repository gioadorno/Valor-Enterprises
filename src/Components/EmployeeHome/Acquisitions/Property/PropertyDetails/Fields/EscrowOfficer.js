import { useState, useEffect } from 'react';
import { TextField, FormControl } from "@mui/material";
import { Autocomplete } from '@mui/material';
import { API } from 'aws-amplify';

const EscrowOfficer = ({ prop, setOpenUpdate, employee }) => {
      // Props API
      const apiName = 'valproperties';
      const path = `/properties/${prop.id}/escrowofficer`;
      // 

      const [ props, setProps ] = useState([]);

    useEffect(() => {
        API.get(apiName, '/properties')
        .then(res => setProps(res.Items))
    },[])


            // Removes Duplicates of Escrow Officers
            const escrowOfficers = props?.filter((value, index, self) => 
            index === self.findIndex((t) => (
                t.escrowOfficer === value.escrowOfficer
            ))
            );

            const escrow = escrowOfficers?.map(prop => prop.escrowOfficer != undefined ? prop.escrowOfficer : '');
    

  return (
    employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Admin') >= 0 || employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Operations') >= 0 ? 
    <FormControl style={{ width: '100%' }}>
 <Autocomplete defaultValue={prop.escrowOfficer} freeSolo={true} style={{ width: '100%' }} options={escrow} renderInput={(params) => <TextField InputProps={{ disableUnderline: true }} variant='standard' {...params} label="Escrow Officer"  />} onInputChange={(e, value) => {
        API.put(apiName, path, {
        body: {
            id: prop.id,
            escrowOfficer: value
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
        }} value={prop.escrowOfficer} />
        </FormControl>
  )
}

export default EscrowOfficer