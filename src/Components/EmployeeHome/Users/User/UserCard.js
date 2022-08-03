import { Card, CardActions, CardContent, CardMedia, Typography, ButtonBase, Modal, Box } from '@material-ui/core';
import { Button, ButtonGroup } from '@mui/material';
import useStyles from './styles';
import DeleteIcon from '@mui/icons-material/Delete';
import emptyPhoto from '../../Profile/photo.png';
import moment from 'moment';
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../../../../actions/employees';
import { useDispatch } from 'react-redux';
import React, { useState, Fragment } from 'react';

const UserCard = ({ employee }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();
  const openProfile = () => {
    navigate(`/profile/${employee._id}`)
  };

  const [ openDelete, setOpenDelete ] = useState(false);

  const deleteEmployee = () => {
    dispatch(deleteUser(employee._id))
  }


  const DeleteModal = () => (
  <Fragment>
    <Modal style={{ display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }} open={openDelete} onClose={() => setOpenDelete(false)}>
      <Box sx={{ display: 'flex', width: '30%', height: '60%', alignItems: 'center', flexDirection: 'column', bgcolor: 'white', justifyContent: 'center' }}>
        <Typography sx={{ mt: 4, textAlign: 'center' }} variant='h5'>Are you sure you want to delete this user?</Typography>
        <ButtonGroup sx={{ mt: 2, width: '60%', display: 'flex', justifyContent: 'space-evenly', }}>
          <Button size='large' sx={{ borderRightColor: '#1976d2 !important' }} onClick={deleteEmployee}>Yes</Button>
          <Button size='large' onClick={() => setOpenDelete(false)}>No</Button>
        </ButtonGroup>
      </Box>
    </Modal>
  </Fragment>
  )

  return (
    <Card classname={classes.card}>
      <DeleteModal />
        <ButtonBase className={classes.cardAction} onClick={openProfile}> 
        <CardMedia component='img' src={employee.profilePhoto != null ? employee.profilePhoto : emptyPhoto} title={employee.address} />
        <div className={classes.details}>
            <Typography sx={{ textAlign: 'center' }} variant='body2' color='textSecondary'>
                Security Level: {employee.securityLevel}
            </Typography>
        </div>
        <div className={classes.address}>
            <Typography className={classes.title} variant="body3" gutterBottom>
              {employee.name}
            </Typography>
        </div>
        <CardContent>
            {employee.email}
        </CardContent>
        </ButtonBase>
        <CardActions style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', width: '100%' }} >
            <Button onClick={() => setOpenDelete(true)} size='medium' color='primary' endIcon={<DeleteIcon />} >
                Delete
            </Button>
        </CardActions>
    </Card>
  )
}

export default UserCard