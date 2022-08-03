import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';




  let dollarFormat = Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'});
  let initialValue = 0

const Opportunity = ({ opportunities }) => {
  const totals = (x, y, z) => {
    return (x + y - z)
  }
  const columns = [
    { field: 'dateCreated', headerName: 'Date Created', width: 200 },
    {
      field: 'value',
      headerName: `Value`,
      width: 250,
      editable: false,
      sortable: true,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 250,
      editable: false,
      sortable: true,
    },
    {
      field: 'createdBy',
      headerName: 'Created By',
      width: 250,
      editable: false,
      sortable: true,
    },
    {
      field: 'closeLink',
      headerName: 'Link to Opportunity',
      width: 250,
      renderCell: (params) => (
        <a style={{ textDecoration: 'none' }} href={params.value}><Button size='small' variant='outlined'>Link</Button></a>
      )
    },

  ];
    const getDate = (date) => {
        let showDate = new Date(date);
        return (
            showDate.toLocaleDateString('en-US')
        )
    }

    
  return (
            <DataGrid 
            rows={opportunities?.map((opportunity) => { return {id: opportunity.date_created, dateCreated: getDate(opportunity['date_created']), value: opportunity['value_formatted'] != '' ? opportunity['value_formatted'] : 'N/A', status: opportunity['status_label'], createdBy: opportunity['user_name'], closeLink: `https://app.close.com/lead/${opportunity['lead_id']}/` } })}
            
            columns={columns}
            />
  )
}

export default Opportunity