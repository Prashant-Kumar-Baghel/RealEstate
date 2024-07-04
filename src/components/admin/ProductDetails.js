import {  collection, deleteDoc, doc, onSnapshot,  query, updateDoc, where } from "firebase/firestore";
import { useContext,  useState } from "react";
import { useNavigate } from "react-router-dom";
import { db} from "../../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import myContext from "../../context/myContext";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const ProductDetail = () => {
    const {getAllProduct,getAllSellProduct,setRentItem,setRentImages,cityList,setSellItem,setSellImages}=useContext(myContext);
    const navigate=useNavigate();

    const handleRentDelete= async (item)=>{
        const {id,authId,city,houseApprovedId}=item;
        let q;
      q=query(
        collection(db,"EditedUsers"),
      where("uid","==",authId))

   let userInfo=null;
 
   const snapPromise= new Promise((resolve)=>{
    onSnapshot(q,  (QuerysnapShot)=>{
        QuerysnapShot.forEach((doc) => {
            userInfo = { ...doc.data(), docId: doc.id };
        });
        resolve();
      })
   })
   await snapPromise;
   await updateDoc(doc(db,"EditedUsers",userInfo?.docId),{
    ...userInfo,postProperty:true,countProperties:userInfo?.countProperties-1
  })


       const rentCity=cityList.find((cityItem)=>cityItem.city===city);

        if(window.confirm("Are you want to delete that user?")){
            try{
              await deleteDoc(doc(db,"Rent",id));//delete from the firestoredatabase
             if(houseApprovedId){
                const res =await fetch(`https://realestate-adea6-default-rtdb.firebaseio.com/cityId%3D${rentCity?.id}/rent/${houseApprovedId}.json`,
                {
                  method: "DELETE",
                  headers: {
                      "Content-type": "application/json"
                  }
                })
             }

            }catch(err){
                console.log("Deleteerror",err);
            }
        }
    }

    const handleSellDelete= async (item)=>{

        const {id,authId,houseSellApprovedId,city}=item;
        let q;
      q=query(
        collection(db,"EditedUsers"),
      where("uid","==",authId))
    
   let userInfo=null;
 
   const snapPromise= new Promise((resolve)=>{
    onSnapshot(q,  (QuerysnapShot)=>{
        QuerysnapShot.forEach((doc) => {
            userInfo = { ...doc.data(), docId: doc.id };
        });
        resolve();
      })
   })
   await snapPromise;
   await updateDoc(doc(db,"EditedUsers",userInfo?.docId),{
    ...userInfo,postProperty:true,countProperties:userInfo?.countProperties-1
  })

        if(window.confirm("Are you want to delete that user?")){
            try{
              await deleteDoc(doc(db,"Sell",id));
              if(houseSellApprovedId){
                const rentCity=cityList.find((cityItem)=>cityItem?.city===city);
                const res=fetch(`https://realestate-adea6-default-rtdb.firebaseio.com/cityId%3D${rentCity?.id}/sell/${houseSellApprovedId}.json`,
            {
                method:"DELETE",
                headers:{
                    "Content-type":"application/json"
                }
            })
              }
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

    
    
    const handleRentApproved=async (item)=>{
        const {address,area,bhk,city,furnishing,parking,price,rentImgArray,id,propertyType,mobile,description,featuresArray,name,identity}=item;
        //The find() method returns the value of the first element that passes a test.
        //The find() method executes a function for each array element.
        const selectedCityItem=cityList.find((cityItem)=>cityItem?.city===item?.city)
        const selectedcityId=selectedCityItem?.id;
        // setCityId(selectedcityId);
        //way to post the data in realtime database.
        //1)The first argument to fetch is the URL to which the request is sent. In this case, it's a Firebase Realtime Database URL with a dynamic parameter selectedcityId.
        // 2)The second argument to fetch is an object containing configurations for the request. It includes:
        // method: "POST": Specifies that the HTTP request method is POST. This typically means the client is sending data to the server.
        // headers: An object specifying headers for the request. In this case, it includes a header indicating that the content type of the request body is JSON.
        // body: The body of the request. It's constructed using JSON.stringify() to convert a JavaScript object into a JSON string. The object includes various properties such as address, area, availability, etc. These properties seem to represent details about a real estate property, such as its address, size, availability, etc.

        const response= await fetch(`https://realestate-adea6-default-rtdb.firebaseio.com/cityId%3D${selectedcityId}/rent.json`,
                    {
                        method:"POST",
                        headers:{
                            "Content-type":"application/json"
                        },
                        //Alway send that to server in string form.
                        body:JSON.stringify({
                            address,
                            propertyType,
                            mobile,
                            description,
                            area,
                            featuresArray,
                            bhk,
                            city,
                            furnishing,
                            parking,
                            price,
                            rentImgArray,
                            name,
                            identity,
                            id

                        })
                    }
        )
        const data= await response.json();

        // -------------------------- 
        if(data?.name){
            const ref=fetch(`https://realestate-adea6-default-rtdb.firebaseio.com/cityId%3D${selectedcityId}/rent/${data?.name}.json`,
          {
            method:"PATCH",
            headers:{
              "Content-type":"application/json"
            },
            body:JSON.stringify({
                houseApprovedId:data?.name,
                selectedcityId:selectedcityId
            })
          })
          }
        // ------------------------------

        if(response){
            alert("Are you sure to want approve this property?");
            await updateDoc(doc(db,"Rent",id),{
                ...item,approveState:"Property Approved",houseApprovedId:data?.name// houseApprovedId:data?.name is  firebase automatically generates a unique key (ID) for that data. After making the POST request, Firebase returns a response containing the key (ID) of the newly created data. You can access this ID from the response of the fetch request.
            })




            

            
        }
    }

    const handleSellApproved=async (item)=>{
        const {address,area,propertyType,mobile,bhk,description,featuresArray,city,furnishing,parking,price,sellImgArray,id}=item;
        const selectedCityItem=cityList.find((cityItem)=>cityItem?.city===item?.city)
        const selectedcityId=selectedCityItem?.id;
        const res= await fetch(`https://realestate-adea6-default-rtdb.firebaseio.com/cityId%3D${selectedcityId}/sell.json`,
                    {
                        method:"POST",
                        headers:{
                            "Content-type":"application/json"
                        },
                        body:JSON.stringify({
                            address,
                            propertyType,
                            mobile,
                            description,
                            area,
                            featuresArray,
                            bhk,
                            city,
                            furnishing,
                            parking,
                            price,
                            sellImgArray,
                            id

                        })
                    }
        )
        const data= await res.json();

        
        // -------------------------- 
        if(data?.name){
            const ref=fetch(`https://realestate-adea6-default-rtdb.firebaseio.com/cityId%3D${selectedcityId}/sell/${data?.name}.json`,
          {
            method:"PATCH",
            headers:{
              "Content-type":"application/json"
            },
            body:JSON.stringify({
                houseApprovedId:data?.name,
                selectedcityId:selectedcityId
            })
          })
          }
        // ------------------------------
        if(res){
            alert("Are you sure to want approve this property?");
            await updateDoc(doc(db,"Sell",id),{
                ...item,approveState:"Property Approved",houseSellApprovedId:data?.name// houseApprovedId:data?.name is  firebase automatically generates a unique key (ID) for that data. After making the POST request, Firebase returns a response containing the key (ID) of the newly created data. You can access this ID from the response of the fetch request.
            })

            
        }
    }
   
    return (
        <div>
            <div className="py-5 flex justify-between items-center">
                {/* text  */}
                <h1 className=" text-xl text-pink-300 font-bold">All Product</h1>
            </div>

            {/* table  */}
            <div className="w-full overflow-x-auto mb-5">
                <table className="w-full text-left border border-collapse sm:border-separate border-pink-100 text-pink-400" >
                    <tbody>
                        
                        <tr>
                            <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara">S.No.</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Image</th>
                            <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara">Name</th>
                            <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara">Address</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Area</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Mobile Number</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">BHK</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">City</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Furnishing</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Parking</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Price</th> 
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Property Type</th> 
                             <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Action</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Action</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Action</th>
                        </tr>



                        {/* All Rent Properties  */}
                        <h2>All Rent Properties</h2>
                        {getAllProduct && getAllProduct?.map( (item,index)=>{
                            const {address,area,bhk,mobile,propertyType,city,furnishing,parking,price,rentImgArray,id,approveState,name}=item;
                            return(
                                
                                <tr className="text-pink-300" key={index}>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {index+1}.
                                    </td>
                                    
                                    <td className="h-10 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase w-[100%]">
                                        
                                        <img src={rentImgArray[0]} alt="" className="w-[100%] h-[10rem] cursor-pointer" onClick={()=>{
                                            setRentItem(item);
                                            setRentImages(rentImgArray)
                                            navigate("/rentImagesPage")
                                        }} />
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {name}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {address}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {area}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {mobile}
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
                                        {propertyType}
                                    </td>
                                    <td className="px-4 text-center">
                                    <button className="bg-green-500 p-4 text-white rounded-lg"
                                    onClick={()=>handleRentApproved(item)} 
                                    >{approveState}</button></td>
                                    <td className="px-4 text-center" onClick={()=>handleRentDelete(item)}><button className="bg-red-500 p-4 text-white rounded-lg">Reject</button></td>
                                    <td className="px-4 text-center"><button className="bg-orange-400 p-4 text-white rounded-lg" onClick={()=>{
                                        navigate(`/updateproduct/${id}`)
                                    }}>Edit</button></td>
                                </tr>
                            )
                        })}

                     <h2>All Selling Properties</h2>
                        {/* All Sell Properties  */}
                        {getAllSellProduct && getAllSellProduct?.map((item,index)=>{
                            const {address,area,mobile,propertyType,bhk,city,furnishing,parking,price,sellImgArray,id,approveState}=item;
                         
                            return(
                                <tr className="text-pink-300" key={index}>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {index}.
                                    </td>
                                    <td className="h-10 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        <img src={sellImgArray[0]} 
                                        className="h-[8rem] cursor-pointer" alt="" onClick={()=>{
                                            setSellItem(item);
                                            setSellImages(sellImgArray)
                                            navigate("/sellImagesPage")
                                        }}/>
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {address}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {area}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {mobile}
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
                                        {propertyType}
                                    </td>
                                    <td className="px-4 text-center"><button className="bg-green-500 p-4 text-white rounded-lg"
                                    onClick={()=>handleSellApproved(item)} 
                                    >{approveState}</button></td>
                                    <td className="px-4 text-center" onClick={()=>handleSellDelete(item)}><button className="bg-red-500 p-4 text-white rounded-lg">Reject</button></td>
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