import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Rent from './PostProperty/Rent';
import Sell from './PostProperty/Sell';
import Breadcrumb from './Breadcrumb';


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

  return (
     <div>
            <Breadcrumb 
            pageTitle="Add Listing"
            pageName="Add Listing"
            />

            <Box
              sx={{
                width: '100%',
                marginTop: '15vh',
                maxWidth: '1180px',
                marginInline: 'auto',
                paddingInline: '20px',
                overflow: 'hidden',
              }}
             >
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                  <Tab sx={{fontSize:"1.2rem",color:'black'}} label="Rent/Lease" {...a11yProps(0)} />
                  <Tab sx={{fontSize:"1.2rem",color:'black'}} label="Sale" {...a11yProps(1)} />
                </Tabs>
              <CustomTabPanel value={value} index={0}>
                <Rent/>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <Sell/>
              </CustomTabPanel>
            </Box>
     </div>
  );
}