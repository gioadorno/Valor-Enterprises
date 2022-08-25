import './tailwind.css';
import './app_tailwind.css'
import React, { useContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Careers from "./Components/routes/Public/Careers/Careers";  
import Acquisitions from './Components/EmployeeHome/Acquisitions/Acquisitions';
import PropertyDetails from "./Components/EmployeeHome/Acquisitions/Property/PropertyDetails/PropertyDetails";
import AcqOptions from "./Components/EmployeeHome/Acquisitions/Forms/AcqOptions";
import AcqPaperwork from "./Components/EmployeeHome/Acquisitions/Forms/AcqPaperwork";
import DispoPaperwork from "./Components/EmployeeHome/Acquisitions/Forms/DispoPaperwork";
import Profile from './Components/EmployeeHome/Profile/Profile';
import Login from "./Components/Login/Login";
import OutboundCallsFull from "./Components/EmployeeHome/Reports/OutboundCallsFull";
import Opportunities from "./Components/EmployeeHome/Reports/Opportunities";
import NotAuthorized from './Components/EmployeeHome/NotAuthorized';
import EventCalendar from "./Components/EmployeeHome/EventCalendar/EventCalendar";
import DealText from "./Components/EmployeeHome/Acquisitions/Property/DealText";
import HR from './Components/EmployeeHome/HR/HR';
import PostJob from './Components/EmployeeHome/HR/PostJob/PostJob';
import Applications from './Components/EmployeeHome/HR/Applications/Applications';
import ITDashboard from './Components/EmployeeHome/IT/ITDashboard';
import PayoutData from './Components/EmployeeHome/HR/PayoutData/PayoutData';
import Videos from './Components/EmployeeHome/Onboarding/Videos';
import RemovePayouts from './Components/EmployeeHome/HR/RemovePayouts/RemovePayouts';
import YearPayout from './Components/EmployeeHome/HR/YearPayout/YearPayout';
import Inventory from './Components/EmployeeHome/Inventory/Inventory';
import EmailBlast from './Components/EmployeeHome/Acquisitions/Property/EmailBlast/EmailBlast';

import { Account } from './Components/Login/Account';
import Status from './Components/Login/Status';
import Settings from './Components/Login/Settings';
import ChangePassword from './Components/Login/ChangePassword';

import { Amplify, Auth } from 'aws-amplify';
import awsConfig from './aws-exports';
import { Authenticator, useTheme, View, Image, Text, Heading, useAuthenticator, Button } from '@aws-amplify/ui-react';
import { Box, TextField, Typography } from '@mui/material';



import RequireAuth from './RequireAuth';
import NewPassword from './Components/Login/NewPassword';

Amplify.configure(awsConfig);



// const ProtectedRoutes = () => {
//     return (
//         <Router>
//         <Routes>
//                 {/* Home */}
//                 <Route path='/' exact element={<Homepage />} />

//                 {/* Support */}
//                 <Route path='/support' exact element={<Support />} />

//                 {/* Reset Password */}
//                 <Route path='/forgotpassword/:token' exact element={<ResetPassword />} />

//                 {/* Employee Login */}
//                 <Route path='/login' element={ 
//                     <Account>
//                         {/* <Status /> */}
//                         <Login />
//                         <Settings />
//                     </Account>
//                 } />
                
//                 <Route path='/dashboard' element={<RequireAuth><Dashboard /></RequireAuth> } />
//                 <Route path='/acquisitions' exact element={<Acquisitions />} />
//                 <Route path='/acquisitions/:id' exact element={<PropertyDetails />} />
//                 <Route path='/profile/:id' exact element={<Profile />} />
//                 <Route path='/acquisitions/search' exact element={<Acquisitions />} />

//                 {/* Employee Reset Password */}
//                 <Route path ='/user/resetpassword/:token' exact element={<ResetEmployeePassword />} />

//                 {/* <Route path='/acqTable/:id' exact element={<AcqDetails />} /> */}
//                 <Route path='/map' exact element={<Map />} />
//                 <Route path='/buyerlogin' exact element={<GuestLogin />} />
//                 {/* <Route path='/guestmap' exact element={<GuestMap />} /> */}

//                 {/* Buyer Dashboard */}
//                 {/* <Route path='/dashboard' exact element={<BuyerDashboard />} />
//                 <Route path='/dashboard/:id' exact element={<Offer />} />
//                 <Route path='/dashboard/search' exact element={<BuyerDashboard />} /> */}

//                 {/* Buyer Map */}
//                 <Route path='/propertymap' exact element={<PropertyMap />} />

//                 {/* Buyer Profile */}
//                 <Route path='/buyerprofile/:id' exact element={<BuyerProfile />} />

//                 <Route path='/careers' exact element={<Careers />} />
//                 {/* <Route path='/warehouse' exact element={<Warehouse />} /> */}
//                 <Route path='/acqoptions' exact element={<AcqOptions />} />
//                 <Route path='/acqpaperwork' exact element={<AcqPaperwork />} />
//                 <Route path='/dispopaperwork' exact element={<DispoPaperwork />} />
//                 <Route path='/users' exact element={<Employees />} />

//                 {/* Inventory */}
//                 <Route path='/inventory' exact element={<Inventory />} />

//                 {/* Event Calendar */}
//                 <Route path='/eventcalendar' exact element={<EventCalendar />} />

//                 {/* Deal Text */}
//                 <Route path='/dealtext/:id' exact element={<DealText />} />

//                 {/* Onboarding */}
//                 <Route path='/onboarding/videos' exact element={<Videos />} />

//                 {/* HR */}
//                 <Route path='/hr' exact element={<HR />} />
//                 <Route path='/hr/postjob' exact element={<PostJob />} />
//                 <Route path='/hr/applications' exact element={<Applications />} />
//                 <Route path='/hr/payoutdata' exact element={<PayoutData />} />
//                 <Route path='/hr/removepayouts' exact element={<RemovePayouts />} />
//                 <Route path='/hr/yearpayout' exact element={<YearPayout />} />

//                 {/* IT Dashboard */}
//                 <Route path='/itdashboard' exact element={<ITDashboard />} />


//                 {/* Reports */}
//                 <Route path='/callreports' exact element={<OutboundCallsFull />} />
//                 <Route path='/opportunityreports' exact element={<Opportunities />} />
//                 <Route path='/opportunityreports/:status' exact element={<Opportunities />} />
//                 <Route path='/notauthorized' exact element={<NotAuthorized />} />
//                 <Route path='/submitproperty' exact element={<SubmitProperty />} />

//                 {/* Create User */}
//                 <Route path='/createuser' exact element={<CreateUser />} />
            
//         </Routes>
//     </Router>
//     )
// }

const App = () => {

    return (
        <Router>
            <Account>
                
            <Routes>
                {/* Home */}
                <Route path='/' exact element={<Login />} />

                {/* Reset Password */}
                {/* <Route path='/forgotpassword/:token' exact element={<ResetPassword />} /> */}

                {/* Employee Login */}
                <Route path='/newpassword/:user' element={<NewPassword />} />
                
                {/* <Route path='/dashboard' element={<Dashboard /> } /> */}
                <Route path='/acquisitions' exact element={<Acquisitions />} />
                <Route path='/acquisitions/:id' exact element={<PropertyDetails />} />
                <Route path='/emailblast/:id' exact element={<EmailBlast />} />
                <Route path='/profile/:id' exact element={<Profile />} />
                <Route path='/acquisitions/search' exact element={<Acquisitions />} />

                {/* Employee Reset Password */}
                <Route path ='/resetpassword' exact element={<ChangePassword />} />

                {/* <Route path='/acqTable/:id' exact element={<AcqDetails />} /> */}
                {/* <Route path='/map' exact element={<Map />} /> */}
                {/* <Route path='/guestmap' exact element={<GuestMap />} /> */}

                {/* Buyer Dashboard */}
                {/* <Route path='/dashboard' exact element={<BuyerDashboard />} />
                <Route path='/dashboard/:id' exact element={<Offer />} />
                <Route path='/dashboard/search' exact element={<BuyerDashboard />} /> */}

                <Route path='/careers' exact element={<Careers />} />
                {/* <Route path='/warehouse' exact element={<Warehouse />} /> */}
                <Route path='/acqoptions' exact element={<AcqOptions />} />
                <Route path='/acqpaperwork' exact element={<AcqPaperwork />} />
                <Route path='/dispopaperwork' exact element={<DispoPaperwork />} />

                {/* Inventory */}
                <Route path='/inventory' exact element={<Inventory />} />

                {/* Event Calendar */}
                <Route path='/eventcalendar' exact element={<EventCalendar />} />

                {/* Deal Text */}
                <Route path='/dealtext/:id' exact element={<DealText />} />

                {/* Onboarding */}
                <Route path='/onboarding/videos' exact element={<Videos />} />

                {/* HR */}
                <Route path='/hr' exact element={<HR />} />
                <Route path='/hr/postjob' exact element={<PostJob />} />
                <Route path='/hr/applications' exact element={<Applications />} />
                <Route path='/hr/payoutdata' exact element={<PayoutData />} />
                <Route path='/hr/removepayouts' exact element={<RemovePayouts />} />
                <Route path='/hr/yearpayout' exact element={<YearPayout />} />

                {/* IT Dashboard */}
                <Route path='/itdashboard' exact element={<ITDashboard />} />


                {/* Reports */}
                <Route path='/callreports' exact element={<OutboundCallsFull />} />
                <Route path='/opportunityreports' exact element={<Opportunities />} />
                <Route path='/opportunityreports/:status' exact element={<Opportunities />} />
                <Route path='/notauthorized' exact element={<NotAuthorized />} />
            
                </Routes>
            </Account>
        </Router>
    )
}




export default App
    
