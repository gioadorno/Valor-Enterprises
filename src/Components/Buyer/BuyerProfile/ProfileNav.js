import { Box, Tabs, Tab, Typography,  } from "@mui/material";
import { useState } from "react";
import PropTypes from 'prop-types';
import ProfilePhoto from "./Settings/ProfilePhoto";
import ChangePassword from "./Settings/ChangePassword";

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3, width: '100%', height: '100vh' }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  };

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function profileProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }

const ProfileNav = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [ value, setValue ] = useState(0);
    const handleChange = (e, newValue) => {
        setValue(newValue)
    }
  return (
    <Box sx={{  bgcolor: 'background.paper', display: 'flex', height: { xs: '10%'  ,sm: '100%' }, width: { xs: '100%', sm: '100%' }, flexDirection: { xs: 'column', sm: 'row' }, overflowx: 'auto', alignItems: { xs: 'center', sm: 'unset' } }}>
        <Tabs orientation='vertical' variant='scrollable' value={value} onChange={handleChange} sx={{ borderRight: 1, borderColor: 'divider', pt: 5, width: { sm: '25%' , md: '20%' , xl: '10%' } , display: { xs: 'none', sm: 'flex' } }} aria-label="Vertical tabs">
            <Tab label="Profile Photo" {...profileProps(0)} />
            <Tab label="Change Password" {...profileProps(1)} />
        </Tabs>
        <Tabs variant='scrollable' value={value} onChange={handleChange} sx={{ borderRight: { sm: 1 }, borderColor: 'divider', pt: { sm: 5 }, display: { xs: 'flex', sm: 'none' } }} aria-label="Vertical tabs">
            <Tab label="Profile Photo" {...profileProps(0)} />
            <Tab label="Change Password" {...profileProps(1)} />
        </Tabs>
        {value === 0 && 
          <TabPanel style={{ display: 'flex', width: '100%' }} value={value} index={0}>
              <ProfilePhoto user={user} />
        </TabPanel>
        }
        {value === 1 && (
        <TabPanel style={{ display: 'flex', width: '100%' }} value={value} index={1}>
              <ChangePassword user={user} />
        </TabPanel>
        )}
    </Box>
  )
}

export default ProfileNav