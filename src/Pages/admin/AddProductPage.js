import { Timestamp, addDoc, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { realdb } from "../../utils/firebase";
import { getDatabase,ref,child,get,set,update,remove } from 'firebase/database';
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import propertySlice from "../../utils/propertySlice";
import { addProperty } from "../../utils/propertySlice";
const AddProductPage = () => {
    // navigate 
    const navigate = useNavigate();
    const [houseId,setHouseId]=useState(null);
    const [cityId,setCityId]=useState(null);
    const [cityList,setCityList]=useState(null);
    // const [getAllProduct, setGetAllProduct] = useState([]);
    // const {data}=useParams();
    // console.log(data);
    // product state
    const dispatch=useDispatch();
    const [property, setProperty] = useState({
        address: "",
        price: null,
        img: "",
        city: "",
        furnishing: "",
        area:"",
        bhk : null,
        parking :"",
        availability:"",
        
    });
    useEffect(()=>{
        fetchData()
    },[])
    const fetchData=async()=>{
        const response=await fetch("https://realestate-adea6-default-rtdb.firebaseio.com/citiesList.json");
        const data=await response.json();
        console.log("OP",data);
        setCityList(data);
    }

    // -------------------
    // const fetchAllData=()=>{
    //     const dbRef=ref(realdb);
    //     get(child(dbRef,`cityId=${cityId}/${houseId}`)).then((snapshot)=>{
    //         if(snapshot.exists()){
    //             // const arr=[{
    //             //     address: snapshot.val().address,
    //             //     price: snapshot.val().price,
    //             //     img: snapshot.val().img,
    //             //     city: snapshot.val().city,
    //             //     furnishing: snapshot.val().furnishing,
    //             //     area:snapshot.val().area,
    //             //     bhk : snapshot.val().bhk,
    //             //     parking :snapshot.val().parking,
    //             //     availability:snapshot.val().availability,
    //             // }]
    //             // console.log("fetchArray",arr);
    //             dispatch(addProperty({
    //                 address: snapshot.val().address,
    //                 price: snapshot.val().price,
    //                 img: snapshot.val().img,
    //                 city: snapshot.val().city,
    //                 furnishing: snapshot.val().furnishing,
    //                 area:snapshot.val().area,
    //                 bhk : snapshot.val().bhk,
    //                 parking :snapshot.val().parking,
    //                 availability:snapshot.val().availability,
    //             }));
    //         }else{
    //             console.log("error occur")
    //         }
    //     })
    // }
    // ------------------------------ 
    const handleButtonClick= async()=>{
        // Do validation 
       
       try{
        set(ref(realdb,`cityId=${cityId}/${houseId}`),{
            ...property
        })
        // toast.success("Add property successfully");
        alert("Add property successfully");
        // navigate("/admin-dashboard")
        //  fetchAllData(); // Fetch updated data after adding a new property
        // dispatch(addProperty({...property}))
         navigate("/admin-dashboard")
       }catch (error) {
            console.log(error);
            toast.error("Add product failed");
        }
    }

    return (
        <div>
            <div className='flex justify-center items-center h-screen'>
                {/* Login Form  */}
                <div className="login_Form bg-pink-50 px-8 py-6 border border-pink-100 rounded-xl shadow-md">

                    {/* Top Heading  */}
                    <div className="mb-5">
                        <h2 className='text-center text-2xl font-bold text-pink-500 '>
                            Add Property
                        </h2>
                    </div>

                     {/* Input   */}
                    <div className="mb-3">
                        <input
                            type="number"
                            placeholder='House Id'
                            value={houseId}
                            onChange={(e)=>{
                                setHouseId(e.target.value)
                            }}
                            className='bg-pink-50 text-pink-300 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300'
                        />
                    </div>

                    {/* Input One  */}
                    <div className="mb-3">
                        <input
                            type="text"
                            name="address"
                            placeholder='Address'
                            value={property.address}
                            onChange={(e)=>{
                                setProperty({
                                    ...property,
                                    address:e.target.value
                                })
                            }}
                            className='bg-pink-50 text-pink-300 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300'
                        />
                    </div>

                    {/* Input Two  */}
                    <div className="mb-3">
                        <input
                            type="number"
                            placeholder='Property Price'
                            value={property.price}
                            onChange={(e)=>{
                                // console.log("price",typeof(+e.target.value))
                                setProperty({
                                    ...property,
                                    price:+e.target.value
                                    
                                })
                            }}
                            className='bg-pink-50 text-pink-300 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300'
                        />
                    </div>
                    {/* Input Three  */}
                    <div className="mb-3">
                        <input
                            type="text"
                            placeholder='Parking'
                            value={property.parking}
                            onChange={(e)=>{
                                setProperty({
                                    ...property,
                                    parking:e.target.value
                                })
                            }}
                            className='bg-pink-50 text-pink-300 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300'
                        />
                    </div>

                    {/* Input */}
                    <div className="mb-3">
                        <input
                            type="text"
                            placeholder='Property Image Url'
                            value={property.img}
                            onChange={(e)=>{
                                setProperty({
                                    ...property,
                                    img:e.target.value
                                })
                            }}
                            className='bg-pink-50 text-pink-300 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300'
                        />
                    </div>

                    {/* Input Four  */}
                    <div className="mb-3">
                        <select 
                        className="w-full px-1 py-2 text-pink-300 bg-pink-50 border border-pink-200 rounded-md outline-none 
                         " 
                         value={property.city}
                         onChange={(e)=>{
                            const selectedCity=e.target.value;
                            const selectedCityId = cityList.find(city => city.city === selectedCity)?.id;
                            console.log("selectedCityId",selectedCityId);
                            setCityId(selectedCityId);
                             setProperty({
                                 ...property,
                                city:e.target.value
                             })
                         }}>
                            <option>Select City</option>
                            {cityList?.map((item, index) => {
                                return (
                                    <option className=" first-letter:uppercase" key={index} value={item?.city}>{item?.city}</option>
                                )
                            })}
                        </select>
                    </div>

                    {/* Input Five  */}
                    {/* <div className="mb-3">
                        <textarea name="description" placeholder="Property Description" rows="5" className=" w-full px-2 py-1 text-pink-300 bg-pink-50 border border-pink-200 rounded-md outline-none placeholder-pink-300 ">

                        </textarea>
                    </div> */}

                   {/* Input Five  */}
                    <div className="mb-3">
                        <input
                            type="number"
                            placeholder='Property Area'
                            value={property.area}
                            onChange={(e)=>{
                                setProperty({
                                    ...property,
                                    area:e.target.value
                                })
                            }}
                            className='bg-pink-50 text-pink-300 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300'
                        />
                    </div>

                    {/* Input Five  */}
                    <div className="mb-3">
                        <input
                            type="text"
                            placeholder='Availability'
                            value={property.availability}
                            onChange={(e)=>{
                                setProperty({
                                    ...property,
                                    availability:e.target.value
                                })
                            }}
                            className='bg-pink-50 text-pink-300 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300'
                        />
                    </div>

                    {/* Input Six  */}
                    <div className="mb-3">
                        <input
                            type="text"
                            placeholder='Furnishing'
                            value={property.furnishing}
                            onChange={(e)=>{
                                setProperty({
                                    ...property,
                                    furnishing:e.target.value
                                })
                            }}
                            className='bg-pink-50 text-pink-300 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300'
                        />
                    </div>

                   { /* Input Seven  */}
                    <div className="mb-3">
                        <input
                            type="number"
                            placeholder='BHK'
                            value={property.bhk}
                            onChange={(e)=>{
                                console.log("bhk",typeof(+e.target.value))
                                setProperty({
                                    ...property,
                                    bhk:+e.target.value
                                })
                            }}
                            className='bg-pink-50 text-pink-300 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300'
                        />
                    </div>

                    {/* Add Product Button  */}
                    <div className="mb-3">
                        <button
                            type='button'
                            className='bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md '
                            onClick={handleButtonClick}
                        >
                            Add Property
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddProductPage;