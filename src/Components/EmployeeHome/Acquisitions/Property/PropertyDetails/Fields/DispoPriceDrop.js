import { API } from 'aws-amplify';
import NumberFormat from 'react-number-format';
import { TextField, FormControl, InputAdornment } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const DispoPriceDrop = ({ prop, setOpenUpdate, employee }) => {
      // Props API
      const apiName = 'valproperties';
      const path = `/properties/${prop.id}/dispopricedrop`;
      // 

  return (
    employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Admin') >= 0 || employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Operations') >= 0 ? 
    <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
<NumberFormat label='Dispo Price Drops' customInput={TextField} defaultValue={prop.dispoPriceDrop} InputProps={{ startAdornment: ( <InputAdornment position='start'><AttachMoneyIcon fontSize='small' /></InputAdornment> ) }} onValueChange={({ value }) => {
  API.put(apiName, path, {
    body: {
        id: prop.id,
        dispoPriceDrop: value
    }
  })
  .then(() => {
    setOpenUpdate(true)
  })
}} thousandSeparator isNumericString prefix='' />
    </FormControl>
    :
        <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
            <TextField label='Dispo Price Drop' variant='outlined' InputProps={{
            readOnly: true,
        }} value={prop.dispoPriceDrop} />
        </FormControl>
  )
}

export default DispoPriceDrop