
import { useEffect } from 'react'

const useCitiesList =  (setListOfCities) => {
    const fetchData= async ()=>{
        const response = await fetch('https://realestate-adea6-default-rtdb.firebaseio.com/citiesList.json');
        const citydata= await response.json();
      
        setListOfCities(citydata);
        // setfilteredListOfCities(citydata)
    }
    useEffect(()=>{
        fetchData()
    },[])
  return;
}

export default useCitiesList
