import { FormControl, Divider, TextField } from "@mui/material";

const COE = ({ prop }) => {
  return (
    <FormControl style={{ width: '100%' }}>
    <TextField style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} InputProps={{ readOnly: true, disableUnderline: true }} label='Estimated COE Date' variant="standard" rows={3} value={prop.coe}  />
 </FormControl>
  )
}

export default COE