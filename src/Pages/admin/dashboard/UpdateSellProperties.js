import { Timestamp,  doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Loader } from 'semantic-ui-react';
import { db } from '../../../utils/firebase';
import myContext from '../../../context/myContext';

const initialState={
  address: "",
  price: "",
  city: "",
  furnishing: "",
  area:"",
  bhk : "",
  parking :"",
  availability:"",
  brokerContact:""
}
const UpdateSellProperties = () => {
  const [data,setData]=useState(initialState);
  const {id}=useParams();
  // const [progress,setProgress]=useState(null);//Check our file is upload or not on firebase.
  const [isSubmit,setIsSubmit]=useState(false)//check form is submit or not.
  const navigate = useNavigate();
  const {cityList}=useContext(myContext);
  const {city,furnishing,parking,area,bhk,price, availability,address,brokerContact,houseSellApprovedId,sellImgArray}=data;
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
    // ----update realtime database 
    const rentCity=cityList.find((cityItem)=>cityItem?.city===city);
    if(houseSellApprovedId){
      const ref=fetch(`https://realestate-adea6-default-rtdb.firebaseio.com/cityId%3D${rentCity?.id}/sell/${houseSellApprovedId}.json`,
    {
      method:"PATCH",
      headers:{
        "Content-type":"application/json"
      },
      body:JSON.stringify({
        address:address,
        area:area,
        availability:availability,
        bhk:bhk,
        city:city,
        furnishing:furnishing,
        parking:parking,
        price:price,
        sellImgArray:sellImgArray,
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
    const docRef=  doc(db,"Sell",id);
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


                    

                      
                      {/* button is disable if image upload process is in progress. */}
                      <Button primary onClick={handleButtonClick} type='submit' >{"Update"}</Button>
                    </form>
                    </>
                  )}
                </div>
    </div>
  )
}

export default UpdateSellProperties;
