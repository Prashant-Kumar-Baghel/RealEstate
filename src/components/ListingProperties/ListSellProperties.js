



import React, { useContext, useEffect, useState } from 'react'
import myContext from '../../context/myContext'
import { collection,  onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../utils/firebase';
import ListPropertyCard from './ListPropertyCard';

const ListSellProperties
= () => {
    const {userData}=useContext(myContext);
    const {uid}=userData;
    const [getAllUserSellProperties,setGetAllUserSellProperties]=useState([])

    const getAllSellPropertiesfunction=()=>{
    try{
        const q=query(
            collection(db,"Sell"),
            where('authId','==',uid)
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

 

   
  return (
    <div className="w-full overflow-x-auto mb-5">
            <div className="overflow-auto">
                        <div className="card border-0 shadow-lg min-w-maxContent">
                            <div className="card-body p-[24px]">
                                <table className="table style-two">
                                    <thead>
                                        <tr className='border-b-[2px] border-solid border-gray-300'>
                                        <th>My Properties </th>
                                        <th>Actions</th>
                                        <th>Delete</th>
                                        </tr>
                                    </thead>

                                    {getAllUserSellProperties && getAllUserSellProperties?.map((item,index)=>{
                            
                                            return(
                                                <ListPropertyCard key={index} item={item}/>
                                                
                                            )
                                        })}
                                
                                </table>
                            </div>
                        </div>
            </div>

                       
            </div>
  )
}

export default ListSellProperties


