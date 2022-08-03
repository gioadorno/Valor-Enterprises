import { FormControl, Divider, TextField } from "@mui/material";

const Supplier = ({ prop }) => {
  const supplier = [prop.supplierName, prop.supplierPhone, prop.supplierEmail]
  return (
    <FormControl style={{ width: '100%', marginBottom: '1em' }}>
     <TextField style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} InputProps={{ readOnly: true }} label='Supplier' variant="outlined" rows={3} value={supplier}  />
  </FormControl>
  )
}

export default Supplier