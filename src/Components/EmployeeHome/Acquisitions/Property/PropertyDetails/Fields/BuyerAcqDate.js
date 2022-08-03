import { TextField } from "@mui/material";
import { LocalizationProvider, DatePicker} from '@mui/lab';
import { API } from 'aws-amplify';
import format from 'date-fns/format';
import AdapterDateFns from "@mui/lab/modern/AdapterDateFns";


const BuyerAcqDate = ({ prop, setOpenUpdate, employee }) => {
      // API
      const apiName = 'valproperties';
      const path = `/properties/${prop.id}/buyeracqdate`;
      // 

    const handleBuyerAcqDate = async (newValue) => {
      API.put(apiName, path, {
        body: {
            id: prop.id,
            buyerAcqDate: newValue
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
      label="Buyer's Acquisition Date"
      value={prop.buyerAcqDate}
      onChange={handleBuyerAcqDate}
      className='datePicker'
      renderInput={(params) => <TextField variant="outlined" sx={{ width: '100%', marginBottom: '1em', color: '#2285ffde' }} {...params} />}
    />
    :
    <DatePicker
    label="Buyer's Acquisition Date"
    value={prop.buyerAcqDate}
    readOnly
    renderInput={(params) => <TextField variant="outlined" sx={{ width: '100%', marginBottom: '.75em', color: '#2285ffde' }} {...params} />}
  />
}
  </LocalizationProvider>
  )
}

export default BuyerAcqDate