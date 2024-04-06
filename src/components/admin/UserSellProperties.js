import React, { useContext, useEffect, useState } from 'react'
import myContext from '../../context/myContext'
import { useNavigate, useParams } from 'react-router-dom';
import { collection, deleteDoc, doc, getDoc, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../utils/firebase';

const UserSellProperties = () => {
    const {cityList,getAllSellProduct,userData}=useContext(myContext);
    console.log("getAllProduct",getAllSellProduct);
    const {userId}=useParams();
    console.log("idok",userId)
    const [getAllUserSellProperties,setGetAllUserSellProperties]=useState([])
    console.log("getAllRentProperties",getAllUserSellProperties);  

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


        // --------------------------------------------- 


    // const addedDocId=()=>{

    // }
    // useEffect(()=>{
    //     addedDocId();
    // },[])
    const handleDelete= async (id,authId)=>{
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
         await deleteDoc(doc(db,"Sell",id));
       }catch(err){
           console.log(err);
       }
   }
}
    const handleApproved=async (item)=>{
        const {address,area,availability,bhk,city,furnishing,parking,price,rentImgArray,id}=item;
        const selectedCityItem=cityList.find((cityItem)=>cityItem?.city===item?.city)
        // console.log("selectedCity",selectedCityItem)
        // console.log("selectedCityItem",item)
        const selectedcityId=selectedCityItem?.id;
        console.log("selectedcityId",selectedcityId)
        // setCityId(selectedcityId);
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
                            console.log("helloProduct")
                            console.log("Item",item);
                            const {address,area,availability,bhk,brokerContact,city,furnishing,parking,price,sellImgArray,id,approveState,authId}=item;
                             
                            //   console.log("selectedCityId",selectedCityId);
                            return(
                                <tr className="text-pink-300" key={index}>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {index+1}.
                                    </td>
                                    <td className="h-10 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        <img src={sellImgArray[0]} className="h-[8rem]" alt="" />
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
                                    onClick={()=>handleApproved(item)} 
                                    >{approveState}</button></td>
                                    <td className="px-4 text-center" onClick={()=>handleDelete(id,authId)}><button className="bg-red-500 p-4 text-white rounded-lg">Reject</button></td>
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

