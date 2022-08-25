import { FormControl, TextField } from "@mui/material";

const DispoFinal = ({ dispoFinal }) => {

    return (
      <FormControl style={{ width: '100%' }}>
       <TextField style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} InputProps={{ readOnly: true, disableUnderline: true }} label='Dispo Final Price' variant="standard" value={dispoFinal}  />
    </FormControl>
    )
}

export default DispoFinal