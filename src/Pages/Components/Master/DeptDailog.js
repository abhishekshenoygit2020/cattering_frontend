import React , {useState, useEffect} from "react";
import { Button, Dialog, DialogContent, DialogTitle, FormControl, Input, InputLabel, MenuItem, Select, TextField, Grid } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import axios from '../../../api/axios';
const URL = './department';

const DeptDailog = ({ open, setOpen, isAddButton, rowData, setRefreshData}) => {
    
    //basic information
    const [id, setId] = useState('');
    const [deptName, setName] = useState('');
    const [deptDesc, setDesc] = useState('');
   
    


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
            const data = {deptName,deptDesc};
            const mainURL = URL+'/add';
            serviceMethod(mainURL,method,data, handleSuccess, handleException);
        }else{
            const data = {id,deptName,deptDesc};
            const mainURL = URL +'/'+data.id+ '/update';
            serviceMethod(mainURL,method,data, handleSuccess, handleException);
        } 
    };

    useEffect(() => {
        setOpen(open);
        loadData();
    },[rowData]);

    const loadData = () => {
        setId(rowData.id );
        setName(rowData.deptName );
        setDesc(rowData.deptDesc);
        

       
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
                {isAddButton ? "Add Department" : "Edit Department"}
            </DialogTitle>        
            <DialogContent>
                <Grid item xs={12}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={3}>
                            <FormControl fullWidth>                      
                                    <TextField 
                                        value={deptName}
                                        margin = "dense"
                                        id = "outlined-basic"
                                        label = "Department Name"
                                        variant = "outlined"
                                        required
                                        
                                        onChange={(e) => { setName(e.target.value)}}
                                        
                                    />
                                </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl fullWidth>                      
                                    <TextField 
                                        value={deptDesc}
                                        margin = "dense"
                                        id = "outlined-basic"
                                        label = "Department Description"
                                        variant = "outlined"
                                        required
                                        
                                           onChange={(e) => { setDesc(e.target.value)}}
                                        
                                    />
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

export default DeptDailog;