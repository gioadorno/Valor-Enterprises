import { TextField } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useState } from 'react';
import { API } from 'aws-amplify';
import format from 'date-fns/format';
const CompletionDate = ({ prop, setOpenUpdate, employee }) => {
  // API
  const apiName = 'valproperties';
  const path = `/properties/${prop.id}/completiondate`;
  const path2 = `/properties/${prop.id}/completiondate2`;
  // 
  const [ newDate, setNewDate ] = useState(prop.completionDate)
const handleBCompletionDate = async (newValue) => {
  API.put(apiName, path, {
    body: {
        id: prop.id,
        completionDate: newValue
    }
})
.then(() => {
  setNewDate(newValue)
  setOpenUpdate(true)
})
API.put(apiName, path2, {
  body: {
      id: prop.id,
      completionDate2: newValue
  }
})
};
  return (
<LocalizationProvider dateAdapter={AdapterDateFns} >
    {employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Admin') >= 0 || employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Operations') >= 0 ? 
    <DatePicker
      label="Date of Completion"
      value={newDate || ''}
      onChange={handleBCompletionDate}
      className='datePicker'
      renderInput={(params) => <TextField variant="standard" sx={{ width: '100%', color: '#2285ffde' }} {...params} />}
    />
    :
    <DatePicker
    label="Date of Completion"
    value={prop.completionDate}
    readOnly
    renderInput={(params) => <TextField variant="standard" sx={{ width: '100%', color: '#2285ffde' }} {...params} />}
  />
}
  </LocalizationProvider>
  )
}

export default CompletionDate