import { AppBar, Button, Dialog, DialogContent, DialogTitle, IconButton, List, Toolbar, Typography } from '@mui/material';
import React , {useEffect, useState} from 'react'
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import BasicTable from './DialogTable';
import DashboardManagementComponent from './../page/QuestionTable';
import axios from "../../../api/axios";
const URL = './checklist/data';
const URL2 ='./header/data';

const RowClick =({rowData,onclose}) => {
  const [dataList, setDataList] = useState([]);
  const [List, setList] = useState([]);
  const handleClose =() =>{
    onclose()
  };

  const handleData =() =>{
    console.log(dataList);
  };
  const handleData2 =() =>{
    console.log(List);
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  useEffect(() => {
   loadData(rowData);        
  //  console.log(rowData);
},[rowData]);

const loadData = async (rowData) => {
  console.log("hello")
  try{
      //console.log(rowData.id);
      const data = {tid:rowData.id};
      const response = await axios.post( URL,data,
          {
            headers: {'Content-Type':'application/json' }                    
          }
      ); 
      
      if(response.data.status == 401){
          setDataList('');      
      }else{
       // console.log(response.data.data);
        setDataList(response.data.data);
      }

      const response2 = await axios.post( URL2,data,
          {
            headers: {'Content-Type':'application/json' }                    
          }
      ); 
      if(response2.data.status == 401){
          setList('');      
      }else{
       // console.log(response2.data.data);
        setList(response2.data.data);
     }
  }catch(err){
      if(!err?.response){
        //  console.log("No server response");
      }else{
          // console.log(err?.response.data);
      }
  } 
};

  return (
    // <Dialog 
    //     open={true} 
    //     onClose={handleClose}
    //     fullWidth
    //     maxWidth="md"
    //     PaperProps={{
    //         style: {
    //         height: '1000%',
    //         margin: 0,
    //         display: 'flex',
    //         flexDirection: 'column',
    //         }
    //      }}
    // >
    // <DialogTitle>Selected Row Data</DialogTitle>
    //  <DialogContent>
    //     <p>Checklist Name: {rowData.name}</p>
    //     <p>date: {rowData.date}</p>
    //     <p>Assigned BY: {rowData.author}</p>
    //     <p>Label: {rowData.label}</p>

    //     <Button onClick={handleClose}>Close</Button>
    //   </DialogContent>
    // </Dialog>
    <>
    <Dialog
        fullScreen
        open={true} 
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative', bgcolor:"#0e2d5d" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              bgcolor="#0e2d5d"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {/* {rowData.title} */}CHECKLIST
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              {/* save */}
            </Button>
            <Button autoFocus color="inherit" onClick={handleData}>
              {/* data */}
            </Button>
            <Button autoFocus color="inherit" onClick={handleData2}>
              {/* data2 */}
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent>
            {/* <p>date: {rowData.date}</p>
            <p>Assigned By: {rowData.author}</p> */}
            <DashboardManagementComponent dataList={dataList} List={List} title={rowData.title} titleId={rowData.id}/>
        {/* <Button onClick={handleClose}>Close</Button> */}
      </DialogContent>
    </Dialog>

     
    </>
  )
}

export default RowClick