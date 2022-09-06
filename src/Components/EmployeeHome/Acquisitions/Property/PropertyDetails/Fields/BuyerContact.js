import { API } from 'aws-amplify';
import { TextField, FormControl } from '@mui/material';
import { Autocomplete } from '@mui/material';
import { useEffect, useState } from "react";

const BuyerContact = ({ prop, setOpenUpdate, employee }) => {
    const [ dispoProps, setDispoProps ] = useState([])
        // Props API
        const apiName = 'valproperties';
        const path = `/properties/${prop.id}/buyercontact`;
        // 

        // Dispo API
        const dispoAPI = 'valproperties';
        const dispoPath = `/dispo`;
        // 

          useEffect(() => {
            API.get(dispoAPI, dispoPath)
            .then(res => setDispoProps(res.Items))
        },[])

    // Removes Duplicates of Dispo Names
    const signerNameList = dispoProps?.filter((value, index, self) => 
    index === self.findIndex((t) => (
        t.signersName === value.signersName
    ))
    );

    // const buyerContact = signerNameList.map(dispo => prop.signersName == dispo.signersName && dispo.buyersPhone )
    // const phoneNumber = new Set(buyerContact);
    // const number = [...phoneNumber][1]


  return (
    employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Admin') >= 0 || employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Operations') >= 0  ? 
    <FormControl style={{ width: '100%' }}>
        <Autocomplete defaultValue={prop.signersName} freeSolo={true} style={{ width: '100%' }} id="combo-box" options={signerNameList?.map((prop) => prop.signersName)} renderInput={(params) => <TextField InputProps={{ disableUnderline: true }} variant='standard' {...params} label="Buyer Contact"  />} onInputChange={(e, value) => {
             API.put(apiName, path, {
                body: {
                    id: prop.id,
                    signersName: value
                }
            })
            .then(() => {
              setOpenUpdate(true)
            })
        }} />
    </FormControl>
    :
        <FormControl style={{ width: '100%' }}>
            <TextField variant='standard' label='Buyer Contact' InputProps={{
            readOnly: true,
            disableUnderline: true
        }} value={prop.signersName} />
        </FormControl>
  )
}

export default BuyerContact