import { TextField, FormControl } from "@mui/material";
import { API } from 'aws-amplify';

const SecondEscrow = ({ prop, id, setOpenUpdate, employee }) => {
        // Props API
        const apiName = 'valproperties';
        const path = `/properties/${prop.id}/secondescrow`;
        // 
    const handleSecondEscrow = (e) => {
        API.put(apiName, path, {
            body: {
                id: prop.id,
                secondEscrow: e.target.value
            }
            })
            .then(() => {
            setOpenUpdate(true)
            })
    };

  return (
    employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Admin') >= 0 || employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Operations') >= 0 ? 
    <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
        <TextField id='standard-search' label='Escrow Officer (Second Leg)' variant='outlined' defaultValue={prop.secondEscrow} onChange={handleSecondEscrow} />
    </FormControl>
    :
        <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
            <TextField id='standard-search' label='Escrow Officer (Second Leg)' variant='outlined' InputProps={{
            readOnly: true,
        }} value={prop.secondEscrow} />
        </FormControl>
  )
}

export default SecondEscrow