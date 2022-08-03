import { Box, Container, Grid, Paper, Typography, TextField, Divider, ListItemText, List, ListItem, ListItemIcon, Button, Snackbar, IconButton } from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';
import MobileNav from "../../MobileNav";
import OuterBar from "../../OuterBar";
import { useState, useContext, useEffect, Fragment } from "react";
import { AccountContext } from '../../../Login/Account';
import { API } from 'aws-amplify';
import CloseIcon from '@mui/icons-material/Close';
import NotAuthorized from "../../NotAuthorized";

    // API
    const apiName = 'valproperties';
    const path = '/careers';
    // 

const PostJob = () => {
    const { getSession, employee } = useContext(AccountContext);
    const [ open, setOpen ] = useState(false);
    const date = new Date();
    console.log(date)
    // const date = new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })
    const [postJob, setPostJob] = useState({
        jobTitle: '',
        date: date,
        location: 'Chandler, AZ',
        requirements1: '',
        requirements2: '',
        requirements3: '',
        requirements4: '',
        requirements5: '',
        requirements6: '',
        requirements7: '',
        benefits1: '',
        benefits2: '',
        benefits3: '',
        benefits4: '',
        benefits5: '',
        benefits6: '',
        benefits7: '',
        responsibilities1: '',
        responsibilities2: '',
        responsibilities3: '',
        responsibilities4: '',
        responsibilities5: '',
        responsibilities6: '',
        responsibilities7: '',
    });

    const handleChange = (e) => {
        setPostJob({ ...postJob, [e.target.name]: e.target.value })
    }


    const submitJob = async() => {
        document.querySelector('.jobButton').style.display = 'none';
        document.querySelector('.jobButton2').style.display = 'flex';
        document.querySelector('.jobConfirm').style.display = 'flex';
        const apiData = {
            body: postJob,
        };
        await API.post(apiName, path, apiData)
        .then(() => setOpen(true))
    };

    useEffect(() => {
        getSession();
        if (employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('HR') >= 0) {
            return <NotAuthorized />
        }
      },[]);

    //   Snackbar
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

      const careerAction = (
        <Fragment>
          <IconButton
            size="large"
            aria-label="close"
            sx={{ color: 'white' }}
            onClick={handleClose}
          >
            <CloseIcon fontSize="medium" />
          </IconButton>
        </Fragment>
      );
    //   

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#003558' }}>
        <Snackbar open={open} autoHideDuration={10000} onClose={handleClose} message='Job has been posted' action={careerAction} />
    <OuterBar />
        <Container maxWidth="2xl" sx={{ mt: 10, mb: 4, display: 'flex', alignItems: 'center', height: '100vh', justifyContent: 'flex-start', flexDirection: 'column'   }} >
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Paper sx={{ height: '100vh', boxShadow: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', overflowY: 'auto', borderRadius: '1em' }}>
                        <Typography variant='h4' sx={{ textAlign: 'center', py: 4 }}>Job Details</Typography>
                        <TextField sx={{ width: "80%", mt: 2 }} variant="outlined" name='jobTitle' label='Job Title' onChange={handleChange} value={postJob.jobTitle} />
                        <Divider sx={{ width: '50%', py: 2, borderBlockColor: 'black' }} />
                        <TextField sx={{ width: "80%", mt: 4 }} variant="outlined" name='benefits1' label='Benefits' onChange={handleChange} value={postJob.benefits1} />
                        <TextField sx={{ width: "80%", mt: 4 }} variant="outlined" name='benefits2' label='Benefits' onChange={handleChange} value={postJob.benefits2} />
                        <TextField sx={{ width: "80%", mt: 4 }} variant="outlined" name='benefits3' label='Benefits' onChange={handleChange} value={postJob.benefits3} />
                        <TextField sx={{ width: "80%", mt: 4 }} variant="outlined" name='benefits4' label='Benefits' onChange={handleChange} value={postJob.benefits4} />
                        <TextField sx={{ width: "80%", mt: 4 }} variant="outlined" name='benefits5' label='Benefits' onChange={handleChange} value={postJob.benefits5} />
                        <TextField sx={{ width: "80%", mt: 4 }} variant="outlined" name='benefits6' label='Benefits' onChange={handleChange} value={postJob.benefits6} />
                        <TextField sx={{ width: "80%", mt: 4 }} variant="outlined" name='benefits7' label='Benefits' onChange={handleChange} value={postJob.benefits7} />
                        <Divider sx={{ width: '50%', py: 2, borderBlockColor: 'black' }} />
                        <TextField sx={{ width: "80%", mt: 4 }} variant="outlined" name='requirements1' label='Job Requirements' onChange={handleChange} value={postJob.requirements1} />
                        <TextField sx={{ width: "80%", mt: 4 }} variant="outlined" name='requirements2' label='Job Requirements' onChange={handleChange} value={postJob.requirements2} />
                        <TextField sx={{ width: "80%", mt: 4 }} variant="outlined" name='requirements3' label='Job Requirements' onChange={handleChange} value={postJob.requirements3} />
                        <TextField sx={{ width: "80%", mt: 4 }} variant="outlined" name='requirements4' label='Job Requirements' onChange={handleChange} value={postJob.requirements4} />
                        <TextField sx={{ width: "80%", mt: 4 }} variant="outlined" name='requirements5' label='Job Requirements' onChange={handleChange} value={postJob.requirements5} />
                        <TextField sx={{ width: "80%", mt: 4 }} variant="outlined" name='requirements6' label='Job Requirements' onChange={handleChange} value={postJob.requirements6} />
                        <TextField sx={{ width: "80%", mt: 4 }} variant="outlined" name='requirements7' label='Job Requirements' onChange={handleChange} value={postJob.requirements7} />
                        <Divider sx={{ width: '50%', py: 2, borderBlockColor: 'black' }} />
                        <TextField sx={{ width: "80%", mt: 4 }} variant="outlined" name='responsibilities1' label='Responsibilities' onChange={handleChange} value={postJob.responsibilities1} />
                        <TextField sx={{ width: "80%", mt: 4 }} variant="outlined" name='responsibilities2' label='Responsibilities' onChange={handleChange} value={postJob.responsibilities2} />
                        <TextField sx={{ width: "80%", mt: 4 }} variant="outlined" name='responsibilities3' label='Responsibilities' onChange={handleChange} value={postJob.responsibilities3} />
                        <TextField sx={{ width: "80%", mt: 4 }} variant="outlined" name='responsibilities4' label='Responsibilities' onChange={handleChange} value={postJob.responsibilities4} />
                        <TextField sx={{ width: "80%", mt: 4 }} variant="outlined" name='responsibilities5' label='Responsibilities' onChange={handleChange} value={postJob.responsibilities5} />
                        <TextField sx={{ width: "80%", mt: 4 }} variant="outlined" name='responsibilities6' label='Responsibilities' onChange={handleChange} value={postJob.responsibilities6} />
                        <TextField sx={{ width: "80%", mt: 4 }} variant="outlined" name='responsibilities7' label='Responsibilities' onChange={handleChange} value={postJob.responsibilities7} />
                        <Divider sx={{ width: '50%', py: 2, borderBlockColor: 'black' }} />
                        <Box sx={{ py: 4, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                            <Button onClick={submitJob} className="jobButton" variant='outlined' size='large'>Post Job</Button>
                            <Button className="jobButton2" disabled sx={{ display: 'none' }} variant='outlined' size='large'>Posted</Button>
                            <Typography className='jobConfirm' sx={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: 'green', display: 'none', py: 3 }}>Job has been posted</Typography>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Paper sx={{ height: '100vh', boxShadow: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', pb: 5, overflowY: 'auto', borderRadius: '1em' }}>
                        <Typography variant='h4' sx={{ textAlign: 'center', py: 4 }}>{postJob.jobTitle != '' ? postJob.jobTitle : 'Job Title'}</Typography>
                        <Divider sx={{ width: '75%' }} />
                        <Box sx={{ width: '80%', mt: 2, display: 'flex', flexDirection: 'column' }}>
                            <Typography variant='h5' sx={{ fontSize: '34px', textAlign: 'left', width: '100%', mt: 2, textDecoration: 'underline' }}>Job Description</Typography>
                            <List>
                                <ListItem>
                                    <ListItemText primary='We are currently seeking people who want to make great money in an amazing team environment! We are a fast-paced Wholesale Real Estate company that manages client relationships with high-net-worth investors and funds. Our Sales individuals will be responsible for acquiring or selling the potential of our wholesale properties, utilizing the systems and skills that have made us one of the top wholesale companies in the United States!' />
                                </ListItem>
                            </List>
                            <Typography variant='h5' sx={{ fontSize: '34px', textAlign: 'left', width: '100%', mt: 2, textDecoration: 'underline' }}>Benefits</Typography>
                            <List>
                                {postJob.benefits1 != '' && 
                                    <ListItem>
                                        <ListItemIcon>
                                            <CircleIcon fontSize={'10px'} />
                                        </ListItemIcon>
                                        <ListItemText primary={postJob.benefits1} />
                                    </ListItem>
                                }
                                {postJob.benefits2 != '' && 
                                    <ListItem>
                                        <ListItemIcon>
                                            <CircleIcon fontSize={'10px'} />
                                        </ListItemIcon>
                                        <ListItemText primary={postJob.benefits2} />
                                    </ListItem>
                                }
                                {postJob.benefits3 != '' && 
                                    <ListItem>
                                        <ListItemIcon>
                                            <CircleIcon fontSize={'10px'} />
                                        </ListItemIcon>
                                        <ListItemText primary={postJob.benefits3} />
                                    </ListItem>
                                }
                                {postJob.benefits4 != '' && 
                                    <ListItem>
                                        <ListItemIcon>
                                            <CircleIcon fontSize={'10px'} />
                                        </ListItemIcon>
                                        <ListItemText primary={postJob.benefits4} />
                                    </ListItem>
                                }
                                {postJob.benefits5 != '' && 
                                    <ListItem>
                                        <ListItemIcon>
                                            <CircleIcon fontSize={'10px'} />
                                        </ListItemIcon>
                                        <ListItemText primary={postJob.benefits5} />
                                    </ListItem>
                                }
                                {postJob.benefits6 != '' && 
                                    <ListItem>
                                        <ListItemIcon>
                                            <CircleIcon fontSize={'10px'} />
                                        </ListItemIcon>
                                        <ListItemText primary={postJob.benefits6} />
                                    </ListItem>
                                }
                                {postJob.benefits7 != '' && 
                                    <ListItem>
                                        <ListItemIcon>
                                            <CircleIcon fontSize={'10px'} />
                                        </ListItemIcon>
                                        <ListItemText primary={postJob.benefits7} />
                                    </ListItem>
                                }
                            </List>
                            <Typography variant='h5' sx={{ fontSize: '34px', textAlign: 'left', width: '100%', mt: 2, textDecoration: 'underline' }}>Job Requirements</Typography>
                            <List>
                                {postJob.requirements1 != '' && 
                                    <ListItem>
                                        <ListItemIcon>
                                            <CircleIcon fontSize={'10px'} />
                                        </ListItemIcon>
                                        <ListItemText primary={postJob.requirements1} />
                                    </ListItem>
                                }
                                {postJob.requirements2 != '' && 
                                    <ListItem>
                                        <ListItemIcon>
                                            <CircleIcon fontSize={'10px'} />
                                        </ListItemIcon>
                                        <ListItemText primary={postJob.requirements2} />
                                    </ListItem>
                                }
                                {postJob.requirements3 != '' && 
                                    <ListItem>
                                        <ListItemIcon>
                                            <CircleIcon fontSize={'10px'} />
                                        </ListItemIcon>
                                        <ListItemText primary={postJob.requirements3} />
                                    </ListItem>
                                }
                                {postJob.requirements4 != '' && 
                                    <ListItem>
                                        <ListItemIcon>
                                            <CircleIcon fontSize={'10px'} />
                                        </ListItemIcon>
                                        <ListItemText primary={postJob.requirements4} />
                                    </ListItem>
                                }
                                {postJob.requirements5 != '' && 
                                    <ListItem>
                                        <ListItemIcon>
                                            <CircleIcon fontSize={'10px'} />
                                        </ListItemIcon>
                                        <ListItemText primary={postJob.requirements5} />
                                    </ListItem>
                                }
                                {postJob.requirements6 != '' && 
                                    <ListItem>
                                        <ListItemIcon>
                                            <CircleIcon fontSize={'10px'} />
                                        </ListItemIcon>
                                        <ListItemText primary={postJob.requirements6} />
                                    </ListItem>
                                }
                                {postJob.requirements7 != '' && 
                                    <ListItem>
                                        <ListItemIcon>
                                            <CircleIcon fontSize={'10px'} />
                                        </ListItemIcon>
                                        <ListItemText primary={postJob.requirements7} />
                                    </ListItem>
                                }
                            </List>
                            <Typography variant='h5' sx={{ fontSize: '34px', textAlign: 'left', width: '100%', mt: 2, textDecoration: 'underline' }}>Responsibilities</Typography>
                            <List>
                                {postJob.responsibilities1 != '' && 
                                    <ListItem>
                                        <ListItemIcon>
                                            <CircleIcon fontSize={'10px'} />
                                        </ListItemIcon>
                                        <ListItemText primary={postJob.responsibilities1} />
                                    </ListItem>
                                }
                                {postJob.responsibilities2 != '' && 
                                    <ListItem>
                                        <ListItemIcon>
                                            <CircleIcon fontSize={'10px'} />
                                        </ListItemIcon>
                                        <ListItemText primary={postJob.responsibilities2} />
                                    </ListItem>
                                }
                                {postJob.responsibilities3 != '' && 
                                    <ListItem>
                                        <ListItemIcon>
                                            <CircleIcon fontSize={'10px'} />
                                        </ListItemIcon>
                                        <ListItemText primary={postJob.responsibilities3} />
                                    </ListItem>
                                }
                                {postJob.responsibilities4 != '' && 
                                    <ListItem>
                                        <ListItemIcon>
                                            <CircleIcon fontSize={'10px'} />
                                        </ListItemIcon>
                                        <ListItemText primary={postJob.responsibilities4} />
                                    </ListItem>
                                }
                                {postJob.responsibilities5 != '' && 
                                    <ListItem>
                                        <ListItemIcon>
                                            <CircleIcon fontSize={'10px'} />
                                        </ListItemIcon>
                                        <ListItemText primary={postJob.responsibilities5} />
                                    </ListItem>
                                }
                                {postJob.responsibilities6 != '' && 
                                    <ListItem>
                                        <ListItemIcon>
                                            <CircleIcon fontSize={'10px'} />
                                        </ListItemIcon>
                                        <ListItemText primary={postJob.responsibilities6} />
                                    </ListItem>
                                }
                                {postJob.responsibilities7 != '' && 
                                    <ListItem>
                                        <ListItemIcon>
                                            <CircleIcon fontSize={'10px'} />
                                        </ListItemIcon>
                                        <ListItemText primary={postJob.responsibilities7} />
                                    </ListItem>
                                }
                            </List>
                            <Divider sx={{ width: '100%', py: 3 }} />
                        </Box>
                            <Typography variant='body2' sx={{ mt: 2, textAlign: 'center', width: '80%' }}>
                            ***KeygleeDispo supports a diverse workforce and is an Equal Opportunity Employer who does not discriminate against individuals on the basis of race, gender, color, religion, national origin, age, sexual orientation, gender identity, disability, veteran status or other classification protected by law. Drug Free Workplace. ***Must pass a drug test prior to employment and will be subject to post-accident, random, and reasonable cause testing during employment.
                        </Typography>
                        <Typography variant='body' sx={{ mt: 3, textAlign: 'center', width: '80%', fontWeight: 600 }}>
                        We are searching for potential top performers. If you're looking for a company that assures vertical growth, cultivates a positive environment, and gives you the ability to create generational wealth ... APPLY NOW!
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    <MobileNav />
</Box>
  )
}

export default PostJob