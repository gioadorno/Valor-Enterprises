import { TextField } from "@mui/material";
import { LocalizationProvider, DatePicker} from '@mui/lab';
import { API } from 'aws-amplify';
import format from 'date-fns/format';
import AdapterDateFns from "@mui/lab/modern/AdapterDateFns";


const BuyerEMDDate = ({ prop, setOpenUpdate, employee }) => {
      // Props API
      const apiName = 'valproperties';
      const path = `/properties/${prop.id}/buyeremddate`;
      // 

    const handleBuyersEMDDate = (newValue) => {
      API.put(apiName, path, {
        body: {
            id: prop.id,
            buyerEMDDate: newValue
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
      label="Date Buyer's EMD was Deposited"
      value={prop.buyersEMDDate}
      onChange={handleBuyersEMDDate}
      renderInput={(params) => <TextField variant='outlined' style={{ width: '100%', marginBottom: '.75em' }} {...params} />}
    />
    :
    <DatePicker
    label="Date Buyer's EMD was Deposited"
    value={prop.buyersEMDDate}
    readOnly
    renderInput={(params) => <TextField variant='outlined' style={{ width: '100%', marginBottom: '.75em' }} {...params} />}
  />
}
  </LocalizationProvider>
  )
}

export default BuyerEMDDate