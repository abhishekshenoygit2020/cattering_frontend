import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApplicationStore from "../utils/localStorageUtil";
import axios from "../api/axios";

const LOGOUT_URL = './auth/logout';

export const AuthContext = createContext({
     user:null,
     login:(user)=>{},
     logout:()=>{}
});

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState('');
    const [userRole, setUserRole] = useState('');
    const [companyCode, setCompanyCode] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);    
    const [email, setEmail] = useState(''); 

    const navigate = useNavigate();

    const [trackNo,setTrackno] = useState(''); 
    

    const trackgeneration = (e) => {
        console.log("from auth context");
        var num = Math.floor(Math.random() * 90000) + 10000;
       
        setTrackno(num);
        console.log("trackno"+trackNo);
        
    };

    const Login = userData => {
    
       
        ApplicationStore().setStorage('token',userData.userToken);
        ApplicationStore().setStorage('userRole',userData.userRole);
        ApplicationStore().setStorage('userCompany',userData.companyCode);
        ApplicationStore().setStorage('empid',userData.empid);
        ApplicationStore().setStorage('empDetails',userData.empDetails);
        setLoggedIn(true);
    }

    const Logout = async () => {

        const data = {email:user};          

        const response = await axios.post(LOGOUT_URL,data,
          {
            headers: {'Content-Type':'application/json' }                    
          }
       );       
       const dataResponse = response.data;     
       if(dataResponse.success === 1){
            console.log("loggd out");
            ApplicationStore().removeStorage('token');
            ApplicationStore().removeStorage('userRole');
            ApplicationStore().removeStorage('userCompany');
            setUser(null);
            setUserRole(null);        
            setCompanyCode(null);
            setLoggedIn(false);
            navigate("/login");
       }
    }

    return  (
        <AuthContext.Provider value={{ user, Login, userRole,companyCode, loggedIn, Logout,trackgeneration,trackNo}}>
            {children} 
        </AuthContext.Provider>
    )
    
}

export function useAuthContext(){
    const {user, Login, userRole, copmanyCode,loggedIn, Logout,trackgeneration,trackNo} =  useContext(AuthContext);
    return {user, Login, userRole,copmanyCode, loggedIn, Logout,trackgeneration,trackNo};
}










