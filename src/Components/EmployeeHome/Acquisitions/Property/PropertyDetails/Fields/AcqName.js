import { TextField, FormControl } from "@mui/material";
import { API } from 'aws-amplify';

const AcqName = ({ prop, setOpenUpdate }) => {
      // Props API
      const apiName = 'valproperties';
      const path = `/properties/${prop.id}/acqname`;
      // 

    const handleName = (e) => {
        API.put(apiName, path, {
            body: {
                id: prop.id,
                acqName: e.target.value
            }
          })
          .then(() => {
            setOpenUpdate(true)
          })
    };

  return (
    <FormControl style={{ width: '100%' }}>
        <TextField InputProps={{ disableUnderline: true }} onChange={handleName} id="standard-read-only-input" defaultValue={prop.acqName} variant="standard"/>
    </FormControl>
  )
}

export default AcqName