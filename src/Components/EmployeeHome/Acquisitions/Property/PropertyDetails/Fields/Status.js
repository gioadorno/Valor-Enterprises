import { ToggleButtonGroup, ToggleButton, } from "@mui/material";
import { useState, useEffect } from "react";
import { API } from 'aws-amplify';
import { teal } from "@mui/material/colors";


const Status = ({ prop, id, setOpenUpdate, employee }) => {
        // Props API
        const apiName = 'valproperties';
        const path = `/properties/${prop.id}/propstatus`;
        const completionPath = `/properties/${prop.id}/completiondate`;
        // 
    const [status, setStatus] = useState(prop.propStatus);
    let today = new Date();
    const newDate = parseInt(today.getMonth()+1) + '-' + today.getDate() + "-" + today.getFullYear();
    const [ completionDate, setCompletionDate ] = useState({ completionDate: newDate })
    const handleStatus = (e) => {
            API.put(apiName, path, {
                body: {
                    id: prop.id,
                    propStatus: e.target.value
                }
                })
                .then(() => {
                setOpenUpdate(true)
                setStatus(e.target.value)
                if (e.target.value === 'Closed') { 
                    API.put(apiName, completionPath, {
                    body: {
                        id: prop.id,
                        completionDate: completionDate.completionDate
                    }
                    })
                }
                })
        
    };

    useEffect(() => {
        setStatus(prop.propStatus)
    },[prop])

    

    // const submitStatus = async () => {

    //         await API.put(apiName, path, {
    //             body: {
    //                 id: prop.id,
    //                 status: status.status
    //             }
    //             })
    //             .then(() => {
    //             setOpenUpdate(true)
    //             })
    //         if(status.status === 'closed') API.put(apiName, completionPath, {
    //             body: {
    //                 id: prop.id,
    //                 completionDate: completionDate.completionDate
    //             }
    //             })
    //             .then(() => {
        //             setOpenUpdate(true)
        //             });

    // }
    
  return (
    employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Admin') >= 0 || employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Operations') >= 0 ? (
        <ToggleButtonGroup aria-label="Property Status" color='success' exclusive onChange={handleStatus} fullWidth value={status} sx={{ mb: 2, alignItems: 'center' }} variant='outlined'>
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