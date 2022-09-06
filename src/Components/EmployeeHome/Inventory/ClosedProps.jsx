// import { useState, Fragment, useContext, useEffect } from "react";
// import { GridComponent, ColumnsDirective, ColumnDirective, Page, Search, Edit, Inject, Toolbar, ExcelExport, Selection, Sort, Filter, Group, ColumnMenu, Freeze, Resize, DetailRow} from '@syncfusion/ej2-react-grids';
// import { API } from 'aws-amplify';
// import { AccountContext } from "../../Login/Account";
// import { TooltipComponent } from '@syncfusion/ej2-react-popups';
// import Header from "./Header";
// import { useNavigate } from "react-router-dom";
// import { GridDetail } from "./Templates";

// const date = new Date();
// const firstDayPrevMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1);
// const lastDayPrevMonth = new Date(date.getFullYear(), date.getMonth(), 0);


//       // API
//       const apiName = 'valproperties';
//       const path = '/properties';
//       // 


//       const propertyGrid = [
//         { field: 'completionDate',
//         headerText: 'Completed Date',
//         template: GridCompletion,
//         width: '130',
//         textAlign: 'Center' 
//         },
//         { field: 'completionDate2',
//         headerText: 'Completed Date 2',
//         template: GridCompletion2,
//         width: '130',
//         visible: false,
//         textAlign: 'Center' 
//         },
//         { field: 'acqName',
//         headerText: 'Acquisitions',
//         width: '130',
//         textAlign: 'Center' 
//         },
//         { field: 'whoSold',
//         headerText: 'Dispositions',
//         width: '130',
//         textAlign: 'Center' 
//         },
//       { field: 'tc',
//       headerText: 'TC',
//       template: GridTC,
//       width: '150',
//       textAlign: 'Center' 
//     },
//     { field: 'soldGP',
//     headerText: 'Gross Profit',
//     width: '130',
//     textAlign: 'Center' 
//     },
//       { field: 'address',
//         headerText: 'Address',
//         template: GridAddress,
//         width: '300',
//         textAlign: 'Center',
//       },
//       { field: 'propStatus',
//         headerText: 'Status',
//         template: GridStatus,
//         width: '170',
//         textAlign: 'Center',
//       },
//     { field: 'audited',
//     headerText: 'Audited',
//     template: GridAudited,
//     width: '150',
//     textAlign: 'Center',
//     },

//     ];

// const ClosedProps = () => {
//     const navigate = useNavigate();
//     const { getSession, employee } = useContext(AccountContext);
//     const [ props, setProps ] = useState([]);
//     // const [ filters, setFilters ] = useState(initialFilter);
//     // const [ activeFilter, setActiveFilter ] = useState({})
//     const lastMonthProps = props.filter(prop => {
//       if (prop.completionDate != undefined && firstDayPrevMonth <= new Date(prop.completionDate) && new Date(prop.completionDate) <= lastDayPrevMonth) {
//         return prop
//       }

//     })
//     const properties = lastMonthProps.sort((a, b) => new Date(b.completionDate) - new Date(a.completionDate))

//     // useEffect(() => {
//     //     if (activeFilter?.title === 'Closed') {
//     //         setVisible(false)
//     //     } else (
//     //       setVisible(true)
//     //     )

//     // },[])

  
//     useEffect(() => {
//       API.get(apiName, path)
//       .then(res => setProps(res.Items))
//   },[])
  
//   useEffect(() => {
//     getSession();
//   },[])


// //   const handleFilter = (title, filter) => {
// //     if (title === filter.title) {
// //       setActiveFilter(filter)
// //     }
// //     if ( activeFilter.title === title ) {
// //       setActiveFilter({
// //         title: '',
// //         filter: {
// //           columns: [
// //             {
// //               field: 'tc',
// //               matchCase: false,
// //               operator: 'notequal',
// //               value: null
// //             },
// //             {
// //               field: 'propStatus',
// //               matchCase: false,
// //               operator: 'notequal',
// //               value: null
// //             }
// //           ]
// //         }
// //       })
// //     }
// //   }



// //   useEffect(() => {
// //     if (activeFilter?.button === false) {
// //       activeFilter.button = true
// //     }
// //   },[])

//   // const filterOption = {
//   //   ignoreAccent: true,
//   //   columns: [
//   //     {
//   //       field: 'address',
//   //       operator: 'contains',
//   //       value
//   //     }
//   //   ]
//   // }

//     return (
//       <div className='w-full h-full xl:h-screen flex items-center flex-col relative bg-[#154a87b8] py-24'>
//         <h1 className=' text-lg absolute top-1 left-2 animate-pulse font-semibold text-white cursor-pointer' onClick={() => navigate('/acquisitions')}>Back to dashboard</h1>
//         <nav className='relative'>
//           {/* <p className="text-center pt-12 italic">Preset Filters</p>
//         <div className='flex px-10 sm:px-20 text-2xl whitespace-nowrap snap-x scroll-ml-6 snap-start space-x-10 sm:space-x-20 overflow-x-scroll overflow-y-hidden pt-4 pb-4 scrollbar-hide'>
//             {
//               filters?.map(filter => 
//                 <TooltipComponent title={filter.tooltip} position='BottomCenter'>
//                 <button key={filter.tooltip} name={filter.title}  onClick={(e) => handleFilter(filter.title, filter)} className={`${activeFilter.title === filter.title ? 'text-rose-600 bg-slate-200' : 'text-black'} rounded-full text-sm px-3 py-1 bg-slate-100 border-[1px] w-[100px] border-white hover:animate-pulse hover:text-cyan-500 items-center justify-center text-center`}>
//                 {filter.title}
//               </button>
//               </TooltipComponent>
//                 )
//             }
//         </div> */}
//         </nav>
//         <GridComponent
//         dataSource={properties}
//         allowPaging
//         allowFiltering
//         allowSorting
//         allowMultiSorting
//         showColumnChooser
//         showColumnMenu
//         allowExcelExport={true}
//         allowResizing
//         allowPdfExport
//         allowGrouping
//         printMode="CurrentPage"
//         toolbar={['Search', 'Print', 'ColumnChooser', 'ExcelExport', 'PdfExport']}
//         selectionSettings={{ type: 'Multiple' }}
//         width='90%'
//         height='100%'
//         detailTemplate={GridDetail}
//         pageSettings={{ pageSize: 100 }}
//         filterSettings={{
//                 type: 'Menu',
//                 columns: [
//                     {
//                       field: 'propStatus',
//                       matchCase: false,
//                       operator: 'equal',
//                       value: 'Closed'
//                     }
//                   ]
//         }}
//         >
//           <ColumnsDirective>
//             {propertyGrid.map((item, index) => (
//               <ColumnDirective key={index} {...item} />
//             ))}
//           </ColumnsDirective>
//           <Inject services={[Page, Search, Toolbar, ExcelExport, Selection, Sort, Filter, Group, ColumnMenu, Freeze, Resize, DetailRow]} />
//         </GridComponent>
//       </div>
//     )
// }

// export default ClosedProps