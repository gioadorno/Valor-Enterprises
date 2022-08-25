import { API } from 'aws-amplify';
import NumberFormat from 'react-number-format';
import { TextField, FormControl, InputAdornment } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const DispoPriceIncrease = ({ prop, setOpenUpdate, employee }) => {
      // Props API
      const apiName = 'valproperties';
      const path = `/properties/${prop.id}/dispopriceincrease`;
      // 

  return (
    employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Admin') >= 0 || employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Operations') >= 0 ? 
    <FormControl style={{ width: '100%' }}>
      <NumberFormat variant='standard' label='Dispo Price Increase' customInput={TextField} defaultValue={prop.dispoPriceIncrease} InputProps={{ startAdornment: ( <InputAdornment position='start'><AttachMoneyIcon fontSize='small' /></InputAdornment> ), disableUnderline: true }} onValueChange={({ value }) => {
         API.put(apiName, path, {
          body: {
              id: prop.id,
              dispoPriceIncrease: value
          }
        })
        .then(() => {
          setOpenUpdate(true)
        })
      }} thousandSeparator isNumericString prefix='' />
    </FormControl>
    :
        <FormControl style={{ width: '100%' }}>
            <TextField label='Dispo Price Increase' variant='standard' InputProps={{
            readOnly: true,
            disableUnderline: true
        }} value={prop.dispoPriceIncrease} />
        </FormControl>
  )
}

export default DispoPriceIncrease