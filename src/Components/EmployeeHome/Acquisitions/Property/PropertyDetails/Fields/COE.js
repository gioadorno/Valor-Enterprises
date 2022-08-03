import { FormControl, Divider, TextField } from "@mui/material";

const COE = ({ prop }) => {
  return (
    <FormControl style={{ width: '100%', marginBottom: '1em', marginTop: '1em' }}>
    <TextField style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} InputProps={{ readOnly: true }} label='Estimated COE Date' variant="outlined" rows={3} value={prop.coe}  />
 </FormControl>
  )
}

export default COE