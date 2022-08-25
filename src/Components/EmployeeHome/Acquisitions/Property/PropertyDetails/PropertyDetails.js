import { useEffect, useState, useContext, Fragment, useCallback } from "react";
import { AccountContext } from "../../../../Login/Account";
import { FormGroup, FormControlLabel, FormLabel, Switch, FormControl, ButtonGroup, Paper, Typography, CircularProgress, Divider, Box, Grid, CardMedia, Modal, Button, Container, IconButton, Snackbar, ModalManager, NoSsr, TextField, ToggleButtonGroup, ToggleButton  } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ThemeProvider } from "@material-ui/core";
import FileBase64 from 'react-file-base64';
import { GoogleMap, Marker, LoadScript, InfoWindow, StreetViewPanorama, useLoadScript } from '@react-google-maps/api';
import { GoogleAPI } from "../../../Map/keys";

import Company from "./Fields/Company";
import Territory from "./Fields/Territory";
import FileType from "./Fields/FileType";
import Market from "./Fields/Market";
import Status from './Fields/Status';
import TransactionType from "./Fields/TransactionType";
import Supplier from "./Fields/Supplier";
import SourceOfDeal from "./Fields/SourceOfDeal";
import FileNotes from "./Fields/FileNotes";
import AcqDate from "./Fields/AcqDate";
import InspectionPeriod from "./Fields/InspectionPeriod";
import COE from "./Fields/COE";
import Access from "./Fields/Access";
import PostPossession from "./Fields/PostPossession";
import SellerDocs from "./Fields/SellerDocs";
import EarnestDeposit from "./Fields/EarnestDeposit";
import EMDCheck from './Fields/EMDCheck';
import EMD from "./Fields/EMD";
import AcqContractPrice from './Fields/AcqContractPrice';
import AcqPriceDrops from "./Fields/AcqPriceDrops";
import AcqPriceIncrease from "./Fields/AcqPriceIncrease";
import AdditionalCost from "./Fields/AdditionalCost";
import OptionFee from "./Fields/OptionFee";
import FirstLegCredits from "./Fields/FirstLegCredits";
import FirstLegDebits from "./Fields/FirstLegDebits";
import AcqFinalCost from "./Fields/AcqFinalCost";
import EscrowOfficer from "./Fields/EscrowOfficer";
import BuyerDocs from "./Fields/BuyerDocs";
import BuyerEMD from "./Fields/BuyerEMD";
import BuyersEarnest from "./Fields/BuyersEarnest";
import BuyerEMDDate from './Fields/BuyerEMDDate';
import SecondEscrow from "./Fields/SecondEscrow";
import WhoSold from './Fields/WhoSold';
import WhoAssisted from "./Fields/WhoAssisted";
import SoldBy from './Fields/SoldBy';
import BuyerContact from "./Fields/BuyerContact";
import Commissions from "./Fields/Commissions";
import Payouts from './Fields/Payouts';
import PayoutRecipient from "./Fields/PayoutRecipient";
import StatusPayouts from "./Fields/StatusPayouts";
import BuyerAcqDate from "./Fields/BuyerAcqDate";
import BuyerCloseDate from "./Fields/BuyerCloseDate";
import DispoContractPrice from './Fields/DispoContractPrice';
import DispoPriceDrop from "./Fields/DispoPriceDrop";
import DispoPriceIncrease from "./Fields/DispoPriceIncrease";
import SecondLegCredits from "./Fields/SecondLegCredits";
import SecondLegDebits from "./Fields/SecondLegDebits";
import BuyerCredits from "./Fields/BuyerCredits";
import PerDiem from './Fields/PerDiem';
import DispoFinal from "./Fields/DispoFinal";
import NetPrice from './Fields/WholesalePrice';
import AddComp from "./Fields/AdditionalCompensation";
import CompletionDate from "./Fields/CompletionDate";
import DueToUs from "./Fields/DueToUs";
import Revenue from "./Fields/Revenue";
import GoodsSold from "./Fields/GoodsSold";
import GrossProfit from "./Fields/GrossProfit";
import StatusGP from "./Fields/StatusGP.";
import Split from './Fields/Split';
import AcqGP from "./Fields/AcqGP";
import SoldGP from './Fields/SoldGP';
import PricingDate from './Fields/PricingDate';
import CommitRelation from "./Fields/CommitRelation";
import Files from './Fields/Files';

