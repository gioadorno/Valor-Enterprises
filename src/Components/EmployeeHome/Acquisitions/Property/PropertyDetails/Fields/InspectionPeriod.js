import { TextField, FormControl } from "@mui/material";
import { API } from 'aws-amplify';


const InspectionPeriod = ({ prop, id, setOpenUpdate, employee }) => {
        // Props API
        const apiName = 'valproperties';
        const path = `/properties/${prop.id}/inspectionperiod`;
        // 
    const handleInspectionPeriod = (e) => {
        API.put(apiName, path, {
            body: {
                id: prop.id,
                inspectionPeriod: e.target.value
            }
            })
            .then(() => {
            setOpenUpdate(true)
            })
    };

  return (
    employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Admin') >= 0 || employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Operations') >= 0 ? 
    <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
        <TextField label='Inspection Period' variant='outlined' defaultValue={prop.inspectionPeriod} onChange={handleInspectionPeriod} />
    </FormControl>
    :
        <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
            <TextField label='Inspection Period' variant='outlined' InputProps={{
            readOnly: true,
        }} value={prop.inspectionPeriod} />
        </FormControl>
  )
}

export default InspectionPeriod