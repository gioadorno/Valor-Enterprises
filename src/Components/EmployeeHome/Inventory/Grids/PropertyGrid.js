import { GridAudited, GridPropertyProfile, GridStatus, GridDealText, GridAddress, GridDate, GridTC, GridDetail, GridIP, GridCreateDate, GridCompletion2, GridCompletion } from '../Templates';

const PropertyGrid = [
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
  { field: 'createDate',
  headerText: 'Date Created',
  template: GridCreateDate,
  width: '130',
  visible: false,
  textAlign: 'Center' 
},
  { field: 'tc',
  headerText: 'TC',
  template: GridTC,
  width: '150',
  textAlign: 'Center' 
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
  { field: 'propStatus',
    headerText: 'Status',
    template: GridStatus,
    width: '170',
    textAlign: 'Center',
  },
  { field: 'acqName',
    headerText: 'Acquired by',
    width: '200',
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
  { field: 'inspectionPeriod',
headerText: 'IP',
template: GridIP,
width: '150',
textAlign: 'Center',
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
{ field: 'completionDate',
headerText: 'Completed Date',
template: GridCompletion,
width: '130',
textAlign: 'Center' 
},
{ field: 'completionDate2',
headerText: 'Completed Date 2',
template: GridCompletion2,
width: '130',
visible: false,
textAlign: 'Center' 
},
];

export default PropertyGrid