import Moment from 'react-moment';
import { useParams, useNavigate } from "react-router-dom";
import useStyles from './styles';
import emptyPhoto from '../Empty Photo.png';
import MobileNav from "../../../MobileNav";
import Header from "./Header";

import icon from './Icons/icons8-home-40.png';
import valorIcon from './Icons/Valor 4 icon.png';

import { Auth, API, Storage } from 'aws-amplify';

import './Fields/styles.css';
import PictureLink from "./Fields/PictureLink";

const Field = ({ field, title, hidden }) => (
    <div className="flex w-full h-auto items-center border-[1px]  bg-slate-300 border-gray-400">
        <div className={`w-2/5 h-full hidden sm:flex items-center justify-end py-1 px-4 font-semibold text-lg ${hidden ? 'text-gray-500' : 'text-black'}`}>
                {title}
        </div>
        <div className="w-full h-full bg-white flex flex-wrap sm:flex-nowrap items-center py-2 justify-end px-4">
            {field}
        </div>
    </div>
);



const PropertyDetails = () => {
    const { id } = useParams();
    const [selected, setSelected] = useState(null);
    const [ employee, setEmployee ] = useState('');
    const [ prop, setProp ] = useState('');
    const [ propertyImage, setPropertyImage ] = useState('');
    const [ loaded, setIsLoaded ] = useState('');

    // const { isLoaded, loadError } = useLoadScript({
    //     googleMapsApiKey: GoogleAPI // ,
    //     // ...otherOptions
    //   })

     // Google Map
        // const renderMap = () => {
        //     const onLoad = (
        //         function onLoad (mapInstance) {

        //         }
        //     )

        //     return <GoogleMap onLoad={onLoad} mapContainerStyle={{ width: '100%', height: '92vh' }} zoom={12} center={{ lat: prop.lat, lng: prop.lng }}>
        //         <Marker label={prop.address} center={{ lat: prop.lat, lng: prop.lng }} position={{ lat: prop.lat, lng: prop.lng }} />
        //     </GoogleMap>
        // }

    const getSession = async () => {
        await Auth.currentAuthenticatedUser().then((user) => {
            setEmployee(user)
        })
        .catch(() => {
            navigate('/');
            // setLoggedIn(false)
        });
    };
        // Check if there is a logged in employee

    const [ isDeleting, setIsDeleting ] = useState(false);
    const [ isLoadingProp, setIsLoadingProp ] = useState(false);
    const [ openUpdate, setOpenUpdate ] = useState(false);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: GoogleAPI 
    })
    useEffect(() => {
    setIsLoaded(isLoaded)
    }, [loaded, prop])


    // API
    const apiName = 'valproperties';
    const path = `/inventory/${id}`;
    const init = {
        queryStringParameters: {
            id: id
        }
    };
    // 

    // useEffect(() => {
    //     if(prop.propPhoto != '' && prop.propPhoto != undefined){
    //         Storage.get(prop.propPhoto, {
    //             download: false
    //         })
    //         .then(image => setPropertyImage(image))
    //     }
    // },[])

    
    const loadProperty = async () => {
        setIsLoadingProp(true)
        await API.get(apiName, path, init)
        .then(res => res.Items.map(prop => prop.id === id && setProp(prop)))
        setIsLoadingProp(false)
    }
    

    useEffect(() => {
        getSession()
        loadProperty()
    },[])

    // useEffect(() => {
    //     API.get(apiName, path, init)
    //     .then(res => res.Items.map(prop => prop.id === id && setProp(prop)))
    // },[prop])
    

    // useEffect(() => {
    //     API.get('valproperties', '/photos', {
    //         queryStringParameters: {
    //             propPhoto: prop.propPhoto
    //         }
    //     })
    //     .then(url => setPropertyImage(url))
    //     .catch(err => console.log(err))
    // }, [propertyImage])

    useEffect(() => {
        if(prop.propPhoto != '') {
            API.get('valproperties', '/photos', {
                queryStringParameters: {
                    propPhoto: prop.propPhoto
                }
            })
            .then(url => setPropertyImage(url))
            .catch(err => console.log(err))
        } else (setPropertyImage(emptyPhoto))
},[prop, propertyImage])

