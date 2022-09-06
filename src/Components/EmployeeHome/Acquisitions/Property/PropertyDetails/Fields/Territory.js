import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { API } from 'aws-amplify';

const Territory = ({ prop, id, setOpenUpdate, employee }) => {
        // Props API
        const apiName = 'valproperties';
        const path = `/properties/${prop.id}/territory`;
        // 
    const handleTerritory = (e) => {
        API.put(apiName, path, {
            body: {
                id: prop.id,
                territory: e.target.value
            }
            })
            .then(() => {
            setOpenUpdate(true)
            })
    };
  return (
    employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Admin') >= 0 || employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Operations') >= 0 ? (
        <FormControl sx={{ width: '100%' }} variant='standard'>
            <InputLabel variant='standard'>Outside Territory</InputLabel>
            <Select sx={{ borderColor: '#0055a1bf' }} InputProps={{ disableUnderline: true }} name='territory' labelId="territory" id="territory" label='Outside Territory' defaultValue={prop.territory} onChange={handleTerritory} >
                <MenuItem value='Yes'>Yes</MenuItem>
                <MenuItem value='No'>No</MenuItem>
            </Select>
        </FormControl>
        ) :
        <FormControl sx={{ width: '100%' }} variant='standard'>
        <InputLabel variant='standard'>Outside Territory</InputLabel>
        <Select InputProps={{ disableUnderline: true }} label='Outside Territory' disabled defaultValue={prop.territory} />
        </FormControl>
        
  )
}

export default Territory