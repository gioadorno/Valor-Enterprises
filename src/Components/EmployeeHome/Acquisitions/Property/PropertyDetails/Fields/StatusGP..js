import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { API } from 'aws-amplify';

const StatusGP = ({ prop, id, setOpenUpdate, employee }) => {
        // Props API
        const apiName = 'valproperties';
        const path = `/properties/${prop.id}/statusgp`;
        // 
    const handleStatusGP = async (e) => {
        API.put(apiName, path, {
            body: {
                id: prop.id,
                statusGP: e.target.value
            }
            })
            .then(() => {
            setOpenUpdate(true)
            window.location.reload(false)
            })
    };

  return (
    employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Admin') >= 0 || employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Operations') >= 0 ? (
        <ToggleButtonGroup color='error' aria-label="Status of Actual Gross Profit" exclusive onChange={handleStatusGP} fullWidth value={prop.statusGP} sx={{ mb: 2, alignItems: 'center' }} variant='outlined'>
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
        <ToggleButtonGroup color='error' disabled exclusive fullWidth value={prop.statusGP} sx={{ mb: 2 }} variant='outlined'>
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