import { TextField, FormControl } from "@mui/material";
import { API } from 'aws-amplify';

const Commissions = ({ prop, setOpenUpdate, employee }) => {
      // Props API
      const apiName = 'valproperties';
      const path = `/properties/${prop.id}/commissions`;
      // 

    const handleCommissions = (e) => {
        API.put(apiName, path, {
            body: {
                id: prop.id,
                commissions: e.target.value
            }
          })
          .then(() => {
            setOpenUpdate(true)
          })
    };

  return (
    employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Admin') >= 0 || employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Operations') >= 0 ? 
    <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
        <TextField label='Commissions' variant='outlined' defaultValue={prop.commissions} onChange={handleCommissions}/>
    </FormControl>
    :
        <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
            <TextField label='Commissions' variant='outlined' InputProps={{
            readOnly: true,
        }} value={prop.commissions} />
        </FormControl>
  )
}

export default Commissions