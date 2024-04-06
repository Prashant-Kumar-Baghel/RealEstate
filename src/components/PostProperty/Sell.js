import React, { useContext, useEffect, useState } from 'react'
// import {Button,Form,Grid,Loader} from "semantic-ui-css";
import { storage, db } from '../../utils/firebase';
import {  GridColumn, GridRow,Button,Grid,Loader } from 'semantic-ui-react';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useNavigate, useParams, useSubmit } from 'react-router-dom';
import { Timestamp, addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { addProperty, returnProperty } from '../../utils/propertySlice';
import { useDispatch, useSelector } from 'react-redux';
import { type } from '@testing-library/user-event/dist/type';
import DeleteIcon from '@mui/icons-material/Delete';
import myContext from '../../context/myContext';
const initialState={
  address: "",
  price: null,
  city: "",
  furnishing: "",
  area:"",
  bhk : null,
  parking :"",
  availability:"",
  brokerContact:"",
  approveState:"approve"
}

const Sell = () => {
  const [data,setData]=useState(initialState);
  const [selectedImages,setSelectedImages]=useState([]);//this array contain all multiple images links that we select.
  // const [progress,setProgress]=useState(null);//Check our file is upload or not on firebase.
  const [isSubmit,setIsSubmit]=useState(false)//check form is submit or not.
  const navigate = useNavigate();
  const [cityList,setCityList]=useState(null);
 const {city,furnishing,parking,area,bhk,price, availability,address,brokerContact}=data;
  const {id} =useParams();
  const {userData,setCountUsers}=useContext(myContext);
  const user=useSelector((store)=>store.user)
// console.log("RentUser",user)
  const dispatch=useDispatch();
  useEffect(()=>{
    fetchData()
},[])
const fetchData=async()=>{
    const response=await fetch("https://realestate-adea6-default-rtdb.firebaseio.com/citiesList.json");
    const data=await response.json();
    console.log("OP",data);
    setCityList(data);
}

  //we run this useffect whenever we have id.
  useEffect(()=>{
    // when we have id then only run getSingleUSer function.
    id && getSingleUSer();
  },[id]);
  const getSingleUSer= async ()=>{

    //we need document reference.
    const docRef=  doc(db,"Sell",id);
    const snapshot=await getDoc(docRef);
    if(snapshot.exists()){
      setData({...snapshot.data()})
    }
  }
  //Upload the image on firebase 
//   useEffect(()=>{
//     const uploadFile=()=>{
//       //Generate Unique file name
//       const name= new Date().getTime()+file.name;
//       //Find Storage reference .
//       const storageRef=ref(storage,file.name);//In Firebase Storage, for example, this line would create a reference to the storage location where the file with the specified name is intended to be stored or uploaded. The storageRef variable can then be used in subsequent operations, such as initiating an upload task to that specific location.
//       const uploadTask= uploadBytesResumable(storageRef, file);

//       uploadTask.on("state_changed", (snapShot)=>{
//         //checking progress of image upload
//         const progress=(snapShot.bytesTransferred / snapShot.totalBytes) * 100;
//         setProgress(progress);
//         //we use switch to track image upload.
//         switch(snapShot.state){
//           case "paused":
//             console.log("upload is paused");
//             break;
//           case "running": 
//             console.log("upload is running");
//             break; 
//           default:
//             break;  
//         }
//       },(error)=>{
//         //if we get any type of error while uploding the image.
//         console.log(error)
//       },
//       ()=>{
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
//           setData((prev)=>({...prev, img:downloadURL}))
//           console.log("URL",downloadURL);
//         }) 
//       })
//     } 
//     file && uploadFile()
//   },[file])
  
  // ({...data, [e.target.name]: e.target.value}): This syntax uses the spread operator (...) to create a new object. It copies all the properties from the existing data object and adds/updates a property specified by [e.target.name] with the value of e.target.value. The square brackets around e.target.name are used to dynamically set the property name based on the name attribute of the button that triggered the click event.
 const handleChange=(e)=>{
  console.log("Input Name:", e.target.name);
  console.log("Input Value:", e.target.value);
  if(e.target.name==="price" || e.target.name==="bhk"){
    // console.log(e.target.name,typeof(+e.target.value))
    setData({...data,[e.target.name]:+e.target.value})
    return;
  }
  setData({...data,[e.target.name]:e.target.value})
  console.log("Data ", data);
  console.log(e)
 }
 const handleButtonClick=async(e)=>{
  console.log("Data ", data);
  setIsSubmit(true);
      
      if(!id){
        //Logic to add the user information like name etc.
      //we will create collection here and Sell is collection name.
        try{
          await addDoc(collection(db,"Sell"),{
            ...data,
            sellImgArray:selectedImages,
            authId:user.uid,
            time: Timestamp.now(),
             date: new Date().toLocaleString(
            "en-US",
            {
                month: "short",
                day: "2-digit",
                year: "numeric",
            }
        )
            // timestamp: serverTimestamp()
          })
          // dispatch(addProperty({...data}))
          const snapshot=await getDoc(doc(db,"EditedUsers",userData?.docId))
          //We do updateDoc here to show only those users which has added propery on admin page.
          let tempdata;
          if(snapshot.exists()){
            tempdata=snapshot.data();
          }

          await updateDoc(doc(db,"EditedUsers",userData?.docId),{
            ...userData,postProperty:true,countProperties:tempdata?.countProperties+1
          })
        }catch(error){
          console.log(error)
        }
      }else{
        //logic to update
        try{
          await updateDoc(doc(db,"Sell",id),{
            ...data,
            time: Timestamp.now(),
            date: new Date().toLocaleString(
                "en-US",
                {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                }
            )
            // timestamp: serverTimestamp()
          })
          dispatch(returnProperty({...data}))
        }catch(error){
          console.log(error)
        }
      }
      navigate("/listing");


 }

  return (
    <div>
        {/* <Grid columns={3} centered verticalalign="middle" > 
            <GridRow >
              <GridColumn> */}
                <div className='mt-[2vh]'>
                  {(isSubmit)?(<Loader/>):(
                    <>
                    {id?(<h2>Update Details</h2>):(<h2>Add Basic Details</h2>)}
                    <form action="" className='flex flex-col gap-4 ' onSubmit={(e)=>{
                      e.preventDefault();
                    }}>
                      <div className='flex flex-col'>
                        <label htmlFor="price" className='text-[#606060]'>Address</label>
                        <input type="text" className='p-2 outline-none border-b-[#d7d7d7] border-b-s border-b-2' placeholder='Enter Address'  onChange={handleChange} required id='address' name='address' value={address}/>
                      </div>

                      <div className='flex flex-col'>
                        <label htmlFor="price" className='text-[#606060]'>Price</label>
                        <input type="number" className='p-2 outline-none border-b-[#d7d7d7] border-b-s border-b-2' placeholder='Enter Price'  onChange={handleChange} required id='price' name='price' value={price}/>
                      </div>
                      <div className='flex flex-col'>
                        <label htmlFor="price" className='text-[#606060]'>Parking</label>
                        <input type="text" className='p-2 outline-none border-b-[#d7d7d7] border-b-s border-b-2' placeholder='Parking'  onChange={handleChange} required id='parking' name='parking' value={parking}/>
                      </div>

                      <div className='flex flex-col'>
                      <span className='text-[#606060]'>City</span>
                        <select 
                          className="p-2 outline-none border-[#d7d7d7] border-[2px] border-solid 
                          " 
                          onChange={handleChange}
                          value={city}
                          name="city"
                          >
                              <option>Select City</option>
                              {cityList?.map((item, index) => {
                                  return (
                                      <option className=" first-letter:uppercase p-4" key={index} value={item?.city} >{item?.city}</option>
                                  )
                              })}
                        </select>
                      </div>

                      <div className='flex flex-col'>
                        <label htmlFor="area" className='text-[#606060]'>Area</label>
                        <input type="text" placeholder='Enter Area in sq. ft.'  className="p-2 outline-none border-b-[#d7d7d7] border-b-s border-b-2" required  onChange={handleChange} id='area' name='area' value={area}/>
                      </div>
                      
                      <div className='flex flex-col'>
                        <label htmlFor="availability" className='text-[#606060]'>Availability</label>
                        <input type="text" placeholder='Availability' className='p-2 outline-none border-b-[#d7d7d7] border-b-s border-b-2' required  onChange={handleChange} id='availability' name='availability' value={availability}/>
                      </div>

                      <div className='flex flex-col'>
                      <label htmlFor="bhk" className='text-[#606060]'>Furnishing</label>
                        <select name="furnishing" id="" className="p-2 outline-none border-[#d7d7d7] border-[2px] border-solid" onChange={handleChange}  value={furnishing}>
                            <option value="">Select Furnishing</option>
                            <option value="Fully Furnished">Fully Furnished</option>
                            <option value="Semi Furnished">Semi Furnished</option>
                            <option value="Un Furnished">Un Furnished</option>                          
                        </select>
                      </div>

                      <div className='flex flex-col'>
                        <label htmlFor="bhk" className='text-[#606060]'>BHK</label>
                        <input type="number" placeholder='BHK' className="p-2 outline-none border-[#d7d7d7] border-[2px] border-solid" required  onChange={handleChange} id='bhk' name='bhk' value={bhk}/>
                      </div>

                      <div className='flex flex-col'>
                      <label htmlFor="bhk" className='text-[#606060]'>Are you ok with brokers contacting you?</label>
                        <select name="brokerContact" id="" className="p-2 outline-none border-[#d7d7d7] border-[2px] border-solid" onChange={handleChange}  value={brokerContact}>
                        <option value="">Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>                         
                        </select>
                      </div>


                      <div className=' flex-wrap'>
                        <div>
                            <label htmlFor='file'  className='flex flex-col px-[.5rem] justify-center items-center border-[1px] border-dotted border-black rounded-md w-[10rem] h-[10rem] cursor-pointer text-[1.2rem] bg-[#f0f9ff] text-[#0078db] font-[600]'>
                              + Add Images <br />
                              <span className='text-[1rem] pt-[0.5rem] text-[#0078db] font-[500] text-center'>Drag and drop your photos here</span>
                              </label>
                              {/* To Upload files we use input with type file.  */}
                              <input 
                              type="file" 
                              id='file'
                              className='p-2 outline-none border-black border-[2px] border-solid hidden' 
                              multiple//give multiple attribute to select multiple images.
                              onChange={(e)=>{
                                // console.log("Files",e.target.files);
                              //   Array.isArray() is a method used in JavaScript to determine whether a value is an array. It returns true if the value is an array, otherwise false.
                              // console.log(Array.isArray(e.target.files))//we get false hence e.target.files is not an array

                              //convert into array .
                              const selectedFile=e.target.files;
                              const selectedArray=Array.from(selectedFile);
                              // console.log(Array.isArray(selectedArray));
                              const imagesArray=selectedArray.map((item)=>{
                                return  URL.createObjectURL(item)//The URL.createObjectURL() static method creates a string containing a URL representing the object given in the parameter.
                              })
                              console.log("imagesArray",imagesArray)
                              // 1)Arrow function present inside setSelectedImages takes the previous state of the selectedImages array.
                              // 2)Concatenates the imagesArray (which contains URLs of newly selected images) with the previous state.
                              // 3)Updates the state of selectedImages to include the newly added images.
                              setSelectedImages((previousImages)=>previousImages.concat(imagesArray));//The concat() method in JavaScript is used to merge two or more arrays or array-like objects, such as strings, into a new array without modifying the original arrays.
                              // let tempArray=
                              }} />
                        </div>
                          
                        <div className='flex gap-4 mt-4 flex-wrap'>
                          {selectedImages?.map((imgLink,index)=> <div 
                          key={index} className='relative shadow-md'>
                              <img src={imgLink} className="h-[150px]" alt=''/> 
                          <button onClick={(e)=>{
                              setSelectedImages(selectedImages.filter((item)=>{
                                  return item!==imgLink
                              }))
                          }} className='absolute top-2 right-2'><DeleteIcon sx={{color:"white",background:"black"}}/></button>
                          </div>) }
                       </div>

                      </div>

                      
                      {/* button is disable if image upload process is in progress. */}
                      <Button primary onClick={handleButtonClick} type='submit' >{id?"Update":"Submit"}</Button>
                    </form>
                    </>
                  )}
                </div>
              {/* </GridColumn>
            </GridRow>

        
        </Grid> */}
    </div>
  
  )
}

export default Sell
