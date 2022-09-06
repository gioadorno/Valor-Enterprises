import React, { createContext, useContext, useState, useEffect } from 'react';
import { Auth, API } from 'aws-amplify';

const InternalContext = createContext();

export const InternalProvider = ({ children }) => {
    const [ userProfile, setUserProfile ] = useState(false);
    const [ smartViews, setSmartViews ] = useState([]);
    const [ smartView, setSmartView ] = useState('');
    const [screenSize, setScreenSize] = useState(undefined);
    const [ activeMenu, setActiveMenu ] = useState(false); //Show Sidebar
    const [ showOuterBar, setShowOuterBar ] = useState(true);


    return (
        <InternalContext.Provider value={({
            userProfile, setUserProfile,
            smartViews, setSmartViews,
            smartView, setSmartView,
            activeMenu, setActiveMenu,
            screenSize, setScreenSize,
            showOuterBar, setShowOuterBar
        })}>
            {children}
        </InternalContext.Provider>
    )
};



export const useStateContext = () => useContext(InternalContext);