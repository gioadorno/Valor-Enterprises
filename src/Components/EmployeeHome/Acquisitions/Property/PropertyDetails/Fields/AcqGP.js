import { TextField, FormControl } from "@mui/material";
import { updateProp } from "../../../../../../actions/properties";

const AcqGP = ({ prop, acqGPFifty, grossProfit, id, dispatch }) => {
    const handleAcqGP = async (e) => {
        dispatch(updateProp(id, { acqGP: e.target.value}));
    };

  return (
    <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
    <TextField id="standard-read-only-input" label="Acq Projected GP" value={prop.acqGP} InputProps={{readOnly: true,}} variant="outlined"/>
    {prop.dealSplit == '100' && acqGPFifty > 0 && (
        <TextField id="standard-read-only-input" label="Acq Projected GP" value={grossProfit} InputProps={{readOnly: true,}} variant="outlined"/>
    ) 
    }
    {prop.dealSplit == '50/50' && acqGPFifty > 0 && (
        <TextField id="standard-read-only-input" label="Acq Projected GP" value={acqGPFifty} InputProps={{readOnly: true,}} variant="outlined"/>
    ) 
    }
    {prop.dealSplit == 'Other' && (
        <TextField onChange={handleAcqGP} id="standard-read-only-input" label="Acq Projected GP" value={prop.acqGP} variant="outlined"/>
    ) 
    }
    </FormControl>
  )
}

export default AcqGP