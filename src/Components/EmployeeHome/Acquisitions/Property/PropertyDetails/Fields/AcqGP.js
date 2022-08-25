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
    <FormControl style={{ width: '100%' }}>
    <TextField id="standard-read-only-input" label="Acq Projected GP" value={prop.acqGP} InputProps={{readOnly: true, disableUnderline: true }} variant="standard"/>
    {prop.dealSplit == '100' && acqGPFifty > 0 && (
        <TextField id="standard-read-only-input" label="Acq Projected GP" value={grossProfit} InputProps={{readOnly: true, disableUnderline: true }} variant="standard"/>
    ) 
    }
    {prop.dealSplit == '50/50' && acqGPFifty > 0 && (
        <TextField id="standard-read-only-input" label="Acq Projected GP" value={acqGPFifty} InputProps={{readOnly: true, disableUnderline: true }} variant="standard"/>
    ) 
    }
    {prop.dealSplit == 'Other' && (
        <TextField onChange={handleAcqGP} id="standard-read-only-input" InputProps={{ disableUnderline: true }} label="Acq Projected GP" defaultValue={prop.acqGP} variant="standard"/>
    ) 
    }
    </FormControl>
  )
}

export default AcqGP