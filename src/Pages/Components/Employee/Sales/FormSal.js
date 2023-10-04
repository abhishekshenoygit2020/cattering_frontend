import React, { useState, useEffect } from 'react';
import { Button,Box, Dialog, DialogContent, DialogTitle, FormControl, Input, InputLabel, MenuItem, Select, TextField, Grid } from '@mui/material';

import { DataGrid } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuthContext } from '../../../../context/AuthContext';
import axios from "../../../../api/axios";
import SalAdd from './SalAdd';
const URL = './track';

const FormSal = () => {

    const {trackNo} = useAuthContext();

    const [id, setId] = useState('');
    const [product_id, setProd_id] = useState('');
    const [quantity,setQuantity]=useState('');
    const [productlist, setProduct_list] = useState([]);
    const [pname, setPname] = useState('');
    const [dataList, setDataList] = useState([]);
    const [refreshData, setRefreshData] = useState(false); 
    const [refreshComponent,setRefreshComponent] = useState(false);
    const [isAddButton, setIsAddButton] = useState(true);
    const [open, setOpen] = useState(false);
    const [trackno, setTrackno] = useState('');
    

    
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'product_id', headerName: 'product name', width: 130 },
        { field: 'quantity', headerName: 'quantity', width: 130 },
        
    ];

    

    useEffect(() => {
        loadData(); 
        setTrackno(trackNo);  
        console.log("track"+trackNo);     
    },[refreshData,trackNo]);

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
        try{
            let URL='./products/';
            const response = await axios.get( URL );              
            if(response.data.status == 401){
                setProduct_list('');      
            }else{
                setProduct_list(response.data.data);
            }
        }catch(err){
            if(!err?.response){
                console.log("No server response");
            }else{
                 console.log(err?.response.data);
            }
        } 
    };




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
        try{      
            const data = {product_id:pname,quantity,trackno};
            const mainURL = URL+'/add';
            serviceMethod(mainURL,method,data, handleSuccess,handleException);
        }catch(e){
        console.error(e);}
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
        <div>
            <form onSubmit={handleSubmit}>
            <Grid item xs={12}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={10} >
                        <TextField 
                            value={trackno}
                            margin = "dense"
                            id = "outlined-basic"
                            label = "Trackno"
                            variant = "outlined"
                            required
                                        
                            />
                        </Grid>
            <Grid item xs={3}>
                        <FormControl fullWidth> 
                            <InputLabel id="demo-simple-select-label">Product Name</InputLabel>
                            <Select
                            
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={pname}
                            label="Category name"
                            onChange={(e) => {
                                setPname(e.target.value);
                                console.log(e.target.value);
                            }}         
                            >
                            {productlist.map(product => (
                                <MenuItem  value={product.id}>{product.pname}</MenuItem>
                                            
                            ))}
                            </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl fullWidth>                      
                                    <TextField 
                                        value={quantity}
                                        margin = "dense"
                                        id = "outlined-basic"
                                        label = "Quantity"
                                        variant = "outlined"
                                        required
                                        
                                        onChange={(e) => { setQuantity(e.target.value)}}
                                        
                                    />
                                </FormControl>
                        </Grid>
                        </Grid>
                        </Grid>
                        
                <Button                 
                   size="large"
                   variant ="contained"
                   type = "submit"> Add
               </Button>
               
               <Button style={{ marginTop:'5px', marginLeft: '0px' }} onClick={(e) => {
                setIsAddButton(true);
                setOpen(true);
                setRefreshComponent((oldValue) => {
                    return !oldValue;
                });
                }} variant="contained">Purchase</Button>
                
                 </form>
            <div style={{ height: 400, width: '100%' }}>
                  <div>
                  <Box sx={{ flexGrow: 1, padding:'0px', height: 400, width: '50%' ,}} >  
                <DataGrid rows={dataList} columns={columns} />
                <SalAdd
                        isAddButton ={isAddButton}                        
                        setOpen ={setOpen} 
                        open={open}   
                        // rowData={editData}        
                        setRefreshData={setRefreshData} 
                        trackno={trackno}
                        refreshComponent={refreshComponent}        
                    />
                 </Box>
        </div>
            </div>
            
        </div>
    );
};

export default FormSal;
