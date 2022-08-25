import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { API } from 'aws-amplify';
import { useState } from "react";

const BuyerDocs = ({ prop, employee, setOpenUpdate }) => {
        // Props API
        const apiName = 'valproperties';
        const path = `/properties/${prop.id}/buyerdocs`;
        // 

        const [ buyerDocs, setBuyerDocs ] = useState(prop.buyerDocs)
    const handleBuyerDocs = async (e) => {
        API.put(apiName, path, {
        body: {
            id: prop.id,
            buyerDocs: e.target.value
        }
        })
        .then(() => {
        setOpenUpdate(true)
        setBuyerDocs(e.target.value)
        })
    };

  return (
    employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Admin') >= 0 || employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Operations') >= 0 ? (
        <ToggleButtonGroup color="error" aria-label="Status of Cash Buyer's Docs" exclusive size="small" onChange={handleBuyerDocs} fullWidth  value={buyerDocs} sx={{ alignItems: 'center' }} variant='outlined'>
            <ToggleButton value='Executed Contract Received from Buyer (Open Escrow)'>
            Executed Contract Received from Buyer (Open Escrow)
            </ToggleButton>
            <ToggleButton value="Escrow Contacted for Buyer's EMD (Waiting on Acq Side)">
            Escrow Contacted for Buyer's EMD (Waiting on Acq Side)
            </ToggleButton>
            <ToggleButton style={{ height: '100%' }} value='(Escrow Opened) All Documents are at Title'>
            (Escrow Opened) All Documents are at Title
            </ToggleButton>
        </ToggleButtonGroup>
        ) :
        <ToggleButtonGroup color="error" disabled exclusive fullWidth value={prop.buyerDocs} variant='outlined'>
            <ToggleButton value='Executed Contract Received from Buyer (Open Escrow)'>
            Executed Contract Received from Buyer (Open Escrow)
            </ToggleButton>
            <ToggleButton value="Escrow Contacted for Buyer's EMD (Waiting on Acq Side)">
            Escrow Contacted for Buyer's EMD (Waiting on Acq Side)
            </ToggleButton>
            <ToggleButton style={{ height: '100%' }} value='(Escrow Opened) All Documents are at Title'>
            (Escrow Opened) All Documents are at Title
            </ToggleButton>
        </ToggleButtonGroup>
  )
}

export default BuyerDocs