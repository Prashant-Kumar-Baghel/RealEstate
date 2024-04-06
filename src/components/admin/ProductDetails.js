import { QuerySnapshot, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, orderBy, query, updateDoc, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { db, realdb } from "../../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
// import { addUser } from "../../utils/userSlice";
import { addProperty } from "../../utils/propertySlice";
import { set } from "firebase/database";
import { ref } from "firebase/storage";
import myContext from "../../context/myContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const ProductDetail = () => {
    const [propertyData,setPropertyData]=useState([]);
    // console.log("propertyData",propertyData);
    const [cityId,setCityId]=useState(null)
    const dispatch=useDispatch();
    const [cityList,setCityList]=useState([]);
    const [idNo,setIdNo]=useState(null)
    const [displayUser,setDisplayUser]=useState(null)
    // const [userAbout,setUserAbout]=useState(null);
    // const [buttonState,setButtonState]=useState("Approve");
    const navigate=useNavigate();
    // const {userData,getAllUser}=useContext(myContext);
    // const [getAllProduct, setGetAllProduct] = useState([]);
    // console.log("displayUser",displayUser);
    const fetchData= async()=>{
        const response= await fetch("https://realestate-adea6-default-rtdb.firebaseio.com/citiesList.json")
        const data= await response.json();
        // console.log("ProductData",data);
        setCityList(data);
    }
    useEffect(  ()=>{
        fetchData();
    },[])
    const {getAllProduct,getAllSellProduct,setCountUsers,userData,getAllUser,setGetAllUser,setUserHousesImages}=useContext(myContext);
    console.log("getAllProduct",getAllProduct)
    console.log("userData",userData)
    const user=useSelector((store)=>store.user)

    const handleRentDelete= async (id,authId)=>{
        
        //We do updateDoc here to show only those users which has added propery on admin page.
        // ------------------------------------ 
        let q;
      q=query(
        collection(db,"EditedUsers"),
      where("uid","==",authId))
    
    // const q = query(
    //   collection(db, "RegisteredUsers"), 
    //   where('uid', '==', user?.uid)
    //   );
   let userInfo=null;
 
   const snapPromise= new Promise((resolve)=>{
    onSnapshot(q,  (QuerysnapShot)=>{
        QuerysnapShot.forEach((doc) => {
            userInfo = { ...doc.data(), docId: doc.id };
            // console.log(userInfo); // Log userInfo here
        });
        resolve();
      })
   })
   await snapPromise;
   console.log("snap",userInfo);
   await updateDoc(doc(db,"EditedUsers",userInfo?.docId),{
    ...userInfo,postProperty:true,countProperties:userInfo?.countProperties-1
  })
        

        if(window.confirm("Are you want to delete that user?")){
            try{
              await deleteDoc(doc(db,"Rent",id));
            }catch(err){
                console.log(err);
            }
        }
    }

    const handleSellDelete= async (id,authId)=>{
             //We do updateDoc here to show only those users which has added propery on admin page.
        // ------------------------------------ 
        let q;
      q=query(
        collection(db,"EditedUsers"),
      where("uid","==",authId))
    
   let userInfo=null;
 
   const snapPromise= new Promise((resolve)=>{
    onSnapshot(q,  (QuerysnapShot)=>{
        QuerysnapShot.forEach((doc) => {
            userInfo = { ...doc.data(), docId: doc.id };
            // console.log(userInfo); // Log userInfo here
        });
        resolve();
      })
   })
   await snapPromise;
   console.log("snap",userInfo);
   await updateDoc(doc(db,"EditedUsers",userInfo?.docId),{
    ...userInfo,postProperty:true,countProperties:userInfo?.countProperties-1
  })

        if(window.confirm("Are you want to delete that user?")){
            try{
              await deleteDoc(doc(db,"Sell",id));
            }catch(err){
                console.log(err);
            }
        }
    }

    //for slider

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
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

    // const getUserDetails= async (authId)=>{
    //     const q=query(
    //         collection(db,"EditedUsers"),
    //         where("uid","==",authId));
    //         let userData=null;
    //     const promiseData=new Promise((resolve)=>{
    //         onSnapshot(q,(QuerySnapshot)=>{
    //             QuerySnapshot.forEach((doc)=>{
    //                 userData={...doc.data()};
    //             })
    //         })
    //         resolve()
    //     })
    //     await promiseData;
    //     console.log("userExtraData",userData)

    // }
    // useEffect(()=>{
    //     const q=query(
    //         collection(db,"RegisteredUsers"),
    //         where("uid","==",idNo)
    //       )
    //     onSnapshot(q,(snapShot)=>{
    //         // let list=[];
    //         snapShot.docs.forEach((doc)=>setDisplayUser({...doc.data()}))
    //         // setPropertyData(list);
    //         // dispatch(addProperty(list));
    //         // console.log("list",list);
    //     })
        
    // },[idNo])




    // const propertyItemData=useSelector((store)=>store.property)
    // console.log("propertyItemData",propertyItemData);

    // // Find the selected city ID once outside of the map function
    // useEffect(() => {
    //     const selectedCity = getAllProduct.find(item => cityList.find(city => city.city === item.city));
    //     if (selectedCity) {
    //         const selectedCityId = cityList.find(city => city.city === selectedCity.city)?.id;
    //         setCityId(selectedCityId);
    //     }
    // }, [getAllProduct, cityList]);

    // const handleButtonClick=()=>{
    //     // const selectedCityId = cityList.find(city => city.city === propertyData.city)?.id;
    //     console.log("Boom",cityId);
    //     try{
    //         set(ref(realdb,`cityId=${cityId}/5`),{
    //             ...propertyData
    //         })
    //     }catch(err){
    //         console.log(err);
    //     }
    // }
    // const getUserDetails = async (authId) => {
    //     try {
    //         const q = query(
    //             collection(db, "EditedUsers"),
    //             where("uid", "==", authId)
    //         );
    //         // let userData=null;
    //         const querySnapshot = await getDocs(q);
    //         querySnapshot.forEach((doc) => {
    //             const userData = { ...doc.data() };
    //             // console.log("userData", userData);
    //             // Further processing of userData if needed
    //             setUserAbout(userData);
    //         });
            
    //     } catch (error) {
    //         console.error("Error fetching user details:", error); 
    //     }
    // };
    
    
    const handleRentApproved=async (item)=>{
        const {address,area,availability,bhk,city,furnishing,parking,price,rentImgArray,id}=item;
        const selectedCityItem=cityList.find((cityItem)=>cityItem?.city===item?.city)
        console.log("selectedCity",selectedCityItem)
        console.log("selectedCityItem",item)
        const selectedcityId=selectedCityItem?.id;
        console.log("selectedcityId",selectedcityId)
        setCityId(selectedcityId);
        const res= fetch(`https://realestate-adea6-default-rtdb.firebaseio.com/cityId%3D${selectedcityId}.json`,
                    {
                        method:"POST",
                        headers:{
                            "Content-type":"application/json"
                        },
                        body:JSON.stringify({
                            address,
                            area,
                            availability,
                            bhk,
                            city,
                            furnishing,
                            parking,
                            price,
                            rentImgArray,
                            id

                        })
                    }
        )

        if(res){
            // setButtonState("Approved");
            await updateDoc(doc(db,"Rent",id),{
                ...item,approveState:"approved"
            })
            alert("data,approved");
        }
    }

    const handleSellApproved=async (item)=>{
        console.log("selectedCityItem",item)
        const {address,area,availability,bhk,city,furnishing,parking,price,rentImgArray,id}=item;
        const selectedCityItem=cityList.find((cityItem)=>cityItem?.city===item?.city)
        console.log("selectedCity",selectedCityItem)
        // console.log("selectedCityItem",item)
        const selectedcityId=selectedCityItem?.id;
        console.log("selectedcityId",selectedcityId)
        setCityId(selectedcityId);
        const res= fetch(`https://realestate-adea6-default-rtdb.firebaseio.com/cityId%3D${selectedcityId}.json`,
                    {
                        method:"POST",
                        headers:{
                            "Content-type":"application/json"
                        },
                        body:JSON.stringify({
                            address,
                            area,
                            availability,
                            bhk,
                            city,
                            furnishing,
                            parking,
                            price,
                            rentImgArray,
                            id

                        })
                    }
        )

        if(res){
            // setButtonState("Approved");
            await updateDoc(doc(db,"Sell",id),{
                ...item,approveState:"approved"
            })
            alert("data,approved");
        }
    }
   
    return (
        <div>
            <div className="py-5 flex justify-between items-center">
                {/* text  */}
                <h1 className=" text-xl text-pink-300 font-bold">All Product</h1>
                {/* Add Product Button  */}
                {/* <Link to={'/addproduct'}>
                    <button className="px-5 py-2 bg-pink-50 border border-pink-100 rounded-lg">Add Product</button>
                </Link> */}
            </div>

            {/* table  */}
            <div className="w-full overflow-x-auto mb-5">
                <table className="w-full text-left border border-collapse sm:border-separate border-pink-100 text-pink-400" >
                    <tbody>
                        
                        <tr>
                            <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara">S.No.</th>
                            {/* <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Name</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Email Id:-</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Mobile Number:-</th> */}
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Image</th>
                            <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara">Address</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Area</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Availability</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">BHK</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">City</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Furnishing</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Parking</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Price</th> 
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">BrokerConnect</th> 
                             <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Action</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Action</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Action</th>
                        </tr>



                        {/* All Rent Properties  */}
                        <h2>All Rent Properties</h2>
                        {getAllProduct && getAllProduct?.map( (item,index)=>{
                            console.log("helloProduct");
                            
                            console.log("Item",item); 
                            const {address,area,availability,bhk,brokerContact,city,furnishing,parking,price,rentImgArray,id,approveState,authId}=item;
                            console.log("rentImgArray",rentImgArray)
                            // const userDetails=getUserDetails(authId); 
                            // let  userAbout=null;
                            // userDetails.then((val)=>{
                            //      const {displayName,email,phoneNo}=val;
                            //     // console.log("vval",value);
                            //     // userAbout=value;  
                            //     userAbout={displayName,email,phoneNo,}
                            // })
                            // console.log("userDetails", userAbout);
                            // const {displayName,email,phoneNo,}=userAbout;
                            // console.log("userDetails", userDetails);
                                
                            //   console.log("selectedCityId",selectedCityId);
                            // setIdNo(uid);
                            //  getUserDetails(authId);
                            // userAbout!==null?const {displayName,email,phoneNo}=userAbout:" ";
                            // if(userAbout!==null){
                            //     const {displayName,email,phoneNo}=userAbout
                            // }
                            // console.log("setUserAbout",userAbout) ;
                            // -------------------------------- 
                            // let userAbout=null;
                            // const getUserDetails = async () => {
                            //     try {
                            //         let q;
                            //         q=query(
                            //             collection(db,"EditedUsers"),
                            //         where("uid","==",authId))
                                    
                               
                                
                            //     const snapPromise= new Promise((resolve)=>{
                            //         onSnapshot(q,  (QuerysnapShot)=>{
                            //             QuerysnapShot.forEach((doc) => {
                            //                 userAbout = { ...doc.data(), docId: doc.id };
                            //                 // console.log(userInfo); // Log userInfo here
                            //             });
                            //             resolve();
                            //         })
                            //     })
                            //     await snapPromise;
                            //     console.log("snap",userAbout);
                                    
                            //     } catch (error) {
                            //         console.error("Error fetching user details:", error); 
                            //     }
                            // };
                            // getUserDetails();
                            // console.log("userAbout",userAbout) ;
                            // ------------------------------------- 
                            return(
                                
                                <tr className="text-pink-300" key={index}>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {index+1}.
                                    </td>
                                    {/* <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {userAbout?.displayName}.
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {userAbout?.email}.
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {userAbout?.phoneNo}.
                                    </td> */}
                                    <td className="h-10 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase w-[100%]">
                                        {/* <Slider {...settings}>
                                        {rentImgArray?.map((imgItem,index)=>
                                        <div key={index}>
                                            <img src={imgItem} alt="" />
                                        </div>)}
                                        </Slider> */}
                                        <img src={rentImgArray[0]} alt="" className="w-[100%] h-[10rem] cursor-pointer" onClick={()=>{
                                            setUserHousesImages(rentImgArray)
                                            navigate("/rentImagesPage")
                                        }} />
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {address}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {area}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {availability}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {bhk}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {city}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {furnishing}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {parking}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        ₹{price}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {brokerContact}
                                    </td>
                                    <td className="px-4 text-center"><button className="bg-green-500 p-4 text-white rounded-lg"
                                    onClick={()=>handleRentApproved(item)} 
                                    >{approveState}</button></td>
                                    <td className="px-4 text-center" onClick={()=>handleRentDelete(id,authId)}><button className="bg-red-500 p-4 text-white rounded-lg">Reject</button></td>
                                    <td className="px-4 text-center"><button className="bg-orange-400 p-4 text-white rounded-lg" onClick={()=>{
                                        navigate(`/updateproduct/${id}`)
                                    }}>Edit</button></td>
                                </tr>
                            )
                        })}

                     <h2>All Selling Properties</h2>
                        {/* All Sell Properties  */}
                        {getAllSellProduct && getAllSellProduct?.map((item,index)=>{
                            console.log("helloProduct")
                            console.log("Item",item);
                            const {address,area,availability,bhk,brokerContact,city,furnishing,parking,price,sellImgArray,id,approveState,authId}=item;
                            // setIdNo(uid);
                            //   console.log("selectedCityId",selectedCityId);
                            return(
                                <tr className="text-pink-300" key={index}>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {index}.
                                    </td>
                                    <td className="h-10 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {/* <img src={rentImgArray[0]} className="h-[8rem]" alt="" /> */}
                                        <img src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="h-[8rem]" alt="" />
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {address}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {area}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {availability}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {bhk}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {city}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {furnishing}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {parking}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        ₹{price}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {brokerContact}
                                    </td>
                                    <td className="px-4 text-center"><button className="bg-green-500 p-4 text-white rounded-lg"
                                    onClick={()=>handleSellApproved(item)} 
                                    >{approveState}</button></td>
                                    <td className="px-4 text-center" onClick={()=>handleSellDelete(id,authId)}><button className="bg-red-500 p-4 text-white rounded-lg">Reject</button></td>
                                    <td className="px-4 text-center"><button className="bg-orange-400 p-4 text-white rounded-lg" onClick={()=>{
                                        navigate(`/updateSellproduct/${id}`)
                                    }}>Edit</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ProductDetail;