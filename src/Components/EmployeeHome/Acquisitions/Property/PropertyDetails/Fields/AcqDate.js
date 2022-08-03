import { TextField, FormControl, Divider, FormLabel } from "@mui/material";
import { Fragment } from "react";

const AcqDate = ({ prop }) => {
  return (
    <FormControl sx={{ width: '100%', mb: 2 }}>
      <FormLabel sx={{ fontSize: '.75em', pl: 1 }}>Acquisitions Date</FormLabel>
            <TextField sx={{ width: "100%" }} variant='outlined' value={new Date(prop.date).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })} />
    </FormControl>
  )
}

export default AcqDate