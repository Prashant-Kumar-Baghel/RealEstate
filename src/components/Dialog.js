// import * as React from 'react';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import Slide from '@mui/material/Slide';

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

// export default function AlertDialogSlide({propertyData}) {
//   const [open, setOpen] = React.useState(false);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <React.Fragment>
//       {/* <Button variant="outlined" onClick={handleClickOpen}>
//         Slide in alert dialog
//       </Button> */}
//        <button className='rounded-full border-[1px] border-solid border-transparent font-[700] text-[1rem] uppercase px-[30px] py-[22px]  text-white hover:bg-[hsl(21,88%,66%)] post-btn fixed lg:left-[7vw] bottom-4 w-[100%] lg:w-[12vw]' onClick={handleClickOpen}>Enquire Now</button>

//       <Dialog
//         open={open}
//         TransitionComponent={Transition}
//         keepMounted
//         onClose={handleClose}
//         aria-describedby="alert-dialog-slide-description"
//       >
       
//         <DialogContent>
//           <DialogContentText id="alert-dialog-slide-description">
//           <div className='flex flex-col gap-3 rounded-xl'>
//                 <div className='flex flex-col gap-2'>
//                     <span className='text-[1.2rem]'>Name</span>
//                     <span className='text-black border-[2px] border-solid border-gray-300 px-2 py-2 bg-white text-[1.2rem]'> { propertyData?.name}</span>
//                 </div>
//                 <div className='flex flex-col gap-2'>
//                     <span className='text-[1.2rem]'>Mobile Number</span>
//                     <span className='text-black border-[2px] border-solid border-gray-300 px-2 py-2 bg-white text-[1.2rem]'> { propertyData?.mobile.slice(0,5)}xxxxxx</span>
//                 </div>
//                 <button className='rounded-full border-[1px] border-solid border-transparent font-[700] text-[1rem] uppercase px-[20px] py-[12px]  text-white hover:bg-[hsl(21,88%,66%)] post-btn '>Subscribe Now</button>
//             </div>
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           {/* <Button onClick={handleClose}>Disagree</Button>
//           <Button onClick={handleClose}>Agree</Button> */}
//         </DialogActions>
//       </Dialog>
//     </React.Fragment>
//   );
// }

import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useNavigate } from 'react-router-dom';

export default function AnchorTemporaryDrawer({propertyData,type}) {
  const navigate=useNavigate();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 450 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      
      <div className='flex flex-col gap-3 rounded-xl  p-[2rem]'>
                <h2>Property Owner/Broker Details</h2>
                 <div className='flex flex-col gap-2'>
                     <span className='text-[1.2rem]'>Name</span>
                     <span className='text-black border-[2px] border-solid border-gray-300 px-2 py-2 bg-white text-[1.2rem]'> { propertyData?.name}</span>
                 </div>
                 <div className='flex flex-col gap-2'>
                     <span className='text-[1.2rem]'>Mobile Number</span>
                    <span className='text-black border-[2px] border-solid border-gray-300 px-2 py-2 bg-white text-[1.2rem]'> { propertyData?.mobile.slice(0,5)}xxxxxx</span>
                 </div>
                 <button className='rounded-full border-[1px] border-solid border-transparent font-[700] text-[1rem] uppercase px-[20px] py-[12px]  text-white hover:bg-[hsl(21,88%,66%)] post-btn ' onClick={()=>{
                  navigate("/property-pricing");
                 }}>Subscribe Now</button>
             </div>
    </Box>
  );

  return (
    <div>
      {/* {['left', 'right', 'top', 'bottom'].map((anchor) => ( */}
      <React.Fragment>
        <button className='rounded-full border-[1px] border-solid border-transparent font-[700] text-[1rem] uppercase px-[30px] py-[22px]  text-white hover:bg-[hsl(21,88%,66%)] post-btn fixed lg:left-[7vw] bottom-4 w-[100%] lg:w-[12vw]' onClick={toggleDrawer(type, true)}>Enquire Now</button>
        <Drawer
          anchor={type}
          open={state[type]}
          onClose={toggleDrawer(type, false)}
        >
          {list(type)}
        </Drawer>
      </React.Fragment>
      {/* ))} */}
    </div>
  );
}

