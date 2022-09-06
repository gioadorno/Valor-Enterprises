import React, { useContext} from 'react';
import { FilterContext } from './SideMenu';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import Side from './Side';

const SideBar = () => {
    const { activeMenu, setActiveMenu, userProfile, setUserProfile } = useContext(FilterContext);
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