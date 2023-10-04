import React, { useState, useEffect } from 'react'
// import DeviceCard from '../../DeviceCard'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
// import { FetchTestRigParticularUser } from '../../../services/ApiServices';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { green } from '@mui/material/colors';
import Icon from '@mui/material/Icon';
import { styled } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import BpRadio from './bpradio';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Checkbox from '@mui/material/Checkbox';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import PropTypes from 'prop-types';
import Alert from '@mui/material/Alert';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
// import {  Input } from '@material-ui/core';
import Input from '@mui/material/Input';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { SentimentVeryDissatisfied, SentimentDissatisfied, SentimentSatisfied, SentimentSatisfiedAlt, SentimentVerySatisfied } from '@mui/icons-material';
import axios from "../../../api/axios";
const URL2 ='./userchecklist';
const URL = './title';

// const Alert = (props) => {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// };

const DashboardManagementComponent = ({ dataList,List,title, titleId }) => {

  const [testRigList, setTestRigList] = useState([]);
  const [titleList, setTitleList] = useState([]);
  const [countSubmit, setCountSubmit] = useState(0);
  useEffect(() => {
    console.log('titleId:', titleId);
  }, [titleId]);
  //radio

  const [obj1, setObj1] = useState(true);
  const [obj2, setObj2] = useState(false);

  //checkbox
  const [mul1, setMul1] = useState(true);
  const [mul2, setMul2] = useState(false);
  const [mul3, setMul3] = useState(false);
  const [mul4, setMul4] = useState(false);

  //Ratings

  const [rat1, setRat1] = useState(0);

  //emoi
  const [lab1, setlab1] = useState("");
  const [lab2, setlab2] = useState("");
  const [lab3, setlab3] = useState("");
  const [lab4, setlab4] = useState("");

  const [alert, setAlert] = useState(null);
  const [header, setHeader]=useState("");


  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleShowAlert = () => {
    setOpen(true);
    setTimeout(() => {
      handleClose();
    }, 3000); // Close the alert after 3 seconds (3000 milliseconds)
  };
  
  const [selectedImage, setSelectedImage] = useState("");
  const handleImageUpload = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  // reader.onload = () => {
  //   setSelectedImage(reader.result);
  // };
  setSelectedImage(reader.result);
  reader.readAsDataURL(file);
};

  const handleImageClear = () => {
    setSelectedImage(null);
  };

  const handleSentimentClick = (sentiment) => {
    setlab1("false");
    setlab2("false");
    setlab3("false");
    setlab4("false");
    switch (sentiment) {
      case "lab1":
        setlab1("true");
        break;
      case "lab2":
        setlab2("true");
        break;
      case "lab3":
        setlab3("true");
        break;
      case "lab4":
        setlab4("true");
        break;
      default:
        break;
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
             
        const data = {obj1,obj2,mul1,mul2,mul3,mul4,lab1,lab2,lab3,lab4,rat1,selectedImage};
        const mainURL = URL2+'/add';
        serviceMethod(mainURL,method,data,handleException );
    
};
// const handleSuccess = () => {
//   // Handle successful data addition in the backend
//   // Show the success alert
  
//   const alert = (
//     <Alert variant="filled" severity="success">
//         Data successfully added
//     </Alert>
//   );
//   setAlert(alert);
  
// };

const handleException = (data) => {
  console.log(data);
}

  useEffect(() => {
    //FetchTestRigParticularUser(handleFetchSuccess, handleFetchException);
    console.log("dataList received" + dataList);   
    console.log("List received" + List); 
    setTitleList(List);  
  }, [dataList, List]);
 

  const handleFetchSuccess = (dataObject) => {
    console.log(dataObject.data);
    setTestRigList(dataObject.data);
  }

  const handleFetchException = (errorStaus, errorMessage) => {
    console.log(errorMessage);
  }

  // const handleSubmitx = async () => {
  //   try {
  //     const response = await axios.post(`/title/${titleId}/incount`);
  //     setCountSubmit(countSubmit + 1);
  //     console.log('reached');
  //   } catch (error) {
  //     // handle error
  //     console.log('not reached');
  //   }
  // };


  return (
    <>
     <Box sx={{ flexGrow: 1, mt: 9 }}>
      {/* <Grid container spacing={2}>    
                {testRigList.map((testRig) => (
                    <Grid item xs={12} key={testRig.id} sx={{ width:'100%'}}>
                        <DeviceCard testRigId={testRig.id} name={testRig.testRig} status={testRig.description} />
                    </Grid>
                ))}
            </Grid> */}

<Card sx={{ minWidth: 275, bgcolor: "#0e2d5d" }}>

{/* <AddCircleIcon/> */}

<CardContent>
  <Typography sx={{ fontSize: 30 }} color="#FFFFFF" gutterBottom>
    {title}
  </Typography>
  <br></br>
  <Grid container spacing={2}>
  {
      
      titleList.map((item, index) => {   
          // if(index == 0){
          //   return (
          //     <Grid  lg={12}>                       
          //       <Typography sx={{ fontSize: 14 }} color="#FFFFFF" gutterBottom>
          //         {item.title}
          //       </Typography> 
          //     </Grid>                      
          //     )
          // }
         return(
          <Grid  lg={6}>                       
            <Typography sx={{ fontSize: 14 }} color="#FFFFFF" gutterBottom>
              {item.header} - {item.headerData}
            </Typography> 
          </Grid>) 
      })
    }</Grid>
    
</CardContent>
<form onSubmit={handleSubmit} >
{dataList.map(dataList => (
  <Card sx={{ minWidth: 275, mt: 5, mb: 2, ml: 2, mr: 2 }}>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
        {dataList.particular}
      </Typography>
    </CardContent>
    <CardActions>
      {
        dataList.type == "Obective" ?
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel value={obj1} control={<Radio />} label={dataList.obj1} />
              <FormControlLabel value={obj2} control={<Radio />} label={dataList.obj2} />
              
            </RadioGroup>
            {/* <div>
              <Input
                type="file"
                inputProps={{ accept: 'image/*' }}
                onChange={handleImageUpload}
              />
              <Button onClick={handleImageClear} disabled={!selectedImage}>
                Clear Image
              </Button>
              {selectedImage && <img src={selectedImage} alt="Uploaded" />}
            </div> */}
          </FormControl> :

          dataList.type == "Multiples" ?
            <FormControl>
              <Box sx={{ display: 'flex' }}>
                <FormControlLabel
                  control={<Checkbox checked={mul1} onChange={(e) => setMul1(e.target.checked)} name="gilad" />}
                  label={dataList.mul1}
                  value={mul1}
                />

                <FormControlLabel
                  control={<Checkbox checked={mul2} onChange={(e) => setMul2(e.target.checked)} name="gilad" />}
                  label={dataList.mul2}
                  value={mul2}
                />

                <FormControlLabel
                  control={<Checkbox checked={mul3} onChange={(e) => setMul3(e.target.checked)} name="gilad" />}
                  label={dataList.mul3}
                  value={mul3}
                />

                <FormControlLabel
                  control={<Checkbox checked={mul4} onChange={(e) => setMul4(e.target.checked)} name="gilad" />}
                  label={dataList.mul4}
                  value={mul4}
                  
                />
              </Box>
              {/* <div>
              <Input
                type="file"
                inputProps={{ accept: 'image/*' }}
                onChange={handleImageUpload}
              />
              <Button onClick={handleImageClear} disabled={!selectedImage}>
                Clear Image
              </Button>
              {selectedImage && <img src={selectedImage} alt="Uploaded" />}
            </div> */}
            </FormControl> :

            dataList.type == "Ratings" ?
              <FormControl>
                 <Box sx={{ width: 200, display: 'flex', alignItems: 'center' }}>
                  <Rating
                    name="text-feedback"
                    value={rat1}
                    onChange={(event, newValue) => {
                      setRat1(newValue);
                    }}
                    precision={1}
                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                  />
                </Box>
                {/* <div>
              <Input
                type="file"
                inputProps={{ accept: 'image/*' }}
                onChange={handleImageUpload}
              />
              <Button onClick={handleImageClear} disabled={!selectedImage}>
                Clear Image
              </Button>
              {selectedImage && <img src={selectedImage} alt="Uploaded" />}
            </div> */}
                
              </FormControl>:
              dataList.type == "Label" ?
              <FormControl>
                <Box sx={{display:'flex'}}>
                  <Typography
                    variant="body2"
                    color={handleSentimentClick === dataList.lab1 ? "#00f" : "#000"}
                    gutterBottom
                    style={{ marginLeft: '10px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                    onClick={() => handleSentimentClick('lab1')}
                    value={lab1}
                  >
                    {lab1 === "true" ? <SentimentVerySatisfied sx={{ color: '#00f' }} />: <SentimentVeryDissatisfied />}
                    <Box sx={{ ml: 2 }}>{dataList.lab1}</Box>
                  </Typography>
                  <Typography
                      variant="body2"
                      color={handleSentimentClick === dataList.lab1 ? "#00f" : "#000"}
                      gutterBottom
                      style={{ marginLeft: '10px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                      onClick={() => handleSentimentClick('lab2')}
                      value={lab2}
                    >
                      {lab2 === "true" ? <SentimentVerySatisfied sx={{ color: '#00f' }} />: <SentimentVeryDissatisfied />}
                      <Box sx={{ ml: 2 }}>{dataList.lab2}</Box>
                  </Typography>
                  <Typography
                      variant="body2"
                      color={handleSentimentClick === dataList.lab1 ? "#00f" : "#000"}
                      gutterBottom
                      style={{ marginLeft: '10px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                      onClick={() => handleSentimentClick('lab3')}
                      value={lab3}
                    >
                      {lab3 === "true" ? <SentimentVerySatisfied  sx={{ color: '#00f' }}/>: <SentimentVeryDissatisfied />}
                      <Box sx={{ ml: 2 }}>{dataList.lab3}</Box>
                  </Typography>
                  <Typography
                      variant="body2"
                      color={handleSentimentClick === dataList.lab1 ? "#00f" : "#000"}
                      gutterBottom
                      style={{ marginLeft: '10px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                      onClick={() => handleSentimentClick('lab4')}
                      value={lab4}
                    >
                      {lab4 === "true" ? <SentimentVerySatisfied  sx={{ color: '#00f' }}/>: <SentimentVeryDissatisfied />}
                      <Box sx={{ ml: 2 }}>{dataList.lab4}</Box>
                  </Typography>
                </Box>
                <div>
              <Input
                type="file"
                inputProps={{ accept: 'image/*' }}
                onChange={handleImageUpload}
              />
              <Button onClick={handleImageClear} disabled={!selectedImage}>
                Clear Image
              </Button>
              {selectedImage && <img src={selectedImage} alt="Uploaded" />}
            </div>
              </FormControl>:" "
      }
    </CardActions>
    
  </Card>
))}
{/* <div>
              <Input
                type="file"
                inputProps={{ accept: 'image/*' }}
                onChange={handleImageUpload}
              />
              <Button onClick={handleImageClear} disabled={!selectedImage}>
                Clear Image
              </Button>
              {selectedImage && <img src={selectedImage} alt="Uploaded" />}
            </div> */}
<Grid container spacing={2}>
    <Grid  lg={12}>
       <Button variant="contained" color="success" type = "submit" onClick={handleShowAlert}>
        Submit
        </Button>
    </Grid>
    </Grid>
    </form>
</Card>
<Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          This is your alert message!
        </Alert>
      </Snackbar>
    </Box>
    </>
  )
}

export default DashboardManagementComponent;