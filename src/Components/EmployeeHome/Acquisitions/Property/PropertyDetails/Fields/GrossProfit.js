import React from 'react';
import { useState } from 'react';
import { updateProp } from "../../../../../../actions/properties";
import NumberFormat from 'react-number-format';
import { TextField, FormControl, Divider, InputLabel } from '@mui/material';

const GrossProfit = ({ grossProfit }) => {

  return (
        <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
            <TextField label='Gross Profit' variant='outlined' InputProps={{
            readOnly: true,
        }} value={grossProfit > 0 ? grossProfit : null} />
        </FormControl>
  )
}

export default GrossProfit