import Header from "../PropertyDetails/Header";
import { useState, useEffect, Fragment } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Auth, API, Storage } from 'aws-amplify';
import emptyPhoto from '../Empty Photo.png';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Snackbar, Stack, Stepper, Step, StepLabel } from "@mui/material";
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 3,
      border: 0,
      backgroundColor:
        theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
      borderRadius: 1,
    },
  }));

  const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 40,
    height: 40,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
      backgroundImage:
        'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
      boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
      backgroundImage:
        'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    }),
  }));

  function ColorlibStepIcon(props) {
    const { active, completed, className } = props;
  
    const icons = {
      1: <GroupAddIcon />,
      2: <AddToQueueIcon />,
      3: <BorderColorIcon />,
    };
  
    return (
      <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
        {icons[String(props.icon)]}
      </ColorlibStepIconRoot>
    );
  }

  const steps = ['Select a Dispo Employee', 'Select a Template', 'Create a Subject Line']
  
  ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
  };


const EmailBlast = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [ prop, setProp ] = useState('');
    // Steps
    const [activeStep, setActiveStep] = useState(-1);
    const [completed, setCompleted] = useState({});
    const totalSteps = () => {
        return steps.length;
    };
    const completedSteps = () => {
        return Object.keys(completed).length
    };
    const isLastStep = () => {
        return activeStep === totalSteps() - 1
    };
    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
      };
    // 
    const [ activeTemplate, setActiveTemplate ] = useState(null);
    const [ dispoReps, setDispoReps ] = useState([]);
    const [ open, setOpen ] = useState(false);
    const [ photo, setPhoto ] = useState('');
    const [ employee, setEmployee ] = useState('');
    const [ propertyImage, setPropertyImage ] = useState('');
    const [ sendgrid, setSendgrid ] = useState(false);
    const [ line5, setLine5 ] = useState('');
    const [ secondTemplate, setSecondTemplate ] = useState({
        line1: '',
        line2: '',
        line3: '',
        line4: '',
        line5: '',
        netPrice: '',
        arv: ''
    })
    // API
    const apiName = 'valproperties';
    const path = `/inventory/${id}`;
    const sendgridPath = '/sendgrid';
    const init = {
        queryStringParameters: {
            id: id
        }
    };
    // 

    const getSession = async () => {
        await Auth.currentAuthenticatedUser().then((user) => {
            setEmployee(user)
        })
        .catch(() => {
            navigate('/');
            // setLoggedIn(false)
        });
    };

    const loadPhoto = () => {
            API.get('valproperties', '/photos', {
                queryStringParameters: {
                    propPhoto: prop.propPhoto
                }
            })
            .then(url => setPropertyImage(url))
            .catch(err => console.log(err))
    }

    const loadProperty = async () => {
        await API.get(apiName, path, init)
        .then(res => res.Items.map(prop => prop.id === id && setProp(prop)))
    }
    

    useEffect(() => {
        getSession()
        loadProperty()
}, []);



    useEffect(() => {
        API.get(apiName, '/dispoemployees')
        .then(res => setDispoReps(res.Items))
    },[]);


    
    const [ dispoEmployee, setDispoEmployee ] = useState({
        name: prop?.dispoName,
        phone: prop?.dispoPhone,
        senderID: '',
        segmentID: '',
        email: prop?.dispoEmail,
    })
    const [ blastDetails, setBlastDetails ] = useState({
        address: '',
        senderID: '',
        segmentID: '',
        market: '',
        sender: '',
        pictureLink: '',
        line1: '',
        line2: '',
        line3: '',
        line4: '',
        line5: '',
        netPrice: '',
        arv: '',
        dispo: '',
        propPhoto: '',
        subjectLine: '',
    });

    useEffect(() => {
        if(photo === '') {
            loadPhoto()
        }
},[prop])

    const submitToSendgrid = async () => {
        await Storage.put(photo.name, photo)
        console.log(blastDetails)
        setSendgrid(true)
        const apiData = {
            body: blastDetails
        };
        setOpen(true)
        await API.post(apiName, sendgridPath, apiData)
    };

    async function onChange(e) {
        const file = e.target.files[0];
        setPhoto(file);
        setPropertyImage(URL.createObjectURL(file));
        setBlastDetails({ ...blastDetails, propPhoto: file.name });
    };


    useEffect(() => {
        if(blastDetails.subjectLine != '') {
            setActiveStep(2)
        }
    },[blastDetails])
    useEffect(() => {
        if(activeTemplate != null && blastDetails.subjectLine === '' && dispoEmployee.senderID != '') {
            setActiveStep(1)
        } 
    }, [blastDetails])



    // SnackBar
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

      const propertyAction = (
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

    useEffect(() => {
        if (employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Sales') >= 0)  {
            return navigate('/acquisitions')
        }
        if (employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Auditor') >= 0) {
            return navigate('/acquisitions')
        }
    },[employee])

    
  return (
    <div className="flex flex-col w-full h-full overflow-y-auto bg-slate-300">
        <Snackbar open={open} autoHideDuration={10000} onClose={handleClose} message='Email has been sent to Sendgrid' action={propertyAction} />
        <Header prop={prop} />
        <div className="flex fixed right-0 z-50 top-0 items-center justify-center w-auto h-auto">
        <Stepper sx={{ py: 2 }} alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel sx={{ fontSize: '10px', cursor: 'default' }} StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full">
            <div className="w-full md:w-full h-full flex flex-col p-2 border-r-2 border-black items-center">
                <div style={{ backgroundImage: `${`url(${propertyImage})` || `url(${photo})`}`, backgroundSize: '90% 100%' }} className={`w-full h-[550px] bg-no-repeat bg-center`} />
                <div className="w-full h-[60px] flex items-center justify-center">
                    <label className="pr-3 font-semibold">Add/Change Photo:</label>
                        <input onChange={onChange} type='file' />
                    </div>
                <h1 className="font-semibold text-2xl text-center pt-3">
                    {prop?.address?.replace(', USA', '')}
                </h1>
                {blastDetails.pictureLink != '' &&
                <a className="text-blue-500 pt-4 pl-2 underline pb-6" href={blastDetails.pictureLink}>Link to More Pictures!</a>
                }
                <ul className="mr-2 pb-5 items-center flex flex-col">
                    {blastDetails.line1 != '' &&
                    <li>{blastDetails.line1}</li>
                    }
                    {blastDetails.line2 != '' &&
                    <li>{blastDetails.line2}</li>
                    }
                    {blastDetails.line3 != '' &&
                    <li>{blastDetails.line3}</li>
                    }
                    {blastDetails.line4 != '' &&
                    <li>{blastDetails.line4}</li>
                    }
                    {blastDetails.line5 != '' &&
                    <li>{blastDetails.line5}</li>
                    }
                </ul>
                    {blastDetails.netPrice != '' &&
                    <p className="font-semibold text-lg text-green-600">Wholesale Price: {blastDetails.netPrice}</p>
                    }
                    {blastDetails.arv != '' &&
                    <p className="font-semibold text-lg text-green-600">After Repair Value: {blastDetails.arv}</p>
                    }
                    <p className='text-xl text-orange-700 pt-4'>
                        {blastDetails.dispo}
                    </p>
                    <div className='flex flex-col items-center justify-center w-full h-[100px]'>
                        <input className="w-4/5 h-[30px] border-b-2 border-black bg-slate-300 placeholder-black text-center focus:border-0 focus:border-b-2" onChange={e => setBlastDetails({ ...blastDetails, subjectLine: e.target.value })} value={blastDetails.subjectLine} placeholder="Add a subject line..." />
                    </div>
                    <div className="pb-4">
                        {open === true ?
                            <button disabled={true} className='py-1 px-3 rounded-md font-semibold text-gray-800 border-2 border-gray-800 hover:scale-105 '>
                            Pushed
                        </button>
                        :
                        <button onClick={submitToSendgrid} className='py-1 px-3 rounded-md font-semibold text-slate-600 border-2 border-slate-600 hover:scale-105 hover:text-orange-500 hover:border-orange-500 transform duration-200 ease-in'>
                            Push to Sendgrid
                        </button>
                        }
                    </div>
            </div>
            <div className="w-full md:w-full h-full flex flex-col">
                <div className="h-[170px] w-full border-b-2 border-black items-center py-3">
                    <label className="font-semibold pl-2 py-3">Select Dispo Employee</label>
                    <select value={dispoEmployee.name} size={dispoReps.length} className="w-full h-4/5 bg-slate-300" placeholder="Select Dispo Employee">
                        {dispoReps?.map((dispo) => 
                            <option className="bg-slate-200" onClick={() => {
                                setActiveStep(0)
                                setDispoEmployee({ ...dispoEmployee,
                                    name: dispo.name,
                                    phone: dispo.phone,
                                    email: dispo.email,
                                    senderID: dispo.senderID,
                                    segmentID: dispo.segmentID
                                 });
                            }} key={dispo.id} value={dispo.name}>
                                {dispo.name}
                            </option>
                        )}
                    </select>
                </div>
                <div className={`border-b-2 border-black flex-1 w-full px-10 py-4 hover:opacity-95  ${activeTemplate === 1 && 'bg-green-200'}`}>
                    <h1 className='font-semibold text-xl'>{prop?.address?.replace(', USA', '')}</h1>
                    {prop?.pictureLink != '' &&
                    <a className="text-blue-500 pt-7 pl-2 underline" href={prop?.pictureLink}>Link to More Pictures!</a>
                    }
                    <ul className="pt-4">
                        <li>
                            {`${prop.beds} Beds / ${prop.baths} Baths ${prop.parking != '' && prop.parking != 'No Parking' && '/ ' + prop.parking}`}
                        </li>
                        <li>
                            {`${prop.livingArea}sf Living Area`}
                        </li>
                        <li>
                            {`${prop?.lotSize}sf Lot Size`}
                        </li>
                        <li>
                            {`${prop?.year} Year Build`}
                        </li>
                        <input className={`w-4/5 h-full bg-slate-300 py-3 border-b-2 border-gray-500 placeholder-black text-center focus:border-0 focus:border-b-2 ${activeTemplate === 1 && 'bg-green-200'}`} onChange={e => setLine5({ ...line5, line5: e.target.value })} value={line5} placeholder="Add a 5th line or leave blank" />
                    </ul>
                    <p className='text-xl text-green-600 pt-6'>
                        Wholesale Price: {prop?.netPrice}
                    </p>
                    <p className='text-xl text-green-600'>
                        After Repair Value: {prop?.arv}
                    </p>
                    <p className='text-xl text-orange-700 pt-4'>
                        Call/Text {dispoEmployee.name} at {dispoEmployee.phone}
                    </p>
                    <div className='flex items-center justify-start w-full pt-5 pl-5'>
                        <button onClick={async () => {
                            setActiveTemplate(1);
                            setBlastDetails({ ...blastDetails, 
                                address: prop.address,
                                line1: `${prop.beds} Beds / ${prop.baths} Baths ${prop.parking != '' && prop.parking != 'No Parking' && '/ ' + prop.parking}`,
                                line2:`${prop.livingArea}sf Living Area`,
                                line3:`${prop?.lotSize}sf Lot Size`,
                                line4:`${prop?.year} Year Build`,
                                line5: line5,
                                pictureLink: prop.pictureLink,
                                netPrice: prop.netPrice,
                                arv: prop.arv,
                                dispo: `Call/Text ${dispoEmployee.name} at ${dispoEmployee.phone}`,
                                sender: dispoEmployee.email,
                                senderID: dispoEmployee.senderID,
                                segmentID: dispoEmployee.segmentID,
                                market: prop.market,
                                propPhoto: prop.propPhoto
                        })
                        }} 
                        className={`px-3 py-1 border-2 border-black rounded-md transform duration-200 ease-in hover:scale-105 hover:text-cyan-900 font-semibold ${activeTemplate === 1 && 'bg-white'}`}>
                            Select/Update Template
                        </button>
                    </div>
                </div>
                    <div className={`border-black flex-1 w-full px-10 py-5 hover:opacity-95  ${activeTemplate === 2 && 'bg-green-200'}`}>
                    <h1 className='font-semibold text-xl'>{prop?.address?.replace(', USA', '')}</h1>
                    {prop?.pictureLink != '' &&
                    <a className="text-blue-500 pt-7 pl-2 underline" href={prop?.pictureLink}>Link to More Pictures!</a>
                    }
                    <ul className="pt-4">
                    <input className={`w-4/5 h-full bg-slate-300 py-3 border-b-2 border-gray-500 placeholder-black text-center focus:border-0 focus:border-b-2 ${activeTemplate === 2 && 'bg-green-200'}`} onChange={e => setSecondTemplate({ ...secondTemplate, line1: e.target.value })} value={secondTemplate.line1} placeholder="Add 1st line or leave blank" />
                        <input className={`w-4/5 h-full bg-slate-300 py-3 border-b-2 border-gray-500 placeholder-black text-center focus:border-0 focus:border-b-2 ${activeTemplate === 2 && 'bg-green-200'}`} onChange={e => setSecondTemplate({ ...secondTemplate, line2: e.target.value })} value={secondTemplate.line2} placeholder="Add a 2nd line or leave blank" />
                        <input className={`w-4/5 h-full bg-slate-300 py-3 border-b-2 border-gray-500 placeholder-black text-center focus:border-0 focus:border-b-2 ${activeTemplate === 2 && 'bg-green-200'}`} onChange={e => setSecondTemplate({ ...secondTemplate, line3: e.target.value })} value={secondTemplate.line3} placeholder="Add a 3rd line or leave blank" />
                        <input className={`w-4/5 h-full bg-slate-300 py-3 border-b-2 border-gray-500 placeholder-black text-center focus:border-0 focus:border-b-2 ${activeTemplate === 2 && 'bg-green-200'}`} onChange={e => setSecondTemplate({ ...secondTemplate, line4: e.target.value })} value={secondTemplate.line4} placeholder="Add a 4th line or leave blank" />
                        <input className={`w-4/5 h-full bg-slate-300 py-3 border-b-2 border-gray-500 placeholder-black text-center focus:border-0 focus:border-b-2 ${activeTemplate === 2 && 'bg-green-200'}`} onChange={e => setSecondTemplate({ ...secondTemplate, line5: e.target.value })} value={secondTemplate.line5} placeholder="Add a 5th line or leave blank" />
                    </ul>
                    <p className='text-xl text-green-600 pt-6'>
                        Wholesale Price: {prop?.netPrice}
                    </p>
                    <p className='text-xl text-green-600'>
                        After Repair Value: {prop?.arv}
                    </p>
                    <p className='text-xl text-orange-700 pt-4'>
                        Call/Text {dispoEmployee.name} at {dispoEmployee.phone}
                    </p>
                    <div className='flex items-center justify-start w-full pt-5 pl-5'>
                        <button onClick={async () => {
                            setActiveTemplate(2)
                            setBlastDetails({ ...blastDetails, 
                                address: prop.address,
                                line1: secondTemplate.line1,
                                line2: secondTemplate.line2,
                                line3: secondTemplate.line3,
                                line4: secondTemplate.line4,
                                line5: secondTemplate.line5,
                                pictureLink: prop.pictureLink,
                                netPrice: prop.netPrice,
                                arv: prop.arv,
                                dispo: `Call/Text ${dispoEmployee.name} at ${dispoEmployee.phone}`,
                                sender: dispoEmployee.email,
                                senderID: dispoEmployee.senderID,
                                segmentID: dispoEmployee.segmentID,
                                market: prop.market,
                                propPhoto: prop.propPhoto
                        })
                        }} 
                        className={`px-3 py-1 border-2 border-black rounded-md transform duration-200 ease-in hover:scale-105 hover:text-cyan-900 font-semibold ${activeTemplate === 2 && 'bg-white'}`}>
                            Select/Update Template
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EmailBlast