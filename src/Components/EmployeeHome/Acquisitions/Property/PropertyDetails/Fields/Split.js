import { TextField, FormControl, Divider } from "@mui/material";

const Split = ({ prop }) => {
  return (
    <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
    <TextField label="Split" value={prop.dealSplit} InputProps={{readOnly: true,}} variant="outlined"/>
    </FormControl>
  )
}

export default Split