



import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import UserRentProperties from './UserRentProperties';
import UserSellProperties from './UserSellProperties';

function CustomTabPanel(props) {
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

CustomTabPanel.propTypes = {
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

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (//max-w-[1180px] mx-auto px-[20px] overflow-hidden 
    <Box sx={{ width: '100%',marginTop:"5vh", maxWidth:"1180px",marginInline:"auto",paddingInline:"20px",overflow:"hidden"}}>
      <h1 className='text-[2.5rem]'>Properties Posted By Users</h1>
    
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab sx={{fontSize:"1.2rem",color:'black'}} label="Rent/Lease Properties" {...a11yProps(0)} />
          <Tab sx={{fontSize:"1.2rem",color:'black'}} label="Sale Properties" {...a11yProps(1)} />
        </Tabs>
      <CustomTabPanel value={value} index={0}>
        <UserRentProperties/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <UserSellProperties/>
      </CustomTabPanel>
    </Box>
  );
}
