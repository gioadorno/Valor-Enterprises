import { useState, Fragment, useContext, useEffect } from "react";
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Search, Edit, Inject, Toolbar, ExcelExport, Selection, Sort, Filter, Group, ColumnMenu, Freeze, Resize, DetailRow} from '@syncfusion/ej2-react-grids';
import { PropertyGrid, ClosedGrid } from './Grids/gridsindex'
import { API } from 'aws-amplify';
import { AccountContext } from "../../Login/Account";
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import Header from "./Header";
import { useNavigate, useLocation } from "react-router-dom";
import { DateRangePicker } from 'react-date-range';
import { GridDetail } from "./Templates";
import FileCopyIcon from '@mui/icons-material/FileCopy';
import DoDisturbOffIcon from '@mui/icons-material/DoDisturbOff';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AodIcon from '@mui/icons-material/Aod';
import ArticleIcon from '@mui/icons-material/Article';
import { Box } from "@mui/material";

const date = new Date();

const initialFilter = [
  {
    title: 'Kristin',
    tooltip: 'Kristin - TC',
    button: true,
    filter: {
      type: 'Menu',
      columns: [
        {
          field: 'tc',
          matchCase: false,
          operator: 'equal',
          value: 'Kristin Frabotta'
        }
      ]
    }
  },
  {
    title: 'Jacob',
    tooltip: 'Jacob - TC',
    button: true,
    filter: {
      type: 'Menu',
      columns: [
        {
          field: 'tc',
          matchCase: false,
          operator: 'equal',
          value: 'Jacob Loch'
        }
      ]
    }
  },
  {
    title: 'Laura',
    tooltip: 'Laura - TC',
    button: true,
    filter: {
      type: 'Menu',
      columns: [
        {
          field: 'tc',
          matchCase: false,
          operator: 'equal',
          value: 'Laura Humble'
        }
      ]
    }
  },
  {
    title: 'Unassigned',
    tooltip: 'Unassigned - TC',
    button: true,
    filter: {
      type: 'Menu',
      columns: [
        {
          field: 'tc',
          matchCase: false,
          operator: 'equal',
          value: ''
        }
      ]
    }
  },
  {
    title: 'In Progress',
    tooltip: 'Status - In Progress',
    button: true,
    filter: {
      type: 'Menu',
      columns: [
        {
          field: 'propStatus',
          matchCase: false,
          operator: 'equal',
          value: 'In Progress'
        }
      ]
    }
  },
  {
    title: 'Pending',
    tooltip: 'Status - Pending',
    button: true,
    filter: {
      type: 'Menu',
      columns: [
        {
          field: 'propStatus',
          matchCase: false,
          operator: 'equal',
          value: 'Pending'
        }
      ]
    }
  },
  {
    title: 'Active',
    tooltip: 'Status - Active',
    button: true,
    filter: {
      type: 'Menu',
      columns: [
        {
          field: 'propStatus',
          matchCase: false,
          operator: 'equal',
          value: 'Active'
        }
      ]
    }
  },
  {
    title: 'Closed',
    tooltip: 'Status - Closed',
    button: true,
    filter: {
      type: 'Menu',
      columns: [
        {
          field: 'propStatus',
          matchCase: false,
          operator: 'equal',
          value: 'Closed'
        }
      ]
    }
  },
  {
    title: 'Cancelled',
    tooltip: 'Status - Cancelled',
    button: true,
    filter: {
      type: 'Menu',
      columns: [
        {
          field: 'propStatus',
          matchCase: false,
          operator: 'equal',
          value: 'Cancelled'
        }
      ]
    }
  },
]

      // API
      const apiName = 'valproperties';
      const path = '/properties';
      // 

