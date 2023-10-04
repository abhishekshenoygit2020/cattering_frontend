import React , {useState, useEffect} from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Grid } from "@mui/material";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { DataGrid } from "@mui/x-data-grid";
import axios from '../../../api/axios';
const URL = './Auth/getlogout';
  


const Logs=()=> {

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'name',
      width: 270,
      editable: true,
    },
    {
      field: 'date',
      headerName: 'Date',
      width: 220,
      editable: true,
    },
    {
      field: 'time',
      headerName: 'Time',
      width: 200,
      editable: true,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 200,
      editable: true,
    },   
      
    // {
    //     field: 'actions',
    //     type: 'actions',
    //     headerName: 'Actions',
    //     width:150,
    //     cellClassName:'actions',
    //     getActions : (params) => {
    //         return [
    //                 <EditData selectedRow={params.row}/>,
    //                 <DeleteData selectedRow={params.row} />,                        
                    
    //         ];            
    //     }            
    // },    
];
      const [open,setOpen] = useState (false);
      const[isAddButton,setIsAddButton]=useState(true);
      const[editData,setEditData]=useState([]);
      const[dataList,setDataList]=useState([]);
      const[isLoading,setGridLoading]=useState(true);
      const[refreshData,setRefreshData]=useState(false);

//       const serviceMethod = async (mainURL,data,handleSuccess,handleException) => {
//         try{        

//             const response = await axios.delete(mainURL,data);
//             return handleSuccess(response.data);  
//         }catch(err){
//             if(!err?.response){
//                 console.log("No server response");                
//             }else{                
//                 return handleException(err?.response.data);
//             }
//         }                  
//     };
//     const serviceUpdateMethod = async (mainURL,data,handleSuccess,handleException) => {
//       try{        

//           const response = await axios.post(mainURL,data);
//           return handleSuccess(response.data);  
//       }catch(err){
//           if(!err?.response){
//               console.log("No server response");                
//           }else{                
//               return handleException(err?.response.data);
//           }
//       }                  
//   };

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
  
//   const EditData = (props) => {
//       return (
//           <ModeEditIcon style={{ cursor: "pointer" }} onClick={(e) => {
//               e.stopPropagation();
//               console.log(props.selectedRow.id);
//               setEditData(props.selectedRow);
//               setIsAddButton(false);
//               setOpen(true);                
//           }}/>
//       );
//   }
  
//   const DeleteData = (props) => {
//       return (
//           <DeleteIcon 
//               onClick={() => {
//                   console.log(props.selectedRow.id);
//                   const data = {id:props.selectedRow.id};
//                   const mainURL = URL +'/'+data.id+ '/delete';
//                   serviceMethod(mainURL,data, handleSuccess, handleException);
//               }}
//           />
//       );
//   };
  const handleSuccess = (data) => {       
    setOpen(false);        
    setRefreshData((oldValue) => {
        return !oldValue;
    });
}

const handleException = (data) => {
    console.log(data);
}
    
return(

  <>
   <div style={{marginTop:'10px', padding:'25px' }}>
            <div className = "topContent">
                <Box sx={{ flexGrow: 1, padding:'10px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={10} >
                           
                        </Grid>
                        {/* <Grid item xs={2}>
                            <Button style={{ marginTop:'5px', marginLeft: '0px' ,backgroundColor:'#4E4E4E'}} onClick={(e) => {
                                setIsAddButton(true);
                                setOpen(true);
                                setEditData([]);
                            }} variant="contained">Add USER</Button>
                        </Grid>                         */}
                    </Grid>
                </Box>
            </div>
            <div className="GridContent">
                <Box sx={{ flexGrow: 1, padding:'0px', height: 400, width: '100%' }} >                    
                    <DataGrid
                        rows={dataList}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}                          
                        experimentalFeatures={{ newEditingApi: true }}
                    /> 
                    {/* <UserDailog
                        isAddButton ={isAddButton}                        
                        setOpen ={setOpen} 
                        open={open}   
                        rowData={editData}        
                        setRefreshData={setRefreshData}        
                    /> */}
                </Box>
            </div>
        </div>
     </> 
)
          
};
export default Logs;
