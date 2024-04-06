import { Timestamp,  doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Loader } from 'semantic-ui-react';
import { db } from '../../../utils/firebase';
import DeleteIcon from '@mui/icons-material/Delete';

const initialState={
  address: "",
  price: null,
  city: "",
  furnishing: "",
  area:"",
  bhk : null,
  parking :"",
  availability:"",
  brokerContact:""
}
const UpdateSellProperties = () => {
  const [data,setData]=useState(initialState);
  const {id}=useParams();
  const [selectedImages,setSelectedImages]=useState([]);//this array contain all multiple images links that we select.
  // const [progress,setProgress]=useState(null);//Check our file is upload or not on firebase.
  const [isSubmit,setIsSubmit]=useState(false)//check form is submit or not.
  const navigate = useNavigate();
  const [cityList,setCityList]=useState(null);
  const {city,furnishing,parking,area,bhk,price, availability,address,brokerContact}=data;
  const handleButtonClick= async ()=>{
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
    alert("Data Updated successfully")
    navigate("/admin-dashboard")
    // alert("Data Updated successfully")
  }
  const handleChange=(e)=>{
    if(e.target.name==="price" || e.target.name==="bhk"){
      // console.log(e.target.name,typeof(+e.target.value))
      setData({...data,[e.target.name]:+e.target.value})
      return;
    }
    setData({...data,[e.target.name]:e.target.value})
  }

  // const dispatch=useDispatch();
  useEffect(()=>{
    fetchData()
},[])
const fetchData=async()=>{
    const response=await fetch("https://realestate-adea6-default-rtdb.firebaseio.com/citiesList.json");
    const data=await response.json();
    console.log("OP",data);
    setCityList(data);
}


  useEffect(()=>{
    id && getSingleUSer();
  },[id])
  const getSingleUSer=async ()=>{
    const docRef=  doc(db,"Sell",id);
    const snapShot=await getDoc(docRef);
    if(snapShot.exists()){
      setData({...snapShot.data()})
    }
  }
  return (
    <div className="max-w-[1180px] mx-auto px-[20px] overflow-hidden">
        {/* <Grid columns={3} centered verticalalign="middle" > 
            <GridRow >
              <GridColumn> */}
                <div className='mt-[2vh]'>
                  {(isSubmit)?(<Loader/>):(
                    <>
                    {<h2>Update Details</h2>}
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
                      <Button primary onClick={handleButtonClick} type='submit' >{"Update"}</Button>
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

export default UpdateSellProperties;
