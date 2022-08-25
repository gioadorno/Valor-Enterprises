import { API } from 'aws-amplify';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import NumberFormat from 'react-number-format';
import { TextField, FormControl, InputAdornment } from '@mui/material';

const AdditionalCost = ({ prop, setOpenUpdate, employee }) => {
        // API
        const apiName = 'valproperties';
        const path = `/properties/${prop.id}/additionalcost`;
        // 

  return (
    employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Admin') >= 0 || employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Operations') >= 0 ? 
    <FormControl style={{ width: '100%' }}>
        <NumberFormat variant='standard' label='Additional Cost' customInput={TextField} InputProps={{ startAdornment: ( <InputAdornment position='start'><AttachMoneyIcon fontSize='small'/></InputAdornment> ), disableUnderline: true }} defaultValue={prop.additionalCost} onValueChange={({ value }) => {
          API.put(apiName, path, {
            body: {
                id: prop.id,
                addComp: Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(value).replace('.00', '')
            }
        })
        .then(() => {
          setOpenUpdate(true)
        })
        }} thousandSeparator isNumericString prefix='$' />
    </FormControl>
    :
        <FormControl style={{ width: '100%'}}>
            <TextField label='Additional Cost' variant='standard' InputProps={{
            readOnly: true,
            disableUnderline: true
        }} value={prop.additionalCost} />
        </FormControl>
  )
}

export default AdditionalCost