import { TextField, FormControl } from "@mui/material";
import { API } from 'aws-amplify';

const BuyerEmail = ({ prop, setOpenUpdate }) => {
          // Props API
          const apiName = 'valproperties';
          const path = `/properties/${prop.id}/buyeremail`;
          // 
    
        const handleBuyerEmail = (e) => {
            API.put(apiName, path, {
                body: {
                    id: prop.id,
                    buyerEmail: e.target.value
                }
              })
              .then(() => {
                setOpenUpdate(true)
              })
        };
  return (
    <FormControl style={{ width: '100%' }}>
        <TextField InputProps={{ disableUnderline: true }} onChange={handleBuyerEmail} id="standard-read-only-input" label="Buyer's Email" defaultValue={prop.buyerEmail} variant="standard"/>
    </FormControl>
  )
}

export default BuyerEmail