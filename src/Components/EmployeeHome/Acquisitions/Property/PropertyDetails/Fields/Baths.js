import { TextField, FormControl } from "@mui/material";
import { API } from 'aws-amplify';

const Baths = ({ prop, setOpenUpdate }) => {
      // Props API
      const apiName = 'valproperties';
      const path = `/properties/${prop.id}/baths`;
      // 

    const handleBaths = (e) => {
        API.put(apiName, path, {
            body: {
                id: prop.id,
                baths: e.target.value
            }
          })
          .then(() => {
            setOpenUpdate(true)
          })
    };

  return (
    <FormControl style={{ width: '100%' }}>
        <TextField InputProps={{ disableUnderline: true }} onChange={handleBaths} id="standard-read-only-input" defaultValue={prop.baths} variant="standard"/>
    </FormControl>
  )
}

export default Baths