import React , {useState, useEffect} from "react";
import { Button, Dialog, DialogContent, DialogTitle, FormControl, Input, InputLabel, MenuItem, Select, TextField, Grid } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';

import Checkbox from '@mui/material/Checkbox';
import FormLabel from '@mui/material/FormLabel';
import axios from '../../../api/axios';
import { CheckBox } from "@material-ui/icons";
const URL = './checklist';

const CheckDailog = ({ open, setOpen, isAddButton, rowData, setRefreshData}) => {
    
    //basic information
    const [id, setId] = useState('');
    const[particular,setParticular] = useState('');
    const[type,setType]=useState('');
    const[frequency,setFreq]=useState('');
    const[tid,setTid]=useState('');
    const[did,setDid] = useState('');
    const[departmentList, setDepartmentList] = useState([]);
    const [titleList, setTitleList] = useState([]);
    const[department, setDepartment] = useState('');
    const[title,setTitle]=useState('');
    const[obj1,setObj1] = useState(''); 
    const[obj2,setObj2] = useState(''); 
    const[mul1,setMul1] = useState('');
    const[mul2,setMul2] = useState('');
    const[mul3,setMul3] = useState('');
    const[mul4,setMul4] = useState('');
    const[lab1,setLab1] = useState('');
    const[lab2,setLab2] = useState('');
    const[lab3,setLab3] = useState('');
    const[lab4,setLab4] = useState('');
    const[rat1,setRat1] = useState('');
    const[rat2,setRat2] = useState('');
    const[rat3,setRat3] = useState('');
    const[rat4,setRat4] = useState('');


    


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
           
            
            if(type == "Obective"){
               const  data = {did:department,particular,type,frequency,tid:title, obj1:obj1, obj2:obj2};
                const mainURL = URL+'/add';
            serviceMethod(mainURL,method,data, handleSuccess, handleException);
            }

            if(type == "Multiples"){
                const data = {did:department,particular,type,frequency,tid:title, mul1:mul1, mul2:mul2, mul3:mul3, mul4:mul4};
                const mainURL = URL+'/add';
            serviceMethod(mainURL,method,data, handleSuccess, handleException);
            }

            if(type == "Label"){
                const data = {did:department,particular,type,frequency,tid:title, lab1:lab1, lab2:lab2, lab3:lab3, lab4:lab4};
                const mainURL = URL+'/add';
            serviceMethod(mainURL,method,data, handleSuccess, handleException);
            }

            if(type == "Ratings"){
                const data = {did:department,particular,type,frequency,tid:title, rat1:rat1, rat2:rat2, rat3:rat3, rat4:rat4};
                const mainURL = URL+'/add';
            serviceMethod(mainURL,method,data, handleSuccess, handleException);
            }

            // const data = {did:department,particular,type,frequency,tid:title};
            
        }else{
            const data = {id,did,particular,type,frequency,tid};
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
        setDid(rowData.did);
        setParticular(rowData.particular );
        setType(rowData.type);
        setFreq(rowData.frequency);
        setTid(rowData.tid);
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
    
    const [selectedOption, setSelectedOption] = useState('');
  
    const handleOptionChange = (event) => {
      setSelectedOption(event.target.value);
    };
      

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
                {isAddButton ? "Add checklist details" : "Edit checklist details"}
            </DialogTitle>        
            <DialogContent>
                <Grid item xs={12}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
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
                                        getTitle(e.target.value);
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
                        <Grid item xs={3}>

                            <FormControl fullWidth>                    
                                    
                                    <TextField
                                    value={particular}
                                    id="outlined-multiline-static"
                                    label="Add Particulars"
                                    multiline
                                    rows={4}
                                    required
                                    onChange={(e) => { setParticular(e.target.value)}}
                                    />
                                </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Questionary Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
        //   value={age}
          label="Age"
        //   onChange={handleChange}
        value={type}
        onChange={ (e) => setType(e.target.value)}
      
        >
          <MenuItem value={"Obective"}>Obective</MenuItem> 
          <MenuItem value={"Multiples"}>Multiples</MenuItem>
          <MenuItem value={"Label"}>Label</MenuItem>
          <MenuItem value={"Ratings"}>Ratings</MenuItem>

         
        </Select>
        {type === 'Obective' && (  
        <FormGroup>
            <TextField id="outlined-basic"  value={obj1} onChange={(e) => { setObj1(e.target.value)}} label="label" variant="outlined" />
            <TextField id="outlined-basic"  value={obj2} onChange={(e) => { setObj2(e.target.value)}} label="label" variant="outlined" />
          </FormGroup>
      )}
      {type === 'Multiples' && (
        <FormGroup>
           <TextField id="outlined-basic"  value={mul1} onChange={(e) => { setMul1(e.target.value)}}  label="label" variant="outlined" />
           <TextField id="outlined-basic" value={mul2} onChange={(e) => { setMul2(e.target.value)}} label="label" variant="outlined" />
           <TextField id="outlined-basic" value={mul3} onChange={(e) => { setMul3(e.target.value)}} label="label" variant="outlined" />
           <TextField id="outlined-basic" value={mul4} onChange={(e) => { setMul4(e.target.value)}} label="label" variant="outlined" /> 
          </FormGroup>
      )}
      {type === 'Label' && (
        <FormGroup>
            <TextField id="outlined-basic"   value={lab1} onChange={(e) => { setLab1(e.target.value)}} label="Outlined" variant="outlined" />
            <TextField id="outlined-basic"  value={lab2} onChange={(e) => { setLab2(e.target.value)}} label="Outlined" variant="outlined" />
            <TextField id="outlined-basic" value={lab3} onChange={(e) => { setLab3(e.target.value)}} label="Outlined" variant="outlined" />
            <TextField id="outlined-basic" value={lab4} onChange={(e) => { setLab4(e.target.value)}} label="Outlined" variant="outlined" />
        </FormGroup>
      )}
      {type === 'Ratings' && (
        <FormGroup>
            <TextField id="outlined-basic"  value={rat1} onChange={(e) => { setRat1(e.target.value)}} label="Outlined" variant="outlined" />
            <TextField id="outlined-basic" value={rat2} onChange={(e) => { setRat2(e.target.value)}} label="Outlined" variant="outlined" />
            <TextField id="outlined-basic" value={rat3} onChange={(e) => { setRat3(e.target.value)}} label="Outlined" variant="outlined" />
            <TextField id="outlined-basic" value={rat4} onChange={(e) => { setRat4(e.target.value)}} label="Outlined" variant="outlined" />
        </FormGroup>
      )}
      </FormControl>
                        </Grid>
                        {/* <Grid item xs={3}>
                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">Type</FormLabel>                            

                            <RadioGroup name="use-radio-group" defaultValue="first">
                                <FormControlLabel  checked={type === 'radio'}
                                    onChange={(e) => {
                                        setType("radio");                                                
                                    }}
                                    value="radio"
                                    name="radio-buttons"
                                    label="radio"
                                    control={<Radio />} 
                                />
                                <FormControlLabel  checked={type === 'label'}
                                    onChange={(e) => {
                                        setType("label");                                                
                                    }}
                                    value="label"
                                    label="label"
                                    name="radio-buttons" control={<Radio />}
                                />
                                 <FormControlLabel  checked={type === 'rating'}
                                    onChange={(e) => {
                                        setType("rating");                                                
                                    }}
                                    value="rating"
                                    name="radio-buttons"
                                    label="rating"
                                    control={<Radio />} 
                                />
                            </RadioGroup>
                        </FormControl>
                        
                        </Grid> */}
                      
                        <Grid item xs={3}>
                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">Type</FormLabel>                            

                            <RadioGroup name="use-radio-group" defaultValue="first">
                                <FormControlLabel  checked={frequency === 'weekly'}
                                    onChange={(e) => {
                                        setFreq("weekly");                                                
                                    }}
                                    value="weekly"
                                    name="radio-buttonss"
                                    label="weekly"
                                    control={<Radio />} 
                                />
                                <FormControlLabel  checked={frequency === 'monthly'}
                                    onChange={(e) => {
                                        setFreq("monthly");                                                
                                    }}
                                    value="monthly"
                                    label="monthly"
                                    name="radio-buttonss" control={<Radio />}
                                />
                                 <FormControlLabel  checked={frequency === 'daily'}
                                    onChange={(e) => {
                                        setFreq("daily");                                                
                                    }}
                                    value="daily"
                                    name="radio-buttonss"
                                    label="daily"
                                    control={<Radio />} 
                                />
                            </RadioGroup>
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

export default CheckDailog;