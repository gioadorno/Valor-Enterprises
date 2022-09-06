import { useState, useEffect } from 'react';
import { TextField, FormControl } from "@mui/material";
import { Autocomplete } from '@mui/material';
import { API } from 'aws-amplify';

const TitleCompany = ({ prop, setOpenUpdate, employee }) => {
 // Props API
 const apiName = 'valproperties';
 const path = `/properties/${prop.id}/titlecompany`;
 // 

 const [ props, setProps ] = useState([]);

useEffect(() => {
   API.get(apiName, '/properties')
   .then(res => setProps(res.Items))
},[])


       // Removes Duplicates of Escrow Officers
       const titleCompany = props?.filter((value, index, self) => 
       index === self.findIndex((t) => (
           t.titleCompany === value.titleCompany
       ))
       );

       const title = titleCompany?.map(prop => prop.titleCompany != undefined ? prop.titleCompany : '');


return (
employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Admin') >= 0 || employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Operations') >= 0 ? 
<FormControl style={{ width: '100%' }}>
<Autocomplete defaultValue={prop.titleCompany} freeSolo={true} style={{ width: '100%' }} options={title} renderInput={(params) => <TextField InputProps={{ disableUnderline: true }} variant='standard' {...params} label="Title Company"  />} onInputChange={(e, value) => {
   API.put(apiName, path, {
   body: {
       id: prop.id,
       titleCompany: value
   }
})
.then(() => {
   setOpenUpdate(true)
})
   }} />
</FormControl>
:
   <FormControl style={{ width: '100%' }}>
       <TextField id='standard-search' label='Title Company' variant='standard' InputProps={{
       readOnly: true,
       disableUnderline: true
   }} value={prop.titleCompany} />
   </FormControl>
)
}

export default TitleCompany