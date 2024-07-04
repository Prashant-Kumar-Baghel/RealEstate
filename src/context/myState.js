/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import MyContext from './myContext';
import { db} from '../utils/firebase';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { useSelector } from 'react-redux';

function MyState({children}) {
  const [getAllProduct, setGetAllProduct] = useState([]);
  const [getAllSellProduct, setGetAllSellProduct] = useState([]);
  const [getAllUser, setGetAllUser] = useState([]);
  const [cityList,setCityList]=useState([]);
  const [userData,setUserData]=useState(null)
  const [rentImages,setRentImages]=useState([])//used to store the image of particular rent house
  const [rentItem,setRentItem]=useState(null);//used to store the docid of particular rent house.
  const [sellImages,setSellImages]=useState([])//used to store the image of particular selling house
  const [sellItem,setSellItem]=useState(null);//used to store the docid of particular selling house.
  const [blogData, setBlogData] = useState(null);
  const user=useSelector((store)=>store.user)

  
const getAllProductFunction=async ()=>{//This method provide all rent property
  try{
    //orderBy('time'): Orders the documents in the "Rent" collection by the time field in ascending order by default. This means that the documents will be sorted from the earliest to the latest time.
    const q = query(
      collection(db, "Rent"),
      orderBy('time')  
  );
  const data = onSnapshot(q, (QuerySnapshot) => {
      let productArray = [];
      QuerySnapshot.forEach((doc) => {
          productArray.push({ ...doc.data(), id: doc.id });
      });
      setGetAllProduct(productArray);
  });
  return () => data();
  }catch(err){
    console.log(err);
  }
}
  useEffect(()=>{
    getAllProductFunction();
  },[])

  // ------------------------------------- 

  const getAllSellProductFunction=async ()=>{//This method provide all rent property
    try{
      const q = query(
        collection(db, "Sell"),
        orderBy('time')
    );
    const data = onSnapshot(q, (QuerySnapshot) => {
        let productArray = [];
        QuerySnapshot.forEach((doc) => {
            productArray.push({ ...doc.data(), id: doc.id });
        });
        setGetAllSellProduct(productArray);
    });
    return () => data();
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
        const docData = doc.data();
        // Filter out documents where countProperties is greater than 0
        if (docData.countProperties > 0) {
          userArray.push({ ...docData })
        }
      })
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
   
    let data;
 if(q){
   data=onSnapshot(q,(QuerysnapShot)=>{
    // let userInfo;
    //we pass docId because we want to update that user inside userDetail section.
      QuerysnapShot.forEach((doc)=>setUserData({...doc.data(),docId:doc.id}) );
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

  // Get Current Month
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
  const currentMonth = new Date().getMonth();
  const currentMonthName = monthNames[currentMonth];
  
  return (
    <MyContext.Provider value={{getAllProduct,getAllUser,cityList,userData,setUserData,getAllSellProduct,setGetAllUser,rentImages,setRentImages,rentItem,setRentItem,sellImages,setSellImages,sellItem,setSellItem,blogData, setBlogData, currentMonthName}}>
       {children}
    </MyContext.Provider>
  )
}

export default MyState