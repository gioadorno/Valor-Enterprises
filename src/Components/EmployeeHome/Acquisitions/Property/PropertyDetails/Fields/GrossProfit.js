import React from 'react';
import { useState } from 'react';
import { updateProp } from "../../../../../../actions/properties";
import NumberFormat from 'react-number-format';
import { TextField, FormControl, Divider, InputLabel } from '@mui/material';

const GrossProfit = ({ grossProfit }) => {

  return (
        <FormControl style={{ width: '100%' }}>
            <TextField variant='standard' InputProps={{
            readOnly: true,
            disableUnderline: true
        }} value={grossProfit} />
        </FormControl>
  )
}

export default GrossProfit