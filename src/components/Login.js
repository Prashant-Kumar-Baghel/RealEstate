import React, { useRef, useState } from 'react'
import { IMG_URL, LOGO_URL, LOG_IN_URL, PROFILE_IMG } from '../utils/constants'
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth, db} from "../utils/firebase"
// import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser,getUser } from '../utils/userSlice';
import { Timestamp, addDoc, collection, onSnapshot, query, where } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// import Header from './Header';
const Login = () => {
    const[isSignInForm,setIsSignInForm]=useState(true);
    const [errorMessage,setErrorMessage]=useState(null);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const toggleSignInForm=()=>{
        setIsSignInForm(!isSignInForm);//toogle condition.(if isSignInForm is true then change to false or if isSignInForm is false then change to true)
      }
      const email= useRef(null);
      const password= useRef(null);
       const name=useRef(null);
      //  console.log("name.current.value",name)
      const handleButtonClick=  ()=>{
        // console.log("inside",name)
        if(!isSignInForm &&  name?.current.value === ""){
          alert("All Fields are required");
          return;
        }
        if ( email?.current.value === "" || password?.current.value === "") {
          console.log("empty")
          alert("All Fields are required")
          return
      }
        const message=  (isSignInForm)?(checkValidData(email.current.value,password.current.value,isSignInForm)):(checkValidData(email.current.value,password.current.value,isSignInForm,name.current.value));
        // console.log(message);
        setErrorMessage(message);

        if(message)return;

    //Sign In or Sign Up Logic
    
    if(!isSignInForm){//checking that we have Sign In or Sign Up form and accordingily we apply logic.

      //Sign Up Logic
      createUserWithEmailAndPassword(auth, 
      email.current.value, 
      password.current.value)
      .then(async (userCredential) => {
        // if response is success then we get user object and user signUp on firebase.
        const user = userCredential.user;
        console.log("okuser",user);
      //   dispatch(addUser({
      //     uid: user.uid,
      //     role: "user",
      //     email: email.current.value,
      //     displayName: name.current.value,
      //     avatar:true,
      //     photoURL:"",
      //     phoneNo:"",
          
      // }))
      const userDetails={
        uid: user.uid,
        role: "user",
        email: email.current.value,
        displayName: name.current.value,
        avatar:true,
        photoURL:"",
        phoneNo:"",
        
    }
      // localStorage.setItem("userInformation",JSON.stringify(userDetails))

      dispatch(getUser(userDetails));
        
        //Adding in firebase .
        await addDoc(collection(db, "RegisteredUsers"), {
          uid: user.uid,
          role: "user",
          email: email.current.value,
          displayName: name.current.value,
          // countProperties:0,//To show only those users on admin page which added property and remove those users which has not added any property.
          photoURL:"",
          phoneNo:"",
          avatar:true,
          countProperties:0,
          time: Timestamp.now(),
          date: new Date().toLocaleString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
          }),
      });

      //Edited Users(We create this collection because when we update property then all data will be updated in this collection and RegisteredUsers collection data will be not update)
      //we don't want to update RegisteredUsers collection because as i update that collection then we again login to the website and we goback to website login page .
      await addDoc(collection(db, "EditedUsers"), {
        uid: user.uid,
        role: "user",
        email: email.current.value,
        displayName: name.current.value,
        // countProperties:0,//To show only those users on admin page which added property and remove those users which has not added any property.
        photoURL:"",
        phoneNo:"",
        avatar:true,
        countProperties:0,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
        }),
    });
     
      alert("Signup Successfully")
      navigate("/")

      })
      .catch((error) => {
        // if there is any error we catch that error .
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode+ " - " + errorMessage);//we can set any other message also.
        
      });

    }else{
      //Sign In Logic
      signInWithEmailAndPassword(auth, email.current.value, 
        password.current.value)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("fetchuser",user)

        //When Firestore processes this query, it looks at each document in the specified collection and checks if the value of the "uid" field in that document matches the provided uid. If a document's "uid" field matches the provided uid, it's included in the query results; otherwise, it's excluded.
        try{
          const q = query(
            collection(db, "RegisteredUsers"),
            where('uid', '==', user?.uid)
            );
            const data=onSnapshot(q,(QuerysnapShot)=>{
              let user;
              QuerysnapShot.forEach((doc)=>user=doc.data())
              const { time, ...serializableUser } = user;
              //we can't dispatch time inside redux state variable otherwise we get warning.
              // dispatch(addUser({...serializableUser}));
              dispatch(getUser({...serializableUser}));
              console.log("query",user);
              console.log("serializableUser",serializableUser);
              alert("LogIn Successfully")
            if(user?.role === "user"){
              navigate("/")
            }else{
              navigate("/admin-dashboard")
            }
            })
        
        
        return () => data;
        } catch(err){
          console.log(err);
        }

        //As Soon as user SignIn or SignUp then we redirect him to Browse Page.
        // navigate("/browse");
      })
      .catch((error) => {
        setErrorMessage("Incorrect Password. Please Try Again")
      });
    }

      }
        
  return (
    <div className='relative'>
        {/* <Header/> */}
        <div className='bg-green-700 h-[100vh]' >
        {window.innerWidth > 1024 &&
    <img className="w-screen" src={LOG_IN_URL} alt="" />
  }
       </div> 
       <form onSubmit={(e)=>{
          e.preventDefault();
        }} action="" className='flex flex-col bg-black lg:w-[25%] bg-opacity-80 py-16 px-10 gap-10 absolute sm:top-[25%] lg:top-[10%] rounded-md mx-auto left-0 right-0  text-white w-[90%] top-[15%] sm:w-[50%]'>
        <h1 className='text-white font-[600] text-[1.8rem]'>{isSignInForm?"Sign In":"Sign Up"}</h1>
        <div className='w-[100%] flex flex-col gap-5'>
          {/* When isSignInForm is false then input with placeholder name is shown. */}
          {!isSignInForm && <input 
          ref={name}
          type="text" 
          placeholder='Name' 
          className='py-3 px-2 w-[100%] rounded-md outline-none bg-gray-600'/>}
          <input 
          // Way to refer email and now email is reference to this input box.
          ref={email}
          type="email" 
          placeholder='Email Address' 
          className='py-3 px-2 w-[100%] rounded-md outline-none bg-gray-600'/>
          <input
          // Way to refer password and now password is reference to this input box. 
          ref={password}
          type="password" 
          placeholder='Password' 
          className='py-3 px-2 w-[100%] rounded-md outline-none bg-gray-600'/>
          {/* if({errorMessage==="Please enter a valid Name." && !isSignInForm}){
            <p className='text-red-700 font-[600]'>Please enter a valid Name.</p>
            return;
            } */}
           
          
          <p className='text-red-700 font-[600]'>{errorMessage}</p>
          
        </div>
        <button 
        className='py-3 px-2 text-white bg-green-600 rounded-md' onClick={handleButtonClick} 
        >{isSignInForm?"Sign In":"Sign Up"}</button>
        <p>{isSignInForm?"New to Our Website? ":"Already Registered? "} <b className="cursor-pointer" onClick={toggleSignInForm}>{isSignInForm?"Sign up now":"Sign in now"}</b></p>
      </form>
    </div>
  )
}

export default Login

