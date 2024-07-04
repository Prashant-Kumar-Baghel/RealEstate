import React, {  useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useCityProperties from '../utils/useCityProperties'
import PropertyCard from './PropertyCard'
import Multiselect from 'multiselect-react-dropdown'
import { toast } from 'react-toastify'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../utils/firebase'
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux'
import myContext from '../context/myContext'
import Breadcrumb from './Breadcrumb'
import PropertyFaq from './PropertyFaq'
const CityProperties = () => {
  const propertyType=useSelector((store)=>store.features.ispropertyRent);
    const {cityId}=useParams()
    const [filteredproptyData,setFilteredProptyData]=useState([]);
    const {cityList}=useContext(myContext);
    console.log("cityList",cityList);
    console.log("filteredproptyData",filteredproptyData);
    const proptyData=useCityProperties(cityId,setFilteredProptyData);//we get all fetch data inside object hence we use object.values.
    console.log("proptyData",proptyData);
    const proptyDataArray=Object.values(proptyData);//the Object.values() method is used to extract the values from an object and return them as an array. 
    const filteredproptyDataArray=Object.values(filteredproptyData)
    const [priceOrder,setPriceOrder]=useState(null);//create this state variable  to store way sort the property.
    const length=filteredproptyDataArray?.length;
    const bhkData=useSelector((store)=>store.features.bhkData)
    const furnishingData=useSelector((store)=>store.features.furnishingData)
    const navigate=useNavigate();
    console.log("proptyDataArray",proptyDataArray)
    //furnishing
    // const [options]=useState([
    //   {id:0,Furnishing:'Fully Furnished'},
    //   {id:1,Furnishing:'Semi Furnished'},
    //   {id:2,Furnishing:'Un Furnished'}
    // ])

    //BHK
    // const [bhkoptions]=useState([
    //   {id:0,BHK: "1"},
    //   {id:1,BHK: "2"},
    //   {id:2,BHK: "3"}
    // ])

    // useEffect(()=>{
    //   if(bhkDataArray?.length!==0){
    //     console.log("Inside",bhkDataArray)
    //     setSelectedBhkOptions(bhkDataArray);
    //   }
    // },[proptyDataArray])
    // ---------------------------------------------------------------------- -------------

    useEffect(() => {
      if (proptyDataArray?.length !== 0) {
          setSelectedBhkOptions(bhkData);
      }
  }, [proptyData]);

  useEffect(() => {
    if (proptyDataArray?.length !== 0) {
        setSelectedOptions(furnishingData)
    }
}, [proptyData]);
// ------------------------------------------------------------------  -------------------------

     const priceArray=proptyDataArray?.map((item)=>item.price)
    //we have to give some intial value to reduce method hence we provide 0 .Math.max used to find find maximum number between two digits .
    const maxValue = priceArray?.length > 0 ? priceArray.reduce((initialValue, currValue) => Math.max(initialValue, currValue), 0) : null;
    

    const [currentPrice,setCurrentPrice]=useState(maxValue);//for the price range
    //we write below useEffect because on initially rendering maxValue is zero when priceArray is empty and then our currentValue also become zero but we want currentValue as maxValue hence we write useEffect.
    useEffect(() => {
      if (maxValue !== null) {
          setCurrentPrice(maxValue);
      }
  }, [maxValue]);

  // --------------------------
  const [selectedOptions, setSelectedOptions] = useState(furnishingData);//fit contain selected furnishing options.
  const [selectedBhkOptions, setSelectedBhkOptions] = useState(bhkData);//it contain selected bhk options.
  const handleFurnishingChange =(e)=> {
    console.log("handleFurnishingChange",e.target.value)
    setSelectedOptions(e.target.value);
};

const handleBhkChange = (e) => {
  console.log("handleBhkChange",e.target.value)
    setSelectedBhkOptions(e.target.value);
};

const handlePriceChange = e => {
    setCurrentPrice(parseInt(e.target.value));
};
const handlePriceOrderChange=(e)=>{
  setPriceOrder(e.target.value);
}

// useEffect(() => {
//   filterProperties();
// }, [selectedOptions, selectedBhkOptions, currentPrice,priceOrder]);
useEffect(() => {
  filterProperties();
}, [selectedOptions, selectedBhkOptions, currentPrice, priceOrder, proptyData]);

const filterProperties = () => {
  let filteredData = [...proptyDataArray];
console.log("filteredDataInitial",filteredData)
  // Filter by selected furnishings
 console.log("selectedOptions",selectedOptions)
 console.log("selectedBhkOptions",selectedBhkOptions)
 console.log("currentPrice",currentPrice)
 console.log("priceOrder",priceOrder)
  if(selectedOptions!==null && selectedOptions!=="select"){
    console.log("insideFurnishing");
    filteredData = filteredData.filter(item =>item.furnishing===selectedOptions);
  }
  

  // Filter by selected BHK options
  
    if(selectedBhkOptions!==null && selectedBhkOptions!=="select"){
      console.log("insideBHK");
      filteredData = filteredData.filter(item => item.bhk===selectedBhkOptions);
    }

  // Filter by price range
  filteredData = filteredData.filter(item => item.price <= currentPrice);
  

  //filter by price order(HighToLOw etc);
  
      if(priceOrder==="ascending"){
        filteredData = filteredData.sort((a,b)=>a.price-b.price)//Always Subtract second argument from first argument to get array in ascending order.
      }else if(priceOrder==="descending"){
        // In the code provided, the spread operator (...) is used to create a copy of the filteredproptyData array before sorting it because When dealing with arrays or objects in React state, it's crucial to avoid directly updating the original state(because sort() overwrites the original array) we use setsetFilteredProptyData to update the state.
        //The comparison function should return a negative value if a should come before b, a positive value if a should come after b, or zero if a and b are considered equal in terms of sorting order.
        filteredData = filteredData.sort((a,b)=>b.price-a.price)//Always Subtract first argument from second argument to get array in descending order.
      }
      console.log("filteredDataFinal",filteredData)
  setFilteredProptyData(filteredData);
};


  

    // Payment Integration (//we store addressInfo in firebase).
    //we create all below state variables to get information from user.
    const [name, setName] = useState("")
  const [useraddress, setUseraddress] = useState("");
  const [pincode, setPincode] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")

  const buyNow= async ()=>{
    // validation (if any of if condition mation then we show toast)
    if (name === "" || useraddress === "" || pincode === "" || phoneNumber === "") {
      return toast.error("All fields are required", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
      }

      // create addressInfo object and provide all the fields to store that object in Firebase. 
      const addressInfo = {
        name,
        useraddress,
        pincode,
        phoneNumber,
        // new Date() returns a date object with the current date and time.the toLocaleString() method in JavaScript is used to convert a Date object to a string, representing the date and time in a locale-specific format
        date: new Date().toLocaleString(
          "en-US",// Output in US English locale
          {
            month: "short",//Displays the month abbreviation (e.g., "Jan", "Feb").
            day: "2-digit",//Displays the day with leading zeros if necessary (e.g., "01", "02").
            year: "numeric",// Displays the year in numeric format (e.g., "2024").
          }
        )
      }
      //Payment Integration code :-
      var options = {
        key: "",
        key_secret: "",
        amount: parseInt(50 * 100),
        currency: "INR",
        order_receipt: 'order_rcptid_' + name,
        name: "E-Bharat",
        description: "for testing purpose",
        handler: function (response) {
            toast.success('Payment Successful')
            const paymentId = response.razorpay_payment_id
            // store in firebase 
            const orderInfo = {
              // cartItems,
              addressInfo,
              date: new Date().toLocaleString(
                "en-US",
                {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                }
              ),
              email: JSON.parse(localStorage.getItem("user")).user.email,
              userid: JSON.parse(localStorage.getItem("user")).user.uid,
              paymentId
            }
            try {
              const result = addDoc(collection(db, "orders"), orderInfo)
            } catch (error) {
              console.log(error)
            }
        },
    
        theme: {
            color: "#3399cc"
        }
      };

      var pay = new window.Razorpay(options);
      pay.open();
}

// --------------------- Finding the city .--------------
const cityDetails=cityList.find((item)=>item.id===cityId)
console.log("cityDetails",cityDetails)


  return (
  <>
       <Breadcrumb 
                pageTitle="Property Sidebar"
                pageName="Property Sidebar"
            />
       <section className=' bg-gray-100 py-[8vh] '>
          <div className='container container-two'>
              <div className='flex gap-5 mb-5 sm:flex-row flex-col'>
                {/* filtered by furnishing .  */}
                <div className='sm:w-[20%] w-[100%]' >
                  {/* <Multiselect
                              options={options}
                              selectedValues={selectedOptions}
                              displayValue='Furnishing'          
                              onSelect={handleFurnishingChange}
                              onRemove={handleFurnishingChange}
                              placeholder='Select furnishing...'
                          /> */}
                  <select name="" id="" onChange={handleFurnishingChange} className='border-black border-[2px] border-solid px-[10px] py-[5px] rounded-full w-[100%] h-[100%]' value={selectedOptions}>
                     <option value="select">Furnishing</option>
                     <option value="Fully Furnished">Fully Furnished</option>
                     <option value="Semi Furnished">Semi Furnished</option>
                     <option value="Un Furnished">Un Furnished</option>
                  </select>
                </div>
                {/* filtered by BHK .  */}
                <div className='sm:w-[20%] w-[100%]  '>
                  {/* <Multiselect
                              options={bhkoptions}
                              selectedValues={selectedBhkOptions}
                              displayValue='BHK'
                              onSelect={handleBhkChange}//to get selected values inside dropdown.
                              onRemove={handleBhkChange}
                              placeholder='Select BHK...'
                          /> */}
                          <select name="" id="" onChange={handleBhkChange} className='border-black border-[2px] border-solid px-[10px] py-[5px] rounded-full w-[100%] h-[100%]' value={selectedBhkOptions}>
                              <option value="select">BHK</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                          </select>
                </div>
      
                <div className='w-[100%] lg:w-[18%] '>
                  <div className='mt-2'>
                      <p className='mb-0 text-[1.2rem]'>₹{currentPrice}</p>
                      <form action="">
                        <label htmlFor="range"></label>
                        <input type="range" id='range' value={currentPrice} min={0} max={maxValue} onChange={handlePriceChange} className='w-[100%] ' />
                      </form>
                  </div>
                </div>
              </div>



                <div className='flex sm:gap-[3rem] sm:items-center sm:flex-row flex-col flex-wrap my-3'>
                  <h2 className='text-[1.8rem] lg:text-[2.5rem]'>{length} results | Flats for {propertyType?"Rent":"Buy"} in {filteredproptyDataArray[0]?.city}</h2>
                  {/* Filtered By price . */}
                  <div>
                    <form action="" className='flex gap-[.5rem] items-center'>
                
                        <label htmlFor="Sort" className='text-[1.2rem]'>Sort by:</label>
                        <select name="sort" id="sort" className='border-black border-[2px] border-solid px-[10px] py-[5px] rounded-full' onChange={handlePriceOrderChange}>
                          <option value="Relevance" className='px-[5px] py-[2px]'>Relevance</option>
                          <option value="ascending" className='px-[5px] py-[2px]'>Price - Low to High</option>
                          <option value="descending" className='px-[5px] py-[2px]'>Price - High to Low</option>
                        </select>
                    </form>
                  </div>
                </div>

                <div className=' w-[100%] mb-4 lg:w-[67%]'>
                  <p className='text-[1.1rem] lg:text-[1.2rem] w-[100%]'>{cityDetails?.paragraph1}</p>
                </div>

              <div className="row gy-4">
                      <div className="col-lg-8">
                            <div className="list-grid-item-wrapper property-item-wrapper row gy-2">
                            {/* {filteredproptyDataArray?.map((item,index)=><Link to={`/propertyData/${item.houseApprovedId}`} key={index}>
                              <PropertyCard  item={item} name={name} useraddress={useraddress} phoneNumber={phoneNumber} pinCode={pincode} setName={setName} setPincode={setPincode} setPhoneNumber={setPhoneNumber} setUseraddress={setUseraddress} buyNow={buyNow} />
                            </Link>)} */}
                            {filteredproptyDataArray?.map((item, index) =>
                              
                                <PropertyCard key={index} item={item} name={name} useraddress={useraddress} phoneNumber={phoneNumber} pinCode={pincode} setName={setName} setPincode={setPincode} setPhoneNumber={setPhoneNumber} setUseraddress={setUseraddress} buyNow={buyNow} />
                             )}
                            </div>
                      </div>
              </div>

              <div className=' w-[100%] my-4 lg:w-[67%]'>
                  <p className='text-[1.1rem] lg:text-[1.2rem] w-[100%]'>{cityDetails?.paragraph2}</p>
                </div>

                <PropertyFaq cityDetails={cityDetails} accordionClass="" itemClass="" />

            </div>
       </section>

        
        
   </>
  )
}

export default CityProperties;
