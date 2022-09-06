import { FormControl, InputLabel, MenuItem, Select, Divider } from "@mui/material";
import { API } from 'aws-amplify';


const Split = ({ prop, setOpenUpdate, earnestStatus, employee }) => {
        // Props API
        const apiName = 'valproperties';
        const path = `/properties/${prop.id}/dealsplit`;
        // 

    const handleStatusEarnest = (e) => {
        API.put(apiName, path, {
            body: {
                id: prop.id,
                dealSplit: e.target.value
            }
            })
            .then(() => {
            setOpenUpdate(true)
            })
    };

  return (
    employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Admin') >= 0 || employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Operations') >= 0 ? (
        <FormControl sx={{ width: '100%' }} variant='standard'>
            <InputLabel variant='standard'>Deal Split</InputLabel>
            <Select labelId="dealSplit" defaultValue={prop.dealSplit} onChange={handleStatusEarnest}>
            <MenuItem value='100'>
                100
            </MenuItem>
            <MenuItem value='50/50'>
                50/50
            </MenuItem>
            <MenuItem value='Other'>
                Other
            </MenuItem>
            </Select>
        </FormControl>
        ) :
        <FormControl sx={{ width: '100%', mb: 2 }} variant='standard'>
        <InputLabel variant='standard'>Deal Split</InputLabel>
        <Select disabled defaultValue={prop.dealSplit} />
        </FormControl>
  )
};


export default Split