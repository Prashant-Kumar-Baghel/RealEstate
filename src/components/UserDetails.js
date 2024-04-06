import { RecaptchaVerifier, signInWithPhoneNumber, updateProfile } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice';
import { auth,createUserDocument, db, storage } from '../utils/firebase';
import { getStorage, ref, uploadBytes, getDownloadURL, listAll, uploadBytesResumable } from 'firebase/storage';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'
import Footer from './Footer';
import Header from './Header';
import UserDetailsModal from './UserDetailsModal';
import { Avatar } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { Button } from 'semantic-ui-react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import styled from '@emotion/styled';
import {v4} from "uuid";
import firebaseConfig from '../utils/firebase';
import firebase from 'firebase/compat/app'
import { collection, doc, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import myContext from '../context/myContext';
firebase.initializeApp(firebaseConfig)
const UserDetails = () => {
  const user=useSelector((store)=>store.user)
  // console.log("profileUser",user);
  const [userName,setUserName]=useState(user.displayName);
  const [userPhone,setUserPhone]=useState(user.phoneNumber);
  const [userPhoto,setUserPhoto]= useState(null);
  const [userAuth,setUserAuth]=useState(null);
  const [otp,setOtp]=useState("")
  const [useraddress,setUseraddress] =useState(user.address);
  const dispatch=useDispatch();
  // const [userData,setUserData]=useState(null)
  const [file,setFile]=useState(null);
  const [imgUrl,setImgUrl]=useState("");
  const [progress,setProgress]=useState(null)

  const users=useSelector((store)=>store.user);
  console.log("OPUser",users);
  const {userData,setUserData}=useContext(myContext);
  console.log("imgUl",userData)
  
  // console.log("okayji")
  // const uploadImageToStorage = async (imageFile, userId) => {
  //   const storage = getStorage();
  //   const storageRef = ref(storage, 'profilePics/' + userId); // Create a reference
    
  //   // Upload the file
  //   await uploadBytes(storageRef, imageFile);
  
  //   // Get download URL
  //   const url = await getDownloadURL(storageRef);
  
  //   return url;
  // }
  // const handleButtonClick=()=>{
  //   // console.log(auth.currentUser);
  //   const currentUser=auth.currentUser;
  //   const userId = auth.currentUser.uid;
  //   const photoURL =  uploadImageToStorage(userPhoto, userId);
  //   if(currentUser){
      
  //     updateProfile(currentUser, {
  //       displayName: userName, 
  
  //       photoURL: photoURL,
  
  //     }).then(() => {
  //       // Profile updated!
  
  //       // console.log(auth.currentUser)
  //       const {uid,email,displayName,photoURL} = auth.currentUser;
  //       console.log(displayName);
  //       //In addUser I will add a object.
  //       dispatch(addUser({
  //         uid:uid,
  //         email:email,
  //         displayName:displayName,
  //         photoURL:photoURL,})
  //         )
  
  //       //Once our profile updated then we navigate.
  //       //As Soon as user SignIn or SignUp then we redirect him to Browse Page.
  //       //  navigate("/browse");
  //     }).catch((error) => {
  //       // An error occurred
  //       <p>{error.message}</p>;
  //       <p>Hello</p>
  //     });
  //   }
    

  // }
  // const handleButtonClick = async () => {
  //   // <UserDetailsModal/>
  //   console.log(userPhoto);//userPhoto is an object which contain file details.
  //   const currentUser = auth.currentUser;
  //   console.log(currentUser);
  //   const userId = auth.currentUser.uid;
  
  //   try {
  //     const imageURL = await uploadImageToStorage(userPhoto, userId);
  
  //     //we can't use user below instead of currentUser in updateProfile.
  //     if (currentUser) {

  //       await updateProfile(currentUser, {
  //         displayName: userName,
  //         photoURL: imageURL,
  //         // phoneNumber:userPhone
  //       });
        
        
  //       await createUserDocument(currentUser,{useraddress},dispatch)
  //       console.log("bolo",user.address);
  //       // Profile updated!
  //       const { uid, email, displayName, photoURL,phoneNumber } = auth.currentUser;
  //       // console.log(displayName);
  
  //       // In addUser, add an object
  //       dispatch(
  //         addUser({
  //           uid: uid,
  //           email: email,
  //           displayName: displayName,
  //           photoURL: photoURL,
  //           phoneNumber:phoneNumber,
  //         })
  //       );
  //       console.log("firebase",user)
  //       //we just store the user in our fireStore which the database we using.
        
       
  
  //       // Once our profile is updated, you can navigate or perform any other actions
  //       // For example, navigate("/browse");
  //     }
  //   } catch (error) {
  //     // Handle the error appropriately
  //     console.error('Error updating profile:', error.message);
  //   }
  // };

  //Phone verification:-
  // const sendOtp= async()=>{
    
  //   try{
  //     const recaptcha= new RecaptchaVerifier(auth,"recaptcha",{})
  //     const confirmation= await signInWithPhoneNumber(auth,userPhone,recaptcha);
  //     setUserAuth(confirmation);
  //     console.log(confirmation);
  //     // console.log(userAuth);

  //   }
  //   catch(err){
  //     console.log(err);
  //   }
  // }

  // const verifyOtp=async ()=>{
  //   const currentUser=auth.currentUser;;
  //   try{
  //     await userAuth.confirm(otp)
  //     // await updateProfile(currentUser, {
  //     //   phoneNumber:userPhone
  //     // });
  //     // const { uid, email, displayName, photoURL,phoneNumber } = auth.currentUser;
  //     // console.log(displayName);

  //     // In addUser, add an object
  //     // dispatch(
  //     //   addUser({
  //     //     uid: uid,
  //     //     email: email,
  //     //     displayName: displayName,
  //     //     photoURL: photoURL,
  //     //     phoneNumber:phoneNumber
  //     //   })
  //     // );
  //    console.log("phone",user);
  //     console.log("success")
  //   }
  //   catch(err){
  //     console.log(err);
  //   }
  // }

  const name=user?.displayName;
     const nameParts=name?.split(" ");
     let profileName="";
     nameParts?.map((item)=>{
      profileName=profileName+item?.charAt(0);
     })
    //  -------------------------------------- 
    // const handleImageButtonClick=async ()=>{
    //   //ref is a function provided by the Firebase Storage library. It's used to create a reference to a specific location within the Firebase Storage.
    //   //`profilePics/${v4()}`specifies the path within the Firebase Storage where the image will be stored. ${v4()} is likely generating a unique identifier (such as a UUID) using the v4 function from a library like uuid. This ensures that each uploaded image gets a unique path.
    //   const imgRef=ref(storage, `profilePics/${v4()}`)
    //   //This is a function provided by the Firebase Storage library for uploading data (in this case, the image file) to the specified storage location.
    //   await uploadBytes(imgRef,file);
    //   const url= await getDownloadURL(imgRef);
    //   console.log("URRL",url);
    //   // console.log("upload")
    //   setImgUrl(url);
    // }

    // ------------------------------ 
    //Upload the image on firebase 
     //Upload the image on firebase 
  useEffect(()=>{
    const uploadFile=()=>{
      //Generate Unique file name
      console.log(file);
      // const name= new Date().getTime()+file.name;
      //Find Storage reference .
      const storageRef=ref(storage,`profilePics/${v4()}`);//In Firebase Storage,  this line would create a reference to the storage location where the file with the specified name is intended to be stored or uploaded. The ref() function takes two arguments: the Firebase storage instance (storage) and the path where the file should be stored (profilePics/${v4()}). The ${v4()} part generates a unique identifier using the v4() function from the uuid library. This ensures that each uploaded file gets a unique path.
      const uploadTask= uploadBytesResumable(storageRef, file);//This line initiates an upload task (uploadTask) using the uploadBytesResumable() function. It takes two arguments: the storage reference (storageRef) created in the previous step and the file to be uploaded (file). This function returns an upload task object that can be used to track the progress and state of the upload.
      console.log("uploadTask",uploadTask);

      //This code sets up a listener for state changes (on("state_changed")) on the upload task. It takes three callback functions: one for state changes, one for errors, and one for completion
      uploadTask.on("state_changed", (snapShot)=>{
        console.log("snapShot",snapShot);
        //Inside the state change callback, the code calculates the upload progress by dividing the number of bytes transferred (snapShot.bytesTransferred) by the total number of bytes (snapShot.totalBytes). It then updates the upload progress state (setProgress(progress)).
        const progress=(snapShot.bytesTransferred / snapShot.totalBytes) * 100;
        console.log("progress",progress);
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
        console.log("downloaduploadTask",uploadTask)
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
          setImgUrl(downloadURL)
          console.log("URL",downloadURL);
        }) 
      })
    } 
    file && uploadFile()
  },[file])
    
    // console.log("imgUrl",imgUrl);
    // const handleImageUpload=()=>{

    // }

    // ---------------------------- 
    

  return (
  <>
      <div className='max-w-[1180px] mx-auto px-[20px] overflow-hidden mt-[10vh] sm:mt-[18vh] flex-wrap pb-[4vh]'>
      <h2 className='text-[3rem] font-bold text-center  '>Profile Details</h2>
      <div className='flex flex-row-reverse justify-between shadow-2xl shadow-gray-600 py-8 px-[4vw] '>
        <form action="" onSubmit={(e)=>{
          e.preventDefault();
        } } className="flex flex-col gap-8 justify-center items-start bg-white ">
          {/* <div className=' text-gray-500 text-center'>
            <label htmlFor="name" className='text-[1.2rem]'>Name :- </label>
            <input 
            type="text" 
            placeholder='Name' 
            id='name' 
            className='py-1 px-4 outline-none border-gray-500 border-[2px] border-solid'
            value={userName} 
            onChange={(e)=>{
              setUserName(e.target.value)
            }}/>
          </div> */}

          <div className=' flex gap-2 text-[600] text-black text-[1.2rem] items-center'>
            {/* <span> Name:- {userData?.displayName}</span> <br /> */}
            <span>Name:-</span> <br />
            <input type="text" 
            value={userData?.displayName} 
            onChange={(e)=>{
              setUserData({...userData,displayName:e.target.value})
            }}
            className='border-[2px] border-solid border-black border-md px-4 py-2' />
            {/* <span>Phone nO-{user.phoneNumber}</span> */}
          </div>


          <div className=' text-[600] text-black text-[1.2rem]'>
            <span> Email:- {userData?.email}</span> <br />
            {/* <span>Phone nO-{user.phoneNumber}</span> */}
          </div>


          <div className=' flex gap-2 text-[600] text-black text-[1.2rem] items-center'>
            <span> Mobile Number:- </span> <br />
            <input type="text" 
            value={userData?.phoneNo} 
            onChange={(e)=>{
              setUserData({...userData,phoneNo:e.target.value})
            }} 
            className='border-[2px] border-solid border-black border-md px-4 py-2' />
            {/* <span>Phone nO-{user.phoneNumber}</span> */}
          </div>

          {/* <div className=' text-gray-500 text-center'>
            <span> Mobile No:-</span> <br />
            
          </div> */}

          {/* <div className=' text-gray-500 text-center'>
            <span> Profile Picture:-</span> <br />
            
          </div> */}

      

  {/* ----------------------------------------  */}
          {/* <div className='flex gap-4'> */}

  {/* Pass international property to enforce international phone number format. */}
          {/* PhoneInput is inbuilt and onChange={setUserPhone} work only like this. */}
            {/* <PhoneInput
            placeholder="Enter phone number"
            international
            defaultCountry="IN"
            value={userPhone} 
            onChange={setUserPhone}
            className='outline-none border-gray-500 border-[2px] border-solid '
            />
            <button className="text-white bg-green-700 py-1 px-2 rounded-md " onClick={sendOtp}>Send OTP</button>  */}
            
          {/* </div> */}
          {/* we will get recaptcha here  */}
          {/* <div className="mt-4" id='recaptcha'></div>

          <div className='flex gap-4'>
            <input type="text" 
            className='py-1 px-4 outline-none border-gray-500 border-[2px] border-solid'
            placeholder='Enter OTP' value={otp} onChange={(e)=>{
              setOtp(e.target.value)
            }}/>
            <button className="text-white bg-green-700 py-1 px-2 rounded-md " onClick={verifyOtp}>Verify OTP</button>
            
          </div> */}

  {/* --------------------------- 
          {/* <div>
            <label htmlFor="name">Adrress :- </label>
            <input 
            type="text" 
            placeholder='Address' 
            id='name'  
            value={useraddress}
            onChange={(e)=>{
              setUseraddress(e.target.value)
            }}
            className='py-1 px-4 outline-none border-black border-[2px] border-solid'
            />
          </div> */}


          <button   
          className="text-white bg-green-700 py-4 px-2 rounded-md  w-[100%]"
          onClick={async ()=>{
            // dispatch(addUser({...user,photoURL:imgUrl,avatar:false}))
            await updateDoc(doc(db,"EditedUsers",userData?.docId),
            {
              ...userData,displayName:userData.displayName,phoneNo:userData.phoneNo
            })
            alert("Profile Updated Successfully")
          }}>Edit Details</button>

          
        </form>
        <div className=' text-gray-500 text-start flex flex-col gap-5 '>
            {(userData?.avatar)?<Avatar  sx={{ bgcolor: deepOrange
              [500],width:"10vw",height:"18vh" ,borderRadius: '0.1rem'}}><span className='text-[5rem]'>{profileName}</span></Avatar>:<img src={userData?.photoURL} className="w-[10vw] h-[18vh] rounded-sm" alt="" />}

            <div className='flex flex-col gap-4'>
              <label htmlFor="file"  className='bg-sky-400 py-4 px-6 text-white rounded-md cursor-pointer'>
                <span>Select Image</span>
              </label>
              <input 
              type="file" 
              id='file'  
              className='p-2 outline-none border-black border-[2px] border-solid hidden'
              onChange={(e)=>{
                console.log("target",e.target.files[0])
                setFile(e.target.files[0])
              }}
               /> 
               <div className='w-[150px] h-[20px] bg-[lightgrey] relative text-white'>
                  {progress?<div className="absolute top-0 bottom-0 left-0 w-[0%] flex justify-center items-center p-[inherit]" style={{ width: `${progress}%`, background: `linear-gradient(45deg, rgb(170, 5, 126), rgb(7, 27, 116))` }}
>{progress+"%"}</div>:<>0%</>}
               </div>
              <button className='bg-blue-400 rounded-md p-4' onClick={async ()=>{
                // dispatch(addUser({...user,photoURL:imgUrl,avatar:false}))
                await updateDoc(doc(db,"EditedUsers",userData?.docId),
                {
                  ...userData,photoURL:imgUrl,avatar:false
                })
                alert("Profile Updated Successfully")
              }}>Upload</button>
            </div>
           
          </div>
      </div>
      
    </div>
   {/* {imgUrl.map((item)=>{
    return <img src={item} alt="" />
   })} */}
   {/* <img src={imgUrl} alt="" /> */}
  </>
    
    
  )
}

export default UserDetails
