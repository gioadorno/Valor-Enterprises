import { TextField, FormControl } from "@mui/material";
import { API } from 'aws-amplify';

const FileNotes = ({ prop, setOpenUpdate, employee }) => {
      // Props API
      const apiName = 'valproperties';
      const path = `/properties/${prop.id}/filenotes`;
      // 

    const handleFileNotes = (e) => {
    API.put(apiName, path, {
        body: {
            id: prop.id,
            fileNotes: e.target.value
        }
        })
        .then(() => {
        setOpenUpdate(true)
        })
    };

  return (
    employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Admin') >= 0 || employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Operations') >= 0 ? 
        <FormControl style={{ width: '100%' }}>
            <TextField InputProps={{ disableUnderline: true }} id='standard-search' label='File Notes' variant='standard' defaultValue={prop.fileNotes} onChange={handleFileNotes} />
        </FormControl>
        :
            <FormControl style={{ width: '100%' }}>
                <TextField id='standard-search' label='File Notes' variant='standard' InputProps={{
                readOnly: true, disableUnderline: true
            }} value={prop.fileNotes} />
            </FormControl>
  )
}

export default FileNotes