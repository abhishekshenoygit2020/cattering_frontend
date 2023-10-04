import React , {useState, useEffect} from "react";
import { Button, Dialog, DialogContent, DialogTitle, FormControl, Input, InputLabel, MenuItem, Select, TextField, Grid } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import axios from '../../../api/axios';
const URL = './section';

const SectionDailog = ({ open, setOpen, isAddButton, rowData, setRefreshData}) => {
    
    //basic information
    const [id, setId] = useState('');
    const [secName, setName] = useState('');
    const [secDesc, setDesc] = useState('');
    const[did,setDid] = useState('');
    const [departmentList, setDepartmentList] = useState([]);
    const [department, setDepartment] = useState('');
    


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
            const data = {secName,secDesc,did:department};
            const mainURL = URL+'/add';
            serviceMethod(mainURL,method,data, handleSuccess, handleException);
        }else{
            const data = {id,secName,secDesc,did};
            const mainURL = URL +'/'+data.id+ '/update';
            serviceMethod(mainURL,method,data, handleSuccess, handleException);
        } 
    };

    useEffect(() => {
        setOpen(open);
        loadData();
    },[rowData]);

    const loadData = async () => {
        setId(rowData.id );
        setName(rowData.secName );
        setDesc(rowData.secDesc);
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
                {isAddButton ? "Add Section" : "Edit Section"}
            </DialogTitle>        
            <DialogContent>
                <Grid item xs={12}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={3}>
                            <FormControl fullWidth>                      
                                    <TextField 
                                        value={secName}
                                        margin = "dense"
                                        id = "outlined-basic"
                                        label = "Section Name"
                                        variant = "outlined"
                                        required
                                        
                                        onChange={(e) => { setName(e.target.value)}}
                                        
                                    />
                                </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl fullWidth>                      
                                    <TextField 
                                        value={secDesc}
                                        margin = "dense"
                                        id = "outlined-basic"
                                        label = "Section Description"
                                        variant = "outlined"
                                        required
                                        
                                           onChange={(e) => { setDesc(e.target.value)}}
                                        
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
                            console.log(e.target.value);
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

export default SectionDailog;