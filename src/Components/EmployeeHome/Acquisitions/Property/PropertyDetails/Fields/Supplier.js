import { FormControl, Divider, TextField, FormLabel } from "@mui/material";

const Supplier = ({ prop }) => {
  return (
    <FormControl style={{ width: '100%', marginBottom: '1em' }}>
      <FormLabel>Supplier</FormLabel>
     <TextField style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} InputProps={{ readOnly: true }} label='Supplier' variant="outlined" rows={3} value={prop.supplierName}  />
     <TextField style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} InputProps={{ readOnly: true }} label='Supplier Phone' variant="outlined" rows={3} value={prop.supplierPhone}  />
     <TextField style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} InputProps={{ readOnly: true }} label='supplier Email' variant="outlined" rows={3} value={prop.supplierEmail}  />
  </FormControl>
  )
}

export default Supplier