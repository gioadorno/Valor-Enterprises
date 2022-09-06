import { TextField } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { API } from 'aws-amplify';
import { useState } from 'react';
import format from 'date-fns/format';

const InspectionPeriod = ({ prop, id, setOpenUpdate, employee }) => {
        // Props API
        const apiName = 'valproperties';
        const path = `/properties/${prop.id}/inspectionperiod`;
        // 
        const [ newDate, setNewDate ] = useState(prop.inspectionPeriod)
    const handleInspectionPeriod = (newValue) => {
        API.put(apiName, path, {
            body: {
                id: prop.id,
                inspectionPeriod: newValue
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
      label="Inspection Period"
      value={newDate || ''}
      onChange={handleInspectionPeriod}
      renderInput={(params) => <TextField InputProps={{ disableUnderline: true }} variant='standard' style={{ width: '100%' }} {...params} />}
    />
    :
    <DatePicker
    label="Inspection Period"
    value={prop.inspectionPeriod}
    readOnly
    renderInput={(params) => <TextField InputProps={{ disableUnderline: true }} variant='standard' style={{ width: '100%' }} {...params} />}
  />
}
  </LocalizationProvider>
  )
}

export default InspectionPeriod