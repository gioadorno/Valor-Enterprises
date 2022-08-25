import { TextField, FormControl } from "@mui/material";

const Access = ({ prop }) => {
  return (
    <FormControl style={{ width: '100%' }}>
            <TextField style={{ fontSize: '1.5em' }} InputProps={{ readOnly: true, disableUnderline: true }} id='standard-search' label='Type of Access' variant='standard' value={prop.typeAccess} />
    </FormControl>
  )
}

export default Access