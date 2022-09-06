import { TextField, FormControl } from "@mui/material";
import { API } from 'aws-amplify';

const YearBuild = ({ prop, setOpenUpdate }) => {
      // Props API
      const apiName = 'valproperties';
      const path = `/properties/${prop.id}/year`;
      // 

    const handleBeds = (e) => {
        API.put(apiName, path, {
            body: {
                id: prop.id,
                year: e.target.value
            }
          })
          .then(() => {
            setOpenUpdate(true)
          })
    };

  return (
    <FormControl style={{ width: '100%' }}>
        <TextField InputProps={{ disableUnderline: true }} onChange={handleBeds} id="standard-read-only-input" defaultValue={prop.year} variant="standard"/>
    </FormControl>
  )
}

export default YearBuild