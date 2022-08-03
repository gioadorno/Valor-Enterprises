import { TextField, FormControl } from "@mui/material";
import { API } from 'aws-amplify';


const EMDCheck = ({ prop, setOpenUpdate, employee }) => {
      // Props API
      const apiName = 'valproperties';
      const path = `/properties/${prop.id}/emdcheck`;
      // 

    const handleEmdCheck = (e) => {
        API.put(apiName, path, {
            body: {
                id: prop.id,
                emdCheck: e.target.value
            }
            })
            .then(() => {
            setOpenUpdate(true)
            })
    };


  return (
    employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Admin') >= 0 || employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Operations') >= 0 ? 
    <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
        <TextField label='EMD Check/Wire Transaction Number' variant='outlined' defaultValue={prop.emdCheck} onChange={handleEmdCheck} />
    </FormControl>
    :
        <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
            <TextField label='EMD Check/Wire Transaction Number' variant='outlined' InputProps={{
            readOnly: true,
        }} value={prop.emdCheck} />
        </FormControl>
  )
}

export default EMDCheck