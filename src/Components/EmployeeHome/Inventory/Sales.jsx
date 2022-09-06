import { useState, Fragment, useContext, useEffect  } from "react";
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Search, Edit, Inject, Toolbar, ExcelExport, Selection, Sort, Filter, Group, ColumnMenu, Freeze, Resize, DetailRow} from '@syncfusion/ej2-react-grids';
import { GridAudited, GridPropertyProfile, GridStatus, GridDealText, GridAddress, GridDate, GridTC, GridDetail, GridIP, GridBuyerAcqDate, GridCompletion } from './Templates';
import { API } from 'aws-amplify';
import { AccountContext } from "../../Login/Account";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import { FilterContext } from './SideMenu';
import Side from "./Side";
import Navbar from "./Navbar";
import PropertyGrid from "./Grids/PropertyGrid";

      // API
      const apiName = 'valproperties';
      const path = '/properties';
      // 



const Sales = () => {
    const { activeMenu, setActiveMenu, filters, market, setFilter, status, openIP, ipStartDate, ipEndDate } = useContext(FilterContext);
  const navigate = useNavigate();
    const { getSession } = useContext(AccountContext);
    const [ props, setProps ] = useState([]);
    const properties = props.sort((a, b) => new Date(b.date) - new Date(a.date))
  
    useEffect(() => {
      API.get(apiName, path)
      .then(res => setProps(res.Items))
  },[])

  console.log(filters)
  
  useEffect(() => {
    getSession();
  },[])

  useEffect(() => {
    setFilter({
      ignoreAccent: true,
      columns: [
        market,
        status,
      ]
    })
  },[market, status])
    return (
      <div className='flex relative bg-[#154a87b8]'>
        {activeMenu ? (
            <div className={`w-80 ${openIP && 'w-full'} fixed sidebar bg-white`}>
              <Side />
            </div>
          ) : (
            <div className='w-0 '>
              <Side />
            </div>
          )}
           <div className={`bg-main-bg min-h-screen ${openIP && 'hidden'} w-full ${activeMenu ? 'md:ml-80' : 'flex-2 items-center flex-col flex'}`}>
              <div className='md:static bg-main-bg navbar w-full'>
                <Navbar />
              </div>
            
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
        filterSettings={filters}
        // groupSettings={{ columns: ['tc'], showDropArea: true }}
        >
          <ColumnsDirective>
            {PropertyGrid.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
          <Inject services={[Page, Search, Toolbar, ExcelExport, Selection, Sort, Filter, Group, ColumnMenu, Freeze, Resize, DetailRow]} />
        </GridComponent>
        </div>
      </div>
    )
}

export default Sales