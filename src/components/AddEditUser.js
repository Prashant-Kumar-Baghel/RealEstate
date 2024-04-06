import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Rent from './PostProperty/Rent';
import Sell from './PostProperty/Sell';

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
    <Box sx={{ width: '100%',marginTop:"20vh", maxWidth:"1180px",marginInline:"auto",paddingInline:"20px",overflow:"hidden"}}>
      <h1 className='text-[2.5rem]'>Sell or Rent your Property</h1>
      <span className='text-[1.3rem]'>You are posting this property for <b className='p-2 bg-yellow-400 rounded-md'>FREE !</b></span>
      {/* <Box sx={{ borderBottom: 1, borderColor: 'divider' }}> */}
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab sx={{fontSize:"1.2rem",color:'black'}} label="Rent/Lease" {...a11yProps(0)} />
          <Tab sx={{fontSize:"1.2rem",color:'black'}} label="Sale" {...a11yProps(1)} />
          {/* <Tab label="Item Three" {...a11yProps(2)} /> */}
        </Tabs>
      {/* </Box> */}
      <CustomTabPanel value={value} index={0}>
        <Rent/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Sell/>
      </CustomTabPanel>
      {/* <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel> */}
    </Box>
  );
}