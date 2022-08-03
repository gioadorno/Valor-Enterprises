import { Box, Typography, Divider, Button, Fade, List, ListItem, ListItemText, ListItemIcon, TextField, Select, MenuItem, FormControl, InputLabel, IconButton, Snackbar } from "@mui/material";
import NavBar from "../Homepage_Components/NavBar";
import MobileNav from "../Homepage_Components/MobileNav";
import background from './background.jpg';
import CircleIcon from '@mui/icons-material/Circle';
import { useState, useEffect, forwardRef, Fragment } from "react";
import { IMaskInput } from 'react-imask';
import PropTypes from 'prop-types';
import FileBase from 'react-file-base64';
import moment from "moment";
import { API, Storage } from 'aws-amplify';
import CloseIcon from '@mui/icons-material/Close';

    // API
    const apiName = 'valproperties';
    const path = '/careers';
    const applicationPath = '/applications';
    // 

const TextMaskCustom = forwardRef(function TextMaskCustom(props, ref) {

    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="(#00)-000-0000"
        definitions={{
          '#': /[1-9]/,
        }}
        inputRef={ref}
        onAccept={(value) => onChange({ target: { name: props.name, value } })}
        overwrite
      />
    );
  });

  TextMaskCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

const Careers = () => {
    const [ currentJob, setCurrentJob ] = useState(null);
    const [ resume, setResume ] = useState('');
    const [ jobs, setJobs ] = useState([]);
    const [ open, setOpen ] = useState(false);
    const date = new Date().toLocaleDateString('uen-US', { month: '2-digit' ,day: '2-digit' ,year: 'numeric' })
    const [applicationForm, setApplicationForm] = useState({
        position: currentJob?.jobTitle,
        name: '',
        email: '',
        phone: '',
        experience: '',
        license: '',
        resume: '',
        date: date
    });

    useEffect(() => {
        API.get(apiName, path)
        .then(res => {
          setJobs(res.Items)})
      },[])

    const handleChange = (e) => {
        setApplicationForm({ ...applicationForm, [e.target.name]: e.target.value })
    }

        // Submit Application
        const submitApp = async (e) => {
            e.preventDefault();
            applicationForm.position = currentJob.jobTitle;
            document.querySelector('.applicationConfirm').style.display = 'flex';
            document.querySelector('.submitButton').style.display = 'none';
            document.querySelector('.submitButton2').style.display = 'none';

        // Save Resume to Storage
        try {
            Storage.put(resume.name, resume);
            
        } catch (error) {
            console.log(error)
        }

        // Post to Slack HR Channel
    const response = await fetch(process.env.REACT_APP_ACQ_PAPERWORK, {
    method: 'post',
    body: JSON.stringify(
        {
            blocks: [
                {
                    type: 'header',
                    text: {
                        type: 'plain_text',
                        text: 'An Application has been submitted!',
                        emoji: true
                    }
                },
                {
                    type: 'section',
                    text: {
                            type: 'mrkdwn',
                            text: `*Position: ${applicationForm.position}*`
                        },
                    
                },
                {
                    type: 'section',
                    fields: [
                        {
                            type: 'mrkdwn',
                            text: `*Applicant:* ${applicationForm.name}`
                        },
                        {
                            type: 'mrkdwn',
                            text: `*Email:* ${applicationForm.email}`
                        },
                        {
                            type: 'mrkdwn',
                            text: `*Phone Number:* ${applicationForm.phone}`
                        },
                        {
                            type: 'mrkdwn',
                            text: `*Real Estate Experience:* ${applicationForm.experience}`
                        },
                        {
                            type: 'mrkdwn',
                            text: `*Real Estate License?:* ${applicationForm.license}`
                        },
                    ]
                },
                                    // {
                                    //     type: "section",
                                    //     text: {
                                    //         type: "mrkdwn",
                                    //         text: "Resume"
                                    //     },
                                    //     accessory: {
                                    //         type: "button",
                                    //         text: {
                                    //             type: "plain_text",
                                    //             text: "Open Resume",
                                    //             emoji: true
                                    //         },
                                    //         value: "click_me_123",
                                    //         url: `${Storage.get(resume.name)}`,
                                    //         action_id: "button-action"
                                    //     }
                                    // },
                                    {
                                        "type": "divider"
                                    }
                                ]
                            }
                        )
                    })

            // Save Application to Database
                const apiData = {
                    body: applicationForm,
                };
                await API.post(apiName, applicationPath, apiData)
                .then(() => setOpen(true))
};



        const meta = {
            title: 'KeygleeDispo Careers',
            description: 'We are looking to hire experienced and non-experienced individuals who are looking to start a career in real estate.',
            meta: {
                name: {
                    keywords: 'real estate, dispositions, acquisitions, hiring, careers, sales, application, job'
                }
            }
        }

        //   Snackbar
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

      const applicationAction = (
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

    // Resume
    async function onChange(e) {
        const file = e.target.files[0];
        setResume(file);
        setApplicationForm({ ...applicationForm, resume: file.name });
    };

  return (
    <Box sx={{ display: 'flex', position: 'relative', height: '100vh', width: '100%', flexDirection: 'column', bgcolor: '#002e62', alignItems: 'center' }}>
        <Snackbar open={open} autoHideDuration={10000} onClose={handleClose} message='Application has been submitted' action={applicationAction} />
        <div className="w-full flex items-center justify-center pt-5">
            <h1 className="text-3xl text-black font-semibold z-50">Careers</h1>
        </div>
        {currentJob === null && (
            <Fade in={currentJob === null} timeout={600}>
                <Box sx={{ mb: 3, pt: 3 , margin: 'auto', width: { xs: '100%', sm: '30%' }, height: { xs: '100%', sm: '80%' }, bgcolor: 'white', boxShadow: 5, borderRadius: '2em', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 5, overflowY: 'auto' }}>
                    <Box sx={{ pt: 1, width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                        <Typography variant='h4'>
                            Positions open
                        </Typography>
                        <Divider sx={{ mt: 1, width: '70%' }} />
                    </Box>
                    {jobs.map((job) => (
                        <Box onClick={() => setCurrentJob(job)} key={job._id} sx={{ py: 2, width: '100%', height: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Box sx={{ width: '90%', height: '90%', display: 'flex', flexDirection: 'column', alignItems: 'center', '&:hover' : { transform: 'scale(1.1)', filter: 'contrast(0.5)' }, justifyContent: 'center', cursor: 'pointer', transition: { "ease-in-out": 'cubic-bezier(0.4, 0, 0.2, 1)' } }}>
                                <Typography variant='h5' sx={{ color: '#009dd9', textAlign: 'center' }}>
                                    {job.jobTitle}
                                </Typography>
                                <Typography sx={{ textAlign: 'center' }} variant='h6'>
                                    {job.location}
                                </Typography>
                                <Typography sx={{ color: 'grey' }} variant='body'>
                                {moment(job.date).fromNow()}
                                </Typography>
                                <Divider sx={{ mt: 1, width: '100%', textAlign: 'center' }} />
                            </Box>
                        </Box>
                        ))}
                </Box>
            </Fade>
        )}
        {currentJob && (
            <Fade timeout={500} in={currentJob}>
                <Box sx={{ mb: 3, pt: 3, pb: { xs: 14, sm: 8 }, margin: 'auto', width: { xs: '100%', sm: '70%' }, height: { xs: '100%', sm: '85%' }, bgcolor: 'white', boxShadow: 5, borderRadius: '2em', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 5, overflowY: 'auto' }}>
                    <Button variant='standard' onClick={() => setCurrentJob(null)} sx={{ textAlign: 'center', width: '100%', color: 'blue' }}>
                        View other jobs
                    </Button>
                <Box sx={{ pt: 1, width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <Typography sx={{ textAlign: 'center' }} variant='h4'>
                        {currentJob.jobTitle}
                    </Typography>
                    <Divider sx={{ mt: 1, width: '70%', pb: 4 }} />
                    <Box sx={{ width: '92%', pb: 5 }}>
                    <Typography variant='h4' component='h4' sx={{ width: '88%', textAlign: 'left', my: 2, fontSize: 34, textDecoration: 'underline' }}>
                            Job Description
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemText primary='We are currently seeking people who want to make great money in an amazing team environment!
                            We are a fast-paced Wholesale Real Estate company that manages client relationships with high-net-worth investors and funds. Our Sales individuals will be responsible for acquiring or selling the potential of our wholesale properties, utilizing the systems and skills that have made us one of the top wholesale companies in the United States!' />
                            </ListItem>
                        </List>
                    <Typography variant='h4' component='h4' sx={{ width: '88%', textAlign: 'left', my: 2, fontSize: 34, textDecoration: 'underline' }}>
                        Benefits
                    </Typography>
                        <List>
                        {currentJob.benefits1 != '' && 
                            <ListItem>
                                <ListItemIcon>
                                    <CircleIcon fontSize={'10px'} />
                                </ListItemIcon>
                                <ListItemText primary={currentJob.benefits1} />
                            </ListItem>
                            }
                            {currentJob.benefits2 != '' && 
                            <ListItem>
                                <ListItemIcon>
                                    <CircleIcon fontSize={'10px'} />
                                </ListItemIcon>
                                <ListItemText primary={currentJob.benefits2} />
                            </ListItem>
                            }
                            {currentJob.benefits3 != '' && 
                            <ListItem>
                                <ListItemIcon>
                                    <CircleIcon fontSize={'10px'} />
                                </ListItemIcon>
                                <ListItemText primary={currentJob.benefits3} />
                            </ListItem>
                            }
                            {currentJob.benefits4 != '' && 
                            <ListItem>
                                <ListItemIcon>
                                    <CircleIcon fontSize={'10px'} />
                                </ListItemIcon>
                                <ListItemText primary={currentJob.benefits4} />
                            </ListItem>
                            }
                            {currentJob.benefits5 != '' && 
                            <ListItem>
                                <ListItemIcon>
                                    <CircleIcon fontSize={'10px'} />
                                </ListItemIcon>
                                <ListItemText primary={currentJob.benefits5} />
                            </ListItem>
                            }
                            {currentJob.benefits6 != '' && 
                            <ListItem>
                                <ListItemIcon>
                                    <CircleIcon fontSize={'10px'} />
                                </ListItemIcon>
                                <ListItemText primary={currentJob.benefits6} />
                            </ListItem>
                            }
                            {currentJob.benefits7 != '' && 
                            <ListItem>
                                <ListItemIcon>
                                    <CircleIcon fontSize={'10px'} />
                                </ListItemIcon>
                                <ListItemText primary={currentJob.benefits7} />
                            </ListItem>
                            }
                        </List>
                    <Typography variant='h4' component='h4' sx={{ width: '88%', textAlign: 'left', my: 2, fontSize: 34, textDecoration: 'underline' }}>
                        Job Requirements
                    </Typography>
                        <List>
                            {currentJob.requirements1 != '' && 
                            <ListItem>
                                <ListItemIcon>
                                    <CircleIcon fontSize={'10px'} />
                                </ListItemIcon>
                                <ListItemText primary={currentJob.requirements1} />
                            </ListItem>
                            }
                            {currentJob.requirements2 != '' && 
                            <ListItem>
                                <ListItemIcon>
                                    <CircleIcon fontSize={'10px'} />
                                </ListItemIcon>
                                <ListItemText primary={currentJob.requirements2} />
                            </ListItem>
                            }
                            {currentJob.requirements3 != '' && 
                            <ListItem>
                                <ListItemIcon>
                                    <CircleIcon fontSize={'10px'} />
                                </ListItemIcon>
                                <ListItemText primary={currentJob.requirements3} />
                            </ListItem>
                            }
                            {currentJob.requirements4 != '' && 
                            <ListItem>
                                <ListItemIcon>
                                    <CircleIcon fontSize={'10px'} />
                                </ListItemIcon>
                                <ListItemText primary={currentJob.requirements4} />
                            </ListItem>
                            }
                            {currentJob.requirements5 != '' && 
                            <ListItem>
                                <ListItemIcon>
                                    <CircleIcon fontSize={'10px'} />
                                </ListItemIcon>
                                <ListItemText primary={currentJob.requirements5} />
                            </ListItem>
                            }
                            {currentJob.requirements6 != '' && 
                            <ListItem>
                                <ListItemIcon>
                                    <CircleIcon fontSize={'10px'} />
                                </ListItemIcon>
                                <ListItemText primary={currentJob.requirements6} />
                            </ListItem>
                            }
                            {currentJob.requirements7 != '' && 
                            <ListItem>
                                <ListItemIcon>
                                    <CircleIcon fontSize={'10px'} />
                                </ListItemIcon>
                                <ListItemText primary={currentJob.requirements7} />
                            </ListItem>
                            }
                        </List>
                    <Typography variant='h4' component='h4' sx={{ width: '88%', textAlign: 'left', my: 2, fontSize: 34, textDecoration: 'underline' }}>
                        Responsibilities
                    </Typography>
                        <List>
                            {currentJob.responsibilities1 != '' && 
                            <ListItem>
                                <ListItemIcon>
                                    <CircleIcon fontSize={'10px'} />
                                </ListItemIcon>
                                <ListItemText primary={currentJob.responsibilities1} />
                            </ListItem>
                            }
                            {currentJob.responsibilities2 != '' && 
                            <ListItem>
                                <ListItemIcon>
                                    <CircleIcon fontSize={'10px'} />
                                </ListItemIcon>
                                <ListItemText primary={currentJob.responsibilities2} />
                            </ListItem>
                            }
                            {currentJob.responsibilities3 != '' && 
                            <ListItem>
                                <ListItemIcon>
                                    <CircleIcon fontSize={'10px'} />
                                </ListItemIcon>
                                <ListItemText primary={currentJob.responsibilities3} />
                            </ListItem>
                            }
                            {currentJob.responsibilities4 != '' && 
                            <ListItem>
                                <ListItemIcon>
                                    <CircleIcon fontSize={'10px'} />
                                </ListItemIcon>
                                <ListItemText primary={currentJob.responsibilities4} />
                            </ListItem>
                            }
                            {currentJob.responsibilities5 != '' && 
                            <ListItem>
                                <ListItemIcon>
                                    <CircleIcon fontSize={'10px'} />
                                </ListItemIcon>
                                <ListItemText primary={currentJob.responsibilities5} />
                            </ListItem>
                            }
                            {currentJob.responsibilities6 != '' && 
                            <ListItem>
                                <ListItemIcon>
                                    <CircleIcon fontSize={'10px'} />
                                </ListItemIcon>
                                <ListItemText primary={currentJob.responsibilities6} />
                            </ListItem>
                            }
                            {currentJob.responsibilities7 != '' && 
                            <ListItem>
                                <ListItemIcon>
                                    <CircleIcon fontSize={'10px'} />
                                </ListItemIcon>
                                <ListItemText primary={currentJob.responsibilities7} />
                            </ListItem>
                            }
                        </List>
                    </Box>

                        <Divider sx={{ width: '85%' }} />
                        <Typography variant='body2' sx={{ mt: 3, width: '80%', textAlign: 'center', fontStyle: 'italic' }}>
                        ***KeygleeDispo supports a diverse workforce and is an Equal Opportunity Employer who does not
                                discriminate against individuals on the basis of race, gender, color, religion, national origin, age,
                                sexual orientation, gender identity, disability, veteran status or other classification protected by
                                law. Drug Free Workplace.
                                ***Must pass a drug test prior to employment and will be subject to post-accident, random, and
                                reasonable cause testing during employment.
                        </Typography>
                        <Typography variant='body' sx={{ mt: 3, width: '80%', textAlign: 'center', fontWeight: 600 }}>
                        We are searching for potential top performers. If you're looking for a company that assures vertical growth, cultivates a positive environment, and gives you the ability to create generational wealth ... APPLY NOW!
                        </Typography>
                        <Box sx={{ mt: 5, boxShadow: 5, backgroundColor: '#fbfbfb', width: '80%', height: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                            <Typography variant='body2' sx={{ position: 'absolute', top: 2, left: 2, color: 'gray', p: 1 }}>
                                {currentJob.jobTitle}
                            </Typography>
                            <Typography variant='body2' sx={{ position: 'absolute', top: 2, right: 2, color: 'gray', p: 1, display: {sm: 'flex'} }}>
                                {date}
                            </Typography>
                            <Typography variant='h4' sx={{ width: "100%", textAlign: 'center', py: 3 }}>
                                Application
                            </Typography>
                            <Box sx={{ mt: 2, width: { xs: '100%' , sm: '80%'}, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <TextField required name="name" onChange={handleChange} sx={{ width: '100%', mt: 4 }} variant='outlined' label='Your full name' />
                                <TextField required name="email" onChange={handleChange} sx={{ width: '100%', mt: 4 }} variant='outlined' label='Email Address' />
                                <TextField InputProps={{ inputComponent: TextMaskCustom }} value={applicationForm.phone} required name="phone" onChange={handleChange} sx={{ width: '100%', mt: 4 }} variant='outlined' label='Phone Number' />
                                <FormControl sx={{ width: '100%', mt: 4 }}>
                                    <InputLabel id='experience'>How many years of Real Estate experience do you have?(Not Required to have any)</InputLabel>
                                    <Select onChange={handleChange} name='experience' id='experience'  label='How many years of Real Estate experience do you have?(Not Required to have any)'>
                                        <MenuItem value='0-1 years'>0-1 years</MenuItem>
                                        <MenuItem value='1-2 years'>1-2 years</MenuItem>
                                        <MenuItem value='3-5 years'>3-5 years</MenuItem>
                                        <MenuItem value='6-9 years'>6-9 years</MenuItem>
                                        <MenuItem value='10+ years'>10+ years</MenuItem>
                                        <MenuItem value='N/A'>N/A</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl sx={{ width: '100%', mt: 4 }}>
                                    <InputLabel id='license'>Do you have your Real Estate License?(Not Required to have one to apply)</InputLabel>
                                    <Select onChange={handleChange} name='license' id='license'  label='Do you have your Real Estate License?(Not Required to have one to apply)'>
                                        <MenuItem value='No'>No</MenuItem>
                                        <MenuItem value='Yes'>Yes</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl sx={{ width: '100%', mt: 4 }}>
                                    <Typography variant='h6'>Upload your Resume</Typography>
                                    <input type='file' onChange={onChange} />
                                </FormControl>
                                <Box sx={{ py: 6, display: 'flex', width: '100%', alignItems: 'center', flexDirection: 'column' }}>
                                    <Typography className="applicationConfirm" sx={{ color: 'green', display: 'none', textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}>Thank you for submitting your application! We will be reaching out to you, if we feel you are a great fit!</Typography>
                                    <Button onClick={submitApp} size='large' variant='outlined' className='submitButton'>Submit Application</Button>
                                    <Button sx={{ display: 'none' }} disabled size='large' variant='outlined' className='submitButton2'>Submit Application</Button>
                                </Box>
                            </Box>
                        </Box>
                </Box>
                </Box>
            </Fade>
        )}
        <h1 className='absolute font-semibold text-lg z-50 bottom-0 text-white pb-2'>Our website is currently under construction. You will only have access to this career's page at this time.</h1>
        <img src={background} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, right: 0, left: 0 }} />
    </Box>
  )
}

export default Careers