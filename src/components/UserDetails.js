import React, { useContext, useEffect, useState } from 'react'
import {  useSelector } from 'react-redux'
import {  db, storage } from '../utils/firebase';
import {  ref,  getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import 'react-phone-number-input/style.css'
;
import { Avatar } from '@mui/material';
import { deepOrange } from '@mui/material/colors';

import {v4} from "uuid";
import firebaseConfig from '../utils/firebase';
import firebase from 'firebase/compat/app'
import {  doc,  updateDoc } from 'firebase/firestore';
import myContext from '../context/myContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';
firebase.initializeApp(firebaseConfig)
const UserDetails = () => {
  const user=useSelector((store)=>store.user)
  
  // const [userData,setUserData]=useState(null)
  const [file,setFile]=useState(null);
  const [imgUrl,setImgUrl]=useState("");
  const [progress,setProgress]=useState(null)

  const {userData,setUserData}=useContext(myContext);

  const name=user?.displayName;
     const nameParts=name?.split(" ");
     let profileName="";
     nameParts?.map((item)=>{
      profileName=profileName+item?.charAt(0);
     })
   
  useEffect(()=>{
    const uploadFile=()=>{
      //Generate Unique file name
      // const name= new Date().getTime()+file.name;
      //Find Storage reference .
      const storageRef=ref(storage,`profilePics/${v4()}`);//In Firebase Storage,  this line would create a reference to the storage location where the file with the specified name is intended to be stored or uploaded. The ref() function takes two arguments: the Firebase storage instance (storage) and the path where the file should be stored (profilePics/${v4()}). The ${v4()} part generates a unique identifier using the v4() function from the uuid library. This ensures that each uploaded file gets a unique path.
      const uploadTask= uploadBytesResumable(storageRef, file);//This line initiates an upload task (uploadTask) using the uploadBytesResumable() function. It takes two arguments: the storage reference (storageRef) created in the previous step and the file to be uploaded (file). This function returns an upload task object that can be used to track the progress and state of the upload.

      //This code sets up a listener for state changes (on("state_changed")) on the upload task. It takes three callback functions: one for state changes, one for errors, and one for completion
      uploadTask.on("state_changed", (snapShot)=>{
        //Inside the state change callback, the code calculates the upload progress by dividing the number of bytes transferred (snapShot.bytesTransferred) by the total number of bytes (snapShot.totalBytes). It then updates the upload progress state (setProgress(progress)).
        const progress=(snapShot.bytesTransferred / snapShot.totalBytes) * 100;
        setProgress(progress);
        //This switch statement checks the state of the upload task (snapShot.state) and performs specific actions based on the state. For example, it can log messages for "paused" or "running" states.
        switch(snapShot.state){
          case "paused":
            console.log("upload is paused");
            break;
          case "running": 
            console.log("upload is running");
            break; 
          default:
            break;  
        }
      },(error)=>{
        //This callback function handles errors that may occur during the upload process. It logs any errors to the console for debugging purposes.
        console.log(error)
      },
      ()=>{
        //This callback function is called when the upload task is completed successfully. It retrieves the download URL of the uploaded file using getDownloadURL() and sets it as the image URL (setImgUrl(downloadURL)).
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
          setImgUrl(downloadURL)
        }) 
      })
    } 
    file && uploadFile()
  },[file])
    
    

  return (
  <>
      <div className='max-w-[1180px] mx-auto px-[20px] overflow-hidden flex-wrap pb-[4vh]'>
      <div className='flex lg:flex-row justify-start shadow-lg py-8 px-[4vw] flex-col  gap-[4rem]'>
           <div className=' text-gray-500 text-start flex flex-col gap-5 '>
            {(userData?.avatar)?<Avatar  sx={{ bgcolor: deepOrange
              [500],width:"100%",height:"18vh" ,borderRadius: '0.1rem'}}><span className='text-[5rem]'>{profileName}</span></Avatar>:<img src={userData?.photoURL} className="w-full h-[40vh] lg:w-[10vw] lg:h-[18vh] rounded-sm" alt="" />}

            <div className='flex flex-col gap-4'>
              <label htmlFor="file"  className='change-btn py-4 px-6 text-white rounded-md cursor-pointer'>
                <span>Select Image</span>
              </label>
              <input 
              type="file" 
              id='file'  
              className='p-2 outline-none border-black border-[2px] border-solid hidden'
              onChange={(e)=>{
                setFile(e.target.files[0])
              }}
               /> 
               <div className='w-full lg:w-[150px] h-[20px] bg-[lightgrey] relative text-white'>
                  {progress?<div className="absolute top-0 bottom-0 left-0 w-[0%] flex justify-center items-center p-[inherit]" style={{ width: `${progress}%`, background: `linear-gradient(45deg, rgb(170, 5, 126), rgb(7, 27, 116))` }}
>{progress+"%"}</div>:<>0%</>}
               </div>
              <button className='change-btn rounded-md p-4 text-white' onClick={async ()=>{
                await updateDoc(doc(db,"EditedUsers",userData?.docId),
                {
                  ...userData,photoURL:imgUrl,avatar:false
                })
                alert("Profile Updated Successfully")
              }}>Upload</button>
            </div>
           
          </div>
        
        <form action="" onSubmit={(e)=>{
          e.preventDefault();
        } } className="flex flex-col gap-6 lg:gap-8 justify-center items-start bg-white ">
          

         <div className='flex gap-4 flex-col lg:flex-row'>
            <div className=' flex flex-row items-center gap-3 lg:flex-row text-[600] text-black text-[1.2rem] lg:items-center'>
              <FontAwesomeIcon icon={faUser} style={{color:"orange"}}/>
                <input type="text" 
                value={userData?.displayName} 
                onChange={(e)=>{
                  setUserData({...userData,displayName:e.target.value})
                }}
                className='border-[2px] border-solid border-gray-300 px-4 py-2 text-gray-400' />
              </div>

   
              <div className=' flex flex-row items-center gap-3 lg:flex-row text-[600] text-black text-[1.2rem] lg:items-center'>
          <FontAwesomeIcon icon={faPhone} style={{color:"orange"}} />
            <input type="text" 
            value={userData?.phoneNo} 
            onChange={(e)=>{
              setUserData({...userData,phoneNo:e.target.value})
            }} 
            className='border-[2px] border-solid border-gray-300  px-4 py-2 text-gray-400' />
          </div>
         </div>

         <div className=' text-[600] text-black text-[1.2rem] flex gap-3 items-center'>
              <FontAwesomeIcon icon={faEnvelope} style={{color:"orange"}} />
              <span className='text-gray-400'> {userData?.email}</span> 
              </div>
          


          <button   
          className="text-white change-btn py-4 px-2 rounded-md  w-[100%]"
          onClick={async ()=>{
            await updateDoc(doc(db,"EditedUsers",userData?.docId),
            {
              ...userData,displayName:userData.displayName,phoneNo:userData.phoneNo
            })
            alert("Profile Updated Successfully")
          }}>Save Changes</button>

          
        </form>
        
      </div>
      
    </div>
  </>
    
    
  )
}

export default UserDetails
