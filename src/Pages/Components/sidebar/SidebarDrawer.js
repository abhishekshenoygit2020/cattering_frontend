import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';

import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Link, Outlet, NavLink } from "react-router-dom"; 
import { useAuthContext } from '../../../context/AuthContext';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  zindex:1
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
  
    // Set the height
    height: '100px', // You can adjust the value as needed
  
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function SideBarDrawer(){

    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [openSubList, setOpenSubList] = React.useState(false);
    const { user, Logout, trackgeneration } = useAuthContext();
    const [sidebarIndex,setSidebarIndex] = React.useState(0);  
    const handleSideBar = () => {
        setOpen(!open);
    };
    
    const [active, setActive ] = React.useState(false);    

    const  [menuItemsAdmin,setMenuItemsAdmin] = React.useState([
        {
            path:"/Dashboard",
            name:"Dashboard",
            //icon:<DashboardCustomizeIcon />
        },
        {
            path:"/Profile",
            name:"Profile",
        // icon:<PersonOutlineIcon />
        },
        {
            path:"/Sales",
            name:"Sales",
            //icon:<DomainIcon />
        },
        {
            path:"/Stock",
            name:"Stock",
            //icon:<ChecklistRtlIcon />
        },
        {
            path:"/Service",
            name:"Service",
            //icon:<ReportIcon />
        },
        {
            path:"",
            name:"Feedback",
            openState:false,
            //icon:<ExitToAppIcon />
            childrens: [                
                {
                    path:"/ShowData",
                    name:"Show Data",
                    // icon:<DonutLargeIcon />
                },
            ]

        },
        {
            path:"/Logout",
            name:"Logout",
            //icon:<AddAlertIcon />
        },
        {
            path:"/changepassword",
            name:"ChangePassword",
            //icon:<LockResetSharpIcon />
        },
        {   
            name:"Admission",
            path:"",
            openState:false,
            childrens: [
                {
                    path:"/studentForm",
                    name:"Register Admission",
                    // icon:<PlaylistAddIcon />,
                },
                {
                    path:"/tabs",
                    name:"Upload Document",
                    // icon:<PublishIcon />
                }                
            ]
        }
        
    ]); 

    const handleSubList = () => {
        setOpenSubList(!openSubList); 

        // const newArray = [...menuItemsAdmin];

        // // Modify the item at the specified index

                        
        // newArray[sidebarIndex].openState;
    
        // // Update the state with the new array
        // setMenuItemsAdmin(newArray);
        
        
           
    }

    return (              
        <Drawer variant="permanent" open={open} >
            <DrawerHeader style={{ backgroundColor: "#00091a" }}>
                {/* <IconButton onClick={handleSideBar} style={{ color:"white"  }}>
                    {open === true ? <ChevronLeftIcon /> : <ChevronRightIcon /> }
                </IconButton> */}
            </DrawerHeader>
            <Divider style={{ backgroundColor: "purple" }} />
                <List style={{ padding:'10px' }} >            
                    {menuItemsAdmin.map((text, index) => ( 
                        text.childrens ? 
                        <div>
                            <Link to ={text.path} style={{ textDecoration: 'none' }}  onClick={(e) => {setSidebarIndex(index)}} >
                                <ListItem key={text} disablePadding sx={{ display: 'block' }} onClick = {(e)=> {trackgeneration(e)}} >
                                    <ListItemButton
                                        sx={{
                                        minHeight: 10,                                  
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                        bgcolor: index === sidebarIndex ? "rgba(255, 255, 255, 0.04)" : "",
                                        borderRadius: open ? '10px' : '',  
                                        "&: hover":{
                                            backgroundColor:'rgba(255, 255, 255, 0.04)'
                                        }
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: open ? 3 : 'auto',
                                                justifyContent: 'center',  
                                                color:index === sidebarIndex ? 'white':'#0745bbf0'                                                                                      
                                            }}
                                        >
                                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                        </ListItemIcon>                                
                                        <ListItemText primary={text.name} sx={{ opacity: open ? 10 : 0 , color:"white", }} />  
                                        {
                                            text.childrens ? 
                                            <ListItemIcon
                                                sx={{
                                                    minWidth: 0,
                                                    mr: open ? 3 : 'auto',
                                                    justifyContent: 'center',
                                                    color:index === sidebarIndex ? 'white':'#0745bbf0'                                
                                                }}
                                            >
                                                <IconButton onClick={handleSubList} style={{ color:"white"  }}>
                                                    {openSubList === true &&  sidebarIndex == index ? <ExpandMoreIcon /> : <ExpandLessIcon /> } 
                                                </IconButton>
                                            </ListItemIcon> :""
                                        }                                       
                                    </ListItemButton>
                                </ListItem> 
                            </Link>
                            {
                                text.openState == true ?  
                                    text.childrens.map((childText, index) => (
                                        <Link to ={childText.path} style={{ textDecoration: 'none' }}  onClick={(e) => {setSidebarIndex(index)}} >
                                            <ListItem key={childText} disablePadding sx={{ display: 'block', height: 50 }} onClick = {(e)=> { trackgeneration(e);}} >
                                                <ListItemButton
                                                    sx={{                                        
                                                    justifyContent: open ? 'initial' : 'center',
                                                    px: 2.5,                                  
                                                    bgcolor: index === sidebarIndex ? "rgba(255, 255, 255, 0.04)" : "",
                                                    borderRadius: open ? '10px' : '',                               
                                                    "&: hover":{
                                                        backgroundColor:'rgba(255, 255, 255, 0.04)'
                                                    }
                                                    }}
                                                >
                                                    <ListItemIcon
                                                        sx={{
                                                            minWidth: 0,
                                                            mr: open ? 3 : 'auto',
                                                            justifyContent: 'center',
                                                            color:index === sidebarIndex ? 'white':'#0745bbf0'                                
                                                        }}
                                                    >
                                                    {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                                                    </ListItemIcon>                                
                                                    <ListItemText primary={childText.name} sx={{ opacity: open ? 10 : 0 , color:"white" }} />                                                                          
                                                </ListItemButton>
                                            </ListItem>                                                      
                                        </Link>
                                ))
                                
                                :"" 
                            
                            }
                            
                        </div> 
                                              
                        :<Link to ={text.path} style={{ textDecoration: 'none' }}  onClick={(e) => {setSidebarIndex(index)}} >
                            <ListItem key={text} disablePadding sx={{ display: 'block', height: 50 }} onClick = {(e)=> {trackgeneration(e)}} >
                                <ListItemButton
                                    sx={{                                        
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,                                  
                                    bgcolor: index === sidebarIndex ? "rgba(255, 255, 255, 0.04)" : "",
                                    borderRadius: open ? '10px' : '',                               
                                    "&: hover":{
                                        backgroundColor:'rgba(255, 255, 255, 0.04)'
                                    }
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                            color:index === sidebarIndex ? 'white':'#0745bbf0'                                
                                        }}
                                    >
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                    </ListItemIcon>                                
                                    <ListItemText primary={text.name} sx={{ opacity: open ? 10 : 0 , color:"white" }} />                                                                          
                                </ListItemButton>
                            </ListItem>                                                      
                        </Link>   
                    ))}
                </List>
            <Divider />       
        </Drawer> 
    );


}