import { TextField, FormControl, Divider } from "@mui/material";

const Split = ({ prop }) => {
  return (
    <FormControl style={{ width: '100%' }}>
    <TextField label="Split" value={prop.dealSplit} InputProps={{readOnly: true, disableUnderline: true }} variant="standard"/>
    </FormControl>
  )
}

export default Split