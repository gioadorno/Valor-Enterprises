import { TextField, FormControl } from "@mui/material";
import { API } from 'aws-amplify';

const Supplier = ({ prop, setOpenUpdate }) => {
      // Props API
      const apiName = 'valproperties';
      const path = `/properties/${prop.id}/suppliername`;
      // 

    const handleCommitRelation = (e) => {
        API.put(apiName, path, {
            body: {
                id: prop.id,
                supplierName: e.target.value
            }
          })
          .then(() => {
            setOpenUpdate(true)
          })
    };

  return (
    <FormControl style={{ width: '100%' }}>
        <TextField InputProps={{ disableUnderline: true }} onChange={handleCommitRelation} id="standard-read-only-input" label="Supplier" defaultValue={prop.supplierName} variant="standard"/>
    </FormControl>
  )
}

export default Supplier