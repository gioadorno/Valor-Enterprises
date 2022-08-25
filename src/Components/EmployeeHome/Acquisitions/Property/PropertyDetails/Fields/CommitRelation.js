import { TextField, FormControl } from "@mui/material";
import { API } from 'aws-amplify';

const CommitRelation = ({ prop, setOpenUpdate }) => {
      // Props API
      const apiName = 'valproperties';
      const path = `/properties/${prop.id}/commitrelation`;
      // 

    const handleCommitRelation = (e) => {
        API.put(apiName, path, {
            body: {
                id: prop.id,
                commitRelation: e.target.value
            }
          })
          .then(() => {
            setOpenUpdate(true)
          })
    };

  return (
    <FormControl style={{ width: '100%' }}>
        <TextField InputProps={{ disableUnderline: true }} onChange={handleCommitRelation} id="standard-read-only-input" label="Commitments & Purchases Relationship" defaultValue={prop.commitRelation} variant="standard"/>
    </FormControl>
  )
}

export default CommitRelation