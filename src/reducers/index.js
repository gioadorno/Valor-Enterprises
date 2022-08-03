import { combineReducers } from "redux";
import posts from './posts';
import books from "./books";
import dispo from "./dispo";
import announcements from './announcements'
import markers from "./markers";
import referrals from "./referrals";
import address from './address';
import auth from './auth';
import photos from './photos';
import jobs from './postjob';
import applications from './applications';
import buyers from "./buyers";
import offers from "./offers";
import employees from "./employees";
import warehouse from "./warehouse";
import tickets from "./tickets";
import files from "./files";
import dealtext from "./dealtext";
import submitprop from "./submitprop";
import requestlogin from "./requestlogin";
import wholesalers from "./wholesalers";
import dispoemployees from "./dispoemployees";
import buyerproperties from "./buyerproperties";
import emailblast from "./emailblast";
import activeproperties from './activeproperties';
import reports from './closereports';
import events from "./events";
import allprops from "./allprops";
import payoutData from "./payoutData";

export default combineReducers({ 
    posts, 
    books, 
    dispo, 
    announcements, 
    markers, 
    referrals, 
    address, 
    auth, 
    photos, 
    jobs, 
    applications, 
    buyers, 
    offers, 
    employees, 
    warehouse, 
    tickets, 
    files, 
    dealtext, 
    submitprop, 
    requestlogin, 
    wholesalers, 
    dispoemployees, 
    buyerproperties,
    emailblast,
    activeproperties,
    reports,
    events,
    allprops,
    payoutData
});