const TC = () => {
  const navigate = useNavigate();
    const { getSession, employee } = useContext(AccountContext);
    const [ props, setProps ] = useState([]);
    const [ filters, setFilters ] = useState(initialFilter);
    const [ activeFilter, setActiveFilter ] = useState({});
    const [ closeVisible, setCloseVisible ] = useState(false);
    const [ dateProps, setDateProps ] = useState();
    const [ visible, setVisible ] = useState(true);
    const [ openDate, setOpenDate ] = useState(false);
    const [ grid, setGrid ] = useState(PropertyGrid);
    const propertiesSort = props.sort((a, b) => new Date(b.date) - new Date(a.date));
    const [ properties, setProperties ] = useState(propertiesSort);
    const [ startDate, setStartDate ] = useState(new Date(date.getFullYear(), date.getMonth() - 1, 1));
    const [ endDate, setEndDate ] = useState(new Date(date.getFullYear(), date.getMonth(), 0));

    const location = useLocation();
    console.log(location.pathname)

    const actions = [
      { icon: <FileCopyIcon onClick={() => navigate('/acqpaperwork')} />, name: 'Acq Paperwork'},
      { icon: <ArticleIcon onClick={() => navigate('/acqoptions')} />, name: 'Acq Options' },
      { icon: <AodIcon onClick={() => navigate('/dispopaperwork')} />, name: 'Dispo Paperwork' },
      { icon: <DoDisturbOffIcon onClick={() => navigate('/cancellationform')} />, name: 'Cancellation Form' },
    ];

    const handleSelect = (ranges) => {
      setStartDate(ranges.selection.startDate);
      setEndDate(ranges.selection.endDate);
  };

  const selectionRange = {
      startDate,
      endDate,
      key: 'selection'
  };

  useEffect(() => {
    const properties =  props.filter(prop => {
      if (prop.completionDate != undefined && startDate <= new Date(prop.completionDate) && new Date(prop.completionDate) <= endDate) {
        return prop
      }
    })
    setDateProps(properties)

  },[startDate, endDate])

    // Closed Filter
    const closedSort = dateProps?.sort((a, b) => new Date(b.completionDate) - new Date(a.completionDate))
    // 


    useEffect(() => {
      API.get(apiName, path)
      .then(res => setProps(res.Items))
  },[])
  
  useEffect(() => {
    getSession();
  },[])

  useEffect(() => {
    setProperties(propertiesSort)
  },[props])


  const handleFilter = (title, filter) => {
    if(closeVisible === true) {
      setProperties(propertiesSort)
      setGrid(PropertyGrid)
      setCloseVisible(false)
    }
    if (title === filter.title) {
      setActiveFilter(filter)
    }
    if ( activeFilter.title === title ) {
      setActiveFilter({
        title: '',
        filter: {
          columns: [
            {
              field: 'tc',
              matchCase: false,
              operator: 'notequal',
              value: null
            },
            {
              field: 'propStatus',
              matchCase: false,
              operator: 'notequal',
              value: null
            }
          ]
        }
      })
    }
  }


  useEffect(() => {
    if (activeFilter?.button === false) {
      activeFilter.button = true
    }
  },[])


  const handleClosedFilter = () => {
      setCloseVisible(true)
      setProperties(closedSort)
      setGrid(ClosedGrid)
      setOpenDate(false)
  }

  const handleDate = () => {
    setOpenDate(true)
    setProperties(closedSort)
  }

  console.log(startDate, endDate)
    return (
      <div className='w-full h-full flex items-center flex-col relative'>
        {openDate &&
        <div style={{ zIndex: 99999999 }}  className='fixed w-full h-screen flex items-center justify-center bg-[#00000062]'>
            <div style={{ zIndex: 99999999 }} className='w-3/5 fixed h-full flex items-center justify-center flex-col'>
                    <div className='flex flex-col'>
                        <DateRangePicker ranges={[selectionRange]} rangeColors={['#FD5B61']} onChange={handleSelect} />
                    </div>
                    <button onClick={handleClosedFilter} className="text-white rounded-full py-1 px-3 mt-3 border-2-white bg-black">
                        View Dates
                    </button>
            </div>
                    <div onClick={() => setOpenDate(false)} className='w-full h-full absolute' />
        </div>
        }
        {/* <Box sx={{ position: 'fixed', right: 10, bottom: 10, zIndex: '5', flexGrow: 1, transform: 'translateZ(0px)' }}>
                    <SpeedDial
                        ariaLabel="Forms" 
                        icon={<SpeedDialIcon />}
                        direction='up'
                        
                    >
                        {actions.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            tooltipOpen
                            sx={{ whiteSpace: 'nowrap' }}
                        />
                        ))}
                    </SpeedDial>
            </Box> */}
        {/* <h1 className=' text-lg absolute top-1 left-2 animate-pulse font-semibold w-auto text-white cursor-pointer z-[99999]' onClick={() => navigate('/acquisitions')}>Back to dashboard</h1> */}
        <nav className='relative overflow-x-scroll scrollbar-hide w-full overflow-y-hidden snap-x py-4 px-12'>
          <p className=" z-[-50] text-center pt-12 italic">Preset Filters</p>
        <div className='flex px-2 sm:px-20 text-2xl whitespace-nowrap w-full space-x-4 xl:space-x-20 mt-4 pb-4 '>
            {
              filters?.map(filter => 
                <TooltipComponent title={filter.tooltip} position='BottomCenter'>
                <button key={filter.tooltip} name={filter.title}  onClick={() => handleFilter(filter.title, filter)} className={`${activeFilter.title === filter.title ? 'text-rose-600 bg-slate-200' : 'text-black'} scroll-ml-6 snap-start rounded-full text-sm px-3 py-1 bg-slate-100 border-[1px] w-[105px] border-white hover:animate-pulse hover:text-cyan-500 items-center justify-center text-center`}>
                {filter.title}
              </button>
              </TooltipComponent>
                )
            }
            <TooltipComponent title='Closed properties - Commissions View' position='BottomCenter'>
              <button onClick={handleDate} className={`${closeVisible === true ? 'text-rose-600 bg-slate-200' : 'text-black'} scroll-ml-4 snap-start rounded-full text-sm px-3 py-1 bg-slate-100 border-[1px] w-[105px] border-white hover:animate-pulse hover:text-cyan-500 items-center justify-center text-center `}>
                  Commission
              </button>
            </TooltipComponent>
        </div>
        </nav>
        <GridComponent
        dataSource={properties}
        allowPaging
        allowFiltering
        allowSorting
        allowMultiSorting
        allowSelection
        showColumnChooser
        showColumnMenu
        allowExcelExport={true}
        allowResizing
        allowPdfExport
        allowGrouping
        printMode="CurrentPage"
        toolbar={['Search', 'Print', 'ColumnChooser', 'ExcelExport', 'PdfExport']}
        selectionSettings={{ type: 'Multiple' }}
        width='90%'
        height='100%'
        detailTemplate={GridDetail}
        pageSettings={{ pageSize: 100 }}
        filterSettings={activeFilter.filter}
        >
          <ColumnsDirective>
            {grid?.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
          <Inject services={[Page, Search, Toolbar, ExcelExport, Selection, Sort, Filter, Group, ColumnMenu, Freeze, Resize, DetailRow]} />
        </GridComponent>
      </div>
    )
}

export default TC