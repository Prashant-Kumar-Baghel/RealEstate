import React, { useContext, useEffect, useState } from 'react'
// import {Button,Form,Grid,Loader} from "semantic-ui-css";
import { storage, db } from '../../utils/firebase';
import {  Button,Loader } from 'semantic-ui-react';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useNavigate, useParams} from 'react-router-dom';
import { Timestamp, addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import {  returnProperty } from '../../utils/propertySlice';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import myContext from '../../context/myContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
const initialState={
  address: "",
  price: "",
  city: "",
  furnishing: "",
  area:"",
  bhk : "",
  parking :"",
  availability:"",
  brokerContact:"",
  approveState:"Approve"
}

const Sell = () => {
  const [data,setData]=useState(initialState);
  const [selectedFiles,setSelectedFiles]=useState([]);
  const [progress,setProgress]=useState(null)
  const [selectedSellImages,setSelectedSellImages]=useState([])//
  const [isSubmit,setIsSubmit]=useState(false)//check form is submit or not.
  const navigate = useNavigate();
 const {city,furnishing,parking,area,bhk,price, availability,address,brokerContact}=data;
  const {id} =useParams();
  const {userData,cityList}=useContext(myContext);
  const user=useSelector((store)=>store.user)
  const dispatch=useDispatch();
  


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
   useEffect(()=>{
    const uploadFile=(file)=>{
     
      //Find Storage reference .
      const storageRef=ref(storage,`${userData.uid}rent/${file.name}`);//In Firebase Storage, for example, this line would create a reference to the storage location where the file with the specified name is intended to be stored or uploaded. The storageRef variable can then be used in subsequent operations, such as initiating an upload task to that specific location.
      const uploadTask= uploadBytesResumable(storageRef, file);

      uploadTask.on("state_changed", (snapShot)=>{
        //checking progress of image upload
        const progress=(snapShot.bytesTransferred / snapShot.totalBytes) * 100;
        setProgress(progress);
        //we use switch to track image upload.
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
        //if we get any type of error while uploding the image.
        console.log(error)
      },()=>{
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL)=>{
          let rentTempArray=[];
          rentTempArray.push(downloadURL);
          setSelectedSellImages((prev)=>prev.concat(rentTempArray));
        })
      })
    } 
    selectedFiles && selectedFiles.map((file)=>{
      uploadFile(file);
    })
  },[selectedFiles])
  
  // ({...data, [e.target.name]: e.target.value}): This syntax uses the spread operator (...) to create a new object. It copies all the properties from the existing data object and adds/updates a property specified by [e.target.name] with the value of e.target.value. The square brackets around e.target.name are used to dynamically set the property name based on the name attribute of the button that triggered the click event.
 const handleChange=(e)=>{
  setData({...data,[e.target.name]:e.target.value})

 }
 const handleButtonClick=async(e)=>{

  setIsSubmit(true);
      
      if(!id){
        //Logic to add the user information like name etc.
      //we will create collection here and Sell is collection name.
        try{
          await addDoc(collection(db,"Sell"),{
            ...data,
            sellImgArray:selectedSellImages,
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
          })
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
                <div className='mt-[2vh]'>
                  {(isSubmit)?(<Loader/>):(
                    <>
                     <h2 className='bg-black text-bold text-white px-4 py-3'>{id?"Update Details":"Add Basic Details"}</h2>
                    <form action="" className='flex flex-col gap-4 shadow-lg bg-white p-4' onSubmit={(e)=>{
                      e.preventDefault();
                    }}>
                      <div className='flex flex-col gap-1'>
                        <label htmlFor="price" className='text-[#606060]'>Address</label>
                        <input type="text" className='px-3 py-3 outline-none border-[#d7d7d7] border-s border-1 rounded-md text-[1.2rem]' placeholder='Enter Address'  onChange={handleChange} required id='address' name='address' value={address}/>
                      </div>

                      <div className='flex flex-col gap-1'>
                        <label htmlFor="price" className='text-[#606060]'>Price</label>
                        <input type="number" className='px-3 py-3 outline-none border-[#d7d7d7] border-s border-1 rounded-md text-[1.2rem]' placeholder='Price'  onChange={handleChange} required id='price' name='price' value={price}/>
                      </div>
                      <div className='flex flex-col gap-1'>
                        <label htmlFor="price" className='text-[#606060]'>Parking</label>
                        <input type="text" className='px-3 py-3 outline-none border-[#d7d7d7] border-s border-1 rounded-md text-[1.2rem]' placeholder='Parking'  onChange={handleChange} required id='parking' name='parking' value={parking}/>
                      </div>

                     

                      <div className='flex gap-10 flex-col lg:flex-row'>
                        <div className='flex flex-col gap-1  w-[100%] lg:w-[50%]'>
                        <span className='text-[#606060]'>City</span>
                          <select 
                            className='px-3 py-3 outline-none border-[#d7d7d7] border-s border-1 rounded-md text-[1.2rem]' 
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
                        
                        <div className='flex flex-col gap-1 w-[100%] lg:w-[50%]'>
                        <label htmlFor="bhk" className='text-[#606060]'>Furnishing</label>
                          <select name="furnishing" id="" className='px-3 py-3 outline-none border-[#d7d7d7] border-s border-1 rounded-md text-[1.2rem]' onChange={handleChange}  value={furnishing}>
                              <option value="">Select Furnishing</option>
                              <option value="Fully Furnished">Fully Furnished</option>
                              <option value="Semi Furnished">Semi Furnished</option>
                              <option value="Un Furnished">Un Furnished</option>                          
                          </select>
                        </div>
                      </div>

                      <div className='flex gap-10 flex-col lg:flex-row'>
                        <div className='flex flex-col gap-1  w-[100%] lg:w-[50%]'>
                          <label htmlFor="area" className='text-[#606060] gap-1'>Area</label>
                          <input type="text" placeholder='Enter Area in sq. ft.'  className='px-3 py-3 outline-none border-[#d7d7d7] border-s border-1 rounded-md text-[1.2rem]' required  onChange={handleChange} id='area' name='area' value={area}/>
                        </div>
                        
                        <div className='flex flex-col gap-1  w-[100%] lg:w-[50%]'>
                          <label htmlFor="availability" className='text-[#606060]'>Availability</label>
                          <input type="text" placeholder='Availability' className='px-3 py-3 outline-none border-[#d7d7d7] border-s border-1 rounded-md text-[1.2rem]' required  onChange={handleChange} id='availability' name='availability' value={availability}/>
                        </div>
                      </div>

                      

                      <div className='flex flex-col gap-1'>
                        <label htmlFor="bhk" className='text-[#606060]'>BHK</label>
                        <input type="number" placeholder='BHK' className='px-3 py-3 outline-none border-[#d7d7d7] border-s border-1 rounded-md text-[1.2rem]' required  onChange={handleChange} id='bhk' name='bhk' value={bhk}/>
                      </div>

                      <div className='flex flex-col gap-1'>
                      <label htmlFor="bhk" className='text-[#606060]'>Are you ok with brokers contacting you?</label>
                        <select name="brokerContact" id="" className='px-3 py-3 outline-none border-[#d7d7d7] border-s border-1 rounded-md text-[1.2rem]' onChange={handleChange}  value={brokerContact}>
                        <option value="">Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>                         
                        </select>
                      </div>


                      <div className=' flex-wrap'>
                        <div>
                            <label htmlFor='file'  className='flex flex-col px-[.5rem] justify-center items-center border-[1px] border-dotted border-black rounded-md w-[100%] h-[10rem] cursor-pointer text-[1.2rem] bg-white font-[600]'>
                            <FontAwesomeIcon icon={faCloudUploadAlt} style={{height:"47%"}}/> <br />
                              <span className='text-[1.3rem] pt-[0.5rem] text-black font-[500] text-center'>Drag and drop your photos here</span>
                              </label>
                              {/* To Upload files we use input with type file.  */}
                              <input 
                              type="file" 
                              id='file'
                              className='hidden' 
                              multiple//give multiple attribute to select multiple images.
                              onChange={(e)=>{
                                // console.log("Files",e.target.files);
                              //   Array.isArray() is a method used in JavaScript to determine whether a value is an array. It returns true if the value is an array, otherwise false.
                              // console.log(Array.isArray(e.target.files))//we get false hence e.target.files is not an array
                              const selectedFile=e.target.files;
                              //convert into array .
                              const selectedArray=Array.from(selectedFile);//The Array.from() method returns an array from any object with a length property.
                              setSelectedFiles(selectedArray)
                              
                              // 1)Arrow function present inside setSelectedImages takes the previous state of the selectedImages array.
                              // 2)Concatenates the imagesArray (which contains URLs of newly selected images) with the previous state.
                              // 3)Updates the state of selectedImages to include the newly added images.
                              //The concat() method of Array instances is used to merge two or more arrays. This method does not change the existing arrays, but instead returns a new array.
                              // let tempArray=
                              }} />
                        </div>
                        <div className='w-[150px] h-[20px] bg-[lightgrey] relative text-white mt-4'>
                          {progress?<div className="absolute top-0 bottom-0 left-0 w-[0%] flex justify-center items-center p-[inherit]" style={{ width: `${progress}%`, background: `linear-gradient(45deg, rgb(170, 5, 126), rgb(7, 27, 116))` }}
                          >{progress+"%"}</div>:<>0%</>}
                        </div>
                        <div className='flex gap-4 mt-4 flex-wrap'>
                          {selectedSellImages?.map((imgLink,index)=> <div 
                          key={index} className='relative shadow-md'>
                              <img src={imgLink} className="h-[150px] w-[35vw] lg:w-[10vw]" alt=''/> 
                          <button onClick={(e)=>{
                              setSelectedSellImages(selectedSellImages.filter((item)=>{
                                  return item!==imgLink
                              }))
                          }} className='absolute top-2 right-2'><DeleteIcon sx={{color:"white",background:"black"}}/></button>
                          </div>) }
                       </div>

                      </div>

                      
                      {/* button is disable if image upload process is in progress. */}
                      <button className='change-btn py-3 px-3 outline-none rounded-md border-none text-white text-[1.1rem]' onClick={handleButtonClick}>{id?"Update":"Submit"}</button>
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
