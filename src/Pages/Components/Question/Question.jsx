import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DataGridDemo from './ChecklistProgress';
import CompletedCheck from './ChecklistComplered';
import { IconButton, TextField } from '@mui/material';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

 const AteRemoteMonitoring = () => {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };
   

    return (
        <Box sx={{
            bgcolor: 'background.paper',
            width: { xs: '90%', md: '100%' },
            mt: 6
        }}>

            <Typography variant="h5" gutterBottom>
              
            </Typography>
            <AppBar sx={{ borderRadius: 3, ml:2, mr:2, mt:3 }} >
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="inherit"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                    sx={{
                        borderRadius: 3,
                        backgroundColor: '#ffffff',
                        
             
                         // set the background color of unselected tabs to white
                    }}
                >
                    <Tab
                        label="Progress"
                        {...a11yProps(0)}
                        sx={{
                            color: value === 0 ? 'primary.contrastText' : 'primary.main',
                            backgroundColor: value === 0 ? '#0e2d5d' : 'transparent',
                            boxShadow: value === 0 ? 'none' : 'none',
                            // border: value === 0 ? 'none' : '2px solid',
                            // borderColor: value === 0 ? 'transparent' : 'primary.main',
                            '&:hover': {
                                backgroundColor: value === 0 ? '#0e2d5d' : 'transparent',
                                boxShadow: value === 0 ? 'none' : 'none',
                            },
                            borderTopLeftRadius: 3,
                            borderBottomLeftRadius: 3,
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0,
                            fontSize: { xs: '12px', md: '16px' },
                            p: { xs: '5px 10px', md: '10px 20px' }
                        }}
                    />
                    <Tab
                        label="Completed"
                        // {...a11yProps(1)}
                        sx={{
                            color: value === 1 ? 'primary.contrastText' : 'primary.main',
                            backgroundColor: value === 1 ? '#0e2d5d' : 'transparent',
                            boxShadow: value === 1 ? 'none' : 'none',
                            // border: value === 1 ? 'none' : '2px solid',
                            // borderColor: value === 1 ? 'transparent' : 'primary.main',
                            '&:hover': {
                                backgroundColor: value === 1 ? '#0e2d5d' : 'transparent',
                                boxShadow: value === 1 ? 'none' : 'none',
                            },
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                            borderTopRightRadius: 3,
                            borderBottomRightRadius: 3,
                            fontSize: { xs: '12px', md: '16px' },
                            p: { xs: '5px 10px', md: '10px 20px' }
                        }}
                    />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                  <DataGridDemo/>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                     <CompletedCheck />
                </TabPanel>
            </SwipeableViews>
            
        </Box>
        
    )
}
export default AteRemoteMonitoring;
