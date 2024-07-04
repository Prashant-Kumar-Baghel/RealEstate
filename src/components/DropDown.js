import React from 'react'
import {signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { Link, useNavigate } from 'react-router-dom';
import { removeUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';
const DropDown = ({handleState}) => {
    const navigate = useNavigate();
    const dispatch=useDispatch()
     const handleButtonClick=()=>{
        signOut(auth).then(() => {
        // If Sign-out successful then navigate to Login page.
        dispatch(removeUser());
           //As Soon as user SignOut then we redirect him to LogIn Page or if user is not logged in then navigate to login page. 
           navigate("/signIn");
       

        }).catch((error) => {
        // An error happened.
        navigate("/error");//we will create this error page.
        });
    }
  return (
    <div className='absolute right-[3.2vw] top-[6vh] lg:top-[10vh] lg:right-[2vh] bg-white w-[130px] rounded-lg border-[1px] border-solid border-gray-500'>
      <div className='flex py-2 border-b-2 border-gray-300 items-center gap-4 px-4 h-[4vh]'>
        <Link to="/edit-profile"><span className='text-black text-[14px] ' onClick={()=>handleState()}>My Account</span></Link>
      </div>
      
      <div className='flex py-2 border-b-2 border-gray-300 items-center gap-4 px-4 h-[4vh]'>
        <Link to="/listing"><span className='text-black text-[14px] ' onClick={()=>handleState()}>Listing</span></Link>
      </div>

      <div className='flex py-2 border-b-2 border-gray-300 items-center gap-4 px-4'>
        <button onClick={handleButtonClick}  className="text-white post-btn py-1 px-2 text-[14px] rounded-md">Sign Out</button>
      </div>
    </div>
  )
}

export default DropDown
