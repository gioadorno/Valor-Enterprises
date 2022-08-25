import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { API } from 'aws-amplify';
import { useState } from "react";

const StatusGP = ({ prop, id, setOpenUpdate, employee }) => {
        // Props API
        const apiName = 'valproperties';
        const path = `/properties/${prop.id}/statusgp`;
        // 
        const [ statusGP, setStatusGP ] = useState(prop.statusGP)
    const handleStatusGP = async (e) => {
        API.put(apiName, path, {
            body: {
                id: prop.id,
                statusGP: e.target.value
            }
            })
            .then(() => {
            setOpenUpdate(true)
            setStatusGP(e.target.value)
            })
    };

  return (
    employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Admin') >= 0 || employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Operations') >= 0 ? (
        <ToggleButtonGroup color='error' aria-label="Status of Actual Gross Profit" exclusive onChange={handleStatusGP} fullWidth value={statusGP} sx={{ alignItems: 'center' }} variant='outlined'>
            <ToggleButton style={{ height: '100%' }} value='Needed'>
            Needed
            </ToggleButton>
            <ToggleButton style={{ height: '100%' }} value='Received'>
            Received
            </ToggleButton>
            <ToggleButton style={{ height: '100%' }} value='Deposited'>
            Deposited
            </ToggleButton>
        </ToggleButtonGroup>
        ) :
        <ToggleButtonGroup color='error' disabled exclusive fullWidth value={prop.statusGP} variant='outlined'>
            <ToggleButton style={{ height: '100%' }} value='Needed'>
            Needed
            </ToggleButton>
            <ToggleButton style={{ height: '100%' }} value='Received'>
            Received
            </ToggleButton>
            <ToggleButton style={{ height: '100%' }} value='Deposited'>
            Deposited
            </ToggleButton>
        </ToggleButtonGroup>
  )
}

export default StatusGP