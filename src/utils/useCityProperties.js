import  { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const useCityProperties = (cityId,setFilteredProptyData) => {
    const [proptyData,setProptyData]=useState([]);
    const propertyType=useSelector((store)=>store.features.ispropertyRent);
    const fetchData= async()=>{

        //here if  propertyType === true then we need to display rented property and if it is false then display property which need to buy.
        const endpoint = propertyType === true 
        ? `https://realestate-adea6-default-rtdb.firebaseio.com/cityId%3D${cityId}/rent.json` 
        : `https://realestate-adea6-default-rtdb.firebaseio.com/cityId%3D${cityId}/sell.json`;
        const response=await fetch(endpoint);
        const data= await response.json();
        console.log("fetchData",data);
        setProptyData(data);
        setFilteredProptyData(data)
    }
    useEffect(()=>{
        fetchData()
    },
    [])
  return proptyData;
}

export default useCityProperties
