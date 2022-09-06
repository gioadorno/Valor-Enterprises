import { TextField, FormControl } from "@mui/material";
import { API } from 'aws-amplify';

const SupplierEmail = ({ prop, setOpenUpdate }) => {
      // Props API
      const apiName = 'valproperties';
      const path = `/properties/${prop.id}/supplieremail`;
      // 

    const handleCommitRelation = (e) => {
        API.put(apiName, path, {
            body: {
                id: prop.id,
                supplierEmail: e.target.value
            }
          })
          .then(() => {
            setOpenUpdate(true)
          })
    };

  return (
    <FormControl style={{ width: '100%' }}>
        <TextField InputProps={{ disableUnderline: true }} onChange={handleCommitRelation} id="standard-read-only-input" label="Supplier's Email" defaultValue={prop.supplierEmail} variant="standard"/>
    </FormControl>
  )
}

export default SupplierEmail