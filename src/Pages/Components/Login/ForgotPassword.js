import  React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { useAuthContext } from '../../../context/AuthContext';
import axios from '../../../api/axios';
import ApplicationStore from '../../../utils/localStorageUtil';

const LOGIN_URL = './auth/forgotPassword';

function ForgotPassword() {

    
   
    const [email, setEmail] = useState('');
    
    const navigate = useNavigate();
    
    const handleSubmit = (event) => {
        event.preventDefault();
      };
      
  
    const handleSave = async (e) => {
      e.preventDefault();         
      try{
        const data = {email};  
        

        const response = await axios.post( LOGIN_URL,data,
          {
             headers: {'Content-Type':'application/json' }                    
          }
       );       
       const dataResponse = response.data;     
       if(dataResponse.success === 1){           
            alert("Please Check Your email For Password");
        }      
     
    }catch(err){
        if(!err?.response){
          console.log("No server response");
        }else{
           console.log(err?.response.data);
        }      
      }     
    }

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} >
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e)=> { 
                setEmail(e.target.value); 
              }}
              required
            />           
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSave}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="login" variant="body2">
                  Login
                </Link>
              </Grid>
              <Grid item xs>
              <Link href="RegisterForm" variant = "body2">
                Not have an account ? Sign up here 

              </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
};
export default ForgotPassword;