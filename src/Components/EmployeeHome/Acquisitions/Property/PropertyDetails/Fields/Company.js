import { TextField, FormControl, Divider } from "@mui/material";

const Company = () => {
  return (
    <FormControl style={{ width: '100%', marginBottom: '.75em', marginTop: '1em', borderColor: '#0000009e' }}>
    <TextField sx={{ borderColor: '#0000009e' }} id="standard-read-only-input" label="Company" defaultValue="KeygleeDispo" InputProps={{ readOnly: true,}} variant="outlined"/>
    </FormControl>
  )
}

export default Company