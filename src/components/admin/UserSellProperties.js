import React, { useContext, useEffect, useState } from 'react'
import myContext from '../../context/myContext'
import { useNavigate, useParams } from 'react-router-dom';
import { collection, deleteDoc, doc, getDoc, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../utils/firebase';

const UserSellProperties = () => {
    const {cityList,setSellItem,setSellImages}=useContext(myContext);
    const {userId}=useParams();
    const [getAllUserSellProperties,setGetAllUserSellProperties]=useState([])

     const navigate=useNavigate();

    const getAllSellPropertiesfunction=()=>{
    try{
        const q=query(
            collection(db,"Sell"),
            where('authId','==',userId)
            )
        const data=onSnapshot(q,(QuerysnapShot)=>{
            let sellArray=[];
            QuerysnapShot.forEach((doc)=>{
                sellArray.push({...doc.data(),id:doc.id})
            })
            setGetAllUserSellProperties(sellArray);
        }) 
        return ()=>data;
    }catch(err){
        console.log(err);
    } 
}
    useEffect(()=>{
        getAllSellPropertiesfunction();
    },[])

    // ----------------------------------- 


    const handleSellDelete= async (item)=>{
        //We do updateDoc here to show only those users which has added propery on admin page.
   // ------------------------------------ 
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
           const res=fetch(`https://realestate-adea6-default-rtdb.firebaseio.com/cityId%3D${rentCity?.id}/${houseSellApprovedId}.json`,
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

const handleSellApproved=async (item)=>{
    const {address,area,availability,bhk,city,furnishing,parking,price,sellImgArray,id}=item;
    const selectedCityItem=cityList.find((cityItem)=>cityItem?.city===item?.city)
    const selectedcityId=selectedCityItem?.id;
    const res= await fetch(`https://realestate-adea6-default-rtdb.firebaseio.com/cityId%3D${selectedcityId}.json`,
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
                        sellImgArray,
                        id

                    })
                }
    )
    const data= await res.json();

    if(res){
        
        alert("Are you sure to want approve this property?");
        await updateDoc(doc(db,"Sell",id),{
            ...item,approveState:"Property Approved",houseSellApprovedId:data?.name// houseApprovedId:data?.name is  firebase automatically generates a unique key (ID) for that data. After making the POST request, Firebase returns a response containing the key (ID) of the newly created data. You can access this ID from the response of the fetch request.
        })

        
    }
}
  return (
    <div className="w-full overflow-x-auto mb-5">
                <table className="w-full text-left border border-collapse sm:border-separate border-pink-100 text-pink-400" >
                    <tbody>
                        <tr>
                            <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara">S.No.</th>
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
                        {getAllUserSellProperties && getAllUserSellProperties?.map((item,index)=>{
                            const {address,area,availability,bhk,brokerContact,city,furnishing,parking,price,sellImgArray,id,approveState,authId}=item;
                             
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
  )
}

export default UserSellProperties;

