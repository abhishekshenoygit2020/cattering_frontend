// // Grid Row click
// import React, { useState, useEffect } from 'react'
// import DeviceCard from '../../DeviceCard'
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import { FetchTestRigParticularUser } from '../../../services/ApiServices';

// import Button from '@mui/material/Button';
// import Stack from '@mui/material/Stack';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import { green } from '@mui/material/colors';
// import Icon from '@mui/material/Icon';
// import { styled } from '@mui/material/styles';
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';
// import BpRadio from './bpradio';
// import AddCircleIcon from '@mui/icons-material/AddCircle';

// import DeleteIcon from '@mui/icons-material/Delete';
// import SendIcon from '@mui/icons-material/Send';




// const DashboardManagementComponent = () => {
//     const [testRigList, setTestRigList] = useState([]);

//     useEffect(() => {
//         FetchTestRigParticularUser(handleFetchSuccess, handleFetchException);
//     }, []);

//     const handleFetchSuccess = (dataObject) => {
//         console.log(dataObject.data);
//         setTestRigList(dataObject.data);
//     }

//     const handleFetchException = (errorStaus, errorMessage) => {
//         console.log(errorMessage);
//     }

//     return (


//         <Box sx={{ flexGrow: 1, mt: 9 }}>
//             {/* <Grid container spacing={2}>    
//                 {testRigList.map((testRig) => (
//                     <Grid item xs={12} key={testRig.id} sx={{ width:'100%'}}>
//                         <DeviceCard testRigId={testRig.id} name={testRig.testRig} status={testRig.description} />
//                     </Grid>
//                 ))}
//             </Grid> */}

// <Card sx={{ minWidth: 275, bgcolor: "#0e2d5d" }}>
// {/* <AddCircleIcon/> */}
//       <CardContent>
//         <Typography sx={{ fontSize: 30 }} color="#FFFFFF" gutterBottom>
//         Welding (Hot Work) Safety Checklist
//         </Typography>
    
//         <Typography variant="body2" color="#FFFFFF">
//         The hot work checklist helps ensure workers are protected and the risk of fire danger is reduced on the jobsite.
//         The hot work checklist helps ensure workers are protected and the risk of fire danger is reduced on the jobsite.
//         The hot work checklist helps ensure workers are protected and the risk of fire danger is reduced on the jobsite.
        
//         </Typography>
//       </CardContent>
  
//       <Card sx={{ minWidth: 275, mt:5, mb:2, ml:2,mr:2 }}>  

      
       
 

//       <CardContent>
//         <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
//         1. Has a test been performed to ensure there are no gas fumes in the area?
//         </Typography>
//       </CardContent>
//       <CardActions>
//       <FormControl>
//       {/* <FormLabel id="demo-customized-radios">Gender</FormLabel> */}
    
//       <RadioGroup
//         defaultValue="NO"
//         aria-labelledby="demo-customized-radios"
//         name="customized-radios"
//         style={{ display: 'flex', flexDirection: 'row',color: "#0e2d5d"  }}
//       >
//         <FormControlLabel value="YES" control={<BpRadio />} label="YES" style={{ marginLeft: '10px' }} />
//         <FormControlLabel value="NO" control={<BpRadio />} label="NO"/>
//         <FormControlLabel value="N/A" control={<BpRadio />} label="N/A"/>
//         <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
//       <IconButton sx={{color: "#0e2d5d" }} >
     
//       <AddCircleIcon/>
        
        
      
//         </IconButton>
        
//         </div>
//       </RadioGroup>
//     </FormControl>

//       </CardActions>
//     </Card>
//     <Card sx={{ minWidth: 275, ml:2,mr:2, mb:2}} >
//       <CardContent>
//         <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
//         2. Has a test been performed to ensure there are no gas fumes in the area?
//         </Typography>
//       </CardContent>
//       <CardActions>
//       <FormControl>
//       {/* <FormLabel id="demo-customized-radios">Gender</FormLabel> */}
//       <RadioGroup
//         defaultValue="NO"
//         aria-labelledby="demo-customized-radios"
//         name="customized-radios"
//         style={{ display: 'flex', flexDirection: 'row' }}
//       >
//         <FormControlLabel value="YES" control={<BpRadio />} label="YES" style={{ marginLeft: '10px' }} />
//         <FormControlLabel value="NO" control={<BpRadio />} label="NO"/>
//         <FormControlLabel value="N/A" control={<BpRadio />} label="N/A"/>
//         <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
//       <IconButton sx={{color: "#0e2d5d" }} >
     
//       <AddCircleIcon/>
        
        
      
//         </IconButton>
        
//         </div>
//       </RadioGroup>
//     </FormControl>
//       </CardActions>
//     </Card>


//     </Card>

    

//          </Box> 
//     )
// }

// export default DashboardManagementComponent