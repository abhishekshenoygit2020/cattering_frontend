import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React, { useState } from "react";
import styled from "styled-components";
import { mobile } from "../../../../responsive";
import { Link, Outlet, NavLink } from "react-router-dom"; 
import TextField from '@mui/material/TextField';
import { useAuthContext } from "../../../../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import axios from "../../../../api/axios";
const URL = './products/search';



const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.0px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  margin-top: -10px;  
  padding-bottom: 0px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  const { user, Logout } = useAuthContext();
  const navigate = useNavigate();
  const [searchedData, setSearchedData] = useState('');

  const getData = async () => {
    console.log(searchedData);
    const data = {searchedData};  
      try{
        const response = await axios.post( URL,data,
          {
             headers: {'Content-Type':'application/json' }                    
          }); 
          if(response.data.status == 401){
              // setDataList('');      
          }else{
              //setDataList(response.data.data);
              navigate('/ProductList', { state: { searchedData:response.data.data }});
              
              //console.log(response.data.data);

          }
        
    }catch(err){    
      if(!err?.response){
          console.log("No server response");
      }else{
            console.log(err?.response.data);
      }
  } 
  };

 

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <TextField
              margin="normal"
              fullWidth
              size="small"
              id="email"
              label="Search"
              name="email"
              autoComplete="email"
              autoFocus
              value={searchedData}
              onChange={(e) => {
                setSearchedData(e.target.value);
              }}
              required
              className="custom-textfield" // Apply your CSS class here
            />
            <Search onClick={getData} style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo>LAMA.</Logo>
        </Center>
        <Right>
          {/* <Link to='/Product'><MenuItem>Products</MenuItem></Link> */}
          <Link to='/ProductList'><MenuItem>Products List</MenuItem></Link>
          <Link to='/Cart'><MenuItem>CART</MenuItem></Link>
          <Link to='/Service'><MenuItem>Service</MenuItem></Link>
          <Link to='/Feedback'><MenuItem>Feedback</MenuItem></Link>
          <MenuItem onClick={Logout}>Logout</MenuItem>
          <MenuItem>
            <Badge badgeContent={4} color="primary">
              <ShoppingCartOutlined />
            </Badge>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
