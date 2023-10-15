import React from 'react';
import Homepage from './Pages/Components/homepage/Homepage';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Pages/Components/Dashboard/Dashboard';
import SuperUserDashboard from './Pages/Components/Dashboard/SuperUserDashboard';
import UserList from './Pages/Components/User/UserList';
import DeptTab from './Pages/Components/Master/DeptTab';
import ProtectedRoutes from './protectedRoutes';
import ProtectedCustomerRoutes from './protectedCustomerRoutes';
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
import ChangePassword from './Pages/Components/Login/ChangePassword';
import ForgotPassword from './Pages/Components/Login/ForgotPassword';
import Profile from './Pages/Components/Employee/Profile/Profile';
import Home from './Pages/Components/homepage/Home';
import Cart from './Pages/Components/Main/pages/Cart';
import HomeMain from './Pages/Components/Main/pages/Home';
import LoginCust from './Pages/Components/Main/pages/Login';

import ProductList from './Pages/Components/Main/pages/ProductList';
import ProductInfo from './Pages/Components/Main/pages/ProductInfo';
import Register from './Pages/Components/Main/pages/Register';
import HomeCust from './Pages/Components/homepage/HomeCust';

// import ProtectedRoutes from './Pages/Components/Question/protectedRoutes';


const MainRoutes = () => {
    return (
        <Routes>
          <Route path="/login" element={ <Login />} />    
          <Route path="/RegisterForm" element={<RegisterForm/>}/>
          <Route path="/ForgotPassword" element={<ForgotPassword />}/>
          <Route path="/LoginCust" element={<LoginCust />} />
          <Route path="/RegisterCust" element={<Register />} /> 
              <Route element={<ProtectedCustomerRoutes />}>
                  <Route path="/"  element={<HomeCust />} />
                  <Route path="/CustHome" element={<HomeMain />} />
                  <Route path="/Cart" element={<Cart />} />
                  <Route path="/Product" element={<ProductInfo />} />
                  <Route path="/ProductList" element={<ProductList />} />
              </Route>        
              <Route element={<ProtectedRoutes />}>         
                <Route path="/" element={<Home />} >
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="/SuperUserDashboard" element={<SuperUserDashboard/>} />
                <Route path="/Category" element={<CatDisplay/>}/>
                <Route path="/Organisation" element={<OrgTable/>}/>
                <Route path="/Products" element={<ProdDisplay/>}/>
                <Route path="/Sales" element={<FormSal/>}/>
                <Route path="/Stock" element={<StockDisplay/>}/>
                <Route path="/ChangePassword" element = {<ChangePassword />} />
                <Route path="/Profile" element={<Profile/>}/>
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



