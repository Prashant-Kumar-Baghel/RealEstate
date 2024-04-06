import  { useEffect, useState } from 'react'

const useCityProperties = (cityId,setFilteredProptyData) => {
    const [proptyData,setProptyData]=useState([]);
    const fetchData= async()=>{
        const response=await fetch(`https://realestate-adea6-default-rtdb.firebaseio.com/cityId%3D${cityId}.json`);
        const data= await response.json();
        // console.log("fetchData",data);
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
