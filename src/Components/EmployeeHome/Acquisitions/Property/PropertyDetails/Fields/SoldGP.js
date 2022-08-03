import { TextField, FormControl } from "@mui/material";
import { API } from 'aws-amplify';

const SoldGP = ({ prop, id, setOpenUpdate, employee }) => {
        // Props API
        const apiName = 'valproperties';
        const path = `/properties/${prop.id}/soldgp`;
        // 
    const handleSoldGP = (e) => {
      API.put(apiName, path, {
        body: {
            id: prop.id,
            soldGP: e.target.value
        }
        })
        .then(() => {
        setOpenUpdate(true)
        })
    };

  return (
    employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Admin') >= 0 || employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Operations') >= 0 ?
    <FormControl size="medium" style={{ width: '100%', marginBottom: '.75em' }}>
        <TextField onChange={handleSoldGP} id="standard-read-only-input" label="Sold GP" defaultValue={prop.soldGP} variant="outlined"/>
    </FormControl>
    :
    <FormControl size="medium" sx={{ width: '100%', mb: 2 }} >
    <TextField color='primary' id="standard-read-only-input" label="Sold GP" InputProps={{readOnly: true, style: { borderColor: '#0082a9b0 !important' }}} value={prop.soldGP} variant="outlined"/>
</FormControl>
  )
}

export default SoldGP