import { GridAudited, GridPropertyProfile, GridStatus, GridDealText, GridAddress, GridDate, GridTC, GridDetail, GridIP, GridCreateDate, GridCompletion2, GridCompletion, GridBuyerAcqDate } from '../Templates';

const ClosedGrid = [
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
        { field: 'acqName',
        headerText: 'Acquisitions',
        width: '130',
        textAlign: 'Center' 
        },
        { field: 'whoSold',
        headerText: 'Dispositions',
        width: '130',
        textAlign: 'Center' 
        },
      { field: 'tc',
      headerText: 'TC',
      template: GridTC,
      width: '150',
      textAlign: 'Center' 
    },
    { field: 'soldGP',
    headerText: 'Gross Profit',
    width: '130',
    textAlign: 'Center' 
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
    { field: 'audited',
    headerText: 'Audited',
    template: GridAudited,
    width: '150',
    textAlign: 'Center',
    },
];

export default ClosedGrid