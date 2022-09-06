import { AccountContext } from "../../Login/Account";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Auth, API } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';



const FilterContext = createContext();

const SideMenu = ({ children }) => {
    const [ userProfile, setUserProfile ] = useState(false);
    const [ smartViews, setSmartViews ] = useState([]);
    const [ smartView, setSmartView ] = useState('');
    const [ employee, setEmployee ] = useState('');
    const [ openIP, setOpenIP ] = useState(false);
    // Market Filter
    const [ market, setMarket ] = useState({
      field: 'market',
      matchCase: false,
      operator: 'notequal',
      value: ''
    });
    // Status Filer
    const [ status, setStatus ] = useState({
      field: 'propStatus',
      matchCase: false,
      operator: 'notequal',
      value: ''
    });
    // IP Filter
    const [ ipStartDate, setIPStartDate ] = useState({
      field: 'inspectionPeriod',
      type: 'Value',
      operator: 'notequal',
      value: new Date()
    });
    const [ ipEndDate, setIPEndDate ] = useState({
      field: 'inspectionPeriod',
      type: 'Value',
      operator: 'notequal',
      value: new Date()
    });

    const [ filters, setFilter ] = useState('');
    
    const getSession = async () => {
      await Auth.currentAuthenticatedUser().then((user) => {
          setEmployee(user)
      })
  };
  useEffect(() => {
    getSession()
},[])
    const [ activeMenu, setActiveMenu ] = useState(false); //Show Sidebar

  return (
    <FilterContext.Provider value={({
        smartViews, setSmartViews,
        smartView, setSmartView,
        filters, setFilter,
        userProfile, setUserProfile,
        activeMenu, setActiveMenu,
        market, setMarket,
        status, setStatus,
        ipStartDate, setIPStartDate,
        ipEndDate, setIPEndDate,
        openIP, setOpenIP
    })}>
        {children}
    </FilterContext.Provider>
  )
}

export { SideMenu, FilterContext };