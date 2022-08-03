import { Box, Typography, CardMedia, FormControl, FormLabel, Button } from "@mui/material";
import { useState } from "react";
import FileBase64 from 'react-file-base64';
import { updateBuyer } from "../../../../actions/login";
import { useDispatch } from "react-redux";
import GuestLogin from "../../../routes/GuestLogin/GuestLogin";

const ProfilePhoto = ({ user }) => {
    const [ photo, setPhoto ] = useState({ profilePhoto: '' });
    const dispatch = useDispatch();

    const savePhoto = () => {
        dispatch(updateBuyer(user.result._id, photo));
        document.querySelector('.photoButton').style.display = 'none';
        document.querySelector('.photoSuccess').style.display = 'flex'
    };
    
    if(!user?.result?.name || user?.result?.accountLevel != 'Buyer') {
        return (
            <GuestLogin />
        )
    };
  return (
    <Box sx={{ flexGrow: 1, display: 'flex', m: { sm: 4 }, boxShadow: 3, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '95%', height: '100%' }}>
        <Typography variant='h4' component='h4' sx={{ width: '100%', textAlign: 'center', mt: 2 }}>
            Profile Photo
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
            <CardMedia sx={{ width: { xs: '50%', sm: '80%' } }} component='img' src={user.result.profilePhoto || photo.profilePhoto} />
        </Box>
        <FormControl sx={{ pb: 4, pt: 4 }} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
            <FormLabel style={{ marginBottom: '1em' }} >Upload a Profile Photo</FormLabel>
            <FileBase64 name="profilePhoto" type='file' onDone={(fileInfo) => setPhoto({ ...photo, profilePhoto: fileInfo.base64 })} multiple={false}  />
        </FormControl>
        <Box sx={{ pb: 5 }}>
            <Button className='photoButton' variant='outlined' onClick={savePhoto}>
                Save Photo
            </Button>
            <Typography className='photoSuccess' sx={{ color: 'green', display: 'none', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                Photo has been saved. You will see changes when you login next time.
            </Typography>
        </Box>
    </Box>
  )
}

export default ProfilePhoto