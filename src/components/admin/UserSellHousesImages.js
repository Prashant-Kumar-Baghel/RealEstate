import React, { useContext } from 'react'
import myContext from '../../context/myContext'
import DeleteIcon from '@mui/icons-material/Delete';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../utils/firebase';
const UserSellHousesImages =  () => {
    const {sellItem,sellImages,setSellImages,cityList}=useContext(myContext);
    const {address,area,availability,bhk,city,furnishing,parking,price,sellImgArray,id,houseSellApprovedId}=sellItem;
    
    const handleButtonClick=async (houseImage)=>{
      let sellArray=sellImages.filter((item)=>item!==houseImage);
      setSellImages(sellArray);
      await updateDoc(doc(db,"Sell",id),{...sellItem,sellImgArray:sellArray})
      const rentCity=cityList.find((cityItem)=>cityItem.city===sellItem?.city)
    
      if(houseSellApprovedId){
        
        const res=await fetch(`https://realestate-adea6-default-rtdb.firebaseio.com/cityId%3D${rentCity?.id}/sell/${houseSellApprovedId}.json`,
                 {
                  method:"PATCH",
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
                      sellImgArray:sellArray,
                      id
                  })
                 })
      }
    }
  return (
    <div className='max-w-[1180px] mx-auto px-[20px] overflow-hidden my-[5vh] flex gap-5 flex-wrap '>
      {sellImages?.map((houseImage,index)=>
      <div className='relative shadow-md' key={index}>
        <img src={houseImage}  alt="" className='w-[31vw] border-[2px] border-solid border-red-600' />
        <button onClick={()=>handleButtonClick(houseImage)} className='absolute top-2 right-2'>
            <DeleteIcon sx={{color:"white",background:"black"}}/>
        </button>
        </div>
      )}
    </div>
  )
}

export default UserSellHousesImages;
