import { Box, Grid, Paper, Typography, TextField } from "@mui/material";
import React, { useContext, useState, useEffect } from 'react';
import { AccountContext } from "../../../Login/Account";
import { useParams, useNavigate } from "react-router-dom";
import OuterBar from '../../OuterBar';
import MobileNav from "../../MobileNav";
import { API } from "aws-amplify";


const DealText = () => {
    const { id } = useParams();
          // API
          const apiName = 'valproperties';
          const path = '/inventory/:id';
          const init = {
              queryStringParameters: {
                  id: id
              }
          };
          // 
    const { getSession } = useContext(AccountContext);
    const [ prop, setProp ] = useState('');

    useEffect(() => {
        API.get(apiName, path, init)
        .then(res => res.Items.map(prop => prop.id === id && setProp(prop)))
    },[prop])

    const [extraLine, setExtraLine] = useState(null);

    useEffect(() => {
        getSession();
      },[]);

      console.log(prop)

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', height: '100%' }}>
        <OuterBar />
            <Grid sx={{ width: '100%', height: '100%', bgcolor: 'white', p: 2, m: 'auto', mt: {sm: 10}, ml: { xs: 2, sm: 0 }, pb: { xs: 10 } }} spacing={1} container maxWidth='2xl'>
                <Grid sx={{ boxShadow: 5, borderRadius: '2em', height: { xs: 300 , sm: 400}, width: '100%', alignItems: 'center', justifyContent: 'center', display: 'flex', alignItems: 'center', mb: { xs: 5, sm: 0 } }} item xs={12} md={3}>
                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', flexDirection: 'column', py: 5, px: 2 }}>
                        <TextField value={extraLine} onChange={e => setExtraLine(e.target.value)} variant="standard" sx={{ width: '90%' }} label='Add line to Deal Text' />
                    </Box>
                </Grid>
                <Grid sx={{ boxShadow: 5, borderRadius: '2em', height: '80%', display: 'flex', alignItems: 'center', justifyContent: 'center', ml: 'auto', mr: 'auto', p: {sm: 10} }} item xs={12} md={8}>
                    <Box sx={{ bgcolor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: '2em', width: '100%', height: '100%' }}>
                    <Typography sx={{ mb: 6 }} variant='h3'>Deal Text</Typography>
                        <Typography sx={{ textAlign: 'center',  wordWrap: 'normal'}} variant='h6'>{prop?.address?.replace(', USA', '')}</Typography>
                        <Typography variant='h6'>{`${prop?.beds} Beds`} / {Number(prop?.baths) > 1 ? `${prop?.baths} Baths` : `${prop?.baths} Bath`} {prop?.parking != '' && 'No Parking' ? ` / ${prop?.parking}` : null}</Typography>
                        <Typography variant='h6'>{`${prop?.livingArea}sf Living Area`}</Typography>
                        <Typography variant='h6'>{`${prop?.lotSize}sf Living Area`}</Typography>
                        <Typography variant='h6'>{`${prop?.year} Year Build`}</Typography>
                        {extraLine != null && (
                            <Typography variant='h6'>{extraLine}</Typography>
                        )}
                        {prop?.pictureLink != '' && (
                            <>
                            <br/>
                            <Typography variant='h6'>Link To Pics:</Typography>
                            <Typography sx={{ textAlign: 'center',  wordWrap: 'normal', color: '#0089ff', textDecoration: 'underline'}}>{prop?.pictureLink}</Typography>
                            </>
                        )}
                        <br/>
                        <Typography variant='h6'>{`Wholesale Price: ${prop?.salePrice}`}</Typography>
                        {prop?.arv != '' && (
                            <Typography variant='h6'>{`After Repair Value: ${prop?.arv}`}</Typography>
                        )}
                    </Box>
                </Grid>
            </Grid>
        <MobileNav />
    </Box>
  )
}

export default DealText