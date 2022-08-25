import { TextField, FormControl } from "@mui/material";
import { API } from 'aws-amplify';

const PostPossession = ({ prop, id, setOpenUpdate, employee }) => {
        // Props API
        const apiName = 'valproperties';
        const path = `/properties/${prop.id}/postpossession`;
        // 
    const handlePostPossession = (e) => {
        API.put(apiName, path, {
            body: {
                id: prop.id,
                postPossession: e.target.value
            }
            })
            .then(() => {
            setOpenUpdate(true)
            })
    };

  return (
    employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Admin') >= 0 || employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Operations') >= 0 ? 
    <FormControl style={{ width: '100%' }}>
        <TextField label='Lease/Post Possession Terms' focused variant='standard' InputProps={{ disableUnderline: true }} defaultValue={prop.postPossession} onChange={handlePostPossession} />
    </FormControl>
    :
        <FormControl style={{ width: '100%' }}>
            <TextField label='Lease/Post Possession Terms' variant='standard' InputProps={{
            readOnly: true,
            disableUnderline: true
        }} value={prop.postPossession} />
        </FormControl>
  )
}

export default PostPossession