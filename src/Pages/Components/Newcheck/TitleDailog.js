import React , {useState, useEffect} from "react";
import { Button, Dialog, DialogContent, DialogTitle, FormControl, Input, InputLabel, MenuItem, Select, TextField, Grid } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import axios from '../../../api/axios';
const URL = './title';

const TitleDailog = ({ open, setOpen, isAddButton, rowData, setRefreshData}) => {
    
    //basic information
    const [id, setId] = useState('');
    const [check_Id, setCheck_Id] = useState('');
    const [title, setTitle] = useState('');
    const [did, setDid] = useState('');
    const [departmentList, setDepartmentList] = useState([]);
    
    
    


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
        console.log(did);
       
        const method = "POST";
        if(isAddButton){           
            const data = {check_Id,title,did};
            const mainURL = URL+'/add';
            serviceMethod(mainURL,method,data, handleSuccess, handleException);
        }else{
            const data = {id,check_Id,title,did};
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
        setCheck_Id(rowData.check_Id);
        setTitle(rowData.title);
        setDid(rowData.did);
      

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
                {isAddButton ? "Add Title" : "Edit Title"}
            </DialogTitle>        
            <DialogContent>
                <Grid item xs={12}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={3}>
                            <FormControl fullWidth>                      
                                    <TextField 
                                        value={check_Id}
                                        margin = "dense"
                                        id = "outlined-basic"
                                        label = "checklist Id"
                                        variant = "outlined"
                                        required
                                        
                                        onChange={(e) => { setCheck_Id(e.target.value)}}
                                        
                                    />
                                </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl fullWidth>                      
                                    <TextField 
                                        value={title}
                                        margin = "dense"
                                        id = "outlined-basic"
                                        label = "Checklist Title"
                                        variant = "outlined"
                                        required
                                        
                                           onChange={(e) => { setTitle(e.target.value)}}
                                        
                                    />
                                </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">department</InputLabel> 
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={did}
                        label="DEPARTMENT"
                        onChange={(e) => {
                            setDid(e.target.value);
                           
                        }} 
                        >
                        {departmentList.map(department => (
                            <MenuItem  value={department.id}>{department.deptName}</MenuItem>
                        
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

export default TitleDailog;