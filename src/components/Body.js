import React, {  useContext, useEffect, useState } from 'react'
import {homeList, reviewList} from '../utils/mockdata'
import CardSlider from './CardSlider'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { cityList } from '../utils/mockdata';
import LocationsSlider from './LocationsSlider';
import ReviewSlider from './ReviewSlider';
import Footer from './Footer';
import useCitiesList from '../utils/useCitiesList';
import { useNavigate } from 'react-router-dom';
import Multiselect from 'multiselect-react-dropdown';
import {priceContext, PriceProvider} from '../utils/priceContext';
import CityProperties from './CityProperties';
import Header from './Header';

// import "../index.css";
const Body = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
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
  const [listOfCities,setListOfCities]=useState([]);
  const [filteredListOfCities,setfilteredListOfCities]=useState([]);
  const [searchText,setSearchText]=useState(null)
  const [cityId,setCityId]=useState(null);
  const [selectedBhkOptions, setSelectedBhkOptions] = useState([]);//bhk
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 
  const [showCardSider]=useState(false);
  const [dropRangeDown,setDropRangeDown]=useState(false)
  const navigate=useNavigate();
  useCitiesList(setListOfCities);

  //useContext
  const {priceValue, setPriceValue }=  useContext(priceContext)
  // // const handleButtonClick=()=>{
  // //   setSearchText(item.city)
  // // }
  // console.log("proptyData",proptyData);

  const handleChange=(e)=>{
    const searchWord=e.target.value;
    setSearchText(e.target.value);

    const filteredArray=listOfCities.filter((item)=>item.city.toLowerCase().includes(searchWord.toLowerCase())); 
    console.log(filteredArray)

    //when nothing in input then we do setfilteredListOfCities([]); because when we clear all text from the input box then we don't want to display the list.
    if(!searchWord){
      setfilteredListOfCities([]);
    }else{
      setfilteredListOfCities(filteredArray);
    }
  }
  
  //Price by range
  // const priceArray=proptyData?.map((item)=>item.price)
  //   //we have to give some intial value to reduce method hence we provide 0 .Math.max used to find find maximum number between two digits .
  //   const maxValue = priceArray?.length > 0 ? priceArray.reduce((initialValue, currValue) => Math.max(initialValue, currValue), 0) : null;
    // console.log("MaxValue",maxValue)
    // }

    const [bodycurrentPrice,setBodycurrentPrice]=useState(6000);//for the price range
  //   //we write below useEffect because on initially rendering maxValue is zero when priceArray is empty and then our currentValue also become zero but we want currentValue as maxValue hence we write useEffect.
  //   useEffect(() => {
  //     if (maxValue !== null) {
  //         setBodycurrentPrice(maxValue);
  //     }
  // }, [maxValue]);
  const handlePriceChange = e => {
    setBodycurrentPrice(parseInt(e.target.value));
    setPriceValue(parseInt(e.target.value));
};
   
  return (
    // <priceContext.Provider value={{priceValue:bodycurrentPrice}}>
    <>
    {/* Search bar  */}


    <section>
      <div className='max-w-[1180px] mx-auto px-[20px] overflow-hidden lg:mt-[18vh] mt-[15vh] flex flex-col items-center justify-center'>
        <h2 className='lg:pb-[2vh] text-[2rem] font-bold md:text-[3rem]  text-green-500 text-center'>Trusted Place to Find a Home</h2>
        <div className="search py-[10px] px-[10px] rounded-[27px] font-[500] text-[1.1rem] bg-gray-200 w-[100%]  sm:w-[80%] flex justify-evenly">
          {/* Search bar     */}
          <input 
          type="search" 
          placeholder='Find Your Dream Home' 
          className='bg-gray-200 border-r-2 border-solid border-black h-200 mr-4 w-[100%]  outline-none'
          value={searchText}
          onChange={handleChange} />
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
          <button className='bg-green-500 text-center border-none py-[5px] px-[10px] rounded-[10px]' onClick={()=>{
            navigate("/city/"+cityId);
            // setCurrentPrice(priceValue);
            
          }} on>Search </button>
        </div>
        {/* We do filteredListOfCities.length!==0 because We only show list when we have text present inside input box that mean when filteredListOfCities is not empty and overflow-hidden property hidden the list whereas overflow-y-auto create scrollbar*/}
        {searchText && <div className='sm:w-[80%]'>
          {filteredListOfCities.length>0 ? (<ul className='itemList w-[300px] sm:w-[80%] h-[100%] max-h-[200px] text-start bg-white shadow-md shadow-slate-500 mt-[5px] overflow-hidden overflow-y-auto mb-4 ml-[-4vw] sm:ml-[0] '>
        {/* the slice() method in JavaScript returns a shallow copy of a portion of an array into a new array object selected from begin to end (end not included) where begin and end represent the index of items in that array. */}
        {/* we don't want all the cities in one time and only want best four searches to related to text present in input box. for that we can use ilteredListOfCities.slice(0,4)*/}
        {filteredListOfCities.map((item)=><li 
        key={item.id} 
        className='p-[4px] text-[1.2rem] h-[6vh] hover:bg-green-400 w-[100%] px-5 cursor-pointer'
        onClick={()=>{
          //we do setSearchText(item.city) because when we click on text then want to put that text in search box and we do setfilteredListOfCities([]) because when we click on any city in list then just on click i want to hidden that list.
          setSearchText(item.city)
          setfilteredListOfCities([]);
          setCityId(item.id)
        }}>{item.city}</li>)}
        </ul>): (<div className='ml-[-30vw]'>
        <img className=" w-20" src="https://cdn-icons-png.flaticon.com/128/10437/10437090.png" alt="img" />
        </div>)}
        </div>
        
        }
      </div>
    </section>

    
    

    {/* slider */}
   <section className='bg-[#FFF5E4]'>
    <div className='max-w-[1180px] mx-auto px-[35px] overflow-hidden mt-[5vh]  '>
        <h2 className='lg:pb-[2vh] text-[2rem] font-bold md:text-[3rem] pt-4 text-green-500 text-center'>Trending Properties in Chandigarh</h2>
        <Slider {...settings}>
        {
        homeList.map((item)=>{
          return(<CardSlider key={item.id} homedata={item} />)
        })
        }
        </Slider>
      </div>
   </section>

    {/* Top city  */}
    <section className='bg-[#F5F5F5]'>
      <div className='max-w-[1180px] mx-auto px-[35px] overflow-hidden '>
        <h2 className="lg:pb-[2vh] text-[2rem] font-bold  md:text-[3rem] pt-4 text-green-500 text-center">Top City in Chandigarh</h2>
        <Slider {...settings}>
        {
        cityList.map((item)=>{
          return(
            <LocationsSlider key={item.id} locationdata={item}/>
          )
        })
        }
        </Slider>
      </div>
    </section>

    {/* Review */}
    <section className='bg-[#FEF4E8]'>
    <div className='max-w-[1180px] mx-auto px-[35px] overflow-hidden '>
      <h2 className='lg:pb-[2vh] text-[2rem] font-bold md:text-[3rem] pt-4 text-green-500 text-center'>What Our Clients Says....</h2>
      <Slider {...settings}>
      {
      reviewList.map((item)=>{
        return(
          <ReviewSlider key={item.id} reviewdata={item}/>
        )
      })
      }
      </Slider>
    </div>
    </section>
    {/* map */}
    <div className="mt-[5vh]">
                <h2 className="text-green-500 text-[2rem] mb-4 text-center">Our <b>Company</b> Locations</h2>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.698682412772!2d76.68857587503625!3d30.69875288727499!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390feffaea0e29d5%3A0x1fa5fa633af789af!2sGSPL%20Tower!5e0!3m2!1sen!2sin!4v1704200629015!5m2!1sen!2sin" width="100%" height="450" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="google map"></iframe>
        </div> 
        
        
        {console.log("priceValue",priceValue)}
        {console.log("bodycurrentPrice",bodycurrentPrice)}
        
    </>
    // </priceContext.Provider> 
    
  )
}

export default Body