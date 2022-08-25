import { TextField, FormControl } from "@mui/material";
import { API } from 'aws-amplify';

const PayoutRecipient = ({ prop, id, setOpenUpdate, employee }) => {
        // Props API
        const apiName = 'valproperties';
        const path = `/properties/${prop.id}/payoutrecipient`;
        // 
    const handlePayoutRecipient = (e) => {
        API.put(apiName, path, {
            body: {
                id: prop.id,
                payoutRecipient: e.target.value
            }
            })
            .then(() => {
            setOpenUpdate(true)
            })
    };

  return (
    employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Admin') >= 0 || employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Operations') >= 0 ? 
    <FormControl style={{ width: '100%' }}>
        <TextField InputProps={{ disableUnderline: true }} label='Payout Recipient' variant='standard' defaultValue={prop.payoutRecipient} onChange={handlePayoutRecipient} />
    </FormControl>
    :
        <FormControl style={{ width: '100%' }}>
            <TextField label='Payout Recipient' variant='standard' InputProps={{
            readOnly: true,
            disableUnderline: true
        }} value={prop.payoutRecipient} />
        </FormControl>
  )
}

export default PayoutRecipient