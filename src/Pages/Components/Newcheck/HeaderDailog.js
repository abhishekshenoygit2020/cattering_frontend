import React , {useState, useEffect} from "react";
import { Button, Dialog, DialogContent, DialogTitle, FormControl, Input, InputLabel, MenuItem, Select, TextField, Grid } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import axios from '../../../api/axios';
const URL = './header';

const HeaderDailog = ({ open, setOpen, isAddButton, rowData, setRefreshData}) => {
    
    //basic information
    const [id, setId] = useState('');
    const [header, setHeader] = useState('');
    const [headerData, setHeaderData] = useState('');
    const [cid,setCid]=useState('');
    const[tid,setTid]=useState('');
    const[did,setDid]=useState('');
    const [departmentList, setDepartmentList] = useState([]);
    const [department, setDepartment] = useState('');
    const[title,setTitle]=useState('');
    const [titleList, setTitleList] = useState([]);
   
   
    


    const serviceMethod = async (mainURL,method,data,handleSuccess,handleException) => {
        try{
            const response = await axios.post(mainURL,data);
            return handleSuccess(response.data);  
        }catch(err){
            if(!err?.response){
                console.log("No server response");                
            }else{                
                return handleException(err?.response.data);
            }
        }                  
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const method = "POST";
        if(isAddButton){           
            const data = {header,headerData,tid:title,did:department};
            const mainURL = URL+'/add';
            serviceMethod(mainURL,method,data, handleSuccess, handleException);
        }else{
            const data = {id,header,headerData,tid,did};
            const mainURL = URL +'/'+data.id+ '/update';
            serviceMethod(mainURL,method,data, handleSuccess, handleException);
        } 
    };

    useEffect(() => {
        setOpen(open);
        loadData();
    },[rowData]);

    const loadData = async() => {
        setId(rowData.id );
        setHeader(rowData.header );
        setHeaderData(rowData.headerData);
        setTid(rowData.tid);
        setDid(rowData.did);
        setDepartment(rowData.did);
        setTitle(rowData.tid);

        try{
            let URL='./department/';
            const response = await axios.get( URL );              
            if(response.data.status == 401){
                setDepartmentList('');      
            }else{
                setDepartmentList(response.data.data);
            }
        }catch(err){
            if(!err?.response){
                console.log("No server response");
            }else{
                 console.log(err?.response.data);
            }
        } 
       
    };
 
    const getTitle = async (e) => {
        try{
            var id = e;
            let URL='./title/getTitleDatas';
            const data = {
                did:id
            }
            const response = await axios.post(URL,data);              
            if(response.data.status == 401){
                setTitleList([]);      
            }else{
                setTitleList(response.data.data);
               
            }
        }catch(err){
            if(!err?.response){
                setTitleList([]);     
                console.log("No server response");
            }else{
                 console.log(err?.response.data);
            }
        }
    }

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
        <Dialog
            fullWidth = { true }
            maxWidth = "lg"
            sx = {{'& .MuiDialog-paper':{width: '100%', maxHeight: '100%' }}
            }
            open={open}
        >

          <form onSubmit={handleSubmit} >
            <DialogTitle>
                {isAddButton ? "Add Header Details" : "Edit Header Details"}
            </DialogTitle>        
            <DialogContent>
                <Grid item xs={12}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={3}>
                    <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Header Title</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={header}
          label="Age"
          onChange={(e) => { setHeader(e.target.value)}}
        >
          <MenuItem value={"Operator"}>Operator</MenuItem>
          <MenuItem value={"Locaton"}>Location</MenuItem>
          <MenuItem value={"Model"}>Model</MenuItem>
          <MenuItem value={"PartNo"}>Part_no</MenuItem>
          <MenuItem value={"PartName"}>Part_Name</MenuItem>
          <MenuItem value={"Date"}>Date</MenuItem>
          <MenuItem value={"SheetNo"}>Sheet_No</MenuItem>
          <MenuItem value={"Section"}>Section</MenuItem>
          <MenuItem value={"Shift"}>Shift</MenuItem>
        </Select>
      </FormControl>
                        
                        </Grid>
                        {/* <Grid item xs={3}>
                            <FormControl fullWidth>                      
                                    <TextField 
                                        value={header}
                                        margin = "dense"
                                        id = "outlined-basic"
                                        label = "Header Title"
                                        variant = "outlined"
                                        required
                                        onChange={(e) => { setHeader(e.target.value)}}
                                    />
                                </FormControl>
                        </Grid> */}
                        <Grid item xs={3}>
                            <FormControl fullWidth>                      
                                    <TextField 
                                        value={headerData}
                                        margin = "dense"
                                        id = "outlined-basic"
                                        label = "Header Title Data"
                                        variant = "outlined"
                                        required
                                           onChange={(e) => { setHeaderData(e.target.value)}}
                                    />
                                </FormControl>
                        </Grid>
                    
                        
                        <Grid item xs={3}>
                            <FormControl fullWidth> 
                                <InputLabel id="demo-simple-select-label">department</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={department}
                                    label="DEPARTMENT"
                                    onChange={(e) => {
                                        setDepartment(e.target.value);
                                        getTitle(e.target.value);
                                        console.log(e.target.value);
                                    }}
                                    >
                                    {departmentList.map(department => (
                                        <MenuItem  value={department.id}>{department.deptName}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl fullWidth> 
                                <InputLabel id="demo-simple-select-label">title</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={title}
                                    label="Title name"
                                    onChange={(e) => {
                                        setTitle(e.target.value);
                                        console.log(e.target.value);
                                    }}
                                    >
                                    {titleList.map(title => (
                                        <MenuItem  value={title.id}>{title.title}</MenuItem>
                                
                                    ))}

                                   


                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>                  
                                  
          </DialogContent>
          <DialogActions sx = {{ margin: '10px' }} >
                <Button 
                   size = "large"
                   variant = "outlined"
                   autoFocus 
                   onClick={(e)=>{
                          setOpen(false);
                    }} >
                   Cancel 
               </Button> 
               <Button                 
                   size="large"
                   variant ="contained"
                   type = "submit">  {isAddButton ? "Add" : "Update"}
               </Button> 
            </DialogActions> 
            </form>            
    </Dialog>
    );
}

export default HeaderDailog;