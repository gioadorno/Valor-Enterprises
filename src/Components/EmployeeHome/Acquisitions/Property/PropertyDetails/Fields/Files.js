import { Grid, ListItem, Button, CardMedia, Modal, Box, Typography, CircularProgress, ButtonGroup } from "@mui/material";
import { styled } from '@mui/material/styles';
import { Stack, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState, useContext } from "react";
import { API, Storage, Auth } from 'aws-amplify';

const createID = () => Math.random().toString(36).substring(2) + Date.now().toString(36);

const Files = ({ prop, setOpenUpdate, id, employee }) => {

    const name = employee?.attributes?.name;
    // API
    const apiName = 'valproperties';
    const path = `/properties/${prop.id}/files`;

    const [ deleteModal, setDeleteModal] = useState(false);

    const [ propertyFile, setFile ] = useState('');
    const [ isUpdating, setIsUpdating ] = useState(false);
    
    const [ propFile, setPropFile ] = useState('');
    let today = new Date();
    const placeholderDate = parseInt(today.getMonth()+1) + '-' + today.getDate() + "-" + today.getFullYear();


    const [getFileID, setGetFileID] = useState(null);
    const [uploadFiles, setUploadFiles] = useState({ 
        fileID: createID(),
        address: prop.address,
        fileName: '',
        date: placeholderDate,
        uploadBy: name
    });

    const changeFiles = async () => {
        try {
            setUploadFiles({ ...uploadFiles, uploadBy: name })
        } catch (error) {
            console.log(error)
        }
        setIsUpdating(true);
        Storage.put(propFile.name, propFile);
        await API.put(apiName, path, {
            body: {
                id: id,
                files: uploadFiles
            }
            })
            .then((res) => {
            setOpenUpdate(true)
            setIsUpdating(false)
            window.location.reload(true)
            })
            .catch(error => console.log(error))
    };

    console.log(uploadFiles)

    

    // File API
    const filePath = `/properties/${prop.id}`;
    // 

    const deleteFileFunction = () => {
        setDeleteModal(true);
    }

    const deleteFile = async() => {
        Storage.remove(getFileID.fileName)
        .then((res) => {
        API.del(apiName, filePath, {
            body: {
                id: id,
                fileID: getFileID.fileID
            }
        })
        console.log(res)
        setDeleteModal(false);
        setOpenUpdate(true);
        })
        // .then(() => window.location.reload(false))
        .catch(err => console.log(err))
    };

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        width: '100%',
        paddingTop: '1em',
        paddingBottom: '1em',
      }));

      async function onChange(e) {
        const file = e.target.files[0];
        setPropFile(file);
        setUploadFiles({ ...uploadFiles, fileName: file.name })
    };

    if (isUpdating) {
        return (
            <Modal sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}} open={isUpdating} onClose={() => setIsUpdating(false)}>
                <div className="flex flex-col py-3 z-50 items-center justify-center">
                    <h1 className="font-semibold text-lg text-white ">Uploading file...</h1>
                    <CircularProgress color="success" />
                </div>
            </Modal>
        )
    }

    const openPropFile = async (pdf) => {
        Storage.get(pdf)
        .then(newFile => setFile(newFile))
    }


  return (
    <Grid container style={{ width: '100%', marginTop: 3 }} spacing={2} >
            <Modal style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClose={() => setDeleteModal(false)} open={deleteModal}>
                    <div className="w-1/4 h-1/4 flex flex-col items-center justify-center bg-white rounded-md">
                        <h1 className="font-semibold text-lg pb-5">
                            Are you sure you want to delete this file?
                        </h1>
                        <div className="flex px-2">
                            <Button style={{ marginRight: '1em' }} size='medium' onClick={deleteFile} variant='outlined'>Yes</Button>
                            <Button size='medium' onClick={() => setDeleteModal(false)} variant='outlined'>No</Button>
                        </div>
                    </div>
                </Modal>
        <Stack style={{ width: '100%' }} spacing={2}>
        {prop?.files?.map((file) => 
                <Item className="grid grid-cols-2 items-center justify-center py-2" elevation={4} onMouseOver={() => {
                    setGetFileID(file)
                    openPropFile(file.fileName)
                    }}>
                    <Grid item>
                    <a className="font-semibold text-lg text-teal-600 hover:scale-105 hover:text-cyan-500 transform duration-200 ease-in" href={propertyFile} target='_blank' rel="noopener noreferrer" >
                        {file.fileName}
                    </a>
                    </Grid>
                    <Grid item>
                        <Typography color='primary'>
                            Attached by {file.uploadBy} on {file.date}
                        </Typography>
                    </Grid>
                    {/* {employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Admin') >= 0 && (
                        <Grid className="z-10" item>
                            <DeleteIcon sx={{ color: pink[500] }} className='hover:animate-bounce hover:duration-100 cursor-pointer z-10'  onClick={deleteFileFunction}>
                                Delete File
                            </DeleteIcon>
                        </Grid>
                    )}
                    {employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Operations') >= 0 && (
                        <Grid className="z-10" item>
                            <DeleteIcon sx={{ color: pink[500] }} className='hover:animate-bounce hover:duration-100 cursor-pointer z-10 transform ease-in'  onClick={deleteFileFunction}>
                                Delete File
                            </DeleteIcon>
                        </Grid>
                    )} */}
                </Item>
        )}
        </Stack>
                {employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Operations') >= 0 && (
                    <Grid item xs={12}>
                <input placeholder="Upload file" type='file' onChange={onChange} />
                {uploadFiles.fileName != '' ?
                <Button variant='contained' onClick={changeFiles}>
                    Upload
                </Button> 
                :
                <Button variant='contained' disabled>
                Upload a File
                </Button> 
                }
                    </Grid>
            )}
    </Grid>
  )
}

export default Files