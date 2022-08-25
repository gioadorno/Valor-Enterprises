import { API } from 'aws-amplify';
import NumberFormat from 'react-number-format';
import { TextField, FormControl, InputAdornment} from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const EMD = ({ prop, setOpenUpdate, employee }) => {
      // Props API
      const apiName = 'valproperties';
      const path = `/properties/${prop.id}/emd`;
      // 

  return (
    employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Admin') >= 0 || employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Operations') >= 0 ? 
    <FormControl style={{ width: '100%'}}>
      <NumberFormat variant='standard' label='Our Earnest Amount' InputProps={{ startAdornment: ( <InputAdornment position='start'><AttachMoneyIcon fontSize='small'/></InputAdornment> ), disableUnderline: true }} customInput={TextField} defaultValue={prop.emd} onValueChange={({ value }) => {
                API.put(apiName, path, {
                  body: {
                      id: prop.id,
                      emd: value
                  }
                  })
                  .then(() => {
                  setOpenUpdate(true)
                  })
      }} thousandSeparator isNumericString prefix='' />
    </FormControl>
    :
        <FormControl style={{ width: '100%' }}>
            <TextField label='Our Earnest Amount' variant='standard' InputProps={{
            readOnly: true,
            disableUnderline: true
        }} value={prop.emd} />
        </FormControl>
  )
}

export default EMD