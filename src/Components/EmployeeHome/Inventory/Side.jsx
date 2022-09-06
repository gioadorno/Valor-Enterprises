import React, { useState, useEffect, useContext } from 'react';
import { FilterContext } from './SideMenu';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { useNavigate } from 'react-router-dom';
import { MdOutlineCancel } from 'react-icons/md';
import {marketList} from './Markets/markets';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';

const initialState = {
    create: true,
    saved: false
}

const Filter = ({ title, children }) => (
    <div className='flex flex-col w-full px-2 mt-4'>
        <h1 className='text-md text-slate-500 font-semibold font-serif text-left pl-5'>{title}</h1>
        {children}
    </div>
)

const Side = () => {
    const { 
    activeMenu, setActiveMenu,
    market, setMarket,
    status, setStatus,
    ipStartDate, setIPStartDate,
    ipEndDate, setIPEndDate,
    openIP, setOpenIP
    } = useContext(FilterContext);
    const navigate = useNavigate();
    const [isClicked, setIsClicked] = useState(initialState);
   

    const handleClick = (clicked) => {
        setIsClicked({ ...initialState, [clicked]: true })
    };

    const handleSelect = (ranges) => {
        setIPStartDate({ ...ipStartDate, value: ranges.selection.startDate});
        setIPEndDate({ ...ipEndDate, value: ranges.selection.endDate});
    };

    const selectionRange = {
        startDate: ipStartDate.value,
        endDate: ipEndDate.value,
        key: 'selection'
    };

    const handleMarket = (e) => {
        setMarket({ ...market, value: e.target.value, operator: 'equal' })
    };
    const handleStatus = (e) => {
        setStatus({ ...status, value: e.target.value, operator: 'equal' })
    };

    console.log(market)

    console.log(ipStartDate, ipEndDate)

  return (
    <div className=' bg-[#ddedff] h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10'>
        {openIP &&
        <div className='fixed w-full h-screen flex items-center justify-center bg-[#00000062]'>
            <div style={{ zIndex: 999999 }} className='w-3/5 fixed h-full flex items-center justify-center'>
                    <div className='flex flex-col'>
                        <DateRangePicker ranges={[selectionRange]} minDate={new Date()} rangeColors={['#FD5B61']} onChange={handleSelect} />
                    </div>
            </div>
                    <div onClick={() => setOpenIP(false)} className='w-full h-full absolute' />
        </div>
        }
        {activeMenu && (
            <>
            <div className='flex justify-between items-center'>
                <p className='text-md cursor-pointer animate-pulse pl-4 pt-2' onClick={() => navigate('/acquisitions')}>Back to dashboard</p>
                <TooltipComponent content='Menu' position='BottomCenter'>
              <button type='button' onClick={(prevActiveMenu) => !prevActiveMenu} className='text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden'>
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
            </div>
            <div className='flex items-center justify-center relative text-center'>
                <p className='text-center italic text-md font-serif font-semibold py-5 px-1 flex-1 whitespace-nowrap'>Smart Views</p>
            </div>
            <div className='flex items-center justify-center mt-7 w-full'>
                <div className='w-4/5 border-[1px] items-center justify-evenly border-cyan-900 rounded-lg flex'>
                    <button className={`${isClicked.create && 'animate-pulse text-rose-400 bg-slate-100'} rounded-lg border-r-[1px] border-cyan-900 w-1/2 hover:text-cyan-500 hover:animate-pulse hover:bg-slate-50`} onClick={() => handleClick('create')}>
                        Create
                    </button>
                    <button className={`${isClicked.saved && 'animate-pulse text-rose-400 bg-slate-100'}  rounded-lg w-1/2 hover:text-cyan-900 hover:animate-pulse hover:bg-slate-50`} onClick={() => handleClick('saved')}>
                        Saved
                    </button>
                </div>
            </div>
            <div className='flex flex-col px-2 py-4'>
                <Filter title='Market'>
                    <select defaultValue={market.value} onChange={handleMarket} className='form-select px-1 py-1 rounded-full'>
                        <option value='' />
                        {marketList.map((market) => (
                            <option value={market.market} key={market.market}>
                                {market.market}
                            </option>
                            ))}
                    </select>
                </Filter>
                <Filter title='Status'>
                <select defaultValue={status.value} onChange={handleStatus} className='form-select px-1 py-1 rounded-full'>
                        <option value={null} />
                        <option value='Active'>
                            Active
                        </option>
                        <option value='Pending'>
                            Pending
                        </option>
                        <option value='Cancelled'>
                            Cancelled
                        </option>
                        <option value='Closed'>
                            Closed
                        </option>
                        <option value='In Progress'>
                            In Progress
                        </option>
                    </select>
                </Filter>
                <Filter title='IP'>
                    <button className='px-3 py-1 border-2 border-black rounded-full' onClick={() => setOpenIP(true)}>Select Dates</button>
                    <div className='flex flex-col items-center justify-center'>
                        <div className='flex'>
                            <label className='pr-3'>Start Date:</label>
                            <input disabled value={new Date(ipStartDate.value).toLocaleDateString('us-EN', { month: '2-digit', day: '2-digit', year: "numeric" })} />
                        </div>
                        <div className='flex'>
                        <label className='pr-3'>End Date:</label>
                        <input disabled value={new Date(ipEndDate.value).toLocaleDateString('us-EN', { month: '2-digit', day: '2-digit', year: "numeric" })} />
                        </div>
                    </div>
                </Filter>
            </div>
            </>
        )}
    </div>
  )
}

export default Side