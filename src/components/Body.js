import React, {  useContext,  useEffect,  useState } from 'react'
import {aboutCheckLists, homeList } from '../utils/mockdata'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from 'react-router-dom';
import {priceContext} from '../utils/priceContext';
import myContext from '../context/myContext';
import { GOOGLE_URL } from '../utils/constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import heroImage from '../images/logo192.png'
import aboutImage from '../images/about-three-img.png'
import { FaCheck } from 'react-icons/fa';
import prestige from '../images/ppty-type-icon1.svg'
import prime from '../images/ppty-type-icon2.svg'
import smart from '../images/ppty-type-icon3.svg'
import reliable from '../images/ppty-type-icon4.svg'
import gold from '../images/ppty-type-icon5.svg'
import swift from '../images/ppty-type-icon6.svg'
import customerImage from '../images/customer-service.svg'
import reviewImage from '../images/user-img1.png'
import newsImage from '../images/newsletter-bg.png'
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import dottedImage from '../images/dotted-bg.png'
import bannerImage from '../images/banner-shape.png'
import curveImage from '../images/curve-shape.png'
import { faBed } from '@fortawesome/free-solid-svg-icons';
import { faRestroom } from '@fortawesome/free-solid-svg-icons';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import CountUp from 'react-countup';
import SectionHeading from './SectionHeading';
import Button from './Button';
import Testimonial from './Testimonial';
import CounterThree from './CounterThree';
import Faq from './Faq';
import BlogThree from './BlogThree';
import Multiselect from 'multiselect-react-dropdown';
import { Height } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { addBHK, addFurnishing, addPropertyType } from '../utils/featuresSlice';
import { useRef } from 'react';

// import "../index.css";
const Body = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 680,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };


  // const [searchText,setSearchText]=useState(null);
  const [filteredListOfCities,setfilteredListOfCities]=useState([]);
  const [searchText,setSearchText]=useState(null)
  const [cityId,setCityId]=useState(null);
  const [selectedBhkOptions,setSelectedBhkOptions]=useState(null)
  const [selectedOptions, setSelectedOptions] = useState(null);//it contain selected furnishing options.
  const [butttonText,setButtonText]=useState("rent");
  const [hasClass, setHasClass] = useState("rent");
  const [isListVisible, setIsListVisible] = useState(false);//To hide or show the list
  const navigate=useNavigate();
  //useContext
  const { setPriceValue }=  useContext(priceContext)
  const {cityList}=useContext(myContext);
  const handleChange=(e)=>{
    const searchWord=e.target.value;
    console.log("searchWord",searchWord);
    setSearchText(e.target.value);
    setIsListVisible(true);
    const filteredArray=cityList.filter((item)=>item.city.toLowerCase().includes(searchWord.toLowerCase())); 

    //when nothing in input then we do setfilteredListOfCities([]); because when we clear all text from the input box then we don't want to display the list.
    // if(!searchWord){
    //   setfilteredListOfCities([]);
    // }else{
      setfilteredListOfCities(filteredArray);
    // }

  }

  

    const [setBodycurrentPrice]=useState(6000);//for the price range
  
  const handlePriceChange = e => {
    setBodycurrentPrice(parseInt(e.target.value));
    setPriceValue(parseInt(e.target.value));
};

//BHK
const handleBhkChange=(e)=>{
  // console.log("selectedList",selectedList)
  setSelectedBhkOptions(e.target.value);
}

// const [bhkoptions]=useState([
//   {id:0,BHK: "1"},
//   {id:1,BHK: "2"},
//   {id:2,BHK: "3"}
// ])

// //furnishing
// const [options]=useState([
//   {id:0,Furnishing:'Fully Furnished'},
//   {id:1,Furnishing:'Semi Furnished'},
//   {id:2,Furnishing:'Un Furnished'}
// ])

const handleFurnishingChange = (e) => {
  setSelectedOptions(e.target.value);
};
const dispatch=useDispatch();



useEffect(() => {
  // Reset propertyType to true when the component mounts
  //To ensure that the propertyType value in the Redux store resets to true when you navigate back to the home page, we can use the useEffect hook.
  dispatch(addPropertyType(true));
}, []);


