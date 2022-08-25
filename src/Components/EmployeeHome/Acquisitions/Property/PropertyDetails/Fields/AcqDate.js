import { TextField, FormControl, Divider, FormLabel } from "@mui/material";
import { Fragment } from "react";

const AcqDate = ({ prop }) => {
  return (
    <FormControl sx={{ width: '100%' }}>
      <FormLabel >Acquisitions Date</FormLabel>
            <TextField InputProps={{ disableUnderline: true }} sx={{ width: "100%" }} variant='standard' value={new Date(prop.date).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })} />
    </FormControl>
  )
}

export default AcqDate