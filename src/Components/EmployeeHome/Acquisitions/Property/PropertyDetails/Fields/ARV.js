import { API } from 'aws-amplify';
import NumberFormat from 'react-number-format';
import { TextField, FormControl, InputAdornment} from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const ARV = ({ prop, employee, setOpenUpdate }) => {
        // API
        const apiName = 'valproperties';
        const path = `/properties/${prop.id}/arv`;
        // 

  return (
    <FormControl style={{ width: '100%' }}>
        <NumberFormat variant='standard' label='ARV' customInput={TextField} InputProps={{ startAdornment: ( <InputAdornment position='start'><AttachMoneyIcon fontSize='small' /></InputAdornment> ), disableUnderline: true }} defaultValue={prop.arv} onValueChange={({ value }) => {
           API.put(apiName, path, {
            body: {
                id: prop.id,
                arv: Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(value).replace('.00', '')
            }
        })
        .then(() => {
          setOpenUpdate(true)
        })
        }} thousandSeparator isNumericString prefix='' />
    </FormControl>
  )
}

export default ARV