// --------------------- handeling hiding and showing list 
const listRef=useRef(null);
const inputRef=useRef(null);
const handleClickOutside = (event) => {
  // Check if the click is outside the input box and the list
  if (
    listRef.current &&
    !listRef.current.contains(event.target) &&
    inputRef.current &&
    !inputRef.current.contains(event.target)
  ) {
    setIsListVisible(false);
  }
};
useEffect(() => {
  // Add mousedown event listener to detect clicks outside
  document.addEventListener('mousedown', handleClickOutside);
  return () => {
    // Clean up the event listener on component unmount
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);
   
  return (
    <>
    {/* Search bar  */}


    

    {/* ----------------------------------------  */}
    <section className="banner-three relative z-10 pt-[20vh] bg-[#F7F7F7]">

    <img src={dottedImage} alt="" className="banner-three__dotted absolute left-0 top-0 z-[-10] "/>
    <img src={bannerImage} alt="" className="banner-three__shape absolute right-0 max-w-[14%] z-[-10] top-[50%]"/>
                <div className="container container-two">
                    <div className="banner-three__inner position-relative padding-y-120">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="banner-inner position-relative">
                                    <div className="banner-content mt-[0px] lg:mt-[7vh] ">
                                        <h3 className="banner-content__subtitle text-uppercase font-14 text-gradient text-[1rem] font-[600] text-orange-500">EstateXchange</h3>
                                        <h1 className="banner-content__title text-[2rem] lg:text-[70px] font-bold mb-[20px]">Your trusted real estate
                                            <span className="position-relative d-inline">
                                              partner
                                                <img src={curveImage} alt="" className="curve-shape"/> 
                                            </span> 
                                        </h1>
                                        <p className="banner-content__desc font-18 mb-4 mb-lg-5 text-[1.2rem]">Your trusted real estate partner, dedicated to helping you find your dream home.</p>
                                        <div className='flex gap-4 mt-[4rem]  lg:mt-[6rem]'>
                                          <button 
                                          className={`text-center border-[2px] border-solid border-gray-200 py-[10px] px-[4px] rounded-md text-black w-[20%] lg:w-[14%] ${hasClass==="rent"?"bg-[#F68F20] text-white":''}`}
                                          onClick={()=>{
                                            setButtonText("rent")
                                            setHasClass("rent")
                                            dispatch(addPropertyType(true))
                                          }}>Rent</button>
                                          <button 
                                          className={`text-center border-[2px] border-solid border-gray-200 py-[10px] px-[4px] rounded-md text-black w-[20%] lg:w-[14%] ${hasClass==="buy"?"bg-[#F68F20] text-white":''}`}
                                          onClick={()=>{
                                            setButtonText("buy")
                                            setHasClass("buy")
                                            dispatch(addPropertyType(false))
                                          }}>Buy</button>
                                          <button onClick={()=>
                                              navigate("/add")
                                          }
                                          className='rounded-[5px] w-[38%] lg:w-[24%] border-[2px] border-solid border-gray-200  uppercase py-[10px] px-[4px] hover:bg-orange-600 hover:text-white text-black'>POST PROPERTY
                                          </button>
                                        </div>
                                    </div>            
                                </div>
                            </div>
                            <div className="col-lg-6 order-lg-0 order-1">
                                <div className="banner-thumb mt-[2vh] lg:top-auto lg:bottom-[34px] lg:flex lg:items-center lg:mt-[0vh] ">
                                    <img src={heroImage} alt=""/>
                                </div>  
                            </div>

                            
                            
                            <div className='search-bar relative ml-[2vh] top-[3vh] lg:top-[-15vh] shadow-sm bg-white  lg:ml-[0px]'>
                              <div className="search p-[12px] lg:p-4 rounded-lg font-[500] text-[1.1rem]   flex gap-4 flex-col lg:flex-row">
                                {/* Search bar     */}
                                <input 
                                type="search" 
                                placeholder='Select Your Area' 
                                className='bg-transparent border-2 border-solid border-[#E0E0E0] h-200 mr-4 w-[100%] lg:w-[28%] px-[17px] py-[20px]  outline-none hover:border-orange-500'
                                value={searchText}
                                onChange={handleChange}
                                onClick={() => {
                                  setfilteredListOfCities(cityList)
                                  setIsListVisible(true)
                                }}
                                ref={inputRef}
                                />

                                {/* <Multiselect
                                  options={bhkoptions}
                                  selectedValues={selectedBhkOptions}
                                  displayValue='BHK'
                                  onSelect={handleBhkChange}//to get selected values inside dropdown.
                                  onRemove={handleBhkChange}
                                  placeholder='Select BHK...'
                                 
                               /> */}
                               <select name="" id="" onChange={handleFurnishingChange} className='bg-transparent border-2 border-solid border-[#E0E0E0] h-200 mr-4 w-[100%] lg:w-[28%] px-[17px] py-[20px]  outline-none text-gray-400'>
                                <option value="select" >Furnishing</option>
                                <option value="Fully Furnished">Fully Furnished</option>
                                <option value="Semi Furnished">Semi Furnished</option>
                                <option value="Un Furnished">Un Furnished</option>
                              </select>

                              <select name="" id="" onChange={handleBhkChange} className='bg-transparent border-2 border-solid border-[#E0E0E0] h-200 mr-4 w-[100%] lg:w-[28%] px-[17px] py-[20px]  outline-none text-gray-400'>
                              <option value="select">BHK</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              </select>
                               {/* <Multiselect
                                  options={options}
                                  selectedValues={selectedOptions}
                                  displayValue='Furnishing'          
                                  onSelect={handleFurnishingChange}
                                  onRemove={handleFurnishingChange}
                                  placeholder='Select furnishing...'
                                 /> */}
                                {/* BHK .  */}
                                {/* <div className='w-[40%]'> */}
                                  {/* <Multiselect
                                    options={bhkoptions}
                                    selectedValues={selectedBhkOptions}
                                    displayValue='BHK'
                                    onSelect={handleBhkChange}
                                    onRemove={handleBhkChange}
                                    // showCheckbox={true}
                                    placeholder='Select BHK...'
                                    style={{
                                      // multiselectContainer: { 
                                      //   position: 'relative', // Ensure the container is positioned relatively
                                      // },
                                      searchBox: {
                                        padding: '10px', // Adjust padding as needed
                                      },
                                    }}
                                  />
                                  <style jsx>{`
                                  .multiselect-container .optionListContainer {
                                    position: absolute;
                                    top: calc(100% + 5px); 
                                    z-index: 9999; // Ensure the dropdown appears above other elements
                                    background-color: #fff; // Adjust background color as needed
                                    width: 100%; // Ensure the dropdown spans the full width
                                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); // Add shadow for visual separation
                                  }
                                `}
                                  </style> */}
                                  {/* <button className='outline-none px-[20px] py-[8px] w-[100%]' onClick={(e)=>{
                                        e.preventDefault();
                                        setDropRangeDown(!dropRangeDown)
                                      }}>Budget</button>
                                      
                                      {dropRangeDown && <div className='mt-2 absolute top-[42%]'>
                                          <p className='mb-0 text-[1.2rem]'>₹{bodycurrentPrice}</p>
                                          <form action="">
                                            <label htmlFor="range"></label>
                                            <input type="range" id='range' value={bodycurrentPrice} min={0} max={6000} onChange={handlePriceChange} step="100" className='w-[15vw]' />
                                          </form>
                                      </div>} */}
                                      
                                {/* </div> */}
                                <button className='bg-[#F06021] text-center border-none py-[15px] lg:py-[5px] px-[20px] rounded-md text-white w-[100%] lg:w-[15%]' onClick={()=>{
                                  navigate("/city/"+cityId);
                                  dispatch(addBHK(selectedBhkOptions));
                                  dispatch(addFurnishing(selectedOptions))
                                }} >{butttonText==="rent"? <span>Rent</span>:<span>Buy</span>}</button>
                              </div>
                              
                            </div>
                            {/* margin-top:-15vh !important; */}
                             <div className='searchList mt-[-50vh] lg:mt-[-15vh]' >
                                  {/* We do filteredListOfCities.length!==0 because We only show list when we have text present inside input box that mean when filteredListOfCities is not empty and overflow-hidden property hidden the list whereas overflow-y-auto create scrollbar*/}
                                 {isListVisible && <div className='sm:w-[30%]'>
                                   {filteredListOfCities.length>0 ? (<ul className='itemList w-[300px] sm:w-[80%] h-[100%] max-h-[200px] text-start bg-white shadow-md shadow-slate-500 mt-[5px] overflow-hidden overflow-y-auto mb-4 ml-[-4vw] sm:ml-[0] z-20 relative top-[16vh] lg:top-[0vh]' ref={listRef}>
                                      {/* the slice() method in JavaScript returns a shallow copy of a portion of an array into a new array object selected from begin to end (end not included) where begin and end represent the index of items in that array. */}
                                      {/* we don't want all the cities in one time and only want best four searches to related to text present in input box. for that we can use filteredListOfCities.slice(0,4)*/}
                                      {filteredListOfCities.map((item)=><li 
                                      key={item.id} 
                                      className='p-[4px] text-[1.2rem] h-[6vh] hover:bg-orange-400 w-[100%] px-5 cursor-pointer'
                                      onClick={()=>{
                                        //we do setSearchText(item.city) because when we click on text then want to put that text in search box and we do setfilteredListOfCities([]) because when we click on any city in list then just on click i want to hidden that list.
                                        setSearchText(item.city)
                                        setfilteredListOfCities([]);
                                        setCityId(item.id)
                                        setIsListVisible(false);
                                      }}
                                      >{item.city}</li>)}
                                      </ul>): ('' )}
                                  </div>
                
                                 }
                            </div>
                            
                        </div>
                    </div>
                </div>
            </section>






    {/* ----------------------------------------------  */}
   



    {/* ------------------------------  */}

    
    {/* About  */}

   {/* ------------------------------  */}
   <section className="about-three bg-white py-[50px] lg:py-[120px]">
                <div className="container container-two">
                    <div className="row gy-4">
                        <div className="col-lg-6">
                            <div className="about-three-thumb relative">
                                <div className="about-three-thumb__inner">
                                    <img src={aboutImage} alt="" className='max-w-[520px] rounded-[10px] w-[100%]'/>
                                    <div className="project-content absolute right-0 inline-block text-center z-1 lg:right-[10px]">
                                        <div className="project-content__inner">
                                            <h2 className="project-content__number">
                                                <CountUp end={parseInt(10)} duration={6} delay={0.2} />k                                            </h2>
                                            <span className="project-content__text font-12">Complete project</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="about-content">

                                <SectionHeading
                                    headingClass="style-left "  
                                    subtitle="About Us"
                                    subtitleClass="py-2 px-2" 
                                    title="Unlocking the door to your a the new home" 
                                    renderDesc={true}
                                    desc="Welcome to EstateXchange! We're here to help you find the perfect property. Our team is dedicated to guiding you through every step, making sure you can trust us. Whether you're buying, selling, or renting, we aim to go above and beyond for you. With our deep knowledge of the local market and strong commitment to making you happy, we're your go-to partner for all things real estate. 
                                    "
                                    renderButton={false}
                                    buttonClass="btn-main"
                                    buttonText="View More"
                                />

                                <ul className="check-list style-two">
                                    {
                                        aboutCheckLists.map((aboutCheckList, index) => {
                                            return (
                                                <li className="check-list__item d-flex align-items-center" key={index}>
                                                    <FaCheck
                                                    className='bg-orange-500 rounded-full'
                                                    style={{ padding: '3px', color: 'white' }}
                                                    />
                                                    <span className="text fw-semibold">{aboutCheckList.text}</span>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                                <div className="about-button">
                                <button className=' abt w-[100%] px-4 py-4 rounded-md border-[2px] border-solid border-[#F16821] lg:w-[30%] text-[1.1rem] hover:bg-[#F16821] hover:text-white font-[600]'>LEARN MORE  <FontAwesomeIcon icon={faArrowRight} size="lg" color="orange" className="custom-class" /></button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>  


   {/* -------------------------------------------  */}

  {/* Property Types  */}
   <section className='bg-[#F7F7F7] py-[50px] lg:py-[120px] '>
    <div className='container container-two '>
        <span className='px-[5px] py-[10px] rounded-[3px] mb-[10px] uppercase text-[0.875] tracking-[.11rem] bg-white'>
        <span className='text-gradient font-[600] inline-block'>PROPERTY TYPE</span>
        </span>
        <h2 className='section-heading__title mt-4'>Investing in real estate made it lot easy</h2>
        <div className='flex flex-col gap-10'>
             <div className='flex flex-col lg:flex-row gap-5'>
                <div className='flex  justify-start    hover:bg-white hover:shadow-sm hover:shadow-slate-400 round items-start box-type'>
                  <img src={prestige} alt="" />
                  <div className='flex flex-col'>
                      <h6 className='heading-type'>Investment Properties</h6>
                      <p className='my-[20px] text-[1.125rem] p-type'>Investment properties are real estate assets purchased with the intention of generating income or profit through rental income, capital appreciation, or both.</p>
                  </div>
                </div>

                <div className='flex  justify-start   hover:bg-white hover:shadow-sm hover:shadow-slate-400 round items-start box-type'>
                  <img src={prime} alt="" />
                  <div className='flex flex-col'>
                      <h6 className='heading-type'>Ready to Move</h6>
                      <p  className='my-[20px] text-[1.125rem] p-type'>Ready to move properties are residential or commercial units that are fully constructed, furnished, and immediately available for occupancy without the need for further construction or renovation.</p>
                  </div>
                </div>

                <div className='flex  justify-start   lg:hover:bg-white hover:shadow-sm hover:shadow-slate-400 round items-start box-type'>
                  <img src={smart} alt="" />
                  <div className='flex flex-col'>
                      <h6 className='heading-type'>Apartments</h6>
                      <p  className='my-[20px] text-[1.125rem] p-type'> Apartments are residential units within a larger building complex, typically offering individual living spaces with shared amenities and common areas.</p>
                  </div>
                </div>
             </div>

           <div className='flex gap-5 flex-col lg:flex-row'>
              <div className='flex  justify-start  hover:bg-white hover:shadow-sm hover:shadow-slate-400  items-start box-type'>
                  <img src={reliable} alt="" />
                  <div className='flex flex-col'>
                      <h6 className='heading-type'>Flats</h6>
                      <p  className='my-[20px] text-[1.125rem] p-type'>Flats are self-contained residential units within a larger building, typically found in urban areas, characterized by shared amenities and a common entrance.</p>
                  </div>
                </div>

                <div className='flex justify-start hover:bg-white hover:shadow-sm hover:shadow-slate-400 items-start box-type'>
                  <img src={swift} alt="" />
                  <div className='flex flex-col'>
                      <h6 className='heading-type'>Luxury Properties</h6>
                      <p  className='my-[20px] text-[1.125rem] p-type'>Luxury properties are exclusive high-end real estate offerings characterized by premium features, upscale finishes, and exceptional amenities, epitomizing elegance, comfort, and prestige.</p>
                  </div>
                </div>

                <div className='flex  justify-start  hover:bg-white hover:shadow-md hover:shadow-slate-400  items-start box-type'>
                  <img src={gold} alt="" />
                  <div className='flex flex-col'>
                      <h6 className='heading-type'>Houses</h6>
                      <p  className='my-[20px] text-[1.125rem] p-type'>Houses are residential dwellings typically designed for single-family occupancy, offering private living spaces and often featuring outdoor areas such as yards or gardens.</p>
                  </div>
                </div>
           </div>
        </div>
      </div>
   </section>
    

    {/* LATEST PROPERTIES */}
   <section className='bg-[#F7F7F7] pt-[60px] pb-[60px]'>
    <div className='container container-two  '>
        <div className='flex justify-center'>
          <span className='px-[5px] py-[10px] rounded-[3px] mb-[10px] uppercase text-[0.875] tracking-[.11rem] bg-white'>
          <span className='text-gradient font-[600] inline-block '>LATEST PROPERTIES</span>
          </span>
        </div>
        <div className='flex justify-center'>
        <h2 className='section-heading__title w-[100%] my-4 lg:w-[42vw] text-center'>Real estate Investing in made it lot easy</h2>
        </div>
        
        <div className='flex gap-5 flex-wrap'>
          {
          homeList.map((item)=>{
            return(
              
                <div className="flex flex-col mb-[5vh] relative pb-[25vh]">
                <div>
                    <img className="w-[100%] h-[35vh] rounded-md hover:scale-110 transition-transform duration-300"src={item?.ImageLink} alt="Loding...." />
                </div>
                <div className="flex flex-col gap-[20px] p-[20px] bg-white absolute w-[90%] right-0 top-[25vh] h-[40vh] shadow-lg">
                    <h3 className="house-area-title mt-[20px] text-[1.5rem] font-bold hover:text-orange-500">{item?.Area}</h3>
                    <div className="flex gap-8 ">
                        <div className="flex justify-center gap-2">
                            {/* <strong className="text-[1.2rem]">Bedrooms</strong> */}
                            <FontAwesomeIcon icon={faBed} className='text-orange-500 ' />
                            <span className='text-[0.75rem] text-[#777] inline-block'>{item?.Bedrooms} Beds</span>
                        </div>
                        <div className="flex justify-center gap-2">
                            {/* <strong className="text-[1.2rem]">Bathrooms</strong> */}
                            <FontAwesomeIcon icon={faRestroom}  className='text-orange-500 ' />
                            <span className='text-[0.75rem] text-[#777] inline-block'>{item?.Bathrooms} Baths</span>
                        </div>
                    </div>
                    <div className="flex flex-col">
                            {/* <strong className="text-[1.2rem] font-bold ">Price</strong> */}
                            <span ><b className='text-[1.5rem]'>${item?.Price}</b><span className='text-[1rem] text-[#777]'>/per day</span></span>
                    </div>

                        <div className="flex justify-start gap-2 items-center">
                            {/* <strong className="text-[1.2rem]">Rating</strong> */}
                            <FontAwesomeIcon icon={faMapMarkerAlt}  className='text-orange-500 '/>
                            <span className='text-[1.2rem] text-[#777]'>{item?.areaName}</span>
                        </div>

                        <div className='flex items-center gap-2'>
                          <span className='text-[1.1rem] text-orange-500'>BOOK NOW</span>
                        <FontAwesomeIcon icon={faArrowRight} size="lg" color="orange" className="custom-class" />
                        </div>
                  
                        
                </div>
                </div>
              
          )
          })
          }
        </div>
        
      </div>
   </section>

    

     {/* Contact Details  */}
     <section className='message-three bg-[#FFFFFF] py-[50px] lg:py-[120px] pb-[60px]'>
    <div className='container container-two  '>
        <div className='flex flex-col lg:flex-row lg:justify-between lg:gap-[3%] lg:items-center'>
              <div className='w-[100%] lg:w-[30%]'>
              <span className='px-[5px] py-[10px] rounded-[3px] mb-[10px] uppercase text-[0.875] tracking-[.11rem] bg-white'>
                   <h2 className='text-gradient font-[600] inline-block lg:text-[1.2rem] '>GET A QUOTE</h2>
              </span>
              <h2 className='section-heading__title my-4 lg:w-[28rem]'>They chose perfect the property</h2>
              <p  className='my-[20px] text-[1.125rem] p-type'>Have questions about buying, selling, or renting property? Interested in learning more about our services or available listings?</p>
              <div className='contact-box flex gap-4 border-[1px] border-solid border-[#E0E0E0] mt-10'>
                        <div className='flex flex-col gap-2'>
                          <div className='flex items-center gap-3'>
                           <img src={customerImage} alt="" />
                            <div className='flex flex-col gap-1'> 
                              <span className='text-gray-400 text-[1.2rem]'>Need help?</span>
                              <span className='font-bold text-[1.3rem]'>+91 7865432190</span>
                            </div>
                          </div>
                          <p  className='my-[20px] text-[1.125rem] p-type'>Real estate is a lucrative ind involves the selling and a reproperties. It encompasses residential</p>
                        </div>
                        
              </div>
              </div>

              <div className="form h-[125vh] mt-[2vh] sm:w-[75%] w-[100%] lg:h-[95vh] lg:mt-[0vh] ">
            <form action="" className='flex flex-col gap-[30px]'>
               <div className='flex flex-col lg:flex-row justify-between gap-[2vw] '>
                      <div className='flex w-[100%] flex-col gap-2 lg:w-[50%]'>
                      <label htmlFor="nameId"  >Name</label>
                          <div className='flex justify-between border-[#E0E0E0] border-[1px] border-solid items-center px-[17px] py-[20px] '>
                            <input className="w-[100%] bg-transparent  font-[500] text-[1.1rem] outline-none border-none" type="text" id='nameId' required placeholder='Name'/>
                            <span><FontAwesomeIcon icon={faUser} /></span>
                          </div>
                      </div>
                      
                      <div className='flex w-[100%] flex-col gap-2 lg:w-[50%]'>
                      <label htmlFor="emailId" >Email</label>
                          <div className='flex justify-between border-[#E0E0E0] border-[1px] border-solid items-center px-[17px] py-[20px] '>
                          <input className=" w-[100%] bg-transparent font-[500] text-[1.1rem] outline-none " type="email" id='emailId' required placeholder='Email'/>
                          <span><FontAwesomeIcon icon={faEnvelope} /></span>
                          </div>
                      </div>
                      
               </div>
               <div className='flex flex-col lg:flex-row justify-between gap-[2vw]'>
                        <div  className='flex w-[100%] flex-col gap-2 lg:w-[50%]'>
                        <label htmlFor="contactId" >Contact Number</label>
                           <div className='flex justify-between border-[#E0E0E0] border-[1px] border-solid items-center px-[17px] py-[20px] '> 
                           <input className="w-[100%] bg-transparent  font-[500] text-[1.1rem] outline-none " type="tel" id='contactId' required placeholder='Contact'/>
                            <span> <FontAwesomeIcon icon={faPhone} /></span>
                           </div>
                        </div>
                        

                        <div  className='flex w-[100%] flex-col gap-2 lg:w-[50%]'>
                        <label htmlFor="addressId"> Address </label>
                          <div className='flex justify-between border-[#E0E0E0] border-[1px] border-solid items-center px-[17px] py-[20px] '>
                            <input className=" w-[100%] bg-transparent  font-[500] text-[1.1rem] outline-none " type="text" id='addressId' required placeholder='Addess'/>
                              <span><FontAwesomeIcon icon={faMapMarkerAlt}/></span>
                          </div>
                        </div>
                       
               </div>
               
               <div className='flex  flex-col gap-2 w-full'>
                   <span>Your Message</span>
                  <div className='flex justify-between border-[#E0E0E0] border-[1px] border-solid items-start px-[17px] py-[20px] '>
                  <textarea className=" w-[100%] bg-transparent  font-[500] text-[1.1rem] outline-none h-[140px]" name="" id="" placeholder='Write Message'></textarea>
                   <span><FontAwesomeIcon icon={faComment} /></span>
                  </div>
               </div>
               
                <input className="bg-orange-500 text-gray-50 text-center text-[1.1rem] px-[30px] py-[22px] w-[100%]  font-[500] cursor-pointer rounded-md"type="submit" value="Send Message"/>
            </form>
        </div>
        </div>
      </div>
   </section>



   {/* -------------------------------------------------------  */}

       



   {/* ------------------------------------------------------------------  */}

    {/* News Letter  */}
    <section className=''>
    <div className='container container-two mt-[10vh] py-10 bg-no-repeat bg-cover h-[60vh] flex flex-col gap-3 justify-center lg:items-center items-start  text-white rounded-xl' style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7)),url(${newsImage})`}}>
    <h2 className='text-[2.5rem] lg:text-[3rem]  subscribe font-[600] shadow-md text-center'>Subscribe To Our Newsletter</h2>
    <p className='text-[1rem] lg:text-[1.2rem] text-center w-[100%] lg:w-[38vw] shadow-md'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
    <div>
      <form action="" className='flex :flex-row gap-2'>
        <input type="email" placeholder='Your Email' className='py-[17px] w-[46vw] px-[24px] outline-none rounded-md bg-transparent border-[2px] border-solid text-[1.1rem] text-white email lg:w-[22vw]' />
        <button className='py-[17px] px-[24px] outline-none  bg-orange-500 text-[1.1rem] rounded-md'>SUBSCRIBE NOW</button>
      </form>
    </div>
      </div>
   </section>



    {/* RDATA */}
    {/* <section className='bg-[#FEF4E8]'>
    <div className='max-w-[1180px] mx-auto px-[35px] overflow-hidden py-[6vh] '>
      <h2 className='lg:pb-[2vh] text-[2rem] font-bold md:text-[3rem] pt-4 text-orange-500 text-center'>What Our Clients Says....</h2>
      <Slider {...settings}>
      {
      reviewList.map((item,index)=>{
        return(
          <div>
                <div className="review-box flex flex-col justify-center items-center gap-[10px] p-[20px] shadow-lg bg-white ">
                        <div className='flex justify-between w-[100%] items-center'>
                          <div className='flex gap-2 items-center'>
                          <img className=" rounded-full bg-white w-[4rem] h-[9vh]" src={reviewImage} alt=""/>
                          <span className='font-bold text-[1.2rem]'>{item?.name}</span>
                          </div>
                          <div className="flex text-[#FDC93B]">
                              <FontAwesomeIcon icon={faStar}  />
                              <FontAwesomeIcon icon={faStar} />
                              <FontAwesomeIcon icon={faStar} />
                              <FontAwesomeIcon icon={faStar} />
                              <FontAwesomeIcon icon={faStar} />
                          </div>
                        </div>
                        <p className='text-justify'>{item?.review}</p>
          </div>
          </div>
        )
      })
      }
      </Slider>
    </div>
    </section> */}

    <Testimonial/>


      {/* counting  */}
      {/* <section className='bg-black'>
    <div className='max-w-[1180px] mx-auto px-[35px] overflow-hidden pt-[5rem] pb-[36rem] lg:py-10  h-[50vh] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4  gap-4 ' >
    <div className='flex gap-2 items-center'>
      <img src={countImage1} alt="" className='border-[2px] rounded-full p-4 border-solid border-orange-400 hover:bg-orange-400'/>
      <div className='flex flex-col'>
        <span className='text-gray-400 text-[3.5rem] font-[600]'>800</span>
        <span className='text-gray-400'>Happy Client</span>
      </div>
    </div>

    <div className='flex gap-2 items-center'>
      <img src={countImage2} alt="" className='border-[2px] rounded-full p-4 border-solid border-orange-400 hover:bg-orange-400'/>
      <div className='flex flex-col'>
        <span className='text-gray-400 text-[3.5rem] font-[600]'>440</span>
        <span className='text-gray-400'>Project Done</span>
      </div>
    </div>

    <div className='flex gap-2 items-center'>
      <img src={countImage3} alt="" className='border-[2px] rounded-full p-4 border-solid border-orange-400 hover:bg-orange-400'/>
      <div className='flex flex-col'>
        <span className='text-gray-400 text-[3.5rem] font-[600]'>500</span>
        <span className='text-gray-400'>Employess</span>
      </div>
    </div>

    <div className='flex gap-2 items-center'>
      <img src={countImage4} alt="" className='border-[2px] rounded-full p-4 border-solid border-orange-400 hover:bg-orange-400'/>
      <div className='flex flex-col'>
        <span className='text-gray-400 text-[3.5rem] font-[600]'>80</span>
        <span className='text-gray-400'>Aard Winnings</span>
      </div>
    </div>
   
      </div>
   </section> */}
       <CounterThree/>

       {/* faq .  */}
       <Faq/>
    
    {/* blogs  */}
    <BlogThree/>
        
        
        
    </>
    
  )
}

export default Body