import { Grid, ListItem, Button, CardMedia, Modal, Box, Typography, CircularProgress, ButtonGroup } from "@mui/material";
import { styled } from '@mui/material/styles';
import { Stack, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState, useContext, useRef } from "react";
import { API, Storage, Auth } from 'aws-amplify';
import { useNavigate } from "react-router-dom";
import { FaTrashAlt } from 'react-icons/fa';

const createID = () => Math.random().toString(36).substring(2) + Date.now().toString(36);


const Files = ({ prop, setOpenUpdate, id, employee }) => {
    const name = employee?.attributes?.name;
    const navigate = useNavigate();
    // const [ propFiles, setPropFiles ] = useState([]);
    const [ propertyFiles, setPropertyFiles ] = useState(prop.files);
    const [ deleteModal, setDeleteModal] = useState(false);

    const [ propertyFile, setFile ] = useState('');
    const [ isUpdating, setIsUpdating ] = useState(false);
    
    const [ propFile, setPropFile ] = useState('');
    let today = new Date();
    const placeholderDate = parseInt(today.getMonth()+1) + '-' + today.getDate() + "-" + today.getFullYear();

    const [getFileID, setGetFileID] = useState(null);
    const [uploadFiles, setUploadFiles] = useState({ 
        fileName: '',
        date: placeholderDate,
        uploadBy: name
    });
    const [dragActive, setDragActive] = useState(false);
    const handleDrag = e => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            e.preventDefault();
            setDragActive(true);
          } else if (e.type === "dragleave") {
            setDragActive(false);
          }
    };


    
    // API
    const apiName = 'valproperties';
    const path = `/properties/${prop.id}/files`;

    // const getFilePath = `/getfiles`;
    // const init = {
    //     queryStringParameters: {
    //         files: id
    //     }
    // };


    // useEffect(() => {
    //     prop?.files?.map(file => {
    //         API.get(apiName, getFilePath, {
    //             queryStringParameters: {
    //                 files: file.fileName,
    //             }
    //         }).then((res) => setPropFiles({ ...propFiles, res }))
    //         .catch(err => console.log(err))
    //     })
    // },[prop])

    // console.log(propFiles)


    const changeFiles = async (e) => {
        e.preventDefault();
        setUploadFiles({ ...uploadFiles, uploadBy: name });
        if (propFile != '') {
            await Storage.put(propFile.name, propFile);
            await API.put(apiName, path, {
                body: {
                    id: id,
                    files: uploadFiles
                }
                })
                .then((res) => {
                setOpenUpdate(true)
                setPropertyFiles(current => [ ...current, uploadFiles ])
                })
                .catch(error => console.log(error))

        }
    };

    

    // File API
    const filePath = `/properties/${prop.id}/files`;
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
                fileName: getFileID.fileName
            }
        })
        console.log(res)
        setDeleteModal(false);
        setOpenUpdate(true);
        navigate(`/acquisitions/${prop.id}`)
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

        function onChange(e) {
        const file = e.target.files[0];
        setPropFile(file);
        setUploadFiles({ ...uploadFiles, fileName: file.name })
    };

    function dragChange(e) {
        e.stopPropagation();
        const file = e.dataTransfer.files[0];
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



// function downloadBlob(blob, filename) {
//   const url = URL.createObjectURL(blob);
//   const a = document.createElement('a');
//   a.href = url;
//   a.download = filename || 'download';
//   const clickHandler = () => {
//     setTimeout(() => {
//       URL.revokeObjectURL(url);
//       a.removeEventListener('click', clickHandler);
//     }, 150);
//   };
//   a.addEventListener('click', clickHandler, false);
//   a.click();
//   return a;
// }

// const openPropFile = async (pdf) => {
//     const result = await Storage.get(pdf, {
//         level: 'protected',
//         identityId: employee.pool.clientId,
//         download: true
//     }).then(newFile => setFile(newFile))


// }

    // const openPropFile = async (pdf) => {
    //     const result = await Storage.get(pdf, {
    //         level: 'protected',
    //         download: true
    //     })
    //     downloadBlob(result.Body, 'filename')
    // }

    // console.log(propertyFile)
    const inputRef = useRef(null);
    const onButtonClick = () => {
        inputRef.current.click();
      };

console.log(propFile)

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
        {propertyFiles?.map((file) => 
            file.fileName != undefined &&
                <Item className="grid grid-cols-2 items-center justify-center py-2 relative w-3/4" elevation={4} onMouseOver={() => {
                    setGetFileID(file)
                    // openPropFile(file.fileName)
                    }}>
                    <Grid item>
                    <a className="text-lg text-teal-600 hover:scale-105 hover:text-cyan-500 transform duration-200 ease-in" href={`https://photos141128-dev.s3.us-west-1.amazonaws.com/protected/us-west-1%3Adc3523d4-8c91-42af-8916-b6378f35fc20/${file.fileName}`} target='_blank'>
                        {file.fileName}
                    </a>
                    </Grid>
                    <Grid item>
                        <Typography color='primary'>
                            Attached by {file.uploadBy} on {file.date}
                        </Typography>
                    </Grid>
                    {employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Operations') >= 0 && (
                            <FaTrashAlt className='hover:animate-pulse absolute right-4 hover:drop-shadow-xl text-xl hover:duration-100 cursor-pointer z-10 text-rose-700'  onClick={deleteFileFunction} />
                    )}
                </Item>
                
            
        )}
        </Stack>
                {employee?.signInUserSession?.accessToken?.payload['cognito:groups'].indexOf('Operations') >= 0 && (
                    <Grid item xs={12}>
                        <form onDragEnter={handleDrag} onSubmit={changeFiles} className="h-48 w-full text-center relative">
                            <input ref={inputRef} placeholder="Upload file" className="hidden" type='file' onChange={onChange} />
                            <label className={`${dragActive ? 'bg-[#bde8fc78]' : ''} h-full flex items-center justify-center border-2 rounded-md border-dashed border-[#cbd5e1] bg-[#f8fafc]`} id="label-file-upload" htmlFor="input-file-upload">
                                <div>
                                    <p>Drag and drop your file here or</p>
                                    <button onClick={onButtonClick} className="cursor-pointer p-1 font-sans bg-transparent hover:underline text-cyan-400 animate-pulse">Select a file</button>
                                    {propFile &&
                                    <p className='py-2 text-rose-400'>{propFile.name}</p>
                                    }
                                </div> 
                            </label>
                            <div className='flex items-center pt-1 justify-center w-full absolute bottom-4'>
                                <button type='submit' onClick={changeFiles} className="cursor-pointer p-1 w-[120px] font-sans bg-transparent hover:underline text-black px-3 py-1 border-[1px] rounded-xl">Upload file</button>

                            </div>
                            { dragActive && <div id="drag-file-element" className="absolute w-full h-full rounded-md top-0 right-0 bottom-0 left-0" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={dragChange}></div> }
                        </form>
                    </Grid>
            )}
    </Grid>
  )
}

export default Files