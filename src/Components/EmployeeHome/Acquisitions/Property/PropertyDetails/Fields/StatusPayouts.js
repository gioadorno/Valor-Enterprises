import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { API } from 'aws-amplify';
import { useState } from "react";

const StatusPayouts = ({ prop, id, setOpenUpdate, employee }) => {
        // Props API
        const apiName = 'valproperties';
        const path = `/properties/${prop.id}/statuspayouts`;
        // 

        const [ statusPayouts, setStatusPayouts ] = useState(prop.statusPayouts)
    const handleStatusPayouts = async (e) => {
        API.put(apiName, path, {
            body: {
                id: prop.id,
                statusPayouts: e.target.value
            }
            })
            .then(() => {
            setOpenUpdate(true)
            setStatusPayouts(e.target.value)
            })
    };

  return (
    employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Admin') >= 0 || employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Operations') >= 0 ? (
        <ToggleButtonGroup color='error' aria-label="Status of Payouts" exclusive onChange={handleStatusPayouts} fullWidth value={statusPayouts} sx={{ alignItems: 'center' }} variant='outlined'>
            <ToggleButton style={{ height: '100%' }} value='Payouts (If Any) need to be Sent'>
            Payouts (If Any) need to be Sent
            </ToggleButton>
            <ToggleButton style={{ height: '100%' }} value='Payouts have been Mailed/Picked Up'>
            Payouts have been Mailed/Picked Up
            </ToggleButton>
            <ToggleButton style={{ height: '100%' }} value='All Payouts (If Any) have Cleared the Account'>
            All Payouts (If Any) have Cleared the Account
            </ToggleButton>
        </ToggleButtonGroup>
        ) :
        <ToggleButtonGroup color='error' disabled exclusive fullWidth value={prop.statusPayouts} variant='outlined'>
            <ToggleButton style={{ height: '100%' }} value='Payouts (If Any) need to be Sent'>
            Payouts (If Any) need to be Sent
            </ToggleButton>
            <ToggleButton style={{ height: '100%' }} value='Payouts have been Mailed/Picked Up'>
            Payouts have been Mailed/Picked Up
            </ToggleButton>
            <ToggleButton style={{ height: '100%' }} value='All Payouts (If Any) have Cleared the Account'>
            All Payouts (If Any) have Cleared the Account
            </ToggleButton>
        </ToggleButtonGroup>
  )
}

export default StatusPayouts