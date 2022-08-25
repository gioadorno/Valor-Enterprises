import { TextField } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useState } from 'react';
import { API } from 'aws-amplify';
import format from 'date-fns/format';


const BuyerAcqDate = ({ prop, setOpenUpdate, employee }) => {
      // API
      const apiName = 'valproperties';
      const path = `/properties/${prop.id}/buyeracqdate`;
      // 
      const [ newDate, setNewDate ] = useState(prop.buyerAcqDate)
    const handleBuyerAcqDate = async (newValue) => {
      API.put(apiName, path, {
        body: {
            id: prop.id,
            buyerAcqDate: newValue
        }
    })
    .then(() => {
      setNewDate(newValue)
      setOpenUpdate(true)
    })
    };

  return (
<LocalizationProvider dateAdapter={AdapterDateFns} >
    {employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Admin') >= 0 || employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Operations') >= 0 ? 
    <DatePicker
      label="Buyer's Acquisition Date"
      value={newDate}
      onChange={handleBuyerAcqDate}
      className='datePicker'
      renderInput={(params) => <TextField variant="standard" sx={{ width: '100%', color: '#2285ffde' }} {...params} />}
    />
    :
    <DatePicker
    label="Buyer's Acquisition Date"
    value={prop.buyerAcqDate}
    readOnly
    renderInput={(params) => <TextField variant="standard" sx={{ width: '100%', color: '#2285ffde' }} {...params} />}
  />
}
  </LocalizationProvider>
  )
}

export default BuyerAcqDate