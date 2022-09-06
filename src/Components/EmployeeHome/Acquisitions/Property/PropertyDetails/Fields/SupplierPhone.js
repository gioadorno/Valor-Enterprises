import { TextField, FormControl } from "@mui/material";
import { API } from 'aws-amplify';

const SupplierPhone = ({ prop, setOpenUpdate }) => {
      // Props API
      const apiName = 'valproperties';
      const path = `/properties/${prop.id}/supplierphone`;
      // 

    const handleCommitRelation = (e) => {
        API.put(apiName, path, {
            body: {
                id: prop.id,
                supplierPhone: e.target.value
            }
          })
          .then(() => {
            setOpenUpdate(true)
          })
    };

  return (
    <FormControl style={{ width: '100%' }}>
        <TextField InputProps={{ disableUnderline: true }} onChange={handleCommitRelation} id="standard-read-only-input" label="Supplier's Phone" defaultValue={prop.supplierPhone} variant="standard"/>
    </FormControl>
  )
}

export default SupplierPhone