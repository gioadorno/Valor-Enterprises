import { ToggleButtonGroup, ToggleButton} from "@mui/material";
import { API } from 'aws-amplify';

const SellerDocs = ({ prop, id, setOpenUpdate, employee }) => {
        // Props API
        const apiName = 'valproperties';
        const path = `/properties/${prop.id}/statusdocs`;
        // 
    const handleStatusDocs = async (e) => {
        API.put(apiName, path, {
            body: {
                id: prop.id,
                statusDocs: e.target.value
            }
            })
            .then(() => {
            setOpenUpdate(true)
            window.location.reload(false)
            })
    };

  return (
    employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Admin') >= 0 || employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Operations') >= 0 ? (
        <ToggleButtonGroup color='error' size='small' aria-label="Status of Sellers Docs" exclusive onChange={handleStatusDocs} fullWidth  value={prop.statusDocs} sx={{ mb: 2, alignItems: 'center' }} variant='outlined'>
            <ToggleButton style={{ height: '100%' }} value='Contract or Opening Escrow (Not Required)'>
            Contract or Opening Escrow (Not Required)
            </ToggleButton>
            <ToggleButton style={{ height: '100%' }} value='Executed Contract Needed with Seller/Supplier'>
            Executed Contract Needed with Seller/Supplier
            </ToggleButton>
            <ToggleButton style={{ height: '100%' }} value='Executed Contract Received from Seller/Supplier (Open Escrow)'>
            Executed Contract Received (Open Escrow)
            </ToggleButton>
            <ToggleButton style={{ height: '100%' }} value='(Escrow Opened) All Documents are at Title'>
            (Escrow Opened) All Documents are at Title
            </ToggleButton>
        </ToggleButtonGroup>
        ) :
        <ToggleButtonGroup color='error' disabled exclusive fullWidth value={prop.statusDocs} sx={{ mb: 2 }} variant='outlined'>
            <ToggleButton style={{ height: '100%' }} value='Contract or Opening Escrow (Not Required)'>
            Contract or Opening Escrow (Not Required)
            </ToggleButton>
            <ToggleButton style={{ height: '100%' }} value='Executed Contract Needed with Seller/Supplier'>
            Executed Contract Needed with Seller/Supplier
            </ToggleButton>
            <ToggleButton style={{ height: '100%' }} value='Executed Contract Received from Seller/Supplier (Open Escrow)'>
            Executed Contract Received (Open Escrow)
            </ToggleButton>
            <ToggleButton style={{ height: '100%' }} value='(Escrow Opened) All Documents are at Title'>
            (Escrow Opened) All Documents are at Title
            </ToggleButton>
        </ToggleButtonGroup>
  )
}

export default SellerDocs