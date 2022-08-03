import { TextField, FormControl, Divider } from "@mui/material";

const CompletionDate = ({ prop }) => {
  return (
    <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
    <TextField id="standard-read-only-input" label="Date of Completion" value={prop.completionDate} InputProps={{readOnly: true,}} variant="outlined"/>
    </FormControl>
  )
}

export default CompletionDate