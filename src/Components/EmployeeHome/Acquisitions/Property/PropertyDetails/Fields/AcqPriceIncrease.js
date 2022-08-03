import { API } from 'aws-amplify';
import NumberFormat from 'react-number-format';
import { TextField, FormControl, InputAdornment} from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const AcqPriceIncrease = ({ prop, employee, setOpenUpdate }) => {
        // API
        const apiName = 'valproperties';
        const path = `/properties/${prop.id}/acqincrease`;
        // 

  return (
    employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Admin') >= 0 || employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Operations') >= 0 ? 
    <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
        <NumberFormat label='Acq Price Increase' customInput={TextField} InputProps={{ startAdornment: ( <InputAdornment position='start'><AttachMoneyIcon fontSize='small' /></InputAdornment> ) }} defaultValue={prop.acqIncrease} onValueChange={({ value }) => {
           API.put(apiName, path, {
            body: {
                id: prop.id,
                acqIncrease: Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(value).replace('.00', '')
            }
        })
        .then(() => {
          setOpenUpdate(true)
        })
        }} thousandSeparator isNumericString prefix='' />
    </FormControl>
    :
        <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
            <TextField label='Acq Price Increase' variant='outlined' InputProps={{
            readOnly: true,
        }} value={prop.acqIncrease} />
        </FormControl>
  )
}

export default AcqPriceIncrease