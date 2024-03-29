import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { API } from 'aws-amplify';


const FileType = ({ prop, setOpenUpdate, employee }) => {
        // Props API
        const apiName = 'valproperties';
        const path = `/properties/${prop.id}/filetype`;
        // 
    const handleFileType = (e) => {
        API.put(apiName, path, {
            body: {
                id: prop.id,
                fileType: e.target.value
            }
            })
            .then(() => {
            setOpenUpdate(true)
            })
    };

  return (
    employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Admin') >= 0 || employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Operations') >= 0 ? (
        <FormControl sx={{ width: '100%' }} variant='standard'>
            <InputLabel>File Type</InputLabel>
            <Select InputProps={{ disableUnderline: true }} label='File Type'  defaultValue={prop.fileType === '' ? '' : prop.fileType} onChange={handleFileType} >
                <MenuItem value='Directly Under Contract Traditional Wholesale'>Directly Under Contract Traditional Wholesale</MenuItem>
                <MenuItem value='Exclusive Option Traditional Wholesale'>Exclusive Option Traditional Wholesale</MenuItem>
                <MenuItem value='Directly Under Contract Traditional Wholesale'>Directly Under Contract Traditional Wholesale</MenuItem>
                <MenuItem value='Non-Exclusive Option Traditional Wholesale'>Non-Exclusive Option Traditional Wholesale</MenuItem>
            </Select>
        </FormControl>
        ) :
        <FormControl sx={{ width: '100%' }} variant='standard'>
        <Select InputProps={{ disableUnderline: true }} label='File Type' disabled defaultValue={prop.fileType} />
        </FormControl>
        
  )
}

export default FileType