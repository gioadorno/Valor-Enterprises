import { TextField } from "@mui/material";
import { LocalizationProvider, DatePicker} from '@mui/lab';
import { API } from 'aws-amplify';
import format from 'date-fns/format';
import AdapterDateFns from "@mui/lab/modern/AdapterDateFns";


const BuyerCloseDate = ({ prop, setOpenUpdate, employee }) => {
      // API
      const apiName = 'valproperties';
      const path = `/properties/${prop.id}/buyerclosedate`;
      // 

    const handleBuyerCloseDate = async (newValue) => {
      API.put(apiName, path, {
        body: {
            id: prop.id,
            buyerCloseDate: newValue
        }
    })
    .then(() => {
      setOpenUpdate(true)
    })
    };


  return (
<LocalizationProvider dateAdapter={AdapterDateFns} >
    {employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Admin') >= 0 || employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Operations') >= 0  ? 
    <DatePicker
      label="Buyer's Closing Date"
      value={prop.buyerCloseDate}
      onChange={handleBuyerCloseDate}
      renderInput={(params) => <TextField variant='outlined' style={{ width: '100%', marginBottom: '.75em' }} {...params} />}
    />
    :
    <DatePicker
    label="Buyer's Closing Date"
    value={prop.buyerCloseDate}
    readOnly
    renderInput={(params) => <TextField variant='outlined' style={{ width: '100%', marginBottom: '.75em' }} {...params} />}
  />
}
  </LocalizationProvider>
  )
}

export default BuyerCloseDate