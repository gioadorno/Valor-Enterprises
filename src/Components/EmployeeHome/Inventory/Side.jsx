import React, { useState, useEffect, useContext } from 'react';
import { FilterContext } from './SideMenu';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { useNavigate, useLocation } from 'react-router-dom';
import { MdOutlineCancel } from 'react-icons/md';
import {marketList} from './Markets/markets';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { InternalContext, useStateContext } from '../../../context/InternalContext';
import { links } from './Links/MenuData';
import { NavLink } from 'react-router-dom';
import { linkClasses, ListItemSecondaryAction } from '@mui/material';
import { AccountContext } from '../../Login/Account';

const initialState = {
    navigation: true,
    smartView: false
}

const Filter = ({ title, children }) => (
    <div className='flex flex-col w-full px-2 mt-4'>
        <h1 className='text-md text-slate-500 font-semibold font-serif text-left pl-5'>{title}</h1>
        {children}
    </div>
)

const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-rose-600 text-md m-2 animate-pulse hover:scale-105 transform duration-150 ease-in';
const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-blue-900 hover:scale-105 transform duration-200 ease-in hover:bg-light-gray m-2';

const Side = () => {
    const location = useLocation();
    const { 
    activeMenu, setActiveMenu,
    screenSize
    // market, setMarket,
    // status, setStatus,
    // ipStartDate, setIPStartDate,
    // ipEndDate, setIPEndDate,
    // openIP, setOpenIP
    } = useStateContext();
    const { logout, employee } = useContext(AccountContext);
    const navigate = useNavigate();
    const [isClicked, setIsClicked] = useState(initialState);
   
    const handleCloseSideBar = () => {
        if(activeMenu && screenSize <= 900) {
          setActiveMenu(false)
        }
      }

    const handleClick = (clicked) => {
        setIsClicked({ ...initialState, [clicked]: true })
    };

    // const handleSelect = (ranges) => {
    //     setIPStartDate({ ...ipStartDate, value: ranges.selection.startDate});
    //     setIPEndDate({ ...ipEndDate, value: ranges.selection.endDate});
    // };

    // const selectionRange = {
    //     startDate: ipStartDate.value,
    //     endDate: ipEndDate.value,
    //     key: 'selection'
    // };

    // const handleMarket = (e) => {
    //     setMarket({ ...market, value: e.target.value, operator: 'equal' })
    // };
    // const handleStatus = (e) => {
    //     setStatus({ ...status, value: e.target.value, operator: 'equal' })
    // };

    const signOut = () => {
        logout()
      };


  return (
    <div className=' bg-[#16456c12] h-screen relative md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10'>
        {/* {openIP &&
        <div className='fixed w-full h-screen flex items-center justify-center bg-[#00000062]'>
            <div style={{ zIndex: 999999 }} className='w-3/5 fixed h-full flex items-center justify-center'>
                    <div className='flex flex-col'>
                        <DateRangePicker ranges={[selectionRange]} minDate={new Date()} rangeColors={['#FD5B61']} onChange={handleSelect} />
                    </div>
            </div>
                    <div onClick={() => setOpenIP(false)} className='w-full h-full absolute' />
        </div>
        } */}
                <p className='text-sm absolute bottom-3 right-4 cursor-pointer animate-pulse' onClick={signOut}>Logout</p>
        {activeMenu && (
            <>
            <div className='flex justify-between items-center'>
                <TooltipComponent content='Menu' position='BottomCenter'>
              <button type='button' onClick={(prevActiveMenu) => !prevActiveMenu} className='text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden'>
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
            </div>
            <div className='flex items-center justify-center relative text-center'>
                <p className='text-center italic text-md font-serif font-semibold py-5 px-1 flex-1 whitespace-nowrap'>Valor Enterprises</p>
            </div>
            {location.pathname === '/internal' &&
            <div className='flex items-center justify-center mt-7 w-full'>
                <div className='w-4/5 border-[1px] items-center justify-evenly border-cyan-900 rounded-lg flex'>
                    <button className={`${isClicked.navigation && 'animate-pulse text-rose-400 bg-slate-100'} rounded-lg border-r-[1px] border-cyan-900 w-1/2 hover:text-cyan-500 hover:animate-pulse hover:bg-slate-50`} onClick={() => setIsClicked({ ...isClicked, navigation: true, smartView: false })}>
                        Navigation
                    </button>
                    <button className={`${isClicked.smartView && 'animate-pulse text-rose-400 bg-slate-100'}  rounded-lg w-1/2 hover:text-cyan-900 hover:animate-pulse hover:bg-slate-50`} onClick={() => setIsClicked({ ...isClicked, navigation: false, smartView: true })}>
                        Smart View
                    </button>
                </div>
            </div>
            }
            {isClicked.navigation &&
            <div className='flex flex-col px-2 py-4'>
                {links.map((item) => (
                    <div key={item.title}>
                        <p className='text-black m-3 mt-4 uppercase'>
                            {item.title}
                        </p>
                        {item.links.map((link) => (
                            <NavLink
                            to={`/${link.to}`}
                            key={link.to}
                            onClick={handleCloseSideBar}
                            className={({isActive}) => isActive ? activeLink : normalLink}
                            >
                                {link.icon}
                                <span className='capitalize '>
                                    {link.name}
                                </span>
                            </NavLink>
                        ))}
                    </div>
                ))}
            </div>
            }
            {isClicked.smartView &&
            <div className='flex flex-col px-2 py-4'>
                Work in progress
            </div>
            }
            </>
        )}
    </div>
  )
}

export default Side