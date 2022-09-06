import { TextField, FormControl } from "@mui/material";
import { API } from 'aws-amplify';

const BuyerPhone = ({ prop, setOpenUpdate }) => {
          // Props API
          const apiName = 'valproperties';
          const path = `/properties/${prop.id}/buyerphone`;
          // 
    
        const handleBuyerPhone = (e) => {
            API.put(apiName, path, {
                body: {
                    id: prop.id,
                    buyerPhone: e.target.value
                }
              })
              .then(() => {
                setOpenUpdate(true)
              })
        };
  return (
    <FormControl style={{ width: '100%' }}>
        <TextField InputProps={{ disableUnderline: true }} onChange={handleBuyerPhone} id="standard-read-only-input" label="Buyer's Phone" defaultValue={prop.buyerPhone} variant="standard"/>
    </FormControl>
  )
}

export default BuyerPhone