import { TextField, FormControl, Divider } from "@mui/material";

const CompletionDate = ({ prop }) => {
  return (
    <FormControl style={{ width: '100%' }}>
    <TextField id="standard-read-only-input" label="Date of Completion" value={prop.completionDate} InputProps={{readOnly: true, disableUnderline: true }} variant="standard"/>
    </FormControl>
  )
}

export default CompletionDate