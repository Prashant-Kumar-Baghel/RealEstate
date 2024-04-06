import React, { useContext } from 'react'
import myContext from '../../context/myContext'
import DeleteIcon from '@mui/icons-material/Delete';
const UserHouseImages = () => {
    const {selectedRentImages,setSelectedRentImages}=useContext(myContext);
    // console.log("userHousesImages",userHousesImages)
  return (
    <div className='max-w-[1180px] mx-auto px-[20px] overflow-hidden my-[5vh] flex gap-5 flex-wrap '>
      {selectedRentImages?.map((houseImage,index)=>
      <div className='relative shadow-md' key={index}>
        <img src={houseImage}  alt="" className='w-[31vw] border-[2px] border-solid border-red-600' />
        <button onClick={()=>setSelectedRentImages(selectedRentImages.filter((item)=>houseImage!==item))} className='absolute top-2 right-2'>
            <DeleteIcon sx={{color:"white",background:"black"}}/>
        </button>
        </div>
      )}
    </div>
  )
}

export default UserHouseImages
