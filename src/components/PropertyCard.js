import React from 'react'
import Modal from './Modal';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faBed, faMapMarkerAlt, faRestroom } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const PropertyCard = ( props ) => {
    //for slider

    // <div key={index} onClick={() => navigate(`/propertyData/${item.houseApprovedId}`, { state: { cityId: item.selectedcityId } })}>

    // </div>
    const settings = {
        dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 2000,
    cssEase: "linear"
       
      };
      const propertyType=useSelector((store)=>store.features.ispropertyRent);
    const {price,bhk,address,area,furnishing,rentImgArray,sellImgArray
    }=props.item;
    // const {length} = props;
     const {name,useraddress, pincode, phoneNumber, setName, setUseraddress, setPincode, setPhoneNumber, buyNow }=props
    const navigate =useNavigate();
  return (
    // <div className='flex gap-[2rem] sm:w-[75vw] shadow-md shadow-slate-400 my-8 py-[2rem]  flex-col sm:flex-row w-[100%] px-[2.5rem]'>
      
    //     <div  className='w-full sm:w-[40%] lg:mx-[2vw]'>
    //         <Slider {...settings}>
    //             {rentImgArray? rentImgArray?.map((imgItem,index)=>
    //             <div key={index}>
    //                 <img src={imgItem} alt="" className='h-[40vh] w-[24vw]'/>
    //             </div>): sellImgArray?.map((imgItem,index)=>
    //             <div key={index}>
    //                 <img src={imgItem} alt="" className='h-[40vh] w-[24vw]' />
    //             </div>)}
    //         </Slider>
    //     </div>
    //   {/* </div> */}
       
    //     <div className='flex flex-col gap-4 sm:w-[60%] w-full'>
    //         <h4 className='text-[1.25rem]'>{bhk} BHK Flat For Rent in {address}</h4>
    //         <div className='flex flex-col gap-4 bg-gray-200 py-3 rounded-md h-[30vh]'>
    //             <div className='flex px-4  justify-between lg:justify-around'>
    //                 <div className='flex flex-col'>
    //                     <span className='text-gray-500 text-[1.1rem]'>FURNISHING</span>
    //                     <span>{furnishing}</span>
    //                 </div>
    //                 <div className='flex flex-col gap-2'>
    //                     <span className='text-gray-500 text-[1.1rem]'>AVAILABILITY</span>
    //                     <span>{availability}</span>
    //                 </div>
    //             </div>
    //             <div className='flex  px-4 justify-between lg:justify-around'>
    //                 <div className='flex flex-col gap-2 pr-[1.2vw]'>
    //                     <span className='text-gray-500 text-[1.1rem]'>Area</span>
    //                     <span>{area}</span>
    //                 </div>
    //                 <div className='flex flex-col gap-2 pr-[1.2vw]'>
    //                     <span className='text-gray-500 text-[1.1rem]'>PARKING</span>
    //                     <span>{parking}</span>
    //                 </div>
    //             </div>
    //             <div className='flex px-4 justify-between lg:justify-around'>
    //                 <span className='font-[600] text-[1.6rem]'>₹{price}</span>

    //                 <Modal
    //                 name={name} 
    //                 address={useraddress} 
    //                 pincode={pincode} 
    //                 phoneNumber={phoneNumber} 
    //                 setName={setName} 
    //                 setAddress={setUseraddress} 
    //                 setPincode={setPincode} 
    //                 setPhoneNumber={setPhoneNumber} 
    //                 buyNow={buyNow} 
    //                 />
    //            </div>
    //         </div>
    //     </div>
      
    // </div>


<>
    <div className='col-sm-6'>
        <div className="flex flex-col mb-[5vh] relative pb-[25vh] w-[100%] lg:w-[26vw]">
                    <div>

            <Slider {...settings}>
                    {rentImgArray? rentImgArray?.map((imgItem,index)=>
                    <div key={index}>
                        <img src={imgItem} alt="" className="w-[100%] h-[35vh] rounded-md hover:scale-110 transition-transform duration-300"/>
                    </div>): sellImgArray?.map((imgItem,index)=>
                    <div key={index}>
                        <img src={imgItem} alt="" className="w-[100%] h-[35vh] rounded-md hover:scale-110 transition-transform duration-300" />
                    </div>)}
                </Slider>
                    </div>

                    <div className="flex flex-col gap-[15px] p-[20px] bg-white absolute w-[90%] right-0 top-[25vh] h-[38vh] shadow-lg">
                        <h3 onClick={() => navigate(`/propertyData/${props.item.houseApprovedId}`, { state: { cityId: props.item.selectedcityId } })} className="house-area-title mt-[20px] text-[1.5rem] font-bold hover:text-orange-500 cursor-pointer">{bhk} BHK Property For {propertyType?"Rent":"Buy"} in {address}</h3>
                        <div className="flex gap-8 ">
                            <div className="flex justify-center gap-2">
                                {/* <strong className="text-[1.2rem]">Bedrooms</strong> */}
                                <FontAwesomeIcon icon={faBed} className='text-orange-500 ' />
                                <span className='text-[0.75rem] text-[#777] inline-block'>{bhk} BHK</span>
                            </div>
                            <div className="flex justify-center gap-2">
                                {/* <strong className="text-[1.2rem]">Bathrooms</strong> */}
                                <FontAwesomeIcon icon={faRestroom}  className='text-orange-500 ' />
                                <span className='text-[0.75rem] text-[#777] inline-block'>{furnishing}</span>
                            </div>
                        </div>
                        <div className="flex flex-col">
                                {/* <strong className="text-[1.2rem] font-bold ">Price</strong> */}
                                <span ><b className='text-[1.5rem]'>₹{price}</b><span className='text-[1rem] text-[#777]'>/per month</span></span>
                        </div>
                        {/* <div className="flex flex-col">
                                <span ><b>Property By: </b>{identity}</span>
                        </div> */}

                            <div className="flex justify-start gap-2 items-center">
                                {/* <strong className="text-[1.2rem]">Rating</strong> */}
                                <FontAwesomeIcon icon={faMapMarkerAlt}  className='text-orange-500 '/>
                                <span className='text-[1.2rem] text-[#777]'>{address}</span>
                            </div>

                            <div className='flex items-center gap-2'>
                            <span onClick={() => navigate(`/propertyData/${props.item.houseApprovedId}`, { state: { cityId: props.item.selectedcityId } })} className='text-[1.1rem] text-orange-500 cursor-pointer'>BOOK NOW</span>
                            <FontAwesomeIcon icon={faArrowRight} size="lg" color="orange" className="custom-class" />
                            </div>
                    
                            
                    </div>
        </div>
    </div>
    

    

   
</>  

    
              
  )
}

export default PropertyCard
