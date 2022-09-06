import React, { useEffect, useState, useContext } from 'react';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { FilterContext } from './SideMenu';
import { AiOutlineMenu } from "react-icons/ai";
import { AccountContext } from "../../Login/Account";
import { Auth } from 'aws-amplify';
import { useStateContext } from '../../../context/InternalContext';

// const greetings = ['Hello', "Welcome", "Keep up the drive"]

const Navbar = () => {
    const { activeMenu, setActiveMenu, userProfile, setUserProfile } = useStateContext();
    const [ employee, setEmployee ] = useState('');

    const getSession = async () => {
        await Auth.currentAuthenticatedUser().then((user) => {
            setEmployee(user)
        })
    };
    
    useEffect(() => {
        getSession()
    },[])

    // const profileItems = [
    //     {

    //     }
    // ]
  return (
    <div className={`flex justify-between p-2 md:mx-6 relative bg-transparent`}>
        <TooltipComponent content='Sidebar' position='RightCenter'>
            <button type='button' onClick={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)} className='relative text-xl rounded-full p-3 hover:drop-shadow-xl hover:scale-105 ease-in transform' >
                <AiOutlineMenu className='text-white' />
            </button>
        </TooltipComponent>
        <div className='flex'>
            <TooltipComponent content='Profile' position='BottomCenter'>
                <div className='flex items-center justify-center gap-2 cursor-pointer p-2 hover:bg-light-gray rounded-lg' onClick={() => setUserProfile((prevProfileMenu) => !prevProfileMenu)}>
                    <p className='text-white font-serif text-lg'>Hello {employee?.attributes?.name}</p>
                </div>
            </TooltipComponent>
        </div>
    </div>
  )
}

export default Navbar