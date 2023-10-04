import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { AppBar, Grid, Tab, Tabs, Typography, makeStyles } from '@mui/material';
import SwipeableViews from 'react-swipeable-views';
import RowClick from './RowClick';



const DataGridDemo=() => {
    
    const [open,setOpen] = React.useState(false);
    const [selectedRow, setSelectedRow] = React.useState(null);

    const handleRowClick =(params)=>{
        setSelectedRow(params.row);
        setOpen(true)
        // console.log("clicked row:",params.row)
    }
    const handleClose =() =>{
        setOpen(false);
    }

    const columns= [

        { field: 'id',
          headerName: 'ID',
          width: 90 ,
          headerClassName: 'super-app-theme--header',
          headerAlign: 'center',
        }, 
        {
          field: 'name',
          headerName: 'Name',
          width: 300,
          editable: true,
          headerClassName: 'super-app-theme--header',
          headerAlign: 'center',
        },
        {
          field: 'date',
          headerName: 'Date',
          width: 180,
          editable: true,
          headerClassName: 'super-app-theme--header',
          headerAlign: 'center',
        },
        {
          field: 'author',
          headerName: 'Author',
          width:200 ,
          editable: true,
          headerClassName: 'super-app-theme--header',
          headerAlign: 'center',
        },
        {
          field: 'label',
          headerName: 'Label',
          width:300 ,
          editable: true,
          headerClassName: 'super-app-theme--header',
          headerAlign: 'center',
        },
        {
          field: 'duedate',
          headerName: 'Due Date',
          width: 180,
          editable: true,
          headerClassName: 'super-app-theme--header',
          headerAlign: 'center',
        },

      
      ];
      
      const rows = [
        { id: 1,name: 'Covid-19 Inception', date: '12/12/2020', author:'johnwick' },
        { id: 2,name: 'Room Manintance', date: '14/12/2020', author:'johnw' },
        { id: 3,name: 'Construction', date: '18/11/1010', author:'johnwic' },
        { id: 4,name: 'Hospital Maintanance', date: '10/09/2021', author:'nwick' },
        { id: 5,name: 'Hospital Maintanance', date: '10/09/2021', author:'nwick' },
        { id: 6,name: 'Hospital Maintanance', date: '10/09/2021', author:'nwick' },
      ];

      
      

  return (
    <Box 
    sx={{ 
      mt:5,
      height: 400,
       width: '100%' ,
       '& .super-app-theme--header': {
        backgroundColor: '#86b6ff',
       
       }
       }}
    >
        {/* <Grid container> */}
            <Grid item xs={10} >
            <DataGrid
                rows={rows}
                columns={columns}
                onRowClick={handleRowClick}
            
             />
             </Grid>
        {/* </Grid> */}

        {open && (
        <RowClick
         rowData={selectedRow}
         onclose={handleClose}
        />
        )}
    </Box>
  );
}
export default DataGridDemo;