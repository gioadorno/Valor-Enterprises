import { Box, Grid, Paper, Typography, TextField, IconButton, Snackbar, Button } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import React, { useContext, useState, useEffect, Fragment } from 'react';
import { AccountContext } from "../../../Login/Account";
import { useParams, useNavigate } from "react-router-dom";
import OuterBar from '../../OuterBar';
import MobileNav from "../../MobileNav";
import { API } from "aws-amplify";
import {CopyToClipboard} from 'react-copy-to-clipboard';



const DealText = () => {
    const { id } = useParams();
    const [ copy, setCopy ] = useState({
        value: '',
        copied: false
    })

    
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
        .then(res => res.Items?.map(prop => prop.id === id && setProp(prop)))
    },[])
    
    const [extraLine, setExtraLine] = useState('');
    
    
    useEffect(() => {
        setCopy({ ...copy, value: `
${prop?.address?.replace(', USA', '')}
${prop?.beds} Beds / ${prop?.baths} Baths ${prop?.parking != '' && 'No Parking' ? ` / ${prop?.parking}` : null}
${prop?.livingArea}sf Living Area
${prop?.lotSize?.includes('.') ? `${prop?.lotSize}acres Lot Size` : `${prop?.lotSize}sqft Lot Size`}
${prop?.year} Year Build
${extraLine != '' ? extraLine : ''}

Link To Pics:
${prop?.pictureLink}

Wholesale Price: ${prop?.salePrice}
After Repair Value: ${prop?.arv != '' ? prop.arv : ''}
        ` })
    },[prop, extraLine])
    useEffect(() => {
        getSession();
      },[]);


      const closeSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setCopy({ ...copy, copied: false });
    };

    const copyAction = (
        <Fragment>
            <Button color="error" size="large" onClick={closeSnackBar}>
            Close
            </Button>
            <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={closeSnackBar}
            >
            <CloseIcon fontSize="small" />
            </IconButton>
        </Fragment>
        );


  return (
    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', height: '100%' }}>
        <OuterBar />
        <Snackbar open={copy.copied} autoHideDuration={2500} onClose={closeSnackBar} message='Deal text has been copied' action={copyAction} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} />
            <Grid sx={{ width: '100%', height: '100%', bgcolor: 'white', p: 2, m: 'auto', mt: {sm: 10}, ml: { xs: 2, sm: 0 }, pb: { xs: 10 } }} spacing={1} container maxWidth='2xl'>
            {prop.propStatus === 'In Progress' ? 
            <div className='bg-white w-full h-full flex items-center justify-center'>
                <p className='text-3xl text-center'>Deal text is unavailable while property is in status of "In Progress"</p>
            </div>
                :
                <Grid sx={{ boxShadow: 5, borderRadius: '2em', height: '80%', display: 'flex', alignItems: 'center', justifyContent: 'center', ml: 'auto', mr: 'auto', p: {sm: 10} }} item xs={12}>
                    <Box sx={{ bgcolor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: '2em', width: '100%', height: '100%' }}>
                    <Typography sx={{ mb: 6 }} variant='h3'>Deal Text</Typography>
                        <Typography sx={{ textAlign: 'center',  wordWrap: 'normal'}} variant='h6'>{prop?.address?.replace(', USA', '')}</Typography>
                        <Typography variant='h6'>{`${prop?.beds} Beds`} / {Number(prop?.baths) > 1 ? `${prop?.baths} Baths` : `${prop?.baths} Bath`} {prop?.parking != '' && 'No Parking' ? ` / ${prop?.parking}` : ''}</Typography>
                        <Typography variant='h6'>{`${prop?.livingArea}sf Living Area`}</Typography>
                        <Typography variant='h6'>{prop?.lotSize?.includes('.') ? `${prop?.lotSize}acres Lot Size` : `${prop?.lotSize}sqft Lot Size`}</Typography>
                        <Typography variant='h6'>{`${prop?.year} Year Build`}</Typography>
                        {extraLine != '' && (
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
                        {prop?.salePrice != '' && (
                            <Typography variant='h6'>{`Wholesale Price: ${prop?.salePrice}`}</Typography>
                        )}
                        {prop?.arv != '' && (
                            <Typography variant='h6'>{`After Repair Value: ${prop?.arv}`}</Typography>
                        )}


                        <CopyToClipboard text={copy.value} onCopy={() => setCopy({...copy, copied: true})}>
                        <button className="mt-4 py-1 px-3 rounded-lg hover:drop-shadow-xl bg-slate-300 border-2 border-black">Copy to clipboard</button>
                        </CopyToClipboard>

                        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', flexDirection: 'column', py: 5, px: 2 }}>
                            <TextField value={extraLine} onChange={e => setExtraLine(e.target.value)} variant="standard" sx={{ width: '90%' }} label='Add line to Deal Text' />
                        </Box>
                    </Box>
                </Grid>
}
            </Grid>
        <MobileNav />
    </Box>
  )
}

export default DealText