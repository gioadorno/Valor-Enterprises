import { Box, Container, Typography, Button, Checkbox, Tooltip } from "@mui/material";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HouseIcon from '@mui/icons-material/House';
import MobileNav from '../MobileNav';
import OuterBar from '../OuterBar';
import { useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useEffect, Fragment, useState } from "react";
import { API } from 'aws-amplify';
import Properties from "./Properties";

import DoDisturbOffIcon from '@mui/icons-material/DoDisturbOff';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AodIcon from '@mui/icons-material/Aod';
import ArticleIcon from '@mui/icons-material/Article';

const label = { inputProps: { 'aria-label': 'Audited' } }

// const PropertyTooltip = forwardRef(() => (
//     <Tooltip sx={{ backgroundColor: '#f5f5f9', color: '#1976d2', maxWidth: 220, fontSize: 12, border: '1px solid #dadde9' }} />
// ))

//test




const Inventory = () => {
    const actions = [
        { icon: <FileCopyIcon onClick={() => navigate('/acqpaperwork')} />, name: 'Acq Paperwork'},
        { icon: <ArticleIcon onClick={() => navigate('/acqoptions')} />, name: 'Acq Options' },
        { icon: <AodIcon onClick={() => navigate('/dispopaperwork')} />, name: 'Dispo Paperwork' },
        { icon: <DoDisturbOffIcon onClick={() => navigate('/cancellationform')} />, name: 'Cancellation Form' },
      ];

    // API
    const apiName = 'valproperties';
    const path = '/properties';
    // 
    const [ properties, setProps ] = useState([]);
    const props = properties.sort((a, b) => new Date(b.date) - new Date(a.date))
    
    useEffect(() => {
    API.get(apiName, path)
    .then(res => {
        setProps(res.Items)})
    },[])

    const navigate = useNavigate();

        
  return (
    <div className="flex w-full h-full">
        <Box sx={{ position: 'fixed', bottom: 5, right: 5, zIndex: 99999, flexGrow: 1, transform: 'translateZ(0px)' }}>
                    <SpeedDial
                        ariaLabel="Forms" 
                        icon={<SpeedDialIcon />}
                        direction='up'
                        
                    >
                        {actions.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            tooltipOpen
                            sx={{ whiteSpace: 'nowrap' }}
                        />
                        ))}
                    </SpeedDial>
                </Box>
        <OuterBar />
        <div className=" flex items-center justify-center pt-12 flex-col" >
            <Properties />
        </div>
        <MobileNav />
    </div>
  )
}

export default Inventory