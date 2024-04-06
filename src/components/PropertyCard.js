import React from 'react'
import { Button } from 'semantic-ui-react';
import Modal from './Modal';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
const PropertyCard = ( props ) => {
    //for slider

    const settings = {
        dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 2000,
    cssEase: "linear"
        // responsive: [
        //   {
        //     breakpoint: 1024,
        //     settings: {
        //       slidesToShow: 3,
        //       slidesToScroll: 3,
        //       infinite: true,
        //       dots: true
        //     }
        //   },
        //   {
        //     breakpoint: 992,
        //     settings: {
        //       slidesToShow: 2,
        //       slidesToScroll: 2,
        //       initialSlide: 2
        //     }
        //   },
        //   {
        //     breakpoint: 680,
        //     settings: {
        //       slidesToShow: 1,
        //       slidesToScroll: 1
        //     }
        //   }
        // ]
      };
    const {price,bhk,address,availability,area,furnishing,rentImgArray,parking}=props.item;
    // const {length} = props;
    const {name,useraddress, pincode, phoneNumber, setName, setUseraddress, setPincode, setPhoneNumber, buyNow }=props
    console.log("name",name)
    
  return (
    <div className='flex gap-[2rem] sm:w-[75vw] shadow-md shadow-slate-400 my-8 py-[2rem]  flex-col sm:flex-row w-[100%] px-7'>
        {/* <h2>{length} results | Flats for Rent in {address}</h2> */}
      {/* <div> */}
        {/* <img src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className='h-[30vh] ' alt="" /> */}
        <div  className='w-[40%] mx-[2vw]'>
            <Slider {...settings}>
                {rentImgArray?.map((imgItem,index)=>
                <div key={index}>
                    <img src={imgItem} alt="" />
                </div>)}
            </Slider>
        </div>
      {/* </div> */}
       
        <div className='flex flex-col gap-4 w-[60%]'>
            <h4 className='text-[1.25rem]'>{bhk} BHK Flat For Rent in {address}</h4>
            <div className='flex flex-col gap-4 bg-gray-200 py-3 rounded-md h-[30vh]'>
                <div className='flex gap-[2rem] px-4  justify-around'>
                    <div className='flex flex-col'>
                        <span className='text-gray-500 text-[1.1rem]'>FURNISHING</span>
                        <span>{furnishing}</span>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <span className='text-gray-500 text-[1.1rem]'>AVAILABILITY</span>
                        <span>{availability}</span>
                    </div>
                </div>
                <div className='flex  px-4 justify-around'>
                    <div className='flex flex-col gap-2 pr-[1.2vw]'>
                        <span className='text-gray-500 text-[1.1rem]'>Area</span>
                        <span>{area}</span>
                    </div>
                    <div className='flex flex-col gap-2 pr-[1.2vw]'>
                        <span className='text-gray-500 text-[1.1rem]'>PARKING</span>
                        <span>{parking}</span>
                    </div>
                </div>
                <div className='flex px-4 justify-around'>
                    <span className='font-[600] text-[1.6rem]'>₹{price}</span>

                    <Modal
                    name={name} 
                    address={useraddress} 
                    pincode={pincode} 
                    phoneNumber={phoneNumber} 
                    setName={setName} 
                    setAddress={setUseraddress} 
                    setPincode={setPincode} 
                    setPhoneNumber={setPhoneNumber} 
                    buyNow={buyNow} 
                    />
               </div>
            </div>
        </div>
      
    </div>
  )
}

export default PropertyCard
