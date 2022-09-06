import React, { useContext} from 'react';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import Side from './Side';
import { InternalContext, useStateContext } from '../../../context/InternalContext';

const SideBar = () => {
    const { activeMenu, setActiveMenu, userProfile, setUserProfile } = useStateContext();
  return (
    activeMenu ? (
        <div className='w-80 fixed sidebar bg-white'>
            <Side />
        </div>
    ) : (
        <div className='w-0'>
            <Side />
        </div>
    )
  )
}

export default SideBar