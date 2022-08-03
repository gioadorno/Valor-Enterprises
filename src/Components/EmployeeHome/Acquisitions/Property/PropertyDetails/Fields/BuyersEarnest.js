import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { API } from 'aws-amplify';

const BuyersEarnest = ({ prop, setOpenUpdate, employee }) => {
      // Props API
      const apiName = 'valproperties';
      const path = `/properties/${prop.id}/buyersearnest`;
      // 

    const handleBuyersEarnest = async (e) => {
        API.put(apiName, path, {
            body: {
                id: prop.id,
                buyersEarnest: e.target.value
            }
          })
          .then(() => {
            setOpenUpdate(true)
          })
    };

  return (
    employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Admin') >= 0 || employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Operations') >= 0 ? (
        <ToggleButtonGroup color='error' exclusive onChange={handleBuyersEarnest} size='small' fullWidth value={prop.buyersEarnest} sx={{ pb: 3, alignItems: 'center' }}>
            <ToggleButton sx={{ height: '100%' }} value='Needed'>
            Needed
            </ToggleButton>
            <ToggleButton sx={{ height: '100%' }} value='Deposited'>
            Deposited
            </ToggleButton>
            <ToggleButton sx={{ height: '100%' }} value='In Dispute'>
            In Dispute
            </ToggleButton>
            <ToggleButton sx={{ height: '100%' }} value='Released'>
            Released
            </ToggleButton>
            <ToggleButton sx={{ height: '100%' }} value='Seized'>
            Seized
            </ToggleButton>
            <ToggleButton sx={{ height: '100%' }} value='Not Required'>
            Not Required
            </ToggleButton>
        </ToggleButtonGroup>
        ) :
        <ToggleButtonGroup color='error' disabled exclusive fullWidth value={prop.buyersEarnest} sx={{ pb: 3 }} variant='outlined'>
            <ToggleButton sx={{ height: '100%' }} value='Needed'>
            Needed
            </ToggleButton>
            <ToggleButton sx={{ height: '100%' }} value='Deposited'>
            Deposited
            </ToggleButton>
            <ToggleButton sx={{ height: '100%' }} value='In Dispute'>
            In Dispute
            </ToggleButton>
            <ToggleButton sx={{ height: '100%' }} value='Released'>
            Released
            </ToggleButton>
            <ToggleButton sx={{ height: '100%' }} value='Seized'>
            Seized
            </ToggleButton>
            <ToggleButton sx={{ height: '100%' }} value='Not Required'>
            Not Required
            </ToggleButton>
        </ToggleButtonGroup>
  )
}

export default BuyersEarnest