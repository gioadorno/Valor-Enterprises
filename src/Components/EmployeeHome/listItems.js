import * as React from 'react';
import { Link as ShortcutLink } from '@mui/material';
import PropTypes from 'prop-types';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import ListItem from '@mui/material/ListItem';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import PaidIcon from '@mui/icons-material/Paid';
import FeedIcon from '@mui/icons-material/Feed';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CabinIcon from '@mui/icons-material/Cabin';
import BadgeIcon from '@mui/icons-material/Badge';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PhoneIcon from '@mui/icons-material/Phone';
import BallotIcon from '@mui/icons-material/Ballot';
import Tooltip from '@mui/material/Tooltip';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import PeopleIcon from '@mui/icons-material/People';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DateRangeIcon from '@mui/icons-material/DateRange';
import ImportantDevicesIcon from '@mui/icons-material/ImportantDevices';
import GroupIcon from '@mui/icons-material/Group';
import { useMemo, forwardRef } from 'react';
import {
    Link as RouterLink,
    Route,
    Routes,
    MemoryRouter,
    useLocation,
} from 'react-router-dom';
// import { StaticRouter } from 'react-router-dom/server';


  function Router(props) {
    const { children } = props;
    // if (typeof window === 'undefined') {
    //   return <StaticRouter location="/dashboard">{children}</StaticRouter>;
    // }
  
    return (
      <MemoryRouter initialEntries={['/dashboard']} initialIndex={0}>
        {children}
      </MemoryRouter>
    );
  }
  
  Router.propTypes = {
    children: PropTypes.node,
  };
  
  function ListItemLink(props) {
    const { icon, primary, to, placement, title } = props;
    
  
    const renderLink = useMemo(
      () =>
        forwardRef(function Link(itemProps, ref) {
          return <RouterLink to={to} ref={ref} {...itemProps} role={undefined} />;
        }),
      [to],
    );

    return (
        <li>
            <Tooltip placement={placement} title={title}>
                <ListItem sx={{ ml: 1 }} button component={renderLink}>
                    {icon ? <ListItemIcon sx={{ color: '#277bb7' }}>{icon}</ListItemIcon> : null}
                    <ListItemText sx={{ color: '#277bb7' }} primary={primary} />
                </ListItem>
            </Tooltip>
        </li>
      );
    }

    ListItemLink.propTypes = {
        icon: PropTypes.element,
        primary: PropTypes.string.isRequired,
        to: PropTypes.string.isRequired,
      };

      function ReferenceLink(props) {
        const { icon, primary, to, placement, title } = props;
        
      
        const renderLink = useMemo(
          () =>
            forwardRef(function Link(itemProps, ref) {
              return <ShortcutLink href={to} ref={ref} {...itemProps} role={undefined} />;
            }),
          [to],
        );
    
        return (
            <li>
                <Tooltip placement={placement} title={title}>
                    <ListItem sx={{ ml: 1 }} button component={renderLink}>
                        {icon ? <ListItemIcon sx={{ color: '#277bb7' }}>{icon}</ListItemIcon> : null}
                        <ListItemText sx={{ color: '#277bb7' }} primary={primary} />
                    </ListItem>
                </Tooltip>
            </li>
          );
        }
    
        ReferenceLink.propTypes = {
            icon: PropTypes.element,
            primary: PropTypes.string.isRequired,
            to: PropTypes.string.isRequired,
          };



export const mainListItems = (
  <React.Fragment>
        {/* <ListItemLink style={{ width: '100%' }} placement='right' title='Dashboard' primary="Dashboard" to='/dashboard' icon={<DashboardIcon />} /> */}
        {/* <ListItemLink style={{ width: '100%' }} placement='right' title='Map' primary="Map" to='/map' icon={<AddLocationAltIcon />} /> */}
        <ListItemLink style={{ width: '100%' }} placement='right' title='Properties' primary="Properties" to='/acquisitions?page=1' icon={<MapsHomeWorkIcon />} />
        <ListItemLink style={{ width: '100%' }} placement='right' title='Inventory' primary="Inventory" to='/inventory' icon={<ListAltIcon />} />
        <ListItemLink style={{ width: '100%' }} placement='right' title='Calendar/Events' primary="Calendar/Events" to='/eventcalendar' icon={<DateRangeIcon />} />
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader sx={{ color: 'black' }} component="div" inset>
      Reports
    </ListSubheader>
    <ListItemLink style={{ width: '100%' }} placement='right' title='Calls & Texts' primary="Calls & Texts" to='/callreports' icon={<PhoneIcon />} />
      <ListItemLink style={{ width: '100%' }} placement='right' title='Opportunities' primary="Opportunities" to='/opportunityreports' icon={<AttachMoneyIcon />} />
  </React.Fragment>
);

export const onboardingListItems = (
  <React.Fragment>
      <ListSubheader sx={{ color: 'black' }} component="div" inset>
          Training
      </ListSubheader>
      <ListItemLink style={{ width: '100%' }} placement='right' title='Onboarding' primary="Onboarding" to='/onboarding/videos' icon={<VideoLibraryIcon />} />
  </React.Fragment>
);

export const systemListItems = (
    <React.Fragment>
        <ListSubheader sx={{ color: 'black' }} component="div" inset>
            System Options
        </ListSubheader>
        <ListItemLink style={{ width: '100%' }} placement='right' title='Users' primary="Users" to='/users' icon={<GroupIcon />} />
        <ListItemLink style={{ width: '100%' }} placement='right' title='Warehouse' primary="Warehouse" to='#' icon={<ImportantDevicesIcon />} />
    </React.Fragment>
);

export const hrListItems = (
  <React.Fragment>
      <ListSubheader sx={{ color: 'black' }} component="div" inset>
          HR
      </ListSubheader>
      <ListItemLink style={{ width: '100%' }} placement='right' title='Applications' primary="Applications" to='/hr/applications' icon={<BallotIcon />} />
      <ListItemLink style={{ width: '100%' }} placement='right' title='Post Job' primary="Post Job" to='/hr/postjob' icon={<FeedIcon />} />
      <ListItemLink style={{ width: '100%' }} placement='right' title='Payout Data' primary="Payout Data" to='/hr/payoutdata' icon={<PaidIcon />} />
      <ListItemLink style={{ width: '100%' }} placement='right' title='Payouts(Year)' primary="Payouts(Year)" to='/hr/yearpayout' icon={<InsertInvitationIcon />} />
      <ListItemLink style={{ width: '100%' }} placement='right' title='Remove Payouts' primary="Remove Payouts" to='/hr/removepayouts' icon={<MoneyOffIcon />} />
  </React.Fragment>
)

export const shortcutItems = (
  <React.Fragment>
      <ListSubheader sx={{ color: 'black' }} component="div" inset>
          Shortcuts
      </ListSubheader>
      {/* <ListItemLink style={{ width: '100%' }} placement='right' title='IT Help' primary="IT Help" to='/itdashboard' icon={<BookOnlineIcon />} /> */}
      <ReferenceLink style={{ width: '100%' }} placement='right' title='Zillow' primary="Zillow" to='https://www.zillow.com/' icon={<CabinIcon />} />
      <ReferenceLink style={{ width: '100%' }} placement='right' title='Time Off Requests' primary="Time Off Requests" to='https://327291.tcplusondemand.com/app/webclock/#/EmployeeLogOn/137-04018/4018' icon={<AccessTimeIcon />} />
      <ReferenceLink style={{ width: '100%' }} placement='right' title='GMS' primary="GMS" to='https://gms.prismhr.com/gms/auth/#/login?lang=en' icon={<BadgeIcon />} />
  </React.Fragment>
)