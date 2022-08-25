import { TextField, FormControl } from "@mui/material";
import { API } from 'aws-amplify';

const PictureLink = ({ prop, setOpenUpdate }) => {
      // Props API
      const apiName = 'valproperties';
      const path = `/properties/${prop.id}/picturelink`;
      // 

    const handlePictureLink = (e) => {
        API.put(apiName, path, {
            body: {
                id: prop.id,
                pictureLink: e.target.value
            }
          })
          .then(() => {
            setOpenUpdate(true)
          })
    };

  return (
    <FormControl sx={{ width: '100%', mb: 2 }}>
        <TextField onChange={handlePictureLink} id="standard-read-only-input" label="Link to Photos" defaultValue={prop.pictureLink} variant="outlined"/>
    </FormControl>
  )
}

export default PictureLink