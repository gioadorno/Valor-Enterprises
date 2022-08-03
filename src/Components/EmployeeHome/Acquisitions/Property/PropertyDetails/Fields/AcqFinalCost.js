import { FormControl, Divider, TextField } from "@mui/material";

const AcqFinalCost = ({ prop, acqFinalNumber }) => {

    return (
      <FormControl style={{ width: '100%', marginBottom: '1em' }}>
       <TextField style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', }} InputProps={{ readOnly: true }} label='Acq Final Cost' variant="outlined" rows={3} value={acqFinalNumber}  />
    </FormControl>
    )
}

export default AcqFinalCost