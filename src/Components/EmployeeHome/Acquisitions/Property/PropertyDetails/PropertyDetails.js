import { useEffect, useState, useContext, Fragment } from "react";
import { AccountContext } from "../../../../Login/Account";
import { FormGroup, FormControlLabel, FormLabel, Switch, FormControl, ButtonGroup, Paper, Typography, CircularProgress, Divider, Box, Grid, CardMedia, Modal, Button, Container, IconButton, Snackbar, ModalManager, NoSsr  } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ThemeProvider } from "@material-ui/core";
import FileBase64 from 'react-file-base64';

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

import { Auth, API, Storage } from 'aws-amplify';

import './Fields/styles.css'


const PropertyDetails = () => {
    const { id } = useParams();
    const [ employee, setEmployee ] = useState('');
    const [ prop, setProp ] = useState('');
    const [ propertyImage, setPropertyImage ] = useState('');

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
    //     API.get('valproperties', '/photos', {
    //         queryStringParameters: {
    //             propPhoto: prop.propPhoto
    //         }
    //     })
    //     .then(url => setPropertyImage(url))
    //     .catch(err => console.log(err))
    // }, [propertyImage])

    const loadPhoto = () => {
        if(prop.propPhoto != '') {
            API.get('valproperties', '/photos', {
                queryStringParameters: {
                    propPhoto: prop.propPhoto
                }
            })
            .then(url => setPropertyImage(url))
            .catch(err => console.log(err))
        }
    }

    useEffect(() => {
        if(photo === '') {
            loadPhoto()
        }
},[prop])

    const [showHidden, setShowHidden] = useState(false);
    const [ deleteModal, setDeleteModal ] = useState(null);
          // Props API
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

    const savePhoto = async () => {
        Storage.put(photo.name, photo).then(() => window.location.reload(false))
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

    const [tc, setTC] = useState({
        laura: prop.tc?.laura,
        kristen: prop.tc?.kristen,
        jacob: prop.tc?.jacob,
    });
    const tcPath = `/properties/${prop.id}/tc`;
    const submitTC = () => {
        API.put(apiName, tcPath, {
            body: {
                id: prop.id,
                tc: tc
            }
            })
            .then(() => {
            setOpenUpdate(true)
            })
            .catch(err => console.log(err))
    }
    const handleTC = (e) => {
        setTC({ ...tc, [e.target.name]: e.target.checked });
    }


    if (isLoadingProp) {
        return <Modal sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}} open={isLoadingProp} onClose={() => setIsLoadingProp(false)}>
        <div className="flex flex-col py-3 z-50 items-center justify-center">
            <h1 className="font-semibold text-lg text-white ">Loading Property...</h1>
            <CircularProgress color="success" />
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
            setDeleteModal(false)
            setIsDeleting(false);
            setOpen(true);
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
      <Box sx={{ ml: { xs: 0, sm: 0 }, pb: { xs: 8, sm: 5 }, display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center'  }}>
        <div className="fixed right-0 bottom-0 flex bg-white w-auto h-20 items-center justify-center px-5 py-2 z-50 shadow-lg rounded-lg">
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
            <Box sx={{ backgroundColor: 'white', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
                    <Box sx={{ width: '30%', height: '30%', display: 'flex', flexDirection: 'column', alignItems: 'center', bgcolor: 'white' }}>
                        <Typography style={{ padding: '1em', textAlign: 'center' }} component='h4' variant='h4'>
                            Are you sure you want to delete this property?
                        </Typography>
                        <ButtonGroup>
                            <Button style={{ marginRight: '1em' }} size='large' color='secondary' onClick={deleteProperty} variant='outlined'>Yes</Button>
                            <Button size='large' color='secondary' onClick={closeDelete} variant='outlined'>No</Button>
                        </ButtonGroup>
                    </Box>
                </Modal>
                <div className={classes.card}>
                    <div className={classes.section}>
                        <Typography variant="h4" component="h2">{prop?.address?.replace(', USA', '')}</Typography>
                        <Typography variant="h6" color="textSecondary" component="h2">Created by: {prop.name}  </Typography>
                        <Typography gutterBottom variant="body3"><Moment style={{ color: '#00000099' }} fromNow>{prop.date}</Moment></Typography>
                        <Grid container spacing={2}>
                            {/* Hidden Fields */}
                            <Grid item xs={12}>
                                <FormGroup>
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
                            </Grid>
                            {/* TC */}
                            <Grid item xs={12}>
                                <FormControl sx={{ pb: 5 }} component="fieldset" variant="standard">
                                    <FormLabel component="legend">Assign TC</FormLabel>
                                    <FormGroup row>
                                        {employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Admin') >= 0 || employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Operations') >= 0 ? (
                                            <>
                                            <FormControlLabel
                                            control={
                                                <Switch color='primary' checked={prop.tc?.laura != undefined ? prop.tc.laura : tc.laura} onChange={handleTC} onBlur={submitTC} name="laura" />
                                            }
                                            label="Laura Humble"
                                            />
                                            <FormControlLabel
                                            control={
                                                <Switch color='primary' checked={prop.tc?.kristen != undefined ? prop.tc.kristen : tc.kristen} onChange={handleTC} onBlur={submitTC} name="kristen" />
                                            }
                                            label="Kristen Frabotta"
                                            />
                                            <FormControlLabel
                                            control={
                                                <Switch color='primary' checked={prop.tc?.jacob != undefined ? prop.tc.jacob : tc.jacob} onChange={handleTC} onBlur={submitTC} name="jacob" />
                                            }
                                            label="Jacob Loch"
                                            />
                                            </>
                                        ) :
                                        <>
                                        <FormControlLabel
                                        control={
                                            <Switch disabled checked={prop.tc?.laura != undefined ? prop.tc.laura : tc.laura} name="laura" />
                                        }
                                        label="Laura Humble"
                                        />
                                        <FormControlLabel
                                        control={
                                            <Switch disabled checked={prop.tc?.kristen != undefined ? prop.tc.kristen : tc.kristen} name="kristen" />
                                        }
                                        label="Kristen Frabotta"
                                        />
                                        <FormControlLabel
                                        control={
                                            <Switch disabled checked={prop.tc?.jacob != undefined ? prop.tc.jacob : tc.jacob} name="jacob" />
                                        }
                                        label="Jacob Loch"
                                        />
                                        </>
                                        }
                                    </FormGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Divider style={{ margin: '20px 0' }} />
                            <Company prop={prop} />
                            <Territory setOpenUpdate={setOpenUpdate} prop={prop} id={id}   employee={employee} />
                            {/* File Type */}
                            <FileType setOpenUpdate={setOpenUpdate} prop={prop} id={id}   employee={employee} />
                            <Market setOpenUpdate={setOpenUpdate} prop={prop} id={id}   employee={employee} />
                            <Typography gutterBottom variant="h6" color='light' component="h6">Property Status</Typography>
                            <Status setOpenUpdate={setOpenUpdate}  prop={prop} id={id}   employee={employee}/>
                            <TransactionType setOpenUpdate={setOpenUpdate} prop={prop} id={id}   employee={employee} />
                            
                        </Grid>
                    </div>
                    <div style={{ backgroundImage: `${`url(${propertyImage})` || `url(${emptyPhoto})`}`, backgroundSize: '90% 100%' }} className="relative h-[800px] w-3/5 rounded-md bg-no-repeat bg-center">
                        <div className="flex h-full w-full opacity-0 hover:opacity-100 hover:cursor-pointer bg-[#0000007a] items-center justify-center absolute z-50 rounded-md top-0" onClick={() => setPhotoModal(true)} >
                                <h1 className='text-white font-semibold text-2xl' variant='h4'>
                                    Upload Property Photo
                                </h1>
                        </div>
                    </div>
                </div>
                            <Divider sx={{ width: '100%' }} />
                <div style={{ paddingRight: '2em' }} className={classes.card}>
                    <div className={classes.section}>
                        <Grid container>
                            <Grid item xs={12} lg={6}>

                                <Box sx={{ width: '95%', display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }} container spacing={2}>
                                    <Supplier prop={prop} />
                                    {showHidden && (
                                        <FileNotes ThemeProvider={ThemeProvider} prop={prop} id={id}   employee={employee} />
                                    )}
                                    <AcqDate prop={prop} />
                                    <InspectionPeriod prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />
                                    <PostPossession prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />
                                    <EarnestDeposit prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />
                                    {showHidden && 
                                    <EMDCheck prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />
                                    }
                                        <EMD prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />
                                    <AcqContractPrice prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />
                                    {showHidden && 
                                        <AcqPriceDrops prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />
                                    }
                                    {showHidden && 
                                        <AcqPriceIncrease prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />
                                    }
                                    {showHidden && 
                                        <AdditionalCost prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />
                                    }
                                    <OptionFee prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />
                                    {showHidden && 
                                        <FirstLegCredits prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />
                                    }
                                    {showHidden && 
                                        <FirstLegDebits prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />
                                    }
                                    <AcqFinalCost acqFinalNumber={acqFinalNumber} prop={prop} />
                                    <EscrowOfficer prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee}  />
                                    {showHidden && 
                                        <SecondEscrow prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee}  />
                                    }
                                    <WhoSold prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />
                                    <WhoAssisted prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />
                                    <SoldBy prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />
                                    <DispoContractPrice prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />
                                    {showHidden && 
                                    <>
                                        <DispoPriceDrop prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />
                                        <DispoPriceIncrease prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />
                                        <SecondLegCredits prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />
                                        <SecondLegDebits prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />
                                        <BuyerCredits prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />
                                        <PerDiem prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />
                                    </>
                                    }
                                    <DispoFinal dispoFinal={dispoFinal} prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />
                                    {showHidden && 
                                    <>
                                        <Revenue revenueFinal={revenueFinal} prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />
                                        <GoodsSold prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />
                                        <GrossProfit grossProfit={grossProfit} prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />
                                    </>
                                    }
                                    <SoldGP prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />
                                    <PricingDate prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />
                                    <CommitRelation prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />
                                    <Typography gutterBottom variant="h6" color='light' component="h6">Source of Deal</Typography>
                                    <SourceOfDeal  prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />
                                    <COE prop={prop}  />
                                    <Access prop={prop} />
                                </Box>
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <Box sx={{ width: '95%', display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
                                    <Typography gutterBottom variant="h6" color='light' component="h6">Status of Sellers Docs</Typography>
                                        <SellerDocs  prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />
                                    <Typography gutterBottom variant="h6" color='light' component="h6">Status of Cash Buyer's Docs</Typography>
                                        <BuyerDocs  prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />
                                        <BuyerEMD prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />
                                    <Typography gutterBottom variant="h6" color='light' component="h6">Buyer's Earnest Deposit</Typography>
                                        <BuyersEarnest prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee}  />
                                        <BuyerEMDDate prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />
                                        <BuyerContact prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />
                                        {showHidden && (
                                            <Commissions prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />
                                        )}
                                        {showHidden && 
                                            <Payouts prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />
                                        }
                                        {showHidden && 
                                            <PayoutRecipient prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />
                                        }
                                        {showHidden && 
                                        <>
                                            <Typography gutterBottom variant="h6" color='light' component="h6">Status of Payouts</Typography>
                                                <StatusPayouts prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />
                                        </>
                                        }
                                        <BuyerAcqDate prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />
                                        <BuyerCloseDate prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />
                                        <NetPrice prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />
                                        {showHidden &&
                                            <AddComp prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />
                                        }
                                        <CompletionDate prop={prop} />
                                        <DueToUs prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />
                                        {showHidden &&
                                        <>
                                        <Typography gutterBottom variant="h6" color='light' component="h6">Status of Actual Gross Profit</Typography>
                                            <StatusGP prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />
                                        </>
                                        }
                                        <Split prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} />
                                        <AcqGP prop={prop} id={id}  setOpenUpdate={setOpenUpdate} employee={employee} acqGPFifty={acqGPFifty} grossProft={grossProfit} />
                                        <Typography gutterBottom variant="h6" color='light' component="h6">Files</Typography>
                                        <Files prop={prop} id={id} setOpenUpdate={setOpenUpdate} employee={employee} />

                                </Box>
                            </Grid>
                        </Grid>
                    </div>
                </div>
        </Box>
            <MobileNav />
        </Box>
  )
}

export default PropertyDetails