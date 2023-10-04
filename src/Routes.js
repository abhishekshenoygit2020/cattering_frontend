import React from 'react';
import Homepage from './Pages/Components/homepage/Homepage';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Pages/Components/Dashboard/Dashboard';
import SuperUserDashboard from './Pages/Components/Dashboard/SuperUserDashboard';
import UserList from './Pages/Components/User/UserList';
import DeptTab from './Pages/Components/Master/DeptTab';
import ProtectedRoutes from './protectedRoutes';
import Login from './Pages/Components/Login/Login';
import OrgTable from './Pages/Components/Organisation/OrgManage/OrgTable';
import Logs from './Pages/Components/Logs/logs';
import DataGridDemo from './Pages/Components/Question/ChecklistProgress';
import CheckTab from './Pages/Components/Newcheck/CheckTab';
import AteRemoteMonitoring from './Pages/Components/Question/Question';
import CatDisplay from './Pages/Components/ManageCategory/CatDisplay';
import ProdDisplay from './Pages/Components/ManageProducts/ProdDisplay';
import SalDisplay from './Pages/Components/Employee/Sales/SalDisplay';
import StockDisplay from './Pages/Components/Employee/Stock/StockDisplay';
import FormSal from './Pages/Components/Employee/Sales/FormSal';
import RegisterForm from './Pages/Components/RegisterForm';
import Navbar from './Pages/Components/UserDashboard/Navbar';
// import ProtectedRoutes from './Pages/Components/Question/protectedRoutes';


const MainRoutes = () => {
    return (
        <Routes>
          <Route path="/login" element={ <Login />} />    
          <Route path="/RegisterForm" element={<RegisterForm/>}/>
           <Route element={<ProtectedRoutes />}>         
              <Route path="/" element={<Homepage />} >
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="/SuperUserDashboard" element={<SuperUserDashboard/>} />
                <Route path="/Category" element={<CatDisplay/>}/>
                <Route path="/Organisation" element={<OrgTable/>}/>
                <Route path="/Products" element={<ProdDisplay/>}/>
                <Route path="/Sales" element={<FormSal/>}/>
                <Route path="/Stock" element={<StockDisplay/>}/>
                
                <Route path="/User" element={<UserList/>}/>
                <Route path="/Master" element={<DeptTab/>}/>
                <Route path="/Logs" element={<Logs/>}/>
                <Route path="/Checklist" element={<CheckTab/>}/>
                {/* <Route path="/DashboardUser" element={<AteRemoteMonitoring />}/>  */}
              </Route>
              <Route path="/DashboardUser" element={<Navbar/>}/> 
            </Route>                      
         </Routes>//ZJu8nG!&j
    );
}
export default MainRoutes;

// "email":"abhishekshenoy7@gmail.com",
//"password":"0i$16eVTS"
