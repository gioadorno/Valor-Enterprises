import { TextField, FormControl, Divider } from "@mui/material";

const Company = () => {
  return (
    <FormControl style={{ width: '100%' }}>
    <TextField id="standard-read-only-input" label="Company" defaultValue="Valor Enterprises" InputProps={{ readOnly: true, disableUnderline: true}} variant="standard"/>
    </FormControl>
  )
}

export default Company