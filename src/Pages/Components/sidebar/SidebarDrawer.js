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
    const [open, setOpen] = React.useState(false);
    const { user, Logout, trackgeneration } = useAuthContext();
    const [sidebarIndex,setSidebarIndex] = React.useState(0);  
    const handleSideBar = () => {
        setOpen(!open);
    };
    const [active, setActive ] = React.useState(false);    

    const menuItemsAdmin = [
        {
            path:"/Dashboard",
            name:"Dashboard",
            //icon:<DashboardCustomizeIcon />
        },   
        
        {
            path:"/User",
            name:"Users",
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
            path:"/Feedback",
            name:"Feedback",
            //icon:<ExitToAppIcon />
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
        }
    ]; 

    return (
        <Drawer variant="permanent" open={open} >
            <DrawerHeader>
            <IconButton onClick={handleSideBar}>
                {open === true ? <ChevronLeftIcon /> : <ChevronRightIcon /> }
            </IconButton>
            </DrawerHeader>
            <Divider />
                <List>            
                    {menuItemsAdmin.map((text, index) => ( 
                        <Link to ={text.path} style={{ textDecoration: 'none' }}  onClick={(e) => {setSidebarIndex(index)}} >
                            <ListItem key={text} disablePadding sx={{ display: 'block'  }} onClick = {(e)=> {trackgeneration(e)}} >
                                <ListItemButton
                                    sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                    // bgcolor: index === sidebarIndex ? "red" : "",
                                    borderRadius: open ? '25px' : ''        
                                    
                                    }}
                                >
                                    <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                    >
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                    </ListItemIcon>
                                    {/* <ListItemText secondary={text.name} sx={{ opacity: open ? 10 : 0 }} />              */}
                                    <ListItemText secondary={text.name} sx={{ opacity: open ? 10 : 0 }} />  
                                </ListItemButton>
                            </ListItem>
                        </Link>   
                    ))}
                </List>
            <Divider />       
        </Drawer>
    );


}