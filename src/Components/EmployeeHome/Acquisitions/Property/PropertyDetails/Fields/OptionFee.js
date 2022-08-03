import { API } from 'aws-amplify';
import NumberFormat from 'react-number-format';
import { TextField, FormControl, InputAdornment } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const OptionFee = ({ prop, id, setOpenUpdate, employee }) => {
      // Props API
      const apiName = 'valproperties';
      const path = `/properties/${prop.id}/optionfee`;
      // 
  return (
    employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Admin') >= 0 || employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Operations') >= 0 ? 
    <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
      <NumberFormat label='Option Fee' InputProps={{ startAdornment: ( <InputAdornment position='start'><AttachMoneyIcon fontSize='small' /></InputAdornment> ) }} customInput={TextField} defaultValue={prop.optionFee} onValueChange={({ value }) => {
      API.put(apiName, path, {
        body: {
            id: prop.id,
            optionFee: value
        }
      })
      .then(() => {
        setOpenUpdate(true)
      })
      }} thousandSeparator isNumericString prefix='' />
    </FormControl>
    :
        <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
            <TextField label='Option Fee' variant='outlined' InputProps={{
            readOnly: true,
        }} value={prop.optionFee} />
        </FormControl>
  )
}

export default OptionFee