import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { API } from 'aws-amplify';


const SourceOfDeal = ({ prop, id, setOpenUpdate, employee }) => {
        // Props API
        const apiName = 'valproperties';
        const path = `/properties/${prop.id}/supplier`;
        // 
    const handleSupplier = async (e) => {
        API.put(apiName, path, {
            body: {
                id: prop.id,
                supplier: e.target.value
            }
            })
            .then(() => {
            setOpenUpdate(true)
            window.location.reload(false)
            })
    };
  return (

    employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Admin') >= 0 || employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Operations') >= 0 ? (
        <ToggleButtonGroup color='error' aria-label="Property Status" exclusive onChange={handleSupplier} fullWidth value={prop.supplier} sx={{ mb: 0, alignItems: 'center' }} variant='outlined'>
            <ToggleButton value='Wholesaler'>
            Wholesaler
            </ToggleButton>
            <ToggleButton value='Agent'>
            Agent
            </ToggleButton>
        </ToggleButtonGroup>
        ) :
        <ToggleButtonGroup color='error' InputProps={{readOnly: true}} exclusive fullWidth value={prop.supplier} sx={{ mb: 2 }} variant='outlined'>
            <ToggleButton value='Active'>
                Wholesaler
            </ToggleButton>
            <ToggleButton value='Agent'>
                Agent
            </ToggleButton>
        </ToggleButtonGroup>
  )
}

export default SourceOfDeal