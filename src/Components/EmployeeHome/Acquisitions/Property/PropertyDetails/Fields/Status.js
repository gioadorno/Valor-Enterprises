import { ToggleButtonGroup, ToggleButton, } from "@mui/material";
import { useState } from "react";
import { API } from 'aws-amplify';
import { teal } from "@mui/material/colors";


const Status = ({ prop, id, setOpenUpdate, employee }) => {
        // Props API
        const apiName = 'valproperties';
        const path = `/properties/${prop.id}/status`;
        const completionPath = `/properties/${prop.id}/completiondate`;
        // 
    const [status, setStatus] = useState({ status: prop.status });
    let today = new Date();
    const newDate = parseInt(today.getMonth()+1) + '-' + today.getDate() + "-" + today.getFullYear();
    const [ completionDate, setCompletionDate ] = useState({ completionDate: newDate })
    const handleStatus = (e) => {
        setStatus({ ...status, status: e.target.value })
    };
    const submitStatus = () => {
        API.put(apiName, path, {
            body: {
                id: prop.id,
                supplier: status
            }
            })
            .then(() => {
            setOpenUpdate(true)
            })
        if(status.status === 'closed') API.put(apiName, completionPath, {
            body: {
                id: prop.id,
                completionDate: completionDate.completionDate
            }
            })
            .then(() => {
            setOpenUpdate(true)
            });
    }
    
  return (
    employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Admin') >= 0 || employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Operations') >= 0 ? (
        <ToggleButtonGroup aria-label="Property Status" color='error' exclusive onChange={handleStatus} onBlur={submitStatus} fullWidth value={status.status} sx={{ mb: 2, alignItems: 'center' }} variant='outlined'>
            <ToggleButton value='Active'>
                Active
            </ToggleButton>
            <ToggleButton value='Pending'>
            Pending
            </ToggleButton>
            <ToggleButton value='Closed'>
            Closed
            </ToggleButton>
            <ToggleButton value='Sidelined'>
            Sidelined
            </ToggleButton>
            <ToggleButton value='Cancelled'>
            Cancelled
            </ToggleButton>
            <ToggleButton value='Dead'>
            Dead
            </ToggleButton>
        </ToggleButtonGroup>
        ) :
        <ToggleButtonGroup color='error' disabled exclusive fullWidth value={prop.status} sx={{ mb: 2 }} variant='outlined'>
            <ToggleButton value='Active'>
                Active
            </ToggleButton>
            <ToggleButton value='Pending'>
            Pending
            </ToggleButton>
            <ToggleButton value='Closed'>
            Closed
            </ToggleButton>
            <ToggleButton value='Sidelined'>
            Sidelined
            </ToggleButton>
            <ToggleButton value='Cancelled'>
            Cancelled
            </ToggleButton>
            <ToggleButton value='Dead'>
            Dead
            </ToggleButton>
        </ToggleButtonGroup>
  )
}

export default Status