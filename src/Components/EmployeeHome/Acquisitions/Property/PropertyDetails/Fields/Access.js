import { FormControl, InputLabel, MenuItem, Select, Divider } from "@mui/material";
import { API } from 'aws-amplify';

const Access = ({ prop, setOpenUpdate, employee  }) => {
          // Props API
          const apiName = 'valproperties';
          const path = `/properties/${prop.id}/typeaccess`;
          // 
  
      const handleTypeAccess = (e) => {
          API.put(apiName, path, {
              body: {
                  id: prop.id,
                  typeAccess: e.target.value
              }
              })
              .then(() => {
              setOpenUpdate(true)
              })
      };

  return (
    employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Admin') >= 0 || employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Operations') >= 0 ? (
      <FormControl sx={{ width: '100%' }} variant='standard'>
          <InputLabel variant='standard'>Type of Access</InputLabel>
          <Select labelId="Type of Access" defaultValue={prop.typeAccess} onChange={handleTypeAccess}>
          <MenuItem value='Appointment'>
              Appointment
          </MenuItem>
          <MenuItem value='Lockbox'>
              Lockbox
          </MenuItem>
          <MenuItem value='No Access'>
              No Access
          </MenuItem>
          </Select>
      </FormControl>
      ) :
      <FormControl sx={{ width: '100%', mb: 2 }} variant='standard'>
      <InputLabel variant='standard'>Type of Access</InputLabel>
      <Select disabled defaultValue={prop.typeAccess} />
      </FormControl>
  )
}

export default Access