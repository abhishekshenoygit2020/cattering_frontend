import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

import { AppBar, Grid, Tab, Tabs, Typography, makeStyles } from '@mui/material';
import SwipeableViews from 'react-swipeable-views';
import RowClick from './RowClick';
import axios from "../../../api/axios";
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
const URL = './title';


const CompletedCheck=() => {
    
      // const [open,setOpen] = React.useState(false);
      const [selectedRow, setSelectedRow] = React.useState(null);

      const handleRowClick =(params)=>{
          setSelectedRow(params.row);
          setOpen(true)
          //console.log("clicked row:",params.row)
      }
      const handleClose =() =>{
          setOpen(false);
      }

      const columns= [

          { field: 'id',
            headerName: 'ID',
            width: 90 ,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'left',
            renderCell: (params) => (
              <Box display="flex" alignItems="right" justifyContent="right">
                {params.value}
              </Box>
            ),
            
         
          }, 
          {
            field: 'title',
            headerName: 'Title',
            width: 500,
            editable: true,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'left',
            renderCell: (params) => (
              <Box display="flex" alignItems="center" justifyContent="center">
                {params.value}
              </Box>
            ),
       
          },
          {
            field: 'countsubmit',
            headerName: 'completed_checklist',
            width: 700,
            editable: true,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'left',
            renderCell: (params) => (
              <Box display="flex" alignItems="center" justifyContent="center">
                {params.value}
              </Box>
            ),
          },
          // {
          //   field: 'author',
          //   headerName: 'Author',
          //   width:200 ,
          //   editable: true,
          //   headerClassName: 'super-app-theme--header',
          //   headerAlign: 'center',
          // },
          // {
          //   field: 'label',
          //   headerName: 'Label',
          //   width:300 ,
          //   editable: true,
          //   headerClassName: 'super-app-theme--header',
          //   headerAlign: 'center',
          // },
          // {
          //   field: 'duedate',
          //   headerName: 'Due Date',
          //   width: 180,
          //   editable: true,
          //   headerClassName: 'super-app-theme--header',
          //   headerAlign: 'center',
          // },
        ];
        const [open, setOpen] = useState(false);
      const [isAddButton, setIsAddButton] = useState(true);
      const [editData, setEditData] = useState([]);
      const [dataList, setDataList] = useState([]);        
      const [isLoading, setGridLoading] = useState(true);
      const [refreshData, setRefreshData] = useState(false);
        
        useEffect(() => {
          loadData();        
      },[refreshData]);

      const loadData = async () => {
          try{
              const response = await axios.get( URL );              
              if(response.data.status == 401){
                  setDataList('');      
              }else{
                  setDataList(response.data.data);
              }
          }catch(err){
              if(!err?.response){
                  console.log("No server response");
              }else{
                  console.log(err?.response.data);
              }
          } 
      };
      
      const handleSuccess = (data) => {       
        setOpen(false);        
        setRefreshData((oldValue) => {
            return !oldValue;
        });
    }

    const handleException = (data) => {
        console.log(data);
    }



    


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
            {/* <DataGrid
                rows={rows}
                columns={columns}
                onRowClick={handleRowClick}
            
             /> */}

                    <DataGrid
                    
                        rows={dataList}
                        columns={columns}
                        // pageSize={5}
                        onRowClick={handleRowClick} 
                        // rowsPerPageOptions={[5]}                          
                        // experimentalFeatures={{ newEditingApi: true }}
                        // setRefreshData={setRefreshData}  
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
export default CompletedCheck;