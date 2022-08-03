import { DataGrid } from '@mui/x-data-grid';


  


const OutboundCalls = ({ callReports, }) => {

  const columns = [
    { field: 'date', headerName: 'Date', width: 150 },
    {
      field: 'outBoundCount',
      headerName: `Total Outbound Calls`,
      width: 200,
      editable: false,
      sortable: true,
    },
        {
      field: 'inBoundCount',
      headerName: `Total Inbound Calls`,
      width: 200,
      editable: false,
      sortable: true,
    },
    {
        field: 'outBoundTexts',
        headerName: `Total Outbound Texts`,
        width: 200,
        editable: false,
        sortable: true,
      },
      {
        field: 'inBoundTexts',
        headerName: `Total Inbound Texts`,
        width: 200,
        editable: false,
        sortable: true,
      },
  ];

    const getDate = (date) => {
        let showDate = new Date(date);
        return (
            showDate.toLocaleDateString('en-US', { hour: 'numeric', hour12: true })
        )
    }
    
  return (
            <DataGrid 
            rows={callReports?.map((callData) => { return {id: callData.datetime, date: getDate(callData.datetime), outBoundCount: callData['calls.outbound.all.count'], inBoundCount: callData['calls.inbound.all.count'], outBoundTexts: callData['sms.sent.all.count'], inBoundTexts: callData['sms.received.all.count'] } })}
            
            columns={columns}
            />
  )
}

export default OutboundCalls