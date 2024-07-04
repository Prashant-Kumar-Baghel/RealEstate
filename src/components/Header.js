import React, { useContext, useState } from 'react'
import { LOGO_URL } from '../utils/constants'
import { Link, useNavigate } from 'react-router-dom'
import useOnlineStatus from '../utils/useOnlineStatus'
import {  useSelector } from 'react-redux'
import DropDown from './DropDown'
import { Button, } from 'semantic-ui-react'

import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Avatar } from '@mui/material'
import { deepOrange } from '@mui/material/colors'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import myContext from '../context/myContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const drawerWidth = 240;

function Header(props) {
      const [showDropDown,setShowDropDown]=useState(false);
    const handleButtonClick=()=>{
      setShowDropDown(!showDropDown);
    }
  const onlineStatus=useOnlineStatus();
    const navigate=useNavigate();
  const user=useSelector((store)=>store.user)

const {userData}=useContext(myContext);

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2,color:"black" }}>
      RealEstate
      </Typography>
      <Divider />
      <List sx={{display:"flex",flexDirection:"column",gap:"20px"}}>
               {/* <li className='text-[1.2rem] font-[500]'><Link to="/" className='text-black'>HOME</Link></li>
                <li className='text-[1.2rem] font-[500]'><Link to="/about" className='text-black'>ABOUT US</Link></li>
                <li className='text-[1.2rem] font-[500]'><Link to="/contact" className='text-black'>CONTACT US</Link></li>
                {user?.role==="admin" && <li className='text-[1.2rem] font-[500]'><Link to="/admin-dashboard" className='text-black'>ADMIN</Link></li>}
                <li className='text-[1.2rem] font-[500] text-black'><Button color='green' onClick={()=>
                    navigate("/add")
                } >Post Property</Button></li>
                {!user && <li className='text-[1.2rem] font-[500]'><Link to="/signIn" className='text-black'>SignIn</Link></li>} */}

<li ><Link to="/" className='text-[1.1rem] font-bold text-black no-underline'><span className='hover:text-[hsl(21,88%,66%)]'>Home</span></Link></li>
                <li className='text-[1.1rem] font-bold '><Link to="/about" className='text-black no-underline'><span className='hover:text-[hsl(21,88%,66%)]'>About</span></Link></li>
                <li className='text-[1.1rem] font-bold '><Link to="/contact" className='text-black  no-underline'><span className='hover:text-[hsl(21,88%,66%)]'>Contact</span></Link></li>
                {!user && <li className='text-[1.1rem] font-bold '><Link to="/signIn" className='text-black  no-underline' ><span className='hover:text-[hsl(21,88%,66%)]'>SignIn</span></Link></li>}
                <li className='text-[1.1rem] font-bold text-black'>
                <button onClick={()=>
                    navigate("/add")
                }
                className='rounded-[5px] border-[1px] border-solid border-transparent font-[700] text-[1rem] uppercase px-[30px] py-[22px]  text-white hover:bg-[hsl(21,88%,66%)] post-btn'>POST PROPERTY <FontAwesomeIcon icon={faArrowRight} size="lg" color="white" className="custom-class" /></button></li>
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
     const [open]=useState(false)
     const name=user?.displayName;
     const nameParts=name?.split(" ");
     let profileName="";
     nameParts?.map((item)=>{
      profileName=profileName+item?.charAt(0);
     })
    
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar sx={{background:"#F7F7F7",justifyContent:"space-between"}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' },color:"black" }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            <Link to="/"><img className='w-[100px] rounded-[4rem]' src={LOGO_URL} alt="" /></Link>
          </Typography>
          <List sx={{ display: { xs: 'none', sm: 'flex' },alignItems:"center" ,gap:"20px"}}>
               <li ><Link to="/" className='text-[1.1rem] font-bold text-black no-underline'><span className='hover:text-[hsl(21,88%,66%)]'>Home</span></Link></li>
                <li className='text-[1.1rem] font-bold '><Link to="/about" className='text-black no-underline'><span className='hover:text-[hsl(21,88%,66%)]'>About</span></Link></li>
                <li className='text-[1.1rem] font-bold '><Link to="/contact" className='text-black  no-underline'><span className='hover:text-[hsl(21,88%,66%)]'>Contact</span></Link></li>
                {!user && <li className='text-[1.1rem] font-bold '><Link to="/signIn" className='text-black  no-underline' ><span className='hover:text-[hsl(21,88%,66%)]'>SignIn</span></Link></li>}
                <li className='text-[1.1rem] font-bold text-black'>
                <button onClick={()=>
                    navigate("/add")
                }
                className='rounded-[5px] border-[1px] border-solid border-transparent font-[700] text-[1rem] uppercase px-[30px] py-[22px]  text-white hover:bg-[hsl(21,88%,66%)] post-btn'>POST PROPERTY <FontAwesomeIcon icon={faArrowRight} size="lg" color="white" className="custom-class" /></button></li>
                {/* <Button color='#fd7e14' onClick={()=>
                    navigate("/add")
                } >Post Property</Button> */}
                
              
          </List>

          {user?
          <div className='flex items-center gap-2 justify-center cursor-pointer ml-4'>
            <div >
              <span className='text-black text-[1rem]'>{userData?.displayName}</span>
              {/* <span className='text-black text-lg mt-[4vh]'>⌄</span> */}
            </div>
            <div className='relative'>
             {/* -----------------------------  */}
                {(userData?.avatar)?<Avatar onClick={handleButtonClick} sx={{ bgcolor: deepOrange[500] }}>{profileName}</Avatar>:<img src={userData?.photoURL} className="w-[3.5rem] rounded-full" alt="" onClick={handleButtonClick} />}
                <span className='absolute right-[-10%] top-0'>{onlineStatus?"🟢":"🔴"}</span>
            </div>
          </div>: <IconButton
            color="inherit"
            anchorEl={open}
            aria-label="open drawer"
            edge="end"
            sx={{ mr: 2, display: { sm: 'none' },color:"black" }}
          >
          <Link to="/"><img className='w-[50px] rounded-[4rem]' src={LOGO_URL} alt="" /></Link>
          </IconButton>}
          { showDropDown && <DropDown handleState={handleButtonClick}/>}
        </Toolbar>

      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    
    </Box>
  );
}

Header.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Header;




