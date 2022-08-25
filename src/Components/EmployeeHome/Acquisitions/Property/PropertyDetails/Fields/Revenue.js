import React from 'react';
import { useState } from 'react';
import NumberFormat from 'react-number-format';
import { TextField, FormControl, Divider, InputLabel } from '@mui/material';

const Revenue = ({ prop, id, dispatch, revenueFinal }) => {

  return (
        <FormControl style={{ width: '100%' }}>
            <TextField variant='standard' label='Revenue' InputProps={{
            readOnly: true,
            disableUnderline: true
        }} value={revenueFinal} />
        </FormControl>
  )
}

export default Revenue