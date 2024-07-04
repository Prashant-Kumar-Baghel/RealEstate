
import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { collection, deleteDoc, doc, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faMapMarkerAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
const ListPropertyCard = ( props ) => {
    //for slider
    const navigate=useNavigate();
    const settings = {
        dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 2000,
    cssEase: "linear"
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
    const {price,bhk,address,rentImgArray,sellImgArray,id,approveState,authId}=props.item;
    console.log("Props.Item",props.item);
    const handleRentDelete= async ()=>{
       
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
              await deleteDoc(doc(db,"Rent",id));//delete from the firestoredatabase
             

            }catch(err){
                console.log("Deleteerror",err);
            }
        }
    }

const handleSellDelete= async ()=>{
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
        }catch(err){
            console.log(err);
        }
    }
}
  return (
    // <div className='flex gap-[2rem] sm:w-[75vw] border-[1px] border-solid border-gray-500 my-8 py-[2rem]  flex-col sm:flex-row w-[90vw] px-[2rem]'>
    //     <div className='w-full sm:w-[40%] lg:mx-[2vw]'>
    //         <Slider {...settings}>
    //             {rentImgArray? rentImgArray?.map((imgItem,index)=>
    //             <div key={index}>
    //                 <img src={imgItem} alt="" />
    //             </div>): sellImgArray?.map((imgItem,index)=>
    //             <div key={index}>
    //                 <img src={imgItem} alt="" />
    //             </div>)}
    //         </Slider>
    //     </div>

       
    //     <div className='flex flex-col gap-4 sm:w-[60%] w-full'>
    //         <h4 className='text-[1.25rem]'>{bhk} BHK Flat For Rent in {address}</h4>
    //         <div className='px-4 flex flex-col gap-4 bg-gray-200 py-3 rounded-md h-[38vh]'>
    //             <div className='flex   justify-between lg:justify-around '>
    //                 <div className='flex flex-col'>
    //                     <span className='text-gray-500 text-[1.1rem]'>FURNISHING</span>
    //                     <span>{furnishing}</span>
    //                 </div>
    //                 <div className='flex flex-col gap-2'>
    //                     <span className='text-gray-500 text-[1.1rem]'>AVAILABILITY</span>
    //                     <span>{availability}</span>
    //                 </div>
    //             </div>
    //             <div className='flex   justify-between lg:justify-around'>
    //                 <div className='flex flex-col gap-2 pr-[1.2vw]'>
    //                     <span className='text-gray-500 text-[1.1rem]'>Area</span>
    //                     <span>{area}</span>
    //                 </div>
    //                 <div className='flex flex-col gap-2 pr-[1.2vw]'>
    //                     <span className='text-gray-500 text-[1.1rem]'>PARKING</span>
    //                     <span>{parking}</span>
    //                 </div>
    //             </div>
    //             <div className='flex   justify-between lg:justify-around'>
    //                 <span className='font-[600] text-[1.6rem]'>₹{price}</span>
    //                 {rentImgArray?
    //                 <button className="bg-red-500 p-4 text-white rounded-lg" onClick={handleRentDelete}>Delete</button>:
    //                 <button className="bg-red-500 p-4 text-white rounded-lg" onClick={handleSellDelete}>Delete</button>}
    //            </div>
    //            {/* <div className=' px-4 '> */}
    //            <button className="bg-orange-400 py-4 px-8 text-white rounded-lg" onClick={()=>{
    //                                     navigate(`/update/${id}`)
    //                                 }}>Edit</button>
    //            {/* </div> */}
    //         </div>
    //     </div>
      
    // </div>


    <tbody>
                                
                                    
    <tr >
                        <td>
                            <div className="d-flex align-items-center gap-3">
                                <div className="cart-item__thumb">
                                <Slider {...settings}>
                                     {rentImgArray? rentImgArray?.map((imgItem,index)=>
                                    <div key={index}>
                                        <img src={imgItem} alt="" />
                                    </div>): sellImgArray?.map((imgItem,index)=>
                                    <div key={index}>
                                        <img src={imgItem} alt="" />
                                    </div>)}
                                 </Slider>
                                </div>
                                <div className="cart-item__content">
                                    <h6 className="cart-item__title font-[500] text-[1.6rem]">{bhk} BHK</h6>
                                <p className="property-item__location d-flex gap-2 text-[1.1rem] text-gray-400 mb-1"> 
                                    <span className="icon "><FontAwesomeIcon icon={faMapMarkerAlt} style={{color:"orange"}} /> </span> 
                                    {address}
                                 </p>
                                    <span className="cart-item__price">Price: <span className="fw-500 text-heading">₹{price}</span></span> <br />
                                    <span><b>Property Status :</b> {approveState==="Property Approved"?"Property Approved":"Pending"}</span>
                                </div>
                            </div>
                        </td>
                        
                        <td>
                        {rentImgArray?
                            <button type="button" className="rounded-btn edit-btn  text-info bg-info m-auto bg-opacity-10 flex-shrink-0" onClick={handleRentDelete}
                            disabled={approveState === "Property Approved"}>
                             <FontAwesomeIcon icon={faTrash} />
                            </button>:
                            <button type="button" className="rounded-btn edit-btn  text-info bg-info m-auto bg-opacity-10 flex-shrink-0" onClick={handleSellDelete}
                            disabled={approveState === "Property Approved"}>
                             <FontAwesomeIcon icon={faTrash} /></button>
                        }
                        </td>
                         <td>
                             <button type="button" className="rounded-btn delete-btn  text-danger bg-danger bg-opacity-10 flex-shrink-0 "
                             onClick={()=>{
                             navigate(`/update/${id}`)
                             }}
                             disabled={approveState === "Property Approved"}>
                                <FontAwesomeIcon icon={faEdit} />
                            </button>
                        </td> 
                    
    </tr>
           
        
    </tbody>
   
  )
}

export default ListPropertyCard

