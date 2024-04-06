import React from 'react'
import { LOG_OUT_URL, PROFILE_AVATAR } from '../utils/constants'
import {signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { Link, useNavigate } from 'react-router-dom';
import { removeUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';
const DropDown = ({currentState,handleState}) => {
    const navigate = useNavigate();
    const dispatch=useDispatch()
     const handleButtonClick=()=>{
        signOut(auth).then(() => {
        // If Sign-out successful then navigate to Login page.
        // navigate("/")
        dispatch(removeUser());
           //As Soon as user SignOut then we redirect him to LogIn Page or if user is not logged in then navigate to login page. 
           navigate("/signIn");
        handleState(!currentState);

        }).catch((error) => {
        // An error happened.
        navigate("/error");//we will create this error page.
        });
    }
  return (
    <div className='absolute right-[3.2vw] top-[6vh] lg:top-[15vh] bg-white shadow-2xl'>
      <div className='flex py-2 border-b-2 border-gray-300 items-center gap-4 px-4'>
        <span><img src={PROFILE_AVATAR} alt="" /></span>
        <Link to="/edit-profile"><span>My account</span></Link>
      </div>
      
      <div className='flex py-2 border-b-2 border-gray-300 items-center gap-4 px-4'>
        <Link to="/listing"><span>Listing</span></Link>
      </div>

      <div className='flex py-2 border-b-2 border-gray-300 items-center gap-4 px-4'>
        <span><img className="h-[4vh]" src={LOG_OUT_URL} alt="" /></span>
        {/* <span>Sign Out</span> */}
        <button onClick={handleButtonClick}  className="text-white bg-green-700 py-1 px-2 rounded-md">Sign Out</button>
      </div>
    </div>
  )
}

export default DropDown
