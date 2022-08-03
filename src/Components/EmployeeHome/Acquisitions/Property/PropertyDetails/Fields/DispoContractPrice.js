import { API } from 'aws-amplify';
import NumberFormat from 'react-number-format';
import { TextField, FormControl, InputAdornment } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const DispoContractPrice = ({ prop, setOpenUpdate, employee }) => {
        // Props API
        const apiName = 'valproperties';
        const path = `/properties/${prop.id}/dispocontractprice`;
        // 

  return (
    employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Admin') >= 0 || employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Operations') >= 0 ? 
    <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
        <NumberFormat label='Dispo Contract Price' customInput={TextField} InputProps={{ startAdornment: ( <InputAdornment position='start'><AttachMoneyIcon fontSize='small' /></InputAdornment> ) }} defaultValue={prop?.dispoContractPrice?.replace('$', '')} onValueChange={({ value }) => {
            API.put(apiName, path, {
              body: {
                  id: prop.id,
                  dispoContractPrice: value
              }
            })
            .then(() => {
              setOpenUpdate(true)
            })
        }} thousandSeparator isNumericString prefix='' />
    </FormControl>
    :
        <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
            <TextField label='Dispo Contract Price' variant='outlined' InputProps={{
            readOnly: true,
        }} value={prop.dispoContractPrice} />
        </FormControl>
  )
}

export default DispoContractPrice