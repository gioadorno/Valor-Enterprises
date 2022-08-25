import { API } from 'aws-amplify';
import NumberFormat from 'react-number-format';
import { TextField, FormControl, InputAdornment} from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const NetPrice = ({ prop, id, setOpenUpdate, employee }) => {
          // Props API
          const apiName = 'valproperties';
          const path = `/properties/${prop.id}/saleprice`;
          // 

  return (
    employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Admin') >= 0 || employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Operations') >= 0 ? 
    <FormControl style={{ width: '100%' }}>
      <NumberFormat variant='standard' label='Wholesale Price' InputProps={{ startAdornment: ( <InputAdornment position='start'><AttachMoneyIcon fontSize='small'/></InputAdornment> ), disableUnderline: true }} customInput={TextField} defaultValue={prop.salePrice} onValueChange={({ value }) => {
          API.put(apiName, path, {
            body: {
                id: prop.id,
                salePrice: Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(value).replace('.00', '')
            }
            })
            .then(() => {
            setOpenUpdate(true)
            })
      }} thousandSeparator isNumericString prefix='' />
    </FormControl>
    :
        <FormControl style={{ width: '100%' }}>
            <TextField label='Wholesale Price' variant='standard' InputProps={{
            readOnly: true,
            disableUnderline: true
        }} value={prop.salePrice} />
        </FormControl>
  )
}

export default NetPrice