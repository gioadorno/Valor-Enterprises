import { Box, Container, Typography, Button, Checkbox, Tooltip } from "@mui/material";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HouseIcon from '@mui/icons-material/House';
import MobileNav from '../MobileNav';
import OuterBar from '../OuterBar';
import { useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useEffect, Fragment, useState } from "react";
import { API } from 'aws-amplify';

const label = { inputProps: { 'aria-label': 'Audited' } }

// const PropertyTooltip = forwardRef(() => (
//     <Tooltip sx={{ backgroundColor: '#f5f5f9', color: '#1976d2', maxWidth: 220, fontSize: 12, border: '1px solid #dadde9' }} />
// ))

//test


const Inventory = () => {
    // API
    const apiName = 'valproperties';
    const path = '/properties';
    // 
    const [ properties, setProps ] = useState([]);
    const props = properties.sort((a, b) => new Date(b.date) - new Date(a.date))
    
    useEffect(() => {
    API.get(apiName, path)
    .then(res => {
        setProps(res.Items)})
    },[])
    const [pageSize, setPageSize] = useState(50);

    const navigate = useNavigate();

    // Address Filter
    const addresses = props?.map(prop => prop.address.replace(', USA', ''));

    //Status Filter
    const statusProps = props?.filter((value, index, self) => 
    index === self.findIndex((t) => (
        t.status === value.status
    ))
    );
    const statuses = statusProps?.map(prop => prop.status)

    // Acquisition Filter
    const acqProps = props?.filter((value, index, self) => 
    index === self.findIndex(t => t.name === value.name));
    const acqNames = acqProps.map(prop => prop.name);

    // Disposition Filter
    const dispoProps = props?.filter((value, index, self) =>
    index === self.findIndex(t => t.dispoName === value.dispoName));
    const dispoNames = dispoProps.map(prop => prop.dispoName)

    // Disposition 2 Filter
    const dispoProps2 = props?.filter((value, index, self) =>
    index === self.findIndex(t => t.dispoName2 === value.dispoName2));
    const dispoNames2 = dispoProps2.map(prop => prop.dispoName2);

    // Supplier Type Filter
    const supplierProps = props?.filter((value, index, self) => index === self.findIndex(t => t.supplier === value.supplier));
    const supplierType = supplierProps?.map(prop => prop.supplier);

    // Prop Type Filter
    const propTypeProps = props?.filter((value, index, self) => index === self.findIndex(t => t.propType === value.propType));
    const propType = propTypeProps.map(prop => prop.propType);

    // Deal Split Filter
    const dealSplitProps = props?.filter((value, index, self) => index === self.findIndex(t => t.dealSplit === value.dealSplit));
    const dealSplit = dealSplitProps.map(prop => prop.dealSplit);

    // Title Company Filter
    const titleCompanyProps = props?.filter((value, index, self) => index === self.findIndex(t => t.titleCompany === value.titleCompany));
    const titleCompany = titleCompanyProps.map(prop => prop.titleCompany);

    const columns = [
        {
            field: 'audited',
            headerName: 'Audited',
            width: 100,
            sortable: true,
            editable: false,
            type: 'boolean',
            headerAlign: 'center',
            renderCell: (params) => (
                <Tooltip followCursor sx={{ backgroundColor: '#f5f5f9', color: '#1976d2', maxWidth: 220, fontSize: 12, border: '1px solid #dadde9', alignItems: 'center', display: 'flex', flexDirection: 'column' }} title={
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography sx={{ textAlign: 'center', fontSize: '1.5em', pb: 2, width: "100%", m: 'auto' }} variant='body'><em>{params.row.address}</em></Typography>
                        <Typography variant='body2' sx={{ color : params.value === true ? '#1ec71e' : 'orange', textAlign: 'center'}}>{params.value === true ? 'Property has been Audited' : 'Not Audited'}</Typography>
                    </Box>
                }>
                    <Box sx={{ width: '100%', alignItems: 'center' }}><Checkbox {...label} icon={<HomeOutlinedIcon sx={{ color: '#f0f8ff' }} fontSize='large' />} checkedIcon={<HouseIcon fontSize='large' sx={{ color: '#1ec71e' }} />} checked={params.value === true ? true : false} />
                    </Box>
                </Tooltip>
            )
        },
        { field: 'dateCreated', 
        headerName: 'Date Created', 
        width: 150, 
        sortable: true, 
        editable: false,
        type: 'date',
        headerAlign: 'center',
        renderCell: (params) => (
            <Typography sx={{ textAlign: 'center', width: '100%' }} variant='body2'>{new Date(params.value).toLocaleDateString()}</Typography>
        )
         },
         { field: 'status', 
         headerName: 'Property Status', 
         width: 200, 
         sortable: true, 
         editable: false,
         type: 'singleSelect',
         valueOptions: statuses,
         headerAlign: 'center',
         renderCell: (params) => {
             if(params.value === 'Active') {
                 return <Typography sx={{ width: '100%', textAlign: 'center', color: '#1ec71e' }} variant='h6'>{params.value}</Typography>
            }
             else if(params.value === 'Pending') {
                 return <Typography sx={{ width: '100%', textAlign: 'center', color: 'orange' }} variant='h6'>{params.value}</Typography>
             } else if (params.value === 'Closed') {
                return <Typography sx={{ width: '100%', textAlign: 'center', color: '#20b7b7' }} variant='h6'>{params.value}</Typography>
             } else if (params.value === 'Cancelled') {
                return <Typography sx={{ width: '100%', textAlign: 'center', color: 'red' }} variant='h6'>{params.value}</Typography>
             }

         }
          },
        {
          field: 'address',
          headerName: 'Property',
          width: 400,
          editable: false,
          sortable: true,
          type: 'singleSelect',
          valueOptions: addresses,
          headerAlign: 'center',
          renderCell: (params) => (
            <Typography sx={{ color: '#0378a5', fontWeight: 'bold', textAlign: 'center', width: '100%' }} variant='body2'>{params.value}</Typography>
        )
        },
        {
            field: 'arv',
            headerName: `ARV`,
            width: 125,
            editable: false,
            sortable: true,
            type: 'number',
            headerAlign: 'center',
            renderCell: (params) => (
              <Typography sx={{ textAlign: 'center', width: '100%' }} variant='body2'><span>$</span>{new Intl.NumberFormat().format(params.value)}</Typography>
          )
          },
          {
            field: 'netPrice',
            headerName: `Contract Price`,
            width: 125,
            editable: false,
            sortable: true,
            type: 'number',
            headerAlign: 'center',
            renderCell: (params) => (
              <Typography sx={{ textAlign: 'center', width: '100%' }} variant='body2'><span>$</span>{new Intl.NumberFormat().format(params.value)}</Typography>
          )
          },
          {
            field: 'salePrice',
            headerName: `Wholesale Price`,
            width: 125,
            editable: false,
            sortable: true,
            type: 'number',
            headerAlign: 'center',
            renderCell: (params) => (
              <Typography sx={{ textAlign: 'center', width: '100%' }} variant='body2'><span>$</span>{new Intl.NumberFormat().format(params.value)}</Typography>
          )
          },
          {
            field: 'emd',
            headerName: `EMD`,
            width: 125,
            editable: false,
            sortable: true,
            type: 'number',
            headerAlign: 'center',
            renderCell: (params) => (
              <Typography sx={{ textAlign: 'center', width: '100%' }} variant='body2'><span>$</span>{new Intl.NumberFormat().format(params.value)}</Typography>
          )
          },
          {
            field: 'optionFee',
            headerName: `Option Fee`,
            width: 125,
            editable: false,
            sortable: true,
            type: 'number',
            headerAlign: 'center',
            renderCell: (params) => (
              <Typography sx={{ textAlign: 'center', width: '100%' }} variant='body2'><span>$</span>{new Intl.NumberFormat().format(params.value)}</Typography>
          )
          },
          {
          field: 'dealSplit',
          headerName: `Deal Split`,
          width: 150,
          editable: false,
          sortable: true,
          type: 'singleSelect',
          valueOptions: dealSplit,
          headerAlign: 'center',
          renderCell: (params) => (
            <Typography sx={{ textAlign: 'center', width: '100%' }} variant='body2'>{params.value}</Typography>
        )
        },
        {
            field: 'acq',
            headerName: `Acquisition`,
            width: 200,
            editable: false,
            sortable: true,
            type: 'singleSelect',
            valueOptions: acqNames,
            headerAlign: 'center',
            renderCell: (params) => (
                <Tooltip followCursor sx={{ bocolor: 'white', color: '#1976d2', maxWidth: 220, fontSize: 12, border: '1px solid #dadde9', alignItems: 'center', display: 'flex', flexDirection: 'column' }} title={
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography sx={{ textAlign: 'center', fontSize: '1.4em', pb: 2, width: "100%", m: 'auto' }} variant='body'><strong>{params.row.address}</strong></Typography>
                        <Typography sx={{ textAlign: 'center', width: '100%', fontSize: '1.4em' }} variant='body2'><span style={{ fontWeight: 600, color: '#27e59f' }}>{params.value}</span></Typography>
                    </Box>
                }>
              <Typography sx={{ textAlign: 'center', width: '100%', cursor: 'help' }} variant='body2'>{params.value}</Typography>
              </Tooltip>
          )
          },
          {
            field: 'dispo',
            headerName: `Disposition`,
            width: 200,
            editable: false,
            sortable: true,
            type: 'singleSelect',
            valueOptions: dispoNames,
            headerAlign: 'center',
            renderCell: (params) => (
                <Tooltip followCursor sx={{ bocolor: 'white', color: '#1976d2', maxWidth: 220, fontSize: 12, border: '1px solid #dadde9', alignItems: 'center', display: 'flex', flexDirection: 'column' }} title={
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography sx={{ textAlign: 'center', fontSize: '1.4em', pb: 2, width: "100%", m: 'auto' }} variant='body'><strong>{params.row.address}</strong></Typography>
                        <Typography sx={{ textAlign: 'center', width: '100%', fontSize: '1.4em' }} variant='body2'><span style={{ fontWeight: 600, color: '#27e59f' }}>{params.value}</span></Typography>
                    </Box>
                }>
              <Typography sx={{ textAlign: 'center', width: '100%', cursor: 'help' }} variant='body2'>{params.value}</Typography>
              </Tooltip>
          )
          },
          {
            field: 'dispo2',
            headerName: `Disposition`,
            width: 200,
            editable: false,
            sortable: true,
            type: 'singleSelect',
            valueOptions: dispoNames2,
            headerAlign: 'center',
            renderCell: (params) => (
                <Tooltip followCursor sx={{ bocolor: 'white', color: '#1976d2', maxWidth: 220, fontSize: 12, border: '1px solid #dadde9', alignItems: 'center', display: 'flex', flexDirection: 'column' }} title={
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography sx={{ textAlign: 'center', fontSize: '1.4em', pb: 2, width: "100%", m: 'auto' }} variant='body'><strong>{params.row.address}</strong></Typography>
                        <Typography sx={{ textAlign: 'center', width: '100%', fontSize: '1.4em' }} variant='body2'><span style={{ fontWeight: 600, color: '#27e59f' }}>{params.value}</span></Typography>
                    </Box>
                }>
              <Typography sx={{ textAlign: 'center', width: '100%', cursor: 'help' }} variant='body2'>{params.value}</Typography>
              </Tooltip>
          )
          },
          {
            field: 'supplierType',
            headerName: `Supplier Type`,
            width: 200,
            editable: false,
            sortable: true,
            type: 'singleSelect',
            valueOptions: supplierType,
            headerAlign: 'center',
            renderCell: (params) => (
              <Typography sx={{ textAlign: 'center', width: '100%' }} variant='body2'>{params.value}</Typography>
          )
          },
        {
          field: 'supplier',
          headerName: 'Supplier',
          width: 200,
          editable: false,
          sortable: true,
          headerAlign: 'center',
          renderCell: (params) => (
            <Tooltip sx={{ bocolor: 'white', color: '#1976d2', maxWidth: 220, fontSize: 12, border: '1px solid #dadde9', alignItems: 'center', display: 'flex', flexDirection: 'column' }} title={
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography sx={{ textAlign: 'center', fontSize: '1.4em', pb: 2, width: "100%", px: 2, pb: 1 }} variant='body'><strong>{params.row.address}</strong></Typography>
                    <Typography sx={{ textAlign: 'center', width: '100%' }} variant='body2'><span style={{ fontWeight: 600, fontStyle: 'italic', color: '#27e59f' }}>{params.value}</span></Typography>
                    <Typography sx={{ textAlign: 'center', width: '100%' }} variant='body2'><span style={{ fontWeight: 600, fontStyle: 'italic', color: '#27e59f' }}>{params.row.supplierType}</span></Typography>
                    <Typography sx={{ textAlign: 'center', width: '100%' }} variant='body2'><span style={{ fontWeight: 600, fontStyle: 'italic', color: '#27e59f' }}>{params.row.supplierPhone}</span></Typography>
                    <Typography sx={{ textAlign: 'center', width: '100%' }} variant='body2'><span style={{ fontWeight: 600, fontStyle: 'italic', color: '#27e59f' }}>{params.row.supplierEmail}</span></Typography>
                </Box>
            }>
            <Typography sx={{ textAlign: 'center', width: '100%', cursor: 'help' }} variant='body2'>{params.value}</Typography>
            </Tooltip>
        )
        },
          {
            field: 'dealulator',
            headerName: "Dealulator",
            width: 100,
            editable: false,
            sortable: true,
            headerAlign: 'center',
            renderCell: (params) => (
                <Typography sx={{ textAlign: 'center', width: '100%' }} variant='body2'>{params.value}</Typography>
            )
          },
          {
            field: 'exclusive',
            headerName: "Exclusive",
            width: 100,
            editable: false,
            sortable: true,
            headerAlign: 'center',
            renderCell: (params) => (
                <Typography sx={{ textAlign: 'center', width: '100%' }} variant='body2'>{params.value}</Typography>
            )
          },
          {
            field: 'underlyingContract',
            headerName: "Underlying Contract",
            width: 150,
            editable: false,
            sortable: true,
            headerAlign: 'center',
            renderCell: (params) => (
                <Typography sx={{ textAlign: 'center', width: '100%' }} variant='body2'>{params.value}</Typography>
            )
          },
          {
            field: 'propType',
            headerName: `Property Type`,
            width: 200,
            editable: false,
            sortable: true,
            type: 'singleSelect',
            valueOptions: propType,
            headerAlign: 'center',
            renderCell: (params) => (
                <Tooltip followCursor sx={{ bocolor: 'white', color: '#1976d2', maxWidth: 220, fontSize: 12, border: '1px solid #dadde9', alignItems: 'center', display: 'flex', flexDirection: 'column' }} title={
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography sx={{ textAlign: 'center', fontSize: '1.4em', pb: 2, width: "100%", m: 'auto' }} variant='body'><strong>{params.row.address}</strong></Typography>
                        <Typography sx={{ textAlign: 'center', width: '100%' }} variant='body2'>Property Type: <span style={{ fontWeight: 600, fontStyle: 'italic', color: '#27e59f' }}>{params.value}</span></Typography>
                    </Box>
                }>
              <Typography sx={{ textAlign: 'center', width: '100%', cursor: 'help' }} variant='body2'>{params.value}</Typography>
              </Tooltip>
          )
          },
          { field: 'coe', 
          headerName: 'COE', 
          width: 150, 
          sortable: true, 
          editable: false,
          type: 'date',
          headerAlign: 'center',
          renderCell: (params) => (
            <Tooltip followCursor sx={{ bocolor: 'white', color: '#1976d2', maxWidth: 220, fontSize: 12, border: '1px solid #dadde9', alignItems: 'center', display: 'flex', flexDirection: 'column' }} title={
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography sx={{ textAlign: 'center', fontSize: '1.4em', pb: 2, width: "100%", m: 'auto' }} variant='body'><strong>{params.row.address}</strong></Typography>
                    <Typography sx={{ textAlign: 'center', width: '100%' }} variant='body2'>COE: <span style={{ fontWeight: 600, fontStyle: 'italic', color: '#27e59f' }}>{params.value}</span></Typography>
                </Box>
            }>
              <Typography sx={{ textAlign: 'center', width: '100%', cursor: 'help' }} variant='body2'>{params.value}</Typography>
              </Tooltip>
          )
           },
           {
            field: 'titleCompany',
            headerName: `Title Company`,
            width: 200,
            editable: false,
            sortable: true,
            type: 'singleSelect',
            valueOptions: titleCompany,
            headerAlign: 'center',
            renderCell: (params) => (
                <Tooltip followCursor sx={{ bocolor: 'white', color: '#1976d2', maxWidth: 220, fontSize: 12, border: '1px solid #dadde9', alignItems: 'center', display: 'flex', flexDirection: 'column' }} title={
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography sx={{ textAlign: 'center', fontSize: '1.4em', pb: 2, width: "100%", m: 'auto' }} variant='body'><strong>{params.row.address}</strong></Typography>
                        <Typography sx={{ textAlign: 'center', width: '100%' }} variant='body2'><span style={{ fontWeight: 600, fontStyle: 'italic', color: '#27e59f' }}>{params.value}</span></Typography>
                    </Box>
                }>
              <Typography sx={{ textAlign: 'center', width: '100%', cursor: 'help' }} variant='body2'>{params.value}</Typography>
              </Tooltip>
          )
          },
        {
          field: 'pictureLink',
          headerName: 'Property Photos',
          width: 150,
          headerAlign: 'center',
          cellAlign: 'center',
          type: 'action',
          renderCell: (params) => (
              params.value != '' &&
            <a style={{ textDecoration: 'none', width: "100%", textAlign: 'center' }} href={params.value}><Button size='small' variant='outlined'>Photos</Button></a>
          )
        },
    
      ];

        
  return (
    <Box sx={{ display: 'flex' }}>
        <OuterBar />
        <Container maxWidth="2xl" sx={{ mt: 10, mb: 4, display: 'flex', alignItems: 'center', height: '100vh', justifyContent: 'flex-start', flexDirection: 'column'   }} >
            <Typography sx={{ textAlign: 'center', fontFamily: 'Rubik', pb: 2 }} variant='h4'>Double click on a row to view more property details</Typography>
            <DataGrid
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            onRowDoubleClick={(params) => navigate(`/acquisitions/${params.id}`) }
            sx={{ width: '90%', textAlign: 'center', '& .MuiDataGrid-row': { textAlign: 'center' } }}
            rows={props?.map(prop => (
                {
                    id: prop.id,
                    audited: prop.audited,
                    dateCreated: prop.date,
                    status: prop.status,
                    address: prop.address.replace(', USA', ''),
                    arv: prop.arv.replace('$', '').replace(',', '').replace(',', ''),
                    netPrice: prop.netPrice.replace('$', '').replace(',', '').replace(',', ''),
                    salePrice: prop.salePrice.replace('$', '').replace(',', '').replace(',', ''),
                    emd: prop.emd.replace('$', '').replace(',', '').replace(',', ''),
                    optionFee: prop.optionFee.replace('$', '').replace(',', '').replace(',', ''),
                    dealSplit: prop.dealSplit,
                    acq: prop.name,
                    dispo: prop.dispoName,
                    dispo2: prop.dispoName2,
                    supplierType: prop.supplier,
                    supplier: prop.supplierName,
                    supplierPhone: prop.supplierPhone,
                    supplierEmail: prop.supplierEmail,
                    dealulator: prop.dealulator,
                    exclusive: prop.exclusive,
                    underlyingContract: prop.underlyingContract,
                    propType: prop.propType,
                    coe: prop.coe,
                    titleCompany: prop.titleCompany,
                    pictureLink: prop.pictureLink,
                }
            ))}
            components={{
                Toolbar: GridToolbar,
            }}
            // componentsProps={{
            //     toolbar: {
            //         showQuickFilter: true,
            //         quickFilterProps: { debounceMs: 500 },
            //       },
            // }}
            columns={columns}
            checkboxSelection
            loading={props.length < 1 ? true : false}
            />
        </Container>
        <MobileNav />
    </Box>
  )
}

export default Inventory