import { TextField, FormControl } from "@mui/material";
import { API } from 'aws-amplify';

const AcqGP = ({ prop, acqGPFifty, grossProfit, setOpenUpdate }) => {
          // API
          const apiName = 'valproperties';
          const path = `/properties/${prop.id}/acqgp`;
          // 
    const handleAcqGP = async (e) => {
        API.put(apiName, path, {
            body: {
                id: prop.id,
                acqGP: e.target.value
            }
        })
        .then(() => {
          setOpenUpdate(true)
        })
    };

  return (
    <FormControl style={{ width: '100%'  }}>
        <TextField onChange={handleAcqGP} id="standard-read-only-input" InputProps={{ disableUnderline: true }} label="Acq Projected GP" defaultValue={prop.acqGP} variant="standard"/>
    </FormControl>
  )
}

export default AcqGP