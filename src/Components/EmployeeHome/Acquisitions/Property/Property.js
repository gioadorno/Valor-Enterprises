import { Card, CardActions, CardContent, CardMedia, Typography, ButtonBase, Modal, ButtonGroup, Button, Box, IconButton,  } from '@material-ui/core';
import useStyles from './styles';
import DeleteIcon from '@mui/icons-material/Delete';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import emptyPhoto from './Empty Photo.png'
import moment from 'moment';
import EmailIcon from '@mui/icons-material/Email';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { Storage, API } from 'aws-amplify';
import { AccountContext } from '../../../Login/Account';
import { CircularProgress, Snackbar } from '@mui/material'

    // API
    const apiName = 'valproperties';
    const path = '/inventory';
    // 

const Property = ({ prop, setOpen }) => {
    const [ propertyImage, setPropertyImage ] = useState('');
    const [ isDeleting, setIsDeleting ] = useState(false);
    const { employee } = useContext(AccountContext);



    const classes = useStyles();
    const navigate = useNavigate();
    const openProperty = () => {
        navigate(`/acquisitions/${prop.id}`);
    };
    const openDealText = () => {
        navigate(`/dealtext/${prop.id}`);
    };

    const openBlast = () => {
        navigate(`/emailblast/${prop?.id}`)
    }


    useEffect(() => {
        API.get('valproperties', '/photos', {
            queryStringParameters: {
                propPhoto: prop.propPhoto
            }
        })
        .then(url => setPropertyImage(url))
        .catch(err => console.log(err))
    }, [])


    
    const [ deleteModal, setDeleteModal ] = useState(null);
    const handleClose = () => {
        setDeleteModal(false)
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
        .then(() => {
            setDeleteModal(false)
            setIsDeleting(false);
            setOpen(true);
            window.location.reload(false)
        })
    }


  return (
            // <Card sx={{ display: 'flex', marginBottom: '1em', flexDirection: 'column', justifyContent: 'space-between', borderRadius: '15px', height: '100%', position: 'relative', alignItems: 'center', alignContent: 'center', '&:hover': { transform: 'scale(1.01)' }}}>
    <div className='bg-slate-100 w-5/6 xl:w-full h-full flex flex-col rounded-lg relative shadow-md my-1'>
    <Modal open={deleteModal} style={{ zIndex: '10', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }} onClose={handleClose}>
                <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', width: '30%', height: '30%', backgroundColor: 'white' }}>
                    <Typography>
                        Are you sure you want to delete this property?
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 4 }}>
                        <Button onClick={() => setDeleteModal(null)} size='medium' color='primary'>
                            No
                        </Button>
                        <Button onClick={deleteProperty} size='medium' color='primary'>
                            Yes
                        </Button>
                    </Box>  
                </Box>
            </Modal>
            <Modal open={isDeleting} sx={{ zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', height: "100%", width: '100%' }} onClose={() => setIsDeleting(false)}>
                <div className='flex flex-col my-3 justify-center items-center'>
                    <h1 className='text-xl font-semibold text-white'>Deleting Property</h1>
                    <CircularProgress />
                </div>
            </Modal>
            <div className='w-full h-[300px] flex hover:opacity-90 hover:shadow-lg duration-200 ease-in-out p-5'>
                <div className='w-[350px] relative'>
                    <img className='rounded-xl w-full h-full' src={propertyImage || emptyPhoto} />
                </div>
                <div className='flex-grow flex flex-col relative justify-start items-start'>
                    <div className='flex opacity-90 pl-4'>
                        <h6 className='font-semibold text-lg'>{prop.address.replace(', USA', '')}</h6>
                    </div>
                    <div className='flex opacity-70 pl-4 pt-2'>
                    {prop.status === 'Active' ? (
                            <p className='font-semibold text-xl text-[#00ff00]'>
                                Active
                            </p>
                        ) : prop.status === 'Pending' ?
                            <p className='font-semibold text-xl text-[orange]'>
                            Pending
                            </p>
                        : prop.status === 'Closed' ? (
                            <p className='font-semibold text-xl text-[#20b7b7]'>
                            Closed
                            </p>
                        )
                        : prop.status === 'Cancelled' && (
                            <p className='font-semibold text-xl text-[red]'>
                            Cancelled
                            </p>
                        )
                    }
                    </div>
                    <div className='flex opacity-70 pl-4 pt-2'>
                        {prop.beds != '' && (
                            <p>Beds: {prop.beds},&#160;</p>
                        )}
                        {prop.baths != '' && (
                            <p>Baths: {prop.baths}</p>
                        )}
                        {prop.lotSize != '' && (
                            <p>, Lot Size: {prop.lotSize.includes('.') ? `${prop.lotSize} acres` : `${prop.lotSize} sqft`}</p>
                        )}
                    </div>
                    <div className='flex opacity-70 pl-4 pt-1'>
                        {prop.netPrice != '' && (
                            <p>Wholesale Price: {prop.netPrice}&#160; | &#160;</p>
                        )}
                        {prop.arv != '' && (
                            <p>After Repair Value: {prop.arv}</p>
                        )}
                    </div>
                    <div className='flex opacity-100 pl-4 pt-2'>
                        <button onClick={openDealText} className='hover:scale(1.1) hover:text-[#ca3434] hover:border-[#ca3434] transform duration-150 ease-in px-4 py-1 border-[1px] rounded-md border-[#426ddb] text-[#426ddb] font-semibold'>Deal Text</button>
                        {employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Operations') >= 0 &&
                        <button onClick={openBlast} className='hover:scale(1.1) hover:text-[#ca3434] ml-5 hover:border-[#ca3434] transform duration-150 ease-in px-4 py-1 border-[1px] rounded-md border-[#426ddb] text-[#426ddb] font-semibold'>Email Blast</button>
                        }
                    </div>

                    {prop.market != '' && (
                        <h1 className='absolute bottom-1 left-4 text-md opacity-70'>Posted {moment(prop.date).fromNow()} by <strong>{prop.name}</strong></h1>
                    )}
                </div>
                <div className='w-[300px] flex flex-col items-center justify-evenly px-4 text-center'>
                        <h1 onClick={openProperty} className='font-semibold text-lg cursor-pointer group pt-5'><span className='group-hover:text-[#df2a3c] group-hover:text-xl transform duration-150 ease-in'>View more property details</span></h1>
                        {employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Admin') >= 0 &&
                        <div className='flex px-2'>
                            <h6 onClick={() => setDeleteModal(true)} className='font-semibold text-lg cursor-pointer group'><span className='group-hover:text-[#426ddb] group-hover:text-xl transform duration-150 ease-in'>Delete Property</span></h6>
                        </div>
                        }
                </div>
            </div>
    </div>
  )
}

export default Property