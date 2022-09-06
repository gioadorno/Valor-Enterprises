import { API } from 'aws-amplify';
import NumberFormat from 'react-number-format';
import { TextField, FormControl, InputAdornment } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const DispoFinal = ({ dispoFinal, prop, setOpenUpdate, employee, }) => {
          // Props API
          const apiName = 'valproperties';
          const path = `/properties/${prop.id}/dispoFinal`;
          // 

    return (
      employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Admin') >= 0 || employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Operations') >= 0 ? 
      <FormControl style={{ width: '100%' }}>
          <NumberFormat variant='standard' label='Dispo Final' customInput={TextField} InputProps={{ startAdornment: ( <InputAdornment position='start'><AttachMoneyIcon fontSize='small' /></InputAdornment> ), disableUnderline: true }} defaultValue={dispoFinal} onValueChange={({ value }) => {
              API.put(apiName, path, {
                body: {
                    id: prop.id,
                    dispoFonal: value
                }
              })
              .then(() => {
                setOpenUpdate(true)
              })
          }} thousandSeparator isNumericString prefix='' />
      </FormControl>
      :
          <FormControl style={{ width: '100%' }}>
              <TextField label='Dispo Final' variant='standard' InputProps={{
              readOnly: true,
              disableUnderline: true
          }} value={prop.dispoFinal} />
          </FormControl>
    )
}

export default DispoFinal