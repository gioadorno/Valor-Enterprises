import { API } from 'aws-amplify';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import NumberFormat from 'react-number-format';
import { TextField, FormControl, InputAdornment } from '@mui/material';

const AddComp = ({ prop, employee, setOpenUpdate }) => {
      // API
      const apiName = 'valproperties';
      const path = `/properties/${prop.id}/addcomp`;
      // 

  return (
    employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Admin') >= 0 || employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Operations') >= 0 ? 
    <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
        <NumberFormat label='Additional Compensation' InputProps={{ startAdornment: ( <InputAdornment position='start'><AttachMoneyIcon fontSize='small'/></InputAdornment> ) }} customInput={TextField} defaultValue={prop.addComp} onValueChange={({ value }) => {
           API.put(apiName, path, {
            body: {
                id: prop.id,
                addComp: Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(value).replace('.00', '')
            }
        })
        .then(() => {
          setOpenUpdate(true)
        })
        }} thousandSeparator isNumericString prefix="" />
    </FormControl>
    :
        <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
            <TextField label='Additional Compensation' variant='outlined' InputProps={{
            readOnly: true,
        }} value={prop.addComp} />
        </FormControl>
  )
}

export default AddComp