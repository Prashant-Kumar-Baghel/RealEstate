import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useCityProperties from '../utils/useCityProperties'
import PropertyCard from './PropertyCard'
import Footer from './Footer'
// import Spinner from './Spinner'
import Multiselect from 'multiselect-react-dropdown'
import {priceContext, PriceProvider} from '../utils/priceContext'
import Body from './Body'
import { toast } from 'react-toastify'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../utils/firebase'
// import { Modal } from 'semantic-ui-react'
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header'
// import FormatPrice from '../Helpers/FormatPrice'
const CityProperties = () => {
  const [isShowBody,setIsShowBody]=useState(false);
    const {cityId}=useParams()
    // console.log(typeof(cityId));
    const [filteredproptyData,setFilteredProptyData]=useState([]);
    const proptyData=useCityProperties(cityId,setFilteredProptyData);//we get all fetch data inside object hence we use object.values.
    const proptyDataArray=Object.values(proptyData);//the Object.values() method is used to extract the values from an object and return them as an array. 
    const filteredproptyDataArray=Object.values(filteredproptyData)
    const [dropRangeDown,setDropRangeDown]=useState(false)
    // console.log("filtered",filteredproptyData);
    const [priceOrder,setPriceOrder]=useState(null);
    const length=filteredproptyDataArray?.length;
    console.log("proptyDataji",proptyDataArray)
    console.log("filteredproptyDataji",filteredproptyDataArray)
    // const handleFilterChange=(e)=>{
    //   e.stopPropagation()
    //   if(e.target.value==="ascending"){
    //     console.log(e.target.value)
    //     const updatedArray=[...filteredproptyData].sort((a,b)=>a.price-b.price)//Always Subtract second argument from first argument to get array in ascending order.
    //   // console.log("filtered",filteredproptyData);
    //   // console.log("updated",updatedArray);
    //     setFilteredProptyData(updatedArray);
    //   }else if(e.target.value==="descending"){
    //     console.log(e.target.value)
    //     // In the code provided, the spread operator (...) is used to create a copy of the filteredproptyData array before sorting it because When dealing with arrays or objects in React state, it's crucial to avoid directly updating the original state(because sort() overwrites the original array) we use setsetFilteredProptyData to update the state.
    //     const updatedArray= [...filteredproptyData].sort((a,b)=>b.price-a.price)//Always Subtract first argument from second argument to get array in descending order.
    //     setFilteredProptyData(updatedArray);
    //   }else{
    //     setFilteredProptyData(proptyData);
    //   }
    // }

    //useContext
    const {priceValue, setPriceValue}=  useContext(priceContext)

    //furnishing
    const [options]=useState([
      {id:0,Furnishing:'Fully Furnished'},
      {id:1,Furnishing:'Semi Furnished'},
      {id:2,Furnishing:'Un Furnished'}
    ])

    //BHK
    const [bhkoptions]=useState([
      {id:0,BHK: 1},
      {id:1,BHK: 2},
      {id:2,BHK: 3}
    ])

    // if(length!==0){
     const priceArray=proptyDataArray?.map((item)=>item.price)
    //we have to give some intial value to reduce method hence we provide 0 .Math.max used to find find maximum number between two digits .
    const maxValue = priceArray?.length > 0 ? priceArray.reduce((initialValue, currValue) => Math.max(initialValue, currValue), 0) : null;
    // console.log("MaxValue",maxValue)
    // }

    const [currentPrice,setCurrentPrice]=useState(maxValue);//for the price range
    //we write below useEffect because on initially rendering maxValue is zero when priceArray is empty and then our currentValue also become zero but we want currentValue as maxValue hence we write useEffect.
    useEffect(() => {
      if (maxValue !== null) {
          setCurrentPrice(maxValue);
      }
  }, [maxValue]);

  // --------------------------
  const [selectedOptions, setSelectedOptions] = useState([]);//furnishing
  const [selectedBhkOptions, setSelectedBhkOptions] = useState([]);//bhk
  const handleFurnishingChange = selectedList => {
    setSelectedOptions(selectedList);
};

const handleBhkChange = selectedList => {
    setSelectedBhkOptions(selectedList);
};

const handlePriceChange = e => {
  console.log("price",e.target.value);
    setCurrentPrice(parseInt(e.target.value));
};
const handlePriceOrderChange=(e)=>{
  setPriceOrder(e.target.value);
}

useEffect(() => {
  console.log("priceValueFinal",priceValue);
  filterProperties();
}, [selectedOptions, selectedBhkOptions, currentPrice,priceOrder]);


const filterProperties = () => {
  let filteredData = [...proptyDataArray];
  console.log("curr",currentPrice);
  // console.log("priceOrder",priceOrder);

  // Filter by selected furnishings
  if (selectedOptions.length > 0) {
    const selectedFurnishings = selectedOptions.map(option => option.Furnishing);
      filteredData = filteredData.filter(item =>
          selectedFurnishings.includes(item.furnishing)
      );
  }

  // Filter by selected BHK options
  if (selectedBhkOptions.length > 0) {
    const selectedBhks = selectedBhkOptions.map(option => option.BHK);
      filteredData = filteredData.filter(item => {
        return selectedBhks.includes(item.bhk);
    });
  }

  // Filter by price range
  filteredData = filteredData.filter(item => item.price <= currentPrice);
  console.log("filteredData",filteredData);
  // if(priceValue!==null){
  //   filteredData = filteredData.filter(item => item.price <= priceValue);
  // }

  //filter by price order(HighToLOw etc);
  
      if(priceOrder==="ascending"){
        // console.log(e.target.value)
        filteredData = filteredData.sort((a,b)=>a.price-b.price)//Always Subtract second argument from first argument to get array in ascending order.
      // console.log("filtered",filteredproptyData);
      // console.log("updated",updatedArray);
        // setFilteredProptyData(updatedArray);
      }else if(priceOrder==="descending"){
        // console.log(e.target.value)
        // In the code provided, the spread operator (...) is used to create a copy of the filteredproptyData array before sorting it because When dealing with arrays or objects in React state, it's crucial to avoid directly updating the original state(because sort() overwrites the original array) we use setsetFilteredProptyData to update the state.
        filteredData = filteredData.sort((a,b)=>b.price-a.price)//Always Subtract first argument from second argument to get array in descending order.
        // setFilteredProptyData(updatedArray);
      }
      console.log("filteredData1",filteredData);
  setFilteredProptyData(filteredData);
};


  // -------------------
    // console.log(currentPrice);
    // const handlePriceChange=(e)=>{
    //   // const priceValue = parseInt(e.target.value); // Parse the value to ensure it's an integer
    //   // setCurrentPrice(priceValue);
    //   // if(priceArray?.length===0){
    //   //   const filteredPriceArray=proptyData.filter((item)=>item.price===priceValue);
    //   // setFilteredProptyData(filteredPriceArray);
    //   // }else{
    //   //   const filteredPriceArray=proptyData.filter((item)=>item.price<=priceValue);
    //   // setFilteredProptyData(filteredPriceArray);
    //   // }
    //   const priceValue = parseInt(e.target.value); // Parse the value to ensure it's an integer
    // setCurrentPrice(priceValue); // Update the currentPrice state

    // // Filter the property data based on the selected price value
    // const filteredData = proptyData.filter(item => item.price <= priceValue);

    // // Update the filtered property data state
    // setFilteredProptyData(filteredData)
    // }
    

    // furnishing 
    // const [selectedOptions, setSelectedOptions] = useState([]);

    // const handleFurnishingChange = (selectedList) => {
    //   // console.log("selectedList",selectedList);
    //     setSelectedOptions(selectedList);
    //     filterProperties(selectedList);
    // };

  //   const filterProperties = (selectedList) => {
  //     // console.log("proptyData",proptyData);
  //     // console.log("selectedList",selectedList);
  //     if (selectedList.length === 0) {
  //       setFilteredProptyData(proptyData);
  //       return;
  //   }
  //   const selectedFurnishings = selectedList.map(option => option.Furnishing);
  //   // console.log("selectedFurnishings",selectedFurnishings)
  //   // Filter properties based on selected options
  //   console.log("proptyData",proptyData);
  //   const filteredFinishData = proptyData.filter(item => {
  //     return selectedFurnishings.includes(item.furnishing);
  // });
  //     console.log("filtereddata",filteredFinishData);
  //   setFilteredProptyData(filteredFinishData);
  //   };

    //BHK

    // const [selectedBhkOptions, setSelectedBhkOptions] = useState([]);

    // const handleBhkChange = (selectedList) => {
    //   // console.log("selectedList",selectedList);
    //   setSelectedBhkOptions(selectedList);
    //     filterBhkProperties(selectedList);
    // };

  //   const filterBhkProperties = (selectedList) => {
  //     // console.log("proptyData",proptyData);
  //     // console.log("selectedList",selectedList);
  //     if (selectedList.length === 0) {
  //       setFilteredProptyData(proptyData);
  //       return;
  //   }
  //   const selectedBhks = selectedList.map(option => option.BHK);
  //   // console.log("selectedFurnishings",selectedFurnishings)
  //   // Filter properties based on selected options
  //   console.log("proptyData",proptyData);
  //   const filteredBhkData = proptyData.filter(item => {
  //     return selectedBhks.includes(item.bhk);
  // });
  //     console.log("filtereddata",filteredBhkData);
  //   setFilteredProptyData(filteredBhkData);
  //   };

    // when we fetching data then in that time we load  Spinner.
    // if(priceValue!==null){
    //   setCurrentPrice(priceValue);
    // }

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
            console.log(response)
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
      console.log(pay)
}
// const formDate= new Date().toLocaleString();
// const formDat= new Date();
//       console.log(typeof(formDate))
//       console.log(typeof(formDat))
  return (
  <>
        <div className="className='max-w-[1180px] mx-auto px-[20px] overflow-hidden my-[20vh] flex-wrap">
          <div className='flex gap-5 mb-5 sm:flex-row flex-col'>
            {/* filtered by furnishing .  */}
            <div className='sx:w-[40%] w-[100%]  ' >
              {/* <Multiselect options={options} displayValue='Furnishing'/> */}
              <Multiselect
                          options={options}
                          selectedValues={selectedOptions}
                          displayValue='Furnishing'
                          onSelect={handleFurnishingChange}
                          onRemove={handleFurnishingChange}
                          // showCheckbox={true}
                          placeholder='Select furnishing...'
                      />
            </div>
            {/* filtered by BHK .  */}
            <div className='sx:w-[20%] w-[100%] '>
              {/* <Multiselect options={options} displayValue='Furnishing'/> */}
              <Multiselect
                          options={bhkoptions}
                          selectedValues={selectedBhkOptions}
                          displayValue='BHK'
                          onSelect={handleBhkChange}
                          onRemove={handleBhkChange}
                          // showCheckbox={true}
                          placeholder='Select BHK...'
                      />
            </div>
            {/* <div>
              <button className='border-[2px] border-black border-solid px-[20px] py-[8px]' onClick={(e)=>{
                e.preventDefault();
                setDropRangeDown(!dropRangeDown)
              }}>Budget</button>
              
              {dropRangeDown && <div className='mt-2'>
                  <p className='mb-0 text-[1.2rem]'>₹{currentPrice}</p>
                  <form action="">
                    <label htmlFor="range"></label>
                    <input type="range" id='range' value={currentPrice} min={0} max={maxValue} onChange={handlePriceChange} step="100" className='w-[15vw]' />
                  </form>
              </div>}
            </div> */}
          </div>

         
           
           {/* Filturing by range */}
           
           {/* <div className='mt-4'>
            <h3>Budget</h3>
            <p className='mb-0'>₹{currentPrice}</p>
            <form action="">
              <label htmlFor="range"></label>
              <input type="range" id='range' value={currentPrice} min={0} max={maxValue} onChange={handlePriceChange} step="100" />
            </form>
           </div> */}

            <div>
              <button className='border-[2px] border-black border-solid px-[20px] py-[8px]' onClick={(e)=>{
                e.preventDefault();
                setDropRangeDown(!dropRangeDown)
              }}>Budget</button>
              
              {dropRangeDown && <div className='mt-2'>
                  <p className='mb-0 text-[1.2rem]'>₹{currentPrice}</p>
                  <form action="">
                    <label htmlFor="range"></label>
                    <input type="range" id='range' value={currentPrice} min={0} max={maxValue} onChange={handlePriceChange} step="100" className='w-[15vw]' />
                  </form>
              </div>}
            </div>

            <div className='flex sx:gap-[14rem] sx:items-center sm:flex-row flex-col '>
              <h2 className='text-[2.5rem]'>{length} results | Flats for Rent in {filteredproptyDataArray[0]?.city}</h2>
              {/* Filtered By price . */}
              <div>
                <form action="" className='flex gap-[.5rem] items-center'>
            
                    <label htmlFor="Sort" className='text-[1.2rem]'>Sort by:</label>
                    <select name="sort" id="sort" className='border-black border-[2px] border-solid px-[10px] py-[5px] rounded-full' onChange={handlePriceOrderChange}>
                      <option value="Relevance" className='px-[5px] py-[2px]'>Relevance</option>
                      <option value="#" disabled></option>
                      <option value="ascending" className='px-[5px] py-[2px]'>Price - Low to High</option>
                      <option value="#" disabled></option>
                      <option value="descending" className='px-[5px] py-[2px]'>Price - High to Low</option>
                    </select>
                </form>
              </div>
            </div>

            {filteredproptyDataArray?.map((item,index)=><PropertyCard key={index} item={item} name={name} useraddress={useraddress} phoneNumber={phoneNumber} pinCode={pincode} setName={setName} setPincode={setPincode} setPhoneNumber={setPhoneNumber} setUseraddress={setUseraddress} buyNow={buyNow} />)}

        </div>

        
        
        {/* <Body setCurrentPrice={setCurrentPrice}/>  */}
   </>
  )
}

export default CityProperties;
