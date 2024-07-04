import { Timestamp,  doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Loader } from 'semantic-ui-react';
import { db } from '../../utils/firebase';
import myContext from '../../context/myContext';
import Multiselect from 'multiselect-react-dropdown';

const initialState={
  address: "",
  price: "",
  city: "",
  furnishing: "",
  area:"",
  bhk : "",
  parking :"",
  propertyType:"",
  mobile:"",
  description:"",
  featuresArray:[]
}
const UpdateProductPage = () => {
  const [data,setData]=useState(initialState);
  const {id}=useParams();
  // const [progress,setProgress]=useState(null);//Check our file is upload or not on firebase.
  const [isSubmit,setIsSubmit]=useState(false)//check form is submit or not.
  const navigate = useNavigate();
  const {cityList}=useContext(myContext);
  const {city,furnishing,parking,area,bhk,price, address,houseApprovedId,rentImgArray,mobile,description, propertyType,featuresArray,name,identity}=data;
  //For Multiselect
 const handleFeaturesChange = (selectArray) => {
  setData({...data,featuresArray:selectArray});
};
const [featuresoptions]=useState([
{id:0,Features: "Outdoor Space"},
{id:1,Features: "Dog Parks"},
{id:2,Features: "Air Conditioning"},
{id:3,Features: "Washer and dryer"},
{id:4,Features: "Security"},
{id:5,Features: "Amenities"}
])

  const handleButtonClick= async ()=>{
    await updateDoc(doc(db,"Rent",id),{
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

    // --update on realtimedatabase --
    const rentCity=cityList.find((cityItem)=>cityItem?.city===city);
    if(houseApprovedId){
      const ref=fetch(`https://realestate-adea6-default-rtdb.firebaseio.com/cityId%3D${rentCity?.id}/rent/${houseApprovedId}.json`,
    {
      method:"PATCH",
      headers:{
        "Content-type":"application/json"
      },
      body:JSON.stringify({
        address:address,
        area:area,
        bhk:bhk,
        city:city,
        furnishing:furnishing,
        parking:parking,
        price:price,
        rentImgArray,
        mobile:mobile,
        description:description,
        propertyType:propertyType,
        featuresArray:featuresArray,
        name:name,
        identity:identity,
        id
      })
    })
    }

    alert("Data Updated successfully")
    navigate("/admin-dashboard")
  }
  const handleChange=(e)=>{
    
    setData({...data,[e.target.name]:e.target.value})
  }



  useEffect(()=>{
    id && getSingleUSer();
  },[id])
  const getSingleUSer=async ()=>{
    const docRef=  doc(db,"Rent",id);
    const snapShot=await getDoc(docRef);
    if(snapShot.exists()){
      setData({...snapShot.data()})
    }
  }
  return (
    <div className="max-w-[1180px] mx-auto px-[20px] overflow-hidden">
                <div className='mt-[2vh]'>
                  {(isSubmit)?(<Loader/>):(
                    <>
                    {<h2>Update Details</h2>}
                    <form action="" className='flex flex-col gap-4 ' onSubmit={(e)=>{
                      e.preventDefault();
                    }}>
                       <div className='flex flex-col gap-1'>
                        <label htmlFor="propertyType" className='text-[#606060]'>Property Type</label>
                        <select name="propertyType" id="propertyType" className='px-3 py-3 outline-none border-[#d7d7d7] border-s border-1 rounded-md text-[1.2rem] text-gray-400' onChange={handleChange}  value={propertyType}>
                               <option value="select">Property Type</option>
                               <option value="Apartment/Flat">Apartment/Flat</option>
                               <option value="Independent House/Villa">Independent House/Villa</option>
                               <option value="Bungalow">Bungalow</option>                          
                               <option value="Studio Apartment">Studio Apartment</option>                          
                           </select>
                      </div>

                      <div className='flex gap-10 flex-col lg:flex-row'>
                        <div className='flex flex-col w-[100%] lg:w-[50%] gap-1'>
                          <label htmlFor="name" className='text-[#606060]'>Name</label>
                          <input type="text" className='px-3 py-3 outline-none border-[#d7d7d7] border-s border-1 rounded-md text-[1.2rem]' placeholder='Enter Name'  onChange={handleChange} required id='name' name='name' value={name}/>
                        </div>

                        <div className='flex flex-col w-[100%] lg:w-[50%] gap-1'>
                            <label htmlFor="identity" className='text-[#606060]'>Are you ?</label>
                            <select name="identity" id="identity" className='px-3 py-3 outline-none border-[#d7d7d7] border-s border-1 rounded-md text-[1.2rem] text-gray-400' onChange={handleChange}  value={identity}>
                                  <option value="select">Select</option>
                                  <option value="owner">Owner</option>
                                  <option value="broker">Broker</option>                         
                              </select>
                          </div>

                      </div>

                      
                      <div className='flex gap-10 flex-col lg:flex-row'>
                        <div className='flex flex-col w-[100%] lg:w-[50%] gap-1'>
                          <label htmlFor="address" className='text-[#606060]'>Address</label>
                          <input type="text" className='px-3 py-3 outline-none border-[#d7d7d7] border-s border-1 rounded-md text-[1.2rem]' placeholder='Enter Address'  onChange={handleChange} required id='address' name='address' value={address}/>
                        </div>

                        <div className='flex flex-col w-[100%] lg:w-[50%] gap-1'>
                            <label htmlFor="mobile" className='text-[#606060]'>Mobile No.</label>
                            <input type="tel" className='px-3 py-3 outline-none border-[#d7d7d7] border-s border-1 rounded-md text-[1.2rem]' placeholder='Mobile No.'  onChange={handleChange} required id='mobile' name='mobile' value={mobile}/>
                        </div>

                      </div>

                      <div className='flex gap-10 flex-col lg:flex-row'>
                          <div className='flex flex-col w-[100%] lg:w-[50%] gap-1'>
                            <label htmlFor="price" className='text-[#606060]'>Price</label>
                            <input type="number" className='px-3 py-3 outline-none border-[#d7d7d7] border-s border-1 rounded-md text-[1.2rem]' placeholder='Enter Price'  onChange={handleChange} required id='price' name='price' value={price}/>
                          </div>
                          <div className='flex flex-col w-[100%] lg:w-[50%] gap-1'>
                            <label htmlFor="parking" className='text-[#606060]'>Parking</label>
                            {/* <input type="text" className='px-3 py-3 outline-none border-[#d7d7d7] border-s border-1 rounded-md text-[1.2rem]' placeholder='Parking'  onChange={handleChange} required id='parking' name='parking' value={parking}/> */}
                            <select name="parking" id="parking" className='px-3 py-3 outline-none border-[#d7d7d7] border-s border-1 rounded-md text-[1.2rem] text-gray-400' onChange={handleChange}  value={parking}>
                                  <option value="select">Parking</option>
                                  <option value="Yes">Yes</option>
                                  <option value="No">No</option>                         
                              </select>
                          </div>
                      </div>

                      <div className='flex gap-10 flex-col lg:flex-row'>
                      
                          <div className='flex flex-col w-[100%] lg:w-[50%] gap-1'>
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
                         
                         <div className='flex flex-col w-[100%] lg:w-[50%] gap-1'>
                         <label htmlFor="" className='text-[#606060]'>Furnishing</label>
                           <select name="furnishing" id="" className='px-3 py-3 outline-none border-[#d7d7d7] border-s border-1 rounded-md text-[1.2rem]' onChange={handleChange}  value={furnishing}>
                               <option value="">Select Furnishing</option>
                               <option value="Fully Furnished">Fully Furnished</option>
                               <option value="Semi Furnished">Semi Furnished</option>
                               <option value="Un Furnished">Un Furnished</option>                          
                           </select>
                         </div>
                      </div>

                      
                      
                      {/* <div className='flex flex-col'>
                        <label htmlFor="availability" className='text-[#606060]'>Availability</label>
                        <input type="text" placeholder='Availability' className='p-2 outline-none border-b-[#d7d7d7] border-b-s border-b-2' required  onChange={handleChange} id='availability' name='availability' value={availability}/>
                      </div> */}

                      

                       <div className='flex gap-10 flex-col lg:flex-row'>

                        <div className='flex flex-col w-[100%] lg:w-[50%] gap-1'>
                            <label htmlFor="bhk" className='text-[#606060]'>BHK</label>
                            {/* <input type="number" placeholder='BHK' className='px-3 py-3 outline-none border-[#d7d7d7] border-s border-1 rounded-md text-[1.2rem]'  required  onChange={handleChange} id='bhk' name='bhk' value={bhk}/> */}
                            <select name="bhk" id="bhk" className='px-3 py-3 outline-none border-[#d7d7d7] border-s border-1 rounded-md text-[1.2rem] text-gray-400' onChange={handleChange}  value={bhk}>
                                      <option value="select">BHK</option>
                                      <option value="1">1</option>
                                      <option value="2">2</option>                         
                                      <option value="3">3</option>                         
                                      <option value="4">4</option>                         
                          </select>
                        </div>

                        <div className='flex flex-col w-[100%] lg:w-[50%] gap-1'>
                        <label htmlFor="area" className='text-[#606060]'>Area</label>
                        <input type="text" placeholder='Enter Area in sq. ft.'  className='px-3 py-3 outline-none border-[#d7d7d7] border-s border-1 rounded-md text-[1.2rem]' required  onChange={handleChange} id='area' name='area' value={area}/>
                        </div>
                      </div>

                      <div className='flex flex-col gap-1'>
                        <span className='text-[#606060]'>Features</span>
                        <Multiselect
                              options={featuresoptions}
                              selectedValues={featuresArray}
                              displayValue='Features'
                              onSelect={handleFeaturesChange}//to get selected values inside dropdown.
                              onRemove={handleFeaturesChange}
                              placeholder='Features'
                          />
                      </div>

                      <div className='flex flex-col gap-1'>
                        <label htmlFor="description" className='text-[#606060]'>About Property</label>
                    
                           <textarea  name="description" id="description" className='px-3 py-3 outline-none border-[#d7d7d7] border-s border-1 rounded-md text-[1.2rem] text-gray-400' onChange={handleChange}  value={description}></textarea>
                      </div>     
                      {/* button is disable if image upload process is in progress. */}
                      <Button primary onClick={handleButtonClick} type='submit' >{"Update"}</Button>
                    </form>
                    </>
                  )}
                </div>
    </div>
  )
}

export default UpdateProductPage
