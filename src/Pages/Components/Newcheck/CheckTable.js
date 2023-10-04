import React, { useEffect, useState } from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import EditIcon from '@material-ui/icons/Edit';
import { Stack, TextField, Typography } from '@mui/material';
import axios from "../../../api/axios";
import CheckDailog from './CheckDailog';
import Rating from '@mui/material/Rating';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FormControl,  InputLabel, MenuItem, Select } from '@mui/material';
import Radio from '@mui/material/Radio';

const URL = './checklist';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    // textAlign: 'left',
    color: theme.palette.text.secondary,
}));

const CheckTable = () => {    

    const columns = [
        { field: 'id', headerName: 'ID', width: 150 },
        // {
        //   field: 'did',
        //   headerName: 'department Name',
        //   width: 150,
        //   editable: true,
        // },
        {
          field: 'particular',
          headerName: ' Particular',
          width: 150,
          editable: true,
        },
        //  {
        //     field: 'type',
        //     headerName: ' Type',
        //     width: 150,
        //     editable: true,
        //   },
        // {
        //     type: 'actions',
        //     headerName: 'Types',
        //     width:150,
        //     cellClassName:'Types',
        //     getActions : (params) => {
        //         return [                       
        //                 <Type selectedRow={params.row} />           
        //                 // <Block selectedRow={params.row} />
        //         ];            
        //     },
        //   },
        {
            field: 'type',
            headerName: ' type',
            width: 150,
            editable: true,
        },
          {
            field: 'frequency',
            headerName: ' Frequency',
            width: 150,
            editable: true,
          },
        //   {
        //     field: 'title',
        //     headerName: ' title name',
        //     width: 150,
        //     editable: true,
        //   },
          
         
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width:150,
            cellClassName:'actions',
            getActions : (params) => {
                return [
                        <EditData selectedRow={params.row}/>,
                        <DeleteData selectedRow={params.row} />,                        
                        // <Block selectedRow={params.row} />
                ];            
            }            
        },    
    ];
   
    const [open, setOpen] = useState(false);
    const [isAddButton, setIsAddButton] = useState(true);
    const [editData, setEditData] = useState([]);
    const [dataList, setDataList] = useState([]);        
    const [isLoading, setGridLoading] = useState(true);
    const [refreshData, setRefreshData] = useState(false);
    const [departmentList, setDepartmentList] = useState([]);
    const [department, setDepartment] = useState('');
    const [title,setTitle]=useState('');
    const [titleList, setTitleList] = useState([]);
    

    const serviceMethod = async (mainURL,data,handleSuccess,handleException) => {
        try{        

            const response = await axios.delete(mainURL,data);
            return handleSuccess(response.data);  
        }catch(err){
            if(!err?.response){
                console.log("No server response");                
            }else{                
                return handleException(err?.response.data);
            }
        }                  
    };

    const serviceUpdateMethod = async (mainURL,data,handleSuccess,handleException) => {
        try{     

            const response = await axios.post(mainURL,data);
            return handleSuccess(response.data.data || '');  
        }catch(err){
            if(!err?.response){
                console.log("No server response");                
            }else{                
                return handleException(err?.response.data);
            }
        }                  
    };

    useEffect(() => {
        loadData();        
    },[refreshData]);

    const loadData = async () => {
        // try{
        //     const response = await axios.get( URL );              
        //     if(response.data.status == 401){
        //         setDataList('');      
        //     }else{
        //         setDataList(response.data.data);
        //     }
        // }catch(err){
        //     if(!err?.response){
        //         console.log("No server response");
        //     }else{
        //          console.log(err?.response.data);
        //     }
        // } 

        try{
            let URL='./department/';
            const response = await axios.get( URL );              
            if(response.data.status == 401){
                setDepartmentList('');      
            }else{
                console.log(response.data.data);
                setDepartmentList(response.data.data);
            }
        }catch(err){
            if(!err?.response){
                console.log("No server response");
            }else{
                 console.log(err?.response.data);
            }
        }
    };//vkEOcbExL

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

    
    const EditData = (props) => {
        return (
            <EditIcon style={{ cursor: "pointer" }} onClick={(e) => {
                e.stopPropagation();
                console.log(props.selectedRow.id);
                setEditData(props.selectedRow);
                setIsAddButton(false);
                setOpen(true);                
            }}/>
        );
    }


    const Type = (props) => {
        return (        
                props.selectedRow.type == "rating" ?
                <Stack spacing={1}>
                    <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                  
                </Stack> :
                props.selectedRow.type == "label" ? 
                <TextField id="standard-basic" label="Standard" variant="standard" /> :
                props.selectedRow.type == "radio" ? 
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                >
                    <FormControlLabel value="" control={<Radio />} label="" />               
                </RadioGroup>:""
        );
    }
    
    const DeleteData = (props) => {
        return (
            <DeleteIcon 
                onClick={() => {
                    console.log(props.selectedRow.id);
                    const data = {id:props.selectedRow.id};
                    const mainURL = URL +'/'+data.id+ '/delete';
                    serviceMethod(mainURL,data, handleSuccess, handleException);
                }}
            />
        );
    };

    const getData = async (val) => {       
        console.log(department+ " " + val);
        var data  = {
            "did":department,
            "tid":val
        };
        try{
            const response = await axios.post(URL,data);               
            if(response.data.success == 0){
                setDataList("");      
            }else{
                setDataList(response.data.data);
            }
        }catch(err){
            if(!err?.response){
                console.log("No server response");
            }else{
                setDataList("");      
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


    return  (
        <div style={{marginTop:'10px', padding:'25px' }}>
            <div className = "topContent">
                <Box sx={{ flexGrow: 1, padding:'10px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={2} >
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
                        <Grid item xs={2}>
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
                                    getData(e.target.value);
                                }}
                            
                                >
                               {titleList.map(title => (
                                        <MenuItem  value={title.id}>{title.title}</MenuItem>
                                
                                    ))}

                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                        </Grid>
                        <Grid item xs={2}>
                            <Button style={{ marginTop:'5px', marginLeft: '0px' }} onClick={(e) => {
                                setIsAddButton(true);
                                setOpen(true);
                                setEditData([]);
                            }} variant="contained">Add Checklist title</Button>
                        </Grid>                        
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
                    <CheckDailog
                        isAddButton ={isAddButton}                        
                        setOpen ={setOpen} 
                        open={open}   
                        rowData={editData}        
                        setRefreshData={setRefreshData}        
                    />
                </Box>
            </div>
        </div>
    );
}

export default CheckTable;