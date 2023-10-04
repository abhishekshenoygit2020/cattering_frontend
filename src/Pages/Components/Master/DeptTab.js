import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DeptDailog from './DeptDailog';
import DeptTable from './DeptTable';
import SectionDailog from './SectionDailog';
import SectionTable from './SectionTable';
import ReportDailog from './ReportDailog';
import ReportTable from './ReportTable';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function MasterTheRep() {
  const [value, setValue] = React.useState(2);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
 
   
 
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="DEPARTMENT" {...a11yProps(0)} />
          <Tab label="SECTION" {...a11yProps(1)} />
          <Tab label="REPORT LABEL" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
      <DeptTable/>
      </TabPanel>
      <TabPanel value={value} index={1}>
      
      <SectionTable/>
      </TabPanel>
      <TabPanel value={value} index={2}>
      
      <ReportTable/>
      </TabPanel>
    </Box>
    </>
  );
}
