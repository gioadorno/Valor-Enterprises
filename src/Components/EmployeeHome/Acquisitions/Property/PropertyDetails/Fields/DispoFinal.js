import { FormControl, TextField } from "@mui/material";

const DispoFinal = ({ dispoFinal }) => {

    return (
      <FormControl style={{ width: '100%', marginBottom: '1em' }}>
       <TextField style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} InputProps={{ readOnly: true }} label='Dispo Final Price' variant="outlined" rows={3} value={dispoFinal}  />
    </FormControl>
    )
}

export default DispoFinal