import { API } from 'aws-amplify';
import NumberFormat from 'react-number-format';
import { TextField, FormControl, InputAdornment } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const SecondLegDebits = ({ prop, id, setOpenUpdate, employee }) => {
        // Props API
        const apiName = 'valproperties';
        const path = `/properties/${prop.id}/secondlegdebits`;
        // 
  return (
    employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Admin') >= 0 || employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Operations') >= 0 ? 
    <FormControl style={{ width: '100%' }}>
      <NumberFormat variant='standard' label='2nd Leg Debits' customInput={TextField} InputProps={{ startAdornment: ( <InputAdornment position='start'><AttachMoneyIcon fontSize='small' /></InputAdornment> ), disableUnderline: true }} defaultValue={prop.secondLegDebits} onValueChange={({ value }) => {
          API.put(apiName, path, {
            body: {
                id: prop.id,
                secondLegDebits: value
            }
          })
          .then(() => {
            setOpenUpdate(true)
          })
      }} thousandSeparator isNumericString prefix='' />
    </FormControl>
    :
        <FormControl style={{ width: '100%' }}>
            <TextField label='2nd Leg Debits' variant='standard' InputProps={{
            readOnly: true,
            disableUnderline: true
        }} value={prop.secondLegDebits} />
        </FormControl>
  )
}

export default SecondLegDebits