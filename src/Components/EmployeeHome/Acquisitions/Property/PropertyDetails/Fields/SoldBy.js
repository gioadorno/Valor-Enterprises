import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { API } from 'aws-amplify';

const SoldBy = ({ prop, id, setOpenUpdate, employee }) => {
        // Props API
        const apiName = 'valproperties';
        const path = `/properties/${prop.id}/soldby`;
        // 
  const handleSoldBy = (e) => {
    API.put(apiName, path, {
      body: {
          id: prop.id,
          soldBy: e.target.value
      }
      })
      .then(() => {
      setOpenUpdate(true)
      })
  };

  return (
    employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Admin') >= 0 || employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Operations') >= 0 ? (
      <FormControl sx={{ width: '100%'}} variant='outlined'>
          <InputLabel variant='outlined'>Sold By</InputLabel>
          <Select variant='standard' label='Sold By' labelId="Sold By" defualtValue={prop.soldBy} onChange={handleSoldBy}>
          <MenuItem value=''>
              
          </MenuItem>
          <MenuItem value='Call/Text'>
              Call/Text
          </MenuItem>

          </Select>
      </FormControl>
      ) :
      <FormControl sx={{ width: '100%' }} variant='outlined'>
      <InputLabel variant='outlined'>Sold By</InputLabel>
      <Select label='Sold By' variant='standard' disabled defaultValue={prop.soldBy} />
      </FormControl>
  )
}

export default SoldBy