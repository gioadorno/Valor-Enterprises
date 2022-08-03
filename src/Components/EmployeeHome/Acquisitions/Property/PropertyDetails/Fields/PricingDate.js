import { TextField } from "@mui/material";
import { LocalizationProvider, DatePicker} from '@mui/lab';
import { API } from 'aws-amplify';
import format from 'date-fns/format';
import AdapterDateFns from "@mui/lab/modern/AdapterDateFns";


const PricingDate = ({ prop, id, setOpenUpdate, employee }) => {
      // Props API
      const apiName = 'valproperties';
      const path = `/properties/${prop.id}/pricingdate`;
      // 
    const handlePricingDate = (newValue) => {
      API.put(apiName, path, {
        body: {
            id: prop.id,
            pricingDate: newValue
        }
      })
      .then(() => {
        setOpenUpdate(true)
      })
    };

  return (
<LocalizationProvider dateAdapter={AdapterDateFns} >
    {employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Admin') >= 0 || employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Operations') >= 0 ? 
    <DatePicker
      label="Pricing Date"
      value={prop.pricingDate}
      onChange={handlePricingDate}
      renderInput={(params) => <TextField variant='outlined' style={{ width: '100%', marginBottom: '1em' }} {...params} />}
    />
    :
    <DatePicker
    label="Pricing Date"
    value={prop.pricingDate}
    readOnly
    renderInput={(params) => <TextField variant='outlined' style={{ width: '100%', marginBottom: '.75em' }} {...params} />}
  />
}
  </LocalizationProvider>
  )
}

export default PricingDate