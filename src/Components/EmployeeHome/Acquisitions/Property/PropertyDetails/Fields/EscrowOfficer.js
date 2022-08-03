import { TextField, FormControl } from "@mui/material";
import { API } from 'aws-amplify';

const EscrowOfficer = ({ prop, setOpenUpdate, employee }) => {
      // Props API
      const apiName = 'valproperties';
      const path = `/properties/${prop.id}/escrowofficer`;
      // 

    const handleEscrowOfficer = async (e) => {
        API.put(apiName, path, {
            body: {
                id: prop.id,
                escrowOfficer: e.target.value
            }
            })
            .then(() => {
            setOpenUpdate(true)
            })
    }

  return (
    employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Admin') >= 0 || employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Operations') >= 0 ? 
    <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
        <TextField id='standard-search' label='Escrow Officer' variant='outlined' defaultValue={prop.escrowOfficer} onChange={handleEscrowOfficer}/>
    </FormControl>
    :
        <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
            <TextField id='standard-search' label='Escrow Officer' variant='outlined' InputProps={{
            readOnly: true,
        }} value={prop.escrowOfficer} />
        </FormControl>
  )
}

export default EscrowOfficer