console.log(prop)


    const [showHidden, setShowHidden] = useState(false);
    const [ deleteModal, setDeleteModal ] = useState(null);

    // Audited API
    const auditPath = `/properties/${prop.id}/audited`;
    // 
    const handleAudited = (e) => {
        API.put(apiName, auditPath, {
            body: {
                id: prop.id,
                audited: e.target.value
            }
            })
            .then(() => {
            setOpenUpdate(true)
            })
    };
    
    const handleHidden = (e) => {
        setShowHidden(e.target.checked);
    };
    
    const [ photoModal, setPhotoModal ] = useState(null);
    const [ photo, setPhoto ] = useState('');

    const closePhotoModal = () => {
        setPhotoModal(null)
    };

    async function onChange(e) {
        const file = e.target.files[0];
        setPhoto(file);
        
    };

    // Property Photo API
    const propPhotoPath = `/properties/${prop.id}/propPhoto`;
    // 
    const savePhoto = async () => {
        API.put(apiName, propPhotoPath, {
            body: {
                id: prop.id,
                propPhoto: photo.name
            }
            })
            .then(() => {
            Storage.put(photo.name, photo)
            setOpenUpdate(true)
            // window.location.reload(false)
            })
    };
    
    
    const navigate = useNavigate();
    const classes = useStyles();
    
    const currencyFormat = new Intl.NumberFormat('en-US', {maximumFractionDigits: 2});
    // Acq Final Price
    const one = prop?.salePrice?.replace('$', '');
    const two = prop?.acqDrop?.replace('$', '');
    const six = prop?.acqIncrease?.replace('$', '');
    const three = one?.replace(',', '');
    const four = two?.replace(',', '');
    const seven = six?.replace(',', '');

    const acqFinalContract = (Number(three) - Number(four) + Number(seven));

    let acqFinal = currencyFormat.format(parseFloat(acqFinalContract)); //uses the Intl.NumberFormat to format the number according to US number standards to only 2 decimal places.
    let acqFinalNumber = "$" + acqFinal; //simply concatenates the $ to the front of the number

    // Dispo Final Price
    const dispoPriceRemoveDollar = prop?.dispoContractPrice?.replace('$', '');
    const dispoDrop = prop?.dispoPriceDrop?.replace('$', '');
    const dispoIncrease = prop?.dispoPriceIncrease?.replace('$', '');
    const dispoPrice = dispoPriceRemoveDollar?.replace(',', '');
    const dispoDropPrice = dispoDrop?.replace(',', '');
    const dispoIncreasePrice = dispoIncrease?.replace(',', '');

    const dispoPriceNumber = (Number(dispoPrice) - Number(dispoDropPrice) + Number(dispoIncreasePrice));

    const parseDispoPrice = currencyFormat.format(parseFloat(dispoPriceNumber)); //uses the Intl.NumberFormat to format the number according to US number standards to only 2 decimal places.
    const dispoFinal = "$" + parseDispoPrice; //simply concatenates the $ to the front of the number

    // Revenue
    
    const revenueNumber = (dispoPriceNumber - acqFinalContract);
    const parseRevenue = currencyFormat.format(parseFloat(revenueNumber));
    const revenueFinal = '$' + parseRevenue;

    // Gross Profit
    const goodsRemoveDollar = prop?.goodsSold?.replace('$', '');
    const goodsPrice = goodsRemoveDollar?.replace(',', '');

    const grossProfitNumber = (revenueNumber + Number(goodsPrice));
    const parseGrossProfit = currencyFormat.format(parseFloat(grossProfitNumber));
    const positiveGP = parseGrossProfit > 0 ? parseGrossProfit : 0;
    const grossProfit = '$' + parseGrossProfit;

    // Split 50/50
    const splitFifty = (grossProfitNumber / 2);
    const parseSplitFifty = currencyFormat.format(parseFloat(splitFifty));
    const acqGPFifty = '$' + parseSplitFifty;

    const [tc, setTC] = useState(prop.tc);
    const tcPath = `/properties/${prop.id}/tc`;
    const handleTC = (e) => {
        API.put(apiName, tcPath, {
            body: {
                id: prop.id,
                tc: e.target.value
            }
            })
            .then(() => {
            setTC(e.target.value)
            setOpenUpdate(true)
            })
    };

    useEffect(() => {
        setTC(prop.tc)
    },[prop])

    console.log(prop.tc)

    if (isLoadingProp) {
        return <Modal sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}} open={isLoadingProp} onClose={() => setIsLoadingProp(false)}>
        <div className="flex flex-col py-3 z-50 items-center justify-center w-full h-full relative">
            <h1 className="font-semibold text-lg text-white ">Loading Property...</h1>
            <CircularProgress color="success" />
        <h1 className="text-xl absolute bottom-3 right-2 text-sky-500 font-semibold">
            Valor Enterprises LLC
        </h1>
        </div>
    </Modal>
    }


    // Delete Property
    const closeDelete = () => {
        setDeleteModal(false);
    };
    const deleteProperty = async () => {
        setIsDeleting(true)
        if(prop.propPhoto != '') {
            return Storage.remove(prop.propPhoto)
        }
        API.del(apiName, path, {
            body: {
                id: prop.id
            }
        })
        try {
            setDeleteModal(false);
            setIsDeleting(false);
            navigate('/acquisitions');
        } catch (error) {
            console.log(error)
        }
    };

    const closeSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
    
        setOpenUpdate(false);
    };

    const updateAction = (
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
      <div className='flex flex-col h-full w-full pb-28 sm:pb-2'>
        <div className="fixed right-0 bottom-0 hidden sm:flex bg-white w-auto h-20 items-center justify-center px-5 py-2 z-50 shadow-lg rounded-lg">
        <FormGroup>
            <FormControlLabel control={<Switch checked={showHidden} onChange={handleHidden} inputProps={{ 'aria-label': 'controlled' }} />} label='Show Hidden Fields' />
        </FormGroup>
        </div>
            <Header prop={prop}/>
            <Modal open={isDeleting} sx={{ zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', height: "100%", width: '100%' }} onClose={() => setIsDeleting(false)}>
                <div className='flex flex-col my-3 justify-center items-center'>
                    <h1 className='text-xl font-semibold text-white'>Deleting Property</h1>
                    <CircularProgress />
                </div>
            </Modal>
            <Snackbar open={openUpdate} autoHideDuration={2500} onClose={closeSnackBar} message='Property has been updated' action={updateAction} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} />
            <Box sx={{ backgroundColor: 'white', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 0, padding: 0}}>
                <Modal style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClose={closePhotoModal} open={photoModal}>
                    <Box sx={{ width: '30%', height: '30%', display: 'flex', flexDirection: 'column', alignItems: 'center', bgcolor: 'white' }}>
                        <Typography style={{ marginBottom: '1em' }} component='h4' variant='h4'>
                            Upload a property photo 
                        </Typography>
                        <input type='file' onChange={onChange} />
                        <Button onClick={savePhoto} style={{ marginTop: '1em', color: 'blue' }} variant='outlined'>
                            Upload
                        </Button>
                    </Box>
                </Modal>
                <Modal style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClose={closeDelete} open={deleteModal}>
                    <Box sx={{ width: '30%', height: '30%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', bgcolor: 'white' }}>
                        <h1 className='p-1 font-semibold text-2xl text-center'>
                            Are you sure you want to delete this property?
                        </h1>
                        <div className='flex gap-x-3 mx-2 pt-2'>
                            <button className="flex items-center justify-center px-5 py-1 rounded-lg border border-sky-500 cursor:pointer hover:drop-shadow-md transform duration-200 ease-in hover:scale-105 font-semibold text-lg text-cyan-500" onClick={deleteProperty} >Yes</button>
                            <button className="flex items-center justify-center px-5 py-1 rounded-lg border border-sky-500 cursor:pointer hover:drop-shadow-md transform duration-200 ease-in hover:scale-105 font-semibold text-lg text-cyan-500" onClick={closeDelete}>No</button>
                        </div>
                    </Box>
                </Modal>
                <div className='flex w-full h-[600px]'>
                    <div style={{ backgroundColor: '#135772', backgroundOrigin: 'content-box' }} className="relative h-[350px] md:h-[600px] w-full bg-no-repeat bg-center">
                        <img className='w-full h-full' src={propertyImage || emptyPhoto} />
                            <div className="flex h-full w-full opacity-0 hover:opacity-100 hover:cursor-pointer items-center justify-center absolute z-50 top-0" onClick={() => setPhotoModal(true)} >
                                    <h1 className='text-white font-semibold text-2xl' variant='h4'>
                                        Upload Property Photo
                                    </h1>
                            </div>
                    </div>
                    <div className='hidden md:inline-block w-full h-full relative'>
                        {/* streetView={true} */}
                                {loaded && 
                                <GoogleMap options={{ mapTypeId: 'hybrid', tilt: 45, heading: 90 }} mapContainerStyle={{ width: '100%', height: '600px' }} zoom={19} center={{ lat: prop.lat, lng: prop.lng }}>
                                    <Marker title={prop?.address?.replace(', USA', '')} icon={valorIcon} center={{ lat: prop.lat, lng: prop.lng }} position={{ lat: prop.lat, lng: prop.lng }} />
                                    {/* {prop && 
                                        <StreetViewPanorama
                                        position={{ lat: prop.lat, lng: prop.lng }}
                                        visible={true}
                                        options={{ pov: { pitch: 0, heading: 90 }, zoom: 0  }}
                                        
                                        />
                                    } */}
                                </GoogleMap>
                                }
                    </div>
                </div>
                <div className='flex w-full flex-wrap px-5 py-1'>
                    <div className='flex flex-col flex-1 px-6'>
                        <Typography variant="h4" component="h2">{prop?.address?.replace(', USA', '')}</Typography>
                        <Typography variant="h6" color="textSecondary" component="h2">Created by: {prop.name}  </Typography>
                        <Typography gutterBottom variant="body3"><Moment style={{ color: '#00000099' }} fromNow>{prop.date}</Moment></Typography>
                        <Grid container spacing={2}>
                            {/* Hidden Fields */}
                            <Box sx={{ display: 'flex', flexDirection: 'column', paddingTop: '1em' }}>
                                <FormGroup sx={{ width: "auto" }}>
                                    <FormControlLabel control={<Switch checked={showHidden} onChange={handleHidden} inputProps={{ 'aria-label': 'controlled' }} />} label='Show Hidden Fields' />
                                </FormGroup>
                                <FormGroup>
                                    {employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Auditor') >= 0 ? (
                                        <FormControlLabel control={<Switch defaultChecked={prop.audited} onChange={handleAudited} inputProps={{ 'aria-label': 'controlled' }} />} label='Property Audited' />
                                    ) :
                                    <FormControlLabel control={<Switch disabled checked={prop.audited} inputProps={{ 'aria-label': 'controlled' }} />} label='Property Audited' />
                                    }
                                </FormGroup>
                                {employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Admin') >= 0 || employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Operations') >= 0 ? (
                                    <Button onClick={() => setDeleteModal(true)} sx={{ marginTop: '1em', color: '#088affbf', borderColor: '#088affbf' }} variant="outlined">Delete Property</Button>
                                ):
                                <Button disabled style={{ marginTop: '1em' }} variant="outlined">Delete Property</Button>
                                }
                            </Box>
                            {/* TC */}
                            <Grid item xs={12}>
                                <FormControl sx={{ pb: 2 }} component="fieldset" variant="standard">
                                    <FormLabel component="legend">Assign TC</FormLabel>
                                    <FormGroup row>
                                        {employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Admin') >= 0 || employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Operations') >= 0 ? (
                                            <ToggleButtonGroup
                                            color='primary'
                                            value={tc}
                                            exclusive
                                            onChange={handleTC}
                                            aria-label="Platform"
                                            >
                                                <ToggleButton value='Laura Humble'>
                                                Laura Humble
                                                </ToggleButton>
                                                <ToggleButton value='Kristin Frabotta'>
                                                Kristin Frabotta
                                                </ToggleButton>
                                                <ToggleButton value='Jacob Loch'>
                                                Jacob Loch
                                                </ToggleButton>
                                            </ToggleButtonGroup>
                                        ) :
                                        <ToggleButtonGroup
                                        color='primary'
                                        value={prop.tc}
                                        exclusive
                                        disabled
                                        aria-label="Platform"
                                        >
                                            <ToggleButton value='Laura Humble'>
                                            Laura Humble
                                            </ToggleButton>
                                            <ToggleButton value='Kristin Frabotta'>
                                            Kristin Frabotta
                                            </ToggleButton>
                                            <ToggleButton value='Jacob Loch'>
                                            Jacob Loch
                                            </ToggleButton>
                                        </ToggleButtonGroup>
                                        }
                                    </FormGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <div className="w-full h-auto py-1">
                            <Divider />
                            <Company prop={prop} />
                            <Territory setOpenUpdate={setOpenUpdate} prop={prop} id={id}   employee={employee} />
                            {/* File Type */}
                            <FileType setOpenUpdate={setOpenUpdate} prop={prop} id={id}   employee={employee} />
                            <Market setOpenUpdate={setOpenUpdate} prop={prop} id={id}   employee={employee} />
                            <Typography gutterBottom variant="h6" color='light' component="h6">Property Status</Typography>
                            <Status setOpenUpdate={setOpenUpdate}  prop={prop} id={id}   employee={employee}/>
                            <TransactionType setOpenUpdate={setOpenUpdate} prop={prop} id={id}   employee={employee} />
                            <PictureLink setOpenUpdate={setOpenUpdate} prop={prop} id={id}  />
                        </div>
                    </div>

                </div>
                            <Divider sx={{ width: '100%' }} />
                <div style={{ backgroundColor: '#135772' }} className='gap-y-4 py-5 w-full'>
                        <Grid container>
                            <Grid item xs={12}>
                                <div className='flex flex-col items-center w-full justify-center px-5'>
                                <Field title='Supplier' field={<TextField style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: "100%", height: '100%', border: '1px' }} InputProps={{ readOnly: true, disableUnderline: true }} label='Supplier' variant="standard" value={prop.supplierName}  />} />
                                <Field title="Supplier's Phone" field={<TextField style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: "100%", height: '100%', border: '1px' }} InputProps={{ readOnly: true, disableUnderline: true }} label="Supplier's Phone" variant="standard" value={prop.supplierPhone}  />} />
                                <Field title="Supplier's Email" field={<TextField style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: "100%", height: '100%', border: '1px' }} InputProps={{ readOnly: true, disableUnderline: true }} label="Supplier's Email" variant="standard" value={prop.supplierEmail}  />} />

                                    {showHidden && (
                                        <Field hidden={true} title="File Notes" field={<FileNotes ThemeProvider={ThemeProvider} prop={prop} id={id}  employee={employee} />} />
                                    )}

                                    <Field title="Acquisitions Date" field={<AcqDate prop={prop} />} />
                                    <Field title="Inspection Period" field={<InspectionPeriod prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />} />
                                    <Field title="Post Possession" field={<PostPossession prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />} />
                                    <Field title="Earnest Deposit Status" field={<EarnestDeposit prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />} />

                                    {showHidden && 
                                        <Field hidden={true} title="EMD Check/Wire Transaction Number" field={<EMDCheck prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />} />
                                    }

                                    <Field title="Our Earnest Amount" field={<EMD prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />} />
                                    <Field title="Acq Contract Price" field={<AcqContractPrice prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />} />

                                    {showHidden && 
                                    <>
                                        <Field hidden={true} title="Acq Price Drops" field={<AcqPriceDrops prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />} />
                                        <Field hidden={true} title="Acq Price Increase" field={<AcqPriceIncrease prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />} />
                                        <Field hidden={true} title="Additional Cost" field={<AdditionalCost prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />} />
                                    </>
                                    }

                                    <Field title="Option Fee" field={<OptionFee prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />} />

                                    {showHidden && 
                                    <>
                                        <Field hidden={true} title="First Leg Credits" field={<FirstLegCredits prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />} />
                                        <Field hidden={true} title="First Leg Debits" field={<FirstLegDebits prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />} />
                                    </>
                                    }

                                    <Field title="Acq Final Cost" field={<AcqFinalCost prop={prop} acqFinalNumber={acqFinalNumber}/>} />
                                    <Field title="Escrow Officer" field={<EscrowOfficer prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />} />

                                    {showHidden && 
                                        <Field hidden={true} title="Escrow Officer (Second Leg)" field={<SecondEscrow prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />} />
                                    }

                                    <Field title="Who Sold this Property" field={<WhoSold prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />} />
                                    <Field title="Who Assisted this Sale?" field={<WhoAssisted prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />} />
                                    <Field title="Sold By" field={<SoldBy prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />} />
                                    <Field title="Dispo Contract Price" field={<DispoContractPrice prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />} />

                                    {showHidden && 
                                    <>
                                        <Field hidden={true} title="Dispo Price Drop" field={<DispoPriceDrop prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />} />
                                        <Field hidden={true} title="Dispo Price Increase" field={<DispoPriceIncrease prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />} />
                                        <Field hidden={true} title="Second Leg Credits" field={<SecondLegCredits prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />} />
                                        <Field hidden={true} title="Second Leg Debits" field={<SecondLegDebits prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />} />
                                        <Field hidden={true} title="Buyer Credits" field={<BuyerCredits prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />} />
                                        <Field hidden={true} title="Per Diem Charged to Buyer" field={<PerDiem prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />} />
                                    </>
                                    }

                                    <Field title="Dispo Final Price" field={<DispoFinal prop={prop} id={id} dispoFinal={dispoFinal} setOpenUpdate={setOpenUpdate} employee={employee} />} />
                                    
                                    {showHidden && 
                                    <>
                                        <Field hidden={true} title="Revenue" field={<Revenue prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />} />
                                        <Field hidden={true} title="Goods Sold" field={<GoodsSold prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />} />
                                        <Field hidden={true} title="Gross Profit" field={<GrossProfit grossProfit={grossProfit} prop={prop} id={id} setOpenUpdate={setOpenUpdate} employee={employee} />} />
                                    </>
                                    }

                                    <Field title="Sold GP" field={<SoldGP prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />} />
                                    <Field title="Pricing Date" field={<PricingDate prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />} />
                                    <Field title="Commitments & Purchases Relationship" field={<CommitRelation prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />} />
                                    <Field title="Source of Deal" field={<SourceOfDeal prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />} />
                                    <Field title="Estimated COE Date" field={<COE prop={prop} />} />
                                    <Field title="Type of Access" field={<Access prop={prop} />} />
                                    <Field title="Status of Sellers Docs" field={<SellerDocs prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />} />
                                    <Field title="Status of Cash Buyer's Docs" field={<BuyerDocs prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />} />
                                    <Field title="Buyer's Earnest Deposit" field={<BuyerEMD prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />} />
                                    <Field title="Status of Buyer's EMD" field={<BuyersEarnest prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />} />
                                    <Field title="Date Buyer's EMD was Deposited" field={<BuyerEMDDate prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />} />
                                    <Field title="Buyer Contact" field={<BuyerContact prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />} />

                                        {showHidden && (
                                            <>
                                            <Field hidden={true} title="Commissions" field={<Commissions prop={prop} id={id} setOpenUpdate={setOpenUpdate} employee={employee} />} />
                                            <Field hidden={true} title="Payouts" field={<Payouts prop={prop} id={id} setOpenUpdate={setOpenUpdate} employee={employee} />} />
                                            <Field hidden={true} title="Payout Recipient" field={<PayoutRecipient prop={prop} id={id} setOpenUpdate={setOpenUpdate} employee={employee} />} />
                                            <Field hidden={true} title="Status of Payouts" field={<StatusPayouts prop={prop} id={id} setOpenUpdate={setOpenUpdate} employee={employee} />} />
                                            </>
                                        )}

                                        <Field title="Buyer's Acquisition Date'" field={<BuyerAcqDate prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />} />
                                        <Field title="Buyer's Close Date'" field={<BuyerCloseDate prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />} />
                                        <Field title="Wholesale Price" field={<NetPrice prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />} />
                                        
                                        {showHidden &&
                                            <Field hidden={true} title="Additional Compensation" field={<AddComp prop={prop} id={id} setOpenUpdate={setOpenUpdate} employee={employee} />} />
                                        }
                                        <Field title="Date of Completion" field={<CompletionDate prop={prop} />} />
                                        <Field title="Due to Us" field={<DueToUs prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />} />

                                        {showHidden &&
                                        <Field hidden={true} title="Status of Actual Gross Profit" field={<StatusGP prop={prop} id={id} setOpenUpdate={setOpenUpdate} employee={employee} />} />
                                        }

                                        <Field title="Split" field={<Split prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />} />   
                                        <Field title="Acq Projected GP" field={<AcqGP acqGPFifty={acqGPFifty} grossProfit={grossProfit} prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />} />
                                        <Field title="Files" field={<Files prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />} />  
                                </div>
                            </Grid>
                        </Grid>
                </div>
        </Box>
            <MobileNav />
        </div>
  )
}

export default PropertyDetails