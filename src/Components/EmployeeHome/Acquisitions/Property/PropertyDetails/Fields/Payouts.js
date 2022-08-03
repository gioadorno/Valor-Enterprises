import { TextField, FormControl } from "@mui/material";
import { API } from 'aws-amplify';

const Payouts = ({ prop, id, setOpenUpdate, employee }) => {
        // Props API
        const apiName = 'valproperties';
        const path = `/properties/${prop.id}/payouts`;
        // 
    const handlePayouts = (e) => {
        API.put(apiName, path, {
            body: {
                id: prop.id,
                payouts: e.target.value
            }
            })
            .then(() => {
            setOpenUpdate(true)
            })
    };

  return (
    employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Admin') >= 0 || employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Operations') >= 0 ? 
    <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
        <TextField label='Payouts' variant='outlined' defaultValue={prop.payouts} onChange={handlePayouts} />
    </FormControl>
    :
        <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
            <TextField label='Payouts' variant='outlined' InputProps={{
            readOnly: true,
        }} value={prop.payouts} />
        </FormControl>
  )
}

export default Payouts