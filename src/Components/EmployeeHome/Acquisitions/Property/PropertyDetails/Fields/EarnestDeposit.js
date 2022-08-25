import { FormControl, InputLabel, MenuItem, Select, Divider } from "@mui/material";
import { API } from 'aws-amplify';


const EarnestDeposit = ({ prop, setOpenUpdate, earnestStatus, employee }) => {
        // Props API
        const apiName = 'valproperties';
        const path = `/properties/${prop.id}/statusearnest`;
        // 

    const handleStatusEarnest = (e) => {
        API.put(apiName, path, {
            body: {
                id: prop.id,
                statusEarnest: e.target.value
            }
            })
            .then(() => {
            setOpenUpdate(true)
            })
    };

  return (
    employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Admin') >= 0 || employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Operations') >= 0 ? (
        <FormControl sx={{ width: '100%' }} variant='standard'>
            <InputLabel variant='standard'>Status of Our Earnest Deposit</InputLabel>
            <Select labelId="Status of Our Earnest Deposit" defaultValue={prop.statusEarnest} onChange={handleStatusEarnest}>
            <MenuItem value={earnestStatus.notRequired}>
                {earnestStatus.notRequired}
            </MenuItem>
            <MenuItem value={earnestStatus.earnestRequired}>
                {earnestStatus.earnestRequired}
            </MenuItem>
            <MenuItem value={earnestStatus.earnestOrdered}>
                {earnestStatus.earnestOrdered}
            </MenuItem>
            <MenuItem value={earnestStatus.earnestDeposited}>
                {earnestStatus.earnestDeposited}
            </MenuItem>
            <MenuItem value={earnestStatus.comingBack}>
                {earnestStatus.comingBack}
            </MenuItem>
            <MenuItem value={earnestStatus.returned}>
                {earnestStatus.returned}
            </MenuItem>
            <MenuItem value={earnestStatus.seized}>
                {earnestStatus.seized}
            </MenuItem>
            </Select>
        </FormControl>
        ) :
        <FormControl sx={{ width: '100%', mb: 2 }} variant='standard'>
        <InputLabel variant='standard'>Status of Our Earnest Deposit</InputLabel>
        <Select disabled defaultValue={prop.statusEarnest} />
        </FormControl>
  )
};

EarnestDeposit.defaultProps = {
    earnestStatus: {
        notRequired: 'Not Required',
        earnestRequired: 'Earnest Required',
        earnestOrdered: 'Earnest Deposit Ordered',
        earnestDeposited: 'Earnest Deposited',
        comingBack: 'Coming Back',
        returned: 'Returned',
        seized: 'Seized'
    },
}

export default EarnestDeposit