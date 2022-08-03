import { Box, Paper, Grid, Button, Container, CardMedia, FormControl, FormLabel, InputLabel, Toolbar, Card, CardContent, CardActions, TextField, Typography  } from '@mui/material';
import { useState, useEffect, useContext } from "react";
import { AccountContext } from '../../Login/Account';
import { useNavigate } from 'react-router-dom';
import { Storage } from 'aws-amplify';
import OuterBar from '../OuterBar';
import FileBase64 from 'react-file-base64';
import emptyPhoto from './photo.png';
import MobileNav from '../MobileNav';
import { Auth } from 'aws-amplify';

Storage.configure({ level: 'protected' });

const Profile = () => {
    const { employee, getSession } = useContext(AccountContext);
    const navigate = useNavigate();


    const [ saved, setSaved ] = useState(false);

    const [ changePhoto, setChangePhoto ] = useState('');
    const [profilePhoto, setProfilePhoto] = useState('');

    const savePhoto = async () => {
        try {
            await Storage.put(changePhoto.name, changePhoto);
            Auth.updateUserAttributes(employee, {
                picture: changePhoto.name
            })
            setSaved(true)
        } catch (error) {
            console.log("Error uploading file: ", error);
            }

    };


    useEffect(() => {
        Storage.get(employee?.attributes?.picture, {
            download: false
        }).then(image => setProfilePhoto(image))
    },[])

    
    useEffect(() => {
        getSession()
        },[]);

        async function onChange(e) {
            const file = e.target.files[0];
            setChangePhoto(file);
        }

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#003558' }}>
        <OuterBar />
        <Container maxWidth="2xl" sx={{ mt: 10, mb: 4, display: 'flex', alignItems: 'center', width: '-webkit-fill-available', height: '100%' }} >
                <Grid spacing={1} container>
                    <Toolbar style={{ width: '100%', alignItems: 'center', justifyContent: 'center', marginBottom: '0em' }}>
                        <Typography variant='h2' sx={{ color: 'white' }}>Profile Settings</Typography>
                    </Toolbar>
                    <Grid item xs={12} sm={6}>
                        <Card variant='outlined' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', margin: '2em' }}>
                            <Box sx={{ width: { md: 300  , xl: '90%'}, height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', pt: 5 }}>
                                {changePhoto === '' ?
                                <img style={{ height: '100%', width: '60%', marginBottom: '1em',  }} src={profilePhoto} />
                                :
                                <img style={{ height: '100%', width: '60%', marginBottom: '1em',  }} src={changePhoto} />
                                }

                            </Box>
                            <CardContent>
                                <input type='file' onChange={onChange} />
                            </CardContent>
                            <CardActions>
                                <Button color={saved === true ? 'success' : 'primary'} onClick={savePhoto} variant='outlined'>Save Photo</Button>
                            </CardActions>
                                {saved === true && 
                                <InputLabel color='success'>
                                    Photo have been saved
                                </InputLabel>
                                }
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <Card variant='outlined' style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', margin: '2em', height: 200 }}>
                        <h1 className='text-xl font-semibold pt-2'>Change Password</h1>
                            <button className='rounded-full border-2 border-slate-500 bg-slate-200 py-1 px-3 hover:scale-105 transform duration-200 ease-out mt-5' onClick={() => navigate('/resetpassword')}>Reset Password</button>
                        </Card>
                    </Grid>
                </Grid>
        </Container>
        <MobileNav />
    </Box>
  )
}

export default Profile