import { TextField, FormControl } from "@mui/material";

const Access = ({ prop }) => {
  return (
    <FormControl style={{ width: '100%', marginBottom: '1em', fontSize: '1.5em' }}>
            <TextField style={{ fontSize: '1.5em' }} InputProps={{ readOnly: true }} id='standard-search' label='Type of Access' variant='outlined' value={prop.typeAccess} />
    </FormControl>
  )
}

export default Access