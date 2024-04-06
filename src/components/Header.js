import React, { useContext, useEffect, useState } from 'react'
import { LOGO_URL } from '../utils/constants'
import { Link, useNavigate } from 'react-router-dom'
import useOnlineStatus from '../utils/useOnlineStatus'
import { useDispatch, useSelector } from 'react-redux'
import {auth} from "../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from '../utils/userSlice'
import DropDown from './DropDown'
import { Button, Menu, MenuItem } from 'semantic-ui-react'

// const Header = () => {
//     const onlineStatus=useOnlineStatus();
//     const navigate=useNavigate();
//     const dispatch = useDispatch();
//     // const [showDropDown,setShowDropDown]=useState(false);
//     //Using useSelector to read data;
//     const user=useSelector((store)=>store.user)
//     console.log("DIspatch",user)
//     const [showDropDown,setShowDropDown]=useState(false);
//     // console.log(user);
//     const handleButtonClick=()=>{
//       setShowDropDown(!showDropDown);
//     }
   
//     // useEffect(()=>{
//     //     onAuthStateChanged(auth, (user) => {//this user is not useSelector user.
//     //       if (user) {
//     //         //The Beauty of onAuthStateChanged is we get userid very easily.similary we extract lot more information from user.
//     //         // console.log(user);
//     //         // const {uid,email,displayName,photoURL} = user;
//     //         //Here User is present then this is SignIn ,SIgnUp case.
//     //         //So if i update user inside the store then all updates we can do from this one place.
//     //         //In addUser I will add a object.
//     //         // dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}))
//     //         //As Soon as user SignIn or SignUp then we redirect him to Browse Page or if user is logged in then redirect to Browse Page. 
//     //         // navigate("/body")
    
//     //       } else {
//     //         // User is signed out
//     //        dispatch(removeUser());
//     //        //As Soon as user SignOut then we redirect him to LogIn Page or if user is not logged in then navigate to login page. 
//     //        navigate("/");
//     //       }
//     //     });
//     //   },[])


//   return (
//     // {user && ...} wrapped in curly braces, which was causing a parsing error. By removing the curly braces around the return statement, the syntax is corrected, and it's a common pattern when you are returning a single expression or value from an arrow function.
   
//     <div className='flex container mx-auto px-24 py-4 overflow-hidden items-center justify-between shadow-md'>
//         <div className="image">
//             <Link to="/"><img className='w-[100px] rounded-[4rem]' src={LOGO_URL} alt="" /></Link>
//         </div>
//         <div className="navbar">
//         <    ul className='flex gap-16 items-center'>
//                 <li className='text-[1.2rem] font-[500]'><Link to="/">HOME</Link></li>
//                 <li className='text-[1.2rem] font-[500]'><Link to="/about">ABOUT US</Link></li>
//                 <li className='text-[1.2rem] font-[500]'><Link to="/contact">CONTACT US</Link></li>
//                 <li className='text-[1.2rem] font-[500]'><Button color='green' onClick={()=>
//                     navigate("/add")
//                 }>Post Property</Button></li>
//                 {user?.role==="admin" && <li className='text-[1.2rem] font-[500]'><Link to="/admin-dashboard">ADMIN</Link></li>}
//                 {!user && <li className='text-[1.2rem] font-[500]'><Link to="/signIn">SignIn</Link></li>}
//                {user &&  <li className="flex items-center gap-2 justify-center cursor-pointer" onClick={handleButtonClick}>
//                        <div >
//                           <span className='text-black text-[1rem]'>{user?.displayName}</span>
//                           <span className='text-black text-lg mt-[4vh]'>⌄</span>
//                        </div>
//                         <div className='relative'>
//                             <img src={user?.photoURL} className="w-[3.5rem] rounded-full" alt="" />
//                             <span className='absolute right-[-10%] top-0'>{onlineStatus?"🟢":"🔴"}</span>
//                         </div>
//                </li>}
//              </ul>
        
//         </div>

//         { showDropDown && <DropDown currentState={showDropDown} handleState={handleButtonClick}/>}
//     </div>
//   )
// }

// export default Header




// ------------------------------------
// import  React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Avatar } from '@mui/material'
import { deepOrange } from '@mui/material/colors'
import myContext from '../context/myContext'
// import Button from '@mui/material/Button';

const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];

function Header(props) {
      const [showDropDown,setShowDropDown]=useState(false);
    // console.log(user);
    const handleButtonClick=()=>{
      setShowDropDown(!showDropDown);
    }
  const onlineStatus=useOnlineStatus();
    const navigate=useNavigate();
    // const dispatch = useDispatch();
  const user=useSelector((store)=>store.user)
  console.log("OPUser",user);

  // console.log("userInformation",localStorage.getItem("userInformation"));
//   const user=JSON.parse(localStorage.getItem("userInformation"))
// console.log("OPUserIIIII",user);

const {userData}=useContext(myContext);
console.log("userboy",userData);


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
               <li className='text-[1.2rem] font-[500]'><Link to="/" className='text-black'>HOME</Link></li>
                <li className='text-[1.2rem] font-[500]'><Link to="/about" className='text-black'>ABOUT US</Link></li>
                <li className='text-[1.2rem] font-[500]'><Link to="/contact" className='text-black'>CONTACT US</Link></li>
                {user?.role==="admin" && <li className='text-[1.2rem] font-[500]'><Link to="/admin-dashboard" className='text-black'>ADMIN</Link></li>}
                <li className='text-[1.2rem] font-[500] text-black'><Button color='green' onClick={()=>
                    navigate("/add")
                } >Post Property</Button></li>
                {!user && <li className='text-[1.2rem] font-[500]'><Link to="/signIn" className='text-black'>SignIn</Link></li>}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
     const [open,setOpen]=useState(false)
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
        <Toolbar sx={{background:"white",justifyContent:"space-between"}}>
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
               <li className='text-[1.2rem] font-[500]'><Link to="/" className='text-black'>HOME</Link></li>
                <li className='text-[1.2rem] font-[500]'><Link to="/about" className='text-black'>ABOUT US</Link></li>
                <li className='text-[1.2rem] font-[500]'><Link to="/contact" className='text-black'>CONTACT US</Link></li>
                {user?.role==="admin" && <li className='text-[1.2rem] font-[500]'><Link to="/admin-dashboard" className='text-black'>ADMIN</Link></li>}
                <li className='text-[1.2rem] font-[500] text-black'><Button color='green' onClick={()=>
                    navigate("/add")
                } >Post Property</Button></li>
                {!user && <li className='text-[1.2rem] font-[500]'><Link to="/signIn" className='text-black'>SignIn</Link></li>}
                {/* {user &&  <li className="flex items-center gap-2 justify-center cursor-pointer" >
                       <div >
                          <span className='text-black text-[1rem]'>{user?.displayName}</span>
                          
                       </div>
                        <div className='relative'>
                            <img src={user?.photoURL} className="w-[3.5rem] rounded-full" alt="" onClick={(e)=>setOpen(true)} />
                            <span className='absolute right-[-10%] top-0'>{onlineStatus?"🟢":"🔴"}</span>
                        </div>
               </li>
                
               } */}
          </List>

          {user?
          <div className='flex items-center gap-2 justify-center cursor-pointer ml-4'>
            <div >
              <span className='text-black text-[1rem]'>{userData?.displayName}</span>
              {/* <span className='text-black text-lg mt-[4vh]'>⌄</span> */}
            </div>
            <div className='relative'>
             
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
          { showDropDown && <DropDown currentState={showDropDown} handleState={handleButtonClick}/>}
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