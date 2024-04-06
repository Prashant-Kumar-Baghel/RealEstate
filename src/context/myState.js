/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import MyContext from './myContext';
import { db, realdb } from '../utils/firebase';
import { ref } from 'firebase/storage';
import { child, get } from 'firebase/database';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { useSelector } from 'react-redux';

function MyState({children}) {
  const [getAllProduct, setGetAllProduct] = useState([]);
  const [getAllSellProduct, setGetAllSellProduct] = useState([]);
  const [getAllUser, setGetAllUser] = useState([]);
  const [cityList,setCityList]=useState([]);
  // const [countUsers,setCountUsers]=useState(0);//we create countUsers,setCountUsers to show only those users on admin page which added property and remove those users which has not any property.
  const [userData,setUserData]=useState(null)
  const [userHousesImages,setUserHousesImages]=useState(null);
  const [selectedRentImages,setSelectedRentImages]=useState([])//created this array to store images link from firebase .
// console.log( "userDataseeee", userData)
  const user=useSelector((store)=>store.user)
//  console.log( "userDataseeee", user)
const getAllProductFunction=async ()=>{
  try{
    const q = query(
      collection(db, "Rent"),
      orderBy('time')  
  );
  const data = onSnapshot(q, (QuerySnapshot) => {
      let productArray = [];
      QuerySnapshot.forEach((doc) => {
          productArray.push({ ...doc.data(), id: doc.id });
          // console.log("productArrayInside",productArray)
      });
      console.log("productArray",productArray)
      setGetAllProduct(productArray);
      // setLoading(false);
  });
  return () => data;
  }catch(err){
    console.log(err);
  }
}
  useEffect(()=>{
    getAllProductFunction();
  },[])

  // ------------------------------------- 

  const getAllSellProductFunction=async ()=>{
    try{
      const q = query(
        collection(db, "Sell"),
        orderBy('time')
    );
    const data = onSnapshot(q, (QuerySnapshot) => {
        let productArray = [];
        QuerySnapshot.forEach((doc) => {
            productArray.push({ ...doc.data(), id: doc.id });
            // console.log("productArrayInside",productArray)
        });
        console.log("productArray",productArray)
        setGetAllSellProduct(productArray);
        // setLoading(false);
    });
    return () => data;
    }catch(err){
      console.log(err);
    }
  }
    useEffect(()=>{
      getAllSellProductFunction();
    },[])
    // ------------------------------------------- 
// ---------------------------- 

//these section used to get all the users which added property so we can show these particular users not all the users.
const getAllUserFunction=()=>{
  try{
    const q=query(
      collection(db,"EditedUsers"),
      where("postProperty","==",true)
    )
   const userdata= onSnapshot(q,(snapShot)=>{
      let userArray=[];
      snapShot.docs.forEach((doc)=>{
        // userArray.push({...doc.data()})
        const docData = doc.data();
        // Filter out documents where countProperties is greater than 0
        if (docData.countProperties > 0) {
          userArray.push({ ...docData })
        }
      })
      console.log("userArray",userArray)
      setGetAllUser(userArray);
    })
    return ()=>userdata;
  }catch(err){
    console.log(err)
  }
}
  
  
  useEffect(()=>{
    getAllUserFunction();
  },[])

  // ---------------------------- 

  const fetchData= async()=>{
    const response= await fetch("https://realestate-adea6-default-rtdb.firebaseio.com/citiesList.json")
    const data= await response.json();
    // console.log("ProductData",data);
    setCityList(data);
}
useEffect(  ()=>{
    fetchData();
},[])

// ------------------------ 
//select only that user which login so we can use that user property in UserProfile details.
const getUserDetails=()=>{
  try{
    let q;
    if(user?.uid){
      q=query(
        collection(db,"EditedUsers"),
      where("uid","==",user?.uid))
    }
    // const q = query(
    //   collection(db, "RegisteredUsers"), 
    //   where('uid', '==', user?.uid)
    //   );
    let data;
 if(q){
   data=onSnapshot(q,(QuerysnapShot)=>{
    // let userInfo;
    //we pass docId because we want to update that user inside userDetail section.
      QuerysnapShot.forEach((doc)=>setUserData({...doc.data(),docId:doc.id}) );
      // console.log( "userDataseeee", userData)
      // setUserData({...userInfo,docId:doc.id})
  })
 }
  return ()=>data;
  }catch(err){
    console.log(err);
  } 
   
}
useEffect(()=>{ 
  getUserDetails();
},[user])
  return (
    <MyContext.Provider value={{getAllProduct,getAllUser,cityList,userData,setUserData,getAllSellProduct,setGetAllUser,userHousesImages,setUserHousesImages,selectedRentImages,setSelectedRentImages}}>
       {children}
    </MyContext.Provider>
  )
}

export default MyState