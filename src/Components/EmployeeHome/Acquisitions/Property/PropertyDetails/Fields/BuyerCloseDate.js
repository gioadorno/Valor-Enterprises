import { TextField } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { API } from 'aws-amplify';
import { useState } from 'react';
import format from 'date-fns/format';


const BuyerCloseDate = ({ prop, setOpenUpdate, employee }) => {
      // API
      const apiName = 'valproperties';
      const path = `/properties/${prop.id}/buyerclosedate`;
      // 
      const [ newDate, setNewDate ] = useState(prop.buyerCloseDate)
    const handleBuyerCloseDate = async (newValue) => {
      API.put(apiName, path, {
        body: {
            id: prop.id,
            buyerCloseDate: newValue
        }
    })
    .then(() => {
      setNewDate(newValue)
      setOpenUpdate(true)
    })
    };


  return (
<LocalizationProvider dateAdapter={AdapterDateFns} >
    {employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Admin') >= 0 || employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Operations') >= 0  ? 
    <DatePicker
      label="Buyer's Closing Date"
      value={newDate}
      onChange={handleBuyerCloseDate}
      renderInput={(params) => <TextField variant='standard' style={{ width: '100%' }} {...params} />}
    />
    :
    <DatePicker
    label="Buyer's Closing Date"
    value={prop.buyerCloseDate}
    readOnly
    renderInput={(params) => <TextField variant='standard' style={{ width: '100%' }} {...params} />}
  />
}
  </LocalizationProvider>
  )
}

export default BuyerCloseDate