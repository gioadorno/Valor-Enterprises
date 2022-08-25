import { FormControl, Divider, TextField } from "@mui/material";

const AcqFinalCost = ({ prop, acqFinalNumber }) => {

    return (
      <FormControl style={{ width: '100%' }}>
       <TextField style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', }} InputProps={{ readOnly: true, disableUnderline: true }} label='Acq Final Cost' variant="standard"  value={acqFinalNumber}  />
    </FormControl>
    )
}

export default AcqFinalCost