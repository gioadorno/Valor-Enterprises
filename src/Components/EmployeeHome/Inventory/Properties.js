import { useState, Fragment, useContext, useEffect } from "react";
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Search, Edit, Inject, Toolbar, ExcelExport, Selection, Sort, Filter, Group, ColumnMenu, Freeze, Resize, DetailRow} from '@syncfusion/ej2-react-grids';
import { GridAudited, GridPropertyProfile, GridStatus, GridDealText, GridAddress, GridDate, GridTC, GridDetail } from './Templates';
import { API } from 'aws-amplify';
import { AccountContext } from "../../Login/Account";
import Header from "./Header";

      // API
      const apiName = 'valproperties';
      const path = '/properties';
      // 

const propertyGrid = [
    // { headerText: 'Property',
    // width: '150',
    // template: GridPropertyProfile,
    // textAlign: 'Center' },
    { field: 'date',
    headerText: 'Date Created',
    template: GridDate,
    width: '130',
    textAlign: 'Center' 
  },
  { field: 'name',
  headerText: 'Created by',
  width: '200',
  textAlign: 'Center',
},
    { 
    headerText: 'Deal Text',
    template: GridDealText,
    width: '150',
    textAlign: 'Center',
    },
  { field: 'address',
    headerText: 'Address',
    template: GridAddress,
    width: '300',
    textAlign: 'Center',
  },
  { field: 'salePrice',
  headerText: 'Wholesale Price',
  width: '135',
  textAlign: 'Center' 
  },
  { field: 'netPrice',
  headerText: 'Contract Price',
  width: '135',
  textAlign: 'Center' 
},
  { field: 'arv',
    headerText: 'ARV',
    width: '135',
    textAlign: 'Center' 
  },
  { field: 'fileType',
headerText: 'File Type',
width: '135',
textAlign: 'Center' 
},
{ field: 'market',
headerText: 'Market',
width: '135',
textAlign: 'Center' 
},
{ field: 'tc',
headerText: 'TC',
template: GridTC,
width: '150',
textAlign: 'Center' 
},
{ field: 'propStatus',
headerText: 'Status',
template: GridStatus,
width: '170',
textAlign: 'Center',
},
{ field: 'supplier',
headerText: 'Supplier Type',
width: '135',
textAlign: 'Center' 
},
{ field: 'supplierName',
headerText: 'Supplier',
width: '135',
textAlign: 'Center' 
},
{ field: 'titleCompany',
headerText: 'Title Company',
width: '135',
textAlign: 'Center' 
},
{ field: 'audited',
headerText: 'Audited',
template: GridAudited,
width: '150',
textAlign: 'Center',
},
];


const Properties = () => {
  const { getSession } = useContext(AccountContext);
  const [ props, setProps ] = useState([]);
  const properties = props.sort((a, b) => new Date(b.date) - new Date(a.date))

  useEffect(() => {
    API.get(apiName, path)
    .then(res => setProps(res.Items))
},[])

useEffect(() => {
  getSession();
},[])
  return (
    <div className='m-2 p-2 bg-white rounded-3xl'>
      <Header />
      <GridComponent
      dataSource={properties}
      allowPaging
      allowFiltering
      allowSorting
      allowMultiSorting
      allowSelection
      showColumnChooser
      showColumnMenu
      allowExcelExport
      allowResizing
      allowPdfExport
      allowGrouping
      printMode="CurrentPage"
      toolbar={['Search', 'Print', 'ColumnChooser', 'ExcelExport', 'PdfExport']}
      selectionSettings={{ type: 'Multiple' }}
      width='75%'
      height='100%'
      detailTemplate={GridDetail}
      pageSettings={{ pageSize: 40 }}
      >
        <ColumnsDirective>
          {propertyGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Page, Search, Toolbar, ExcelExport, Selection, Sort, Filter, Group, ColumnMenu, Freeze, Resize, DetailRow]} />
      </GridComponent>
    </div>
  )
}

export default Properties