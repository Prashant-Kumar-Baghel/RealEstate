import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

import houseThumb from '../images/house.png';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import amenitiesIcon1 from '../images/amenities1.svg';
import amenitiesIcon2 from '../images/amenities2.svg';
import amenitiesIcon3 from '../images/amenities3.svg';
import amenitiesIcon4 from '../images/amenities4.svg';
import amenitiesIcon5 from '../images/amenities5.svg';
import amenitiesIcon6 from '../images/amenities6.svg';
import { FaCheck } from 'react-icons/fa';
import AlertDialogSlide from './Dialog';
import AnchorTemporaryDrawer from './Dialog';
// import CommonSidebar from '../common/CommonSidebar';

//https://realestate-adea6-default-rtdb.firebaseio.com/cityId%3D16001/rent/-NyJv_Th7sE6yaMtAZI6
const PropertyDetailsSection = () => {
    const location=useLocation();
    const {cityId}=location.state;
    const [propertyData,setPropertyData]=useState(null);
    const {id}=useParams();
    const [browserWidth,setBrowserWidth]=useState(window.innerWidth);
    const propertyType=useSelector((store)=>store.features.ispropertyRent);
    const fetchData=async()=>{
        const fetchURL= propertyType?`https://realestate-adea6-default-rtdb.firebaseio.com/cityId%3D${cityId}/rent/${id}.json`:`https://realestate-adea6-default-rtdb.firebaseio.com/cityId%3D${cityId}/sell/${id}.json`;
        const response= await fetch(fetchURL);
        const data = await response.json();
        console.log("Data",data);
        setPropertyData(data)
    }

    useEffect(()=>{
        fetchData();
    },[])

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

      useEffect(()=>{
        const handleWidth=()=>{
            setBrowserWidth(window.innerWidth);
        }
        window.addEventListener("resize",handleWidth)

        return ()=>{
            window.addEventListener("resize",handleWidth)
        }
      },[])
    
    return (
        <>
        {/* ============================ Property Details Section Start =============== */}
        <section className="property-details py-[60px] lg:py-[80px]">
            <div className="container container-two">
                <div className="row gy-4">
                    <div className="col-lg-8">

                        <div className="property-details__thumb">
                        <Slider {...settings}>
                    {propertyData?.rentImgArray? propertyData?.rentImgArray?.map((imgItem,index)=>
                    <div key={index}>
                        <img src={imgItem} alt="" className="w-[100%] h-[38vh] lg:h-[72vh] rounded-md hover:scale-110 transition-transform duration-300"/>
                    </div>): propertyData?.sellImgArray?.map((imgItem,index)=>
                    <div key={index}>
                        <img src={imgItem} alt="" className="w-[100%] h-[38vh] lg:h-[72vh] rounded-md hover:scale-110 transition-transform duration-300" />
                    </div>)}
                </Slider>
                        </div>

                        <h3 className="property-details__title mt-lg-5 mb-4 font-bold text-[2.2rem] lg:text-[2.5rem] ">{propertyData?.bhk} BHK Property For {propertyType?"Rent":"Buy"} in {propertyData?.address}</h3>
                        <p className="property-details__desc mb-3">{propertyData?.description}</p>

                        <div className="property-details-wrapper">
                            <div className="property-details-item">
                                <h6 className="property-details-item__title font-bold text-[1.5rem]">Preview</h6>
                                <div className="property-details-item__content">
                                    <div className="row gy-4 gy-lg-5">
                                        {
                                           
                                                
                                                    <div className="flex flex-col gap-5">
                                                        <div className="flex flex-col gap-5 lg:flex-row lg:justify-between lg:gap-0">
                                                            <div className="amenities-content d-flex align-items-center">
                                                                <span className="amenities-content__icon">
                                                                    <img src={amenitiesIcon1} alt=""/>
                                                                </span>
                                                                <div className="amenities-content__inner">
                                                                    <span className="amenities-content__text">BHK</span>
                                                                    <h6 className="amenities-content__title mb-0  font-bold text-[1.2rem]">{propertyData?.bhk}</h6>
                                                                </div>
                                                            </div>
                                                            <div className="amenities-content d-flex align-items-center">
                                                                <span className="amenities-content__icon">
                                                                    <img src={amenitiesIcon2} alt=""/>
                                                                </span>
                                                                <div className="amenities-content__inner">
                                                                    <span className="amenities-content__text">Furnishing</span>
                                                                    <h6 className="amenities-content__title mb-0  font-bold text-[1.2rem]">{propertyData?.furnishing}</h6>
                                                                </div>
                                                            </div>
                                                            <div className="amenities-content d-flex align-items-center">
                                                                <span className="amenities-content__icon">
                                                                    <img src={amenitiesIcon3} alt=""/>
                                                                </span>
                                                                <div className="amenities-content__inner">
                                                                    <span className="amenities-content__text">Parking</span>
                                                                    <h6 className="amenities-content__title mb-0  font-bold text-[1.2rem]">{propertyData?.parking}</h6>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='flex flex-col lg:flex-row gap-5 lg:justify-between lg:gap-0'>
                                                            <div className="amenities-content d-flex align-items-center">
                                                                <span className="amenities-content__icon">
                                                                    <img src={amenitiesIcon4} alt=""/>
                                                                </span>
                                                                <div className="amenities-content__inner">
                                                                    <span className="amenities-content__text">PropertyType</span>
                                                                    <h6 className="amenities-content__title mb-0  font-bold text-[1.2rem]">{propertyData?.propertyType}</h6>
                                                                </div>
                                                            </div>
                                                            <div className="amenities-content d-flex align-items-center">
                                                                <span className="amenities-content__icon">
                                                                    <img src={amenitiesIcon5} alt=""/>
                                                                </span>
                                                                <div className="amenities-content__inner">
                                                                    <span className="amenities-content__text">Price</span>
                                                                    <h6 className="amenities-content__title mb-0  font-bold text-[1.2rem]">{propertyData?.price}</h6>
                                                                </div>
                                                            </div>
                                                            <div className="amenities-content d-flex align-items-center">
                                                                <span className="amenities-content__icon">
                                                                    <img src={amenitiesIcon6} alt=""/>
                                                                </span>
                                                                <div className="amenities-content__inner">
                                                                    <span className="amenities-content__text">Area</span>
                                                                    <h6 className="amenities-content__title mb-0  font-bold text-[1.2rem]">{propertyData?.area}</h6>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                
                                           
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="property-details-item">
                                <h6 className="property-details-item__title text-[1.6rem] font-bold text-black">Features</h6>
                                <div className="property-details-item__content">
                                    <div className="row gy-2">
                                        <div className="col-sm-6">
                                            <ul className="check-list">
                                                {
                                                    propertyData?.featuresArray.map((item) => {
                                                      
                                                            return (
                                                                <li className="check-list__item d-flex align-items-center" key={item?.id}>
                                                                    <span className="icon">
                                                                    <FaCheck className='bg-orange-500 rounded-full'
                                                                    style={{ padding: '3px', color: 'white' }}
                                                                    /></span>
                                                                    <span className="text">{item?.Features}</span>
                                                                </li>
                                                                
                                                            )
                                                        
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="property-details-item">
                                <h6 className="property-details-item__title text-[1.5rem] font-bold">Address</h6>
                                <div className="property-details-item__content">
                                    <div className="row gy-4 pl-[0.7vw] text-[1.2rem] mb-[2vh] ">
                                        {
                                            propertyData?.address
                                        }
                                    </div>
                                    {/* <div className="address-map">
                                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1150112.1628856962!2d44.64619029447154!3d23.086651461779507!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43348a67e24b%3A0xff45e502e1ceb7e2!2sBurj%20Khalifa!5e0!3m2!1sen!2sbd!4v1707037970965!5m2!1sen!2sbd" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className='w-[100%] h-[50vh]'></iframe>
                                    </div> */}
                                </div>
                            </div> 
                            {/* <div className="property-details-item">
                                <h6 className="property-details-item__title">House</h6>
                                <div className="property-details-item__content">
                                    <div className="house-content position-relative">
                                        <img src={houseThumb} alt="House Thumb"/>
                                        <Link to="https://www.youtube.com/watch?v=pPl3ZZdTP3g" className="popup-video-link video-popup__button style-two">
                                            <i className="fas fa-play text-gradient"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    {/* <div className="col-lg-4">
                        <CommonSidebar renderSearch={false} renderProperties={true} renderTags={false}/>
                    </div> */}
                </div>
            </div>
            
            {browserWidth <= 576 ? (
        <AnchorTemporaryDrawer propertyData={propertyData} type="bottom" />
      ) : (
        <AnchorTemporaryDrawer propertyData={propertyData} type="right" />
      )}
        </section>
        {/* ============================ Property Details Section End =============== */}
        </>
    );
};

export default PropertyDetailsSection;