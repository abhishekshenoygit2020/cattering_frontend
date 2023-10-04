import React , {useState, useEffect} from "react";
import { Button, Dialog, DialogContent, DialogTitle, FormControl, Input, InputLabel, MenuItem, Select, TextField, Grid } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import axios from "../../../api/axios";
const URL = './staffDirectory';

const StaffModelComponent = ({ open, setOpen, isAddButton, rowData, setRefreshData}) => {
    
    //basic information
    const [id,setId] = useState('');
    const [institutionName, setInstitutionName] = useState(''); 
    const [designation, setDesignation] = useState('');
    
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    
    const [email,setEmail] = useState('');
    const [gender, setGender] = useState('');
    
    const [phone, setPhone] = useState('');
    const [emergencyContactNumber, setEmergencyContactNumber] = useState('');
   
    const [qualification, setQualification] = useState('');
    const [workExperience, setWorkExperience] = useState('');   

    const [address, setAddress] = useState('');

    //payroll

    //bankaccount details

    //uploading Documents
    const [resumeDoc, setResumeDoc] = useState(''); 
    const [otherDoc, setOtherDoc] = useState('');
    const [joiningLetter, setJoiningLetter] = useState('');


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
            const data = {institutionName,designation,firstName,lastName, email, gender, phone,emergencyContactNumber,qualification,workExperience,address,resumeDoc,otherDoc,joiningLetter};
            const mainURL = URL+'/add';
            serviceMethod(mainURL,method,data, handleSuccess, handleException);
        }else{
            const data = {id,institutionName,designation,firstName,lastName, email, gender, phone,emergencyContactNumber,qualification,workExperience,address,resumeDoc,otherDoc,joiningLetter};
            const mainURL = URL +'/'+data.id+ '/update';
            serviceMethod(mainURL,method,data, handleSuccess, handleException);
        } 
    };

    useEffect(() => {
        setOpen(open);
        loadData();
    },[rowData]);

    const loadData = () => {
        setId(rowData.id);
        setInstitutionName(rowData.institutionName);
        setDesignation(rowData.designation);
        
        setFirstName(rowData.firstName);
        setLastName(rowData.lastName);
       
        setEmail(rowData.email);
        setGender(rowData.gender);
        
        setPhone(rowData.phone);
        setEmergencyContactNumber(rowData.emergencyContactNumber);
        
        setQualification(rowData.qualification);
        setWorkExperience(rowData.workExperience);    
        
        setAddress(rowData.address);
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
                {isAddButton ? "Add Consultant" : "Edit Consultant"}
            </DialogTitle>        
            <DialogContent>
                <Grid item xs={12}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={3}>
                            <FormControl fullWidth>                      
                                    <TextField 
                                        value={institutionName}
                                        margin = "dense"
                                        id = "outlined-basic"
                                        label = "Institution Name"
                                        variant = "outlined"
                                        required
                                        //    onBlur={() =>validateForNullValue(phoneNumber, 'phoneNumber')}
                                        onChange={(e) => { setInstitutionName(e.target.value)}}
                                        //    autoComplete="off"
                                        //    fullWidth
                                        //    error={errorObject?.phoneNumber?.errorStatus}
                                        //    helperText={errorObject?.phoneNumber?.helperText}
                                    />
                                </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl fullWidth>                      
                                    <TextField 
                                        value={designation}
                                        margin = "dense"
                                        id = "outlined-basic"
                                        label = "Designation"
                                        variant = "outlined"
                                        required
                                        //    onBlur={() =>validateForNullValue(phoneNumber, 'phoneNumber')}
                                           onChange={(e) => { setDesignation(e.target.value)}}
                                        //    autoComplete="off"
                                        //    fullWidth
                                        //    error={errorObject?.phoneNumber?.errorStatus}
                                        //    helperText={errorObject?.phoneNumber?.helperText}
                                    />
                                </FormControl>
                        </Grid>
                        
                        <Grid item xs={3}>
                            <FormControl fullWidth>                      
                                <TextField 
                                    value={firstName}
                                    margin = "dense"
                                    id = "outlined-basic"
                                    label = "First name"
                                    variant = "outlined"
                                    required
                                    //    onBlur={() =>validateForNullValue(phoneNumber, 'phoneNumber')}
                                        onChange={(e) => { setFirstName(e.target.value)}}
                                    //    autoComplete="off"
                                    //    fullWidth
                                    //    error={errorObject?.phoneNumber?.errorStatus}
                                    //    helperText={errorObject?.phoneNumber?.helperText}
                                />
                            </FormControl>
                        </Grid> 
                        <Grid item xs={3}>
                            <FormControl fullWidth>                      
                                <TextField 
                                    value={lastName}
                                    margin = "dense"
                                    id = "outlined-basic"
                                    label = "Last name"
                                    variant = "outlined"
                                    required
                                    //    onBlur={() =>validateForNullValue(phoneNumber, 'phoneNumber')}
                                        onChange={(e) => { setLastName(e.target.value)}}
                                    //    autoComplete="off"
                                    //    fullWidth
                                    //    error={errorObject?.phoneNumber?.errorStatus}
                                    //    helperText={errorObject?.phoneNumber?.helperText}
                                />
                            </FormControl>
                        </Grid>
                        
                        
                        <Grid item xs={3}>
                            <FormControl fullWidth>                      
                                <TextField 
                                    value={email}
                                    margin = "dense"
                                    id = "outlined-basic"
                                    label = "email"
                                    variant = "outlined"
                                    fullWidth
                                    required
                                    //   onBlur={() =>validateForNullValue(vendorName, 'vendorName')}
                                      onChange={(e) => { setEmail(e.target.value)}}
                                    //   autoComplete="off"
                                    //   error={errorObject?.vendorName?.errorStatus}
                                    //   helperText={errorObject?.vendorName?.helperText}                     
                                />
                            </FormControl>
                        </Grid>  
                        <Grid item xs={3}>
                            <FormControl fullWidth>                      
                                <TextField 
                                    value={gender}
                                    margin = "dense"
                                    id = "outlined-basic"
                                    label = "gender"
                                    variant = "outlined"
                                    fullWidth
                                    required
                                    //   onBlur={() =>validateForNullValue(vendorName, 'vendorName')}
                                      onChange={(e) => { setGender(e.target.value)}}
                                    //   autoComplete="off"
                                    //   error={errorObject?.vendorName?.errorStatus}
                                    //   helperText={errorObject?.vendorName?.helperText}                     
                                />
                            </FormControl>
                        </Grid> 
                      
                        <Grid item xs={3}>
                            <FormControl fullWidth>                      
                                <TextField 
                                    value={phone}
                                    margin = "dense"
                                    id = "outlined-basic"
                                    label = "phone"
                                    variant = "outlined"
                                    fullWidth
                                    required
                                    //   onBlur={() =>validateForNullValue(vendorName, 'vendorName')}
                                      onChange={(e) => { setPhone(e.target.value)}}
                                    //   autoComplete="off"
                                    //   error={errorObject?.vendorName?.errorStatus}
                                    //   helperText={errorObject?.vendorName?.helperText}                     
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl fullWidth>                      
                                <TextField 
                                    value={emergencyContactNumber}
                                    margin = "dense"
                                    id = "outlined-basic"
                                    label = "emergencyContactNumber"
                                    variant = "outlined"
                                    fullWidth
                                    required
                                    //   onBlur={() =>validateForNullValue(vendorName, 'vendorName')}
                                      onChange={(e) => { setEmergencyContactNumber(e.target.value)}}
                                    //   autoComplete="off"
                                    //   error={errorObject?.vendorName?.errorStatus}
                                    //   helperText={errorObject?.vendorName?.helperText}                     
                                />
                            </FormControl>
                        </Grid>
                       
                        <Grid item xs={3}>
                            <FormControl fullWidth>                      
                                <TextField 
                                    value={qualification}
                                    margin = "dense"
                                    id = "outlined-basic"
                                    label = "qualification"
                                    variant = "outlined"
                                    fullWidth
                                    required
                                    //   onBlur={() =>validateForNullValue(vendorName, 'vendorName')}
                                      onChange={(e) => { setQualification(e.target.value)}}
                                    //   autoComplete="off"
                                    //   error={errorObject?.vendorName?.errorStatus}
                                    //   helperText={errorObject?.vendorName?.helperText}                     
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl fullWidth>                      
                                <TextField 
                                    value={workExperience}
                                    margin = "dense"
                                    id = "outlined-basic"
                                    label = "workExperience"
                                    variant = "outlined"
                                    fullWidth
                                    required
                                    //   onBlur={() =>validateForNullValue(vendorName, 'vendorName')}
                                      onChange={(e) => { setWorkExperience(e.target.value)}}
                                    //   autoComplete="off"
                                    //   error={errorObject?.vendorName?.errorStatus}
                                    //   helperText={errorObject?.vendorName?.helperText}                     
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl fullWidth>                      
                                <TextField 
                                    value={address}
                                    margin = "dense"
                                    id = "outlined-basic"
                                    label = "Address"
                                    variant = "outlined"
                                    fullWidth
                                    required
                                    //   onBlur={() =>validateForNullValue(vendorName, 'vendorName')}
                                      onChange={(e) => { setAddress(e.target.value)}}
                                    //   autoComplete="off"
                                    //   error={errorObject?.vendorName?.errorStatus}
                                    //   helperText={errorObject?.vendorName?.helperText}                     
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl fullWidth>                      
                                <TextField
                                    fullWidth
                                    label="Institution License"
                                    
                                    onBlur={() => {
                                    //validateForNullValue(customerLogo, 'customerLogo');
                                    }}
                                    onChange={(e) => {
                                    if(e.target.files && e.target.files.length > 0){
                                        // setCustomerLogo(e.target.files[0]);
                                        const reader = new FileReader();
                                        reader.onload = () =>{
                                            if(reader.readyState === 2){
                                                //   setCustomerLogo(reader.result);
                                                setResumeDoc(reader.result);
                                            }
                                        }
                                        reader.readAsDataURL(e.target.files[0]);
                                    }
                                    }}
                                    InputLabelProps={{ shrink: true }}
                                    type="file"
                                    // inputProps={{
                                    //     accept:"image/png",
                                    // }}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl fullWidth>                      
                                <TextField
                                    fullWidth
                                    label="Address Proof"
                                    
                                    onBlur={() => {
                                    //validateForNullValue(customerLogo, 'customerLogo');
                                    }}
                                    onChange={(e) => {
                                    if(e.target.files && e.target.files.length > 0){
                                        // setCustomerLogo(e.target.files[0]);
                                        const reader = new FileReader();
                                        reader.onload = () =>{
                                            if(reader.readyState === 2){
                                                //   setCustomerLogo(reader.result);
                                                setOtherDoc(reader.result);
                                            }
                                        }
                                        reader.readAsDataURL(e.target.files[0]);
                                    }
                                    }}
                                    InputLabelProps={{ shrink: true }}
                                    type="file"
                                    
                                    // inputProps={{
                                    //     accept:"image/png",
                                    // }}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl fullWidth>                      
                                <TextField
                                    fullWidth
                                    label="Institution Photo Logo"
                                    
                                    onBlur={() => {
                                    //validateForNullValue(customerLogo, 'customerLogo');
                                    }}
                                    onChange={(e) => {
                                    if(e.target.files && e.target.files.length > 0){
                                        // setCustomerLogo(e.target.files[0]);
                                        const reader = new FileReader();
                                        reader.onload = () =>{
                                            if(reader.readyState === 2){
                                                //   setCustomerLogo(reader.result);
                                                setJoiningLetter(reader.result);
                                            }
                                        }
                                        reader.readAsDataURL(e.target.files[0]);
                                    }
                                    }}
                                    InputLabelProps={{ shrink: true }}
                                    type="file"
                                    // inputProps={{
                                    //     accept:"image/png",
                                    // }}
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

export default StaffModelComponent;