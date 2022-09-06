import { TextField, FormControl } from "@mui/material";
import { API } from 'aws-amplify';

const Beds = ({ prop, setOpenUpdate }) => {
      // Props API
      const apiName = 'valproperties';
      const path = `/properties/${prop.id}/beds`;
      // 

    const handleBeds = (e) => {
        API.put(apiName, path, {
            body: {
                id: prop.id,
                beds: e.target.value
            }
          })
          .then(() => {
            setOpenUpdate(true)
          })
    };

  return (
    <FormControl style={{ width: '100%' }}>
        <TextField InputProps={{ disableUnderline: true }} onChange={handleBeds} id="standard-read-only-input" defaultValue={prop.beds} variant="standard"/>
    </FormControl>
  )
}

export default Beds