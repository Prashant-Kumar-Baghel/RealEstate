import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, CardContent, CardDescription, CardHeader, CardMeta, GridColumn } from 'semantic-ui-react'
import ModalComp from './ModalComp';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../utils/firebase';


const ItemCard = (props,{users,setUsers}) => {
    const {price,bhk,address,area,img,id}=props.item;
    const [open,setOpen]=useState(false);
    const [user,setUser]=useState({})
    const navigate=useNavigate();

    const handleModal=()=>{
      setOpen(true)
      setUser(props.item);
    }
    const handleDelete= async (id)=>{
      if(window.confirm("Are you sure to delete that user ?")){
        try{
          setOpen(false)
          await deleteDoc(doc(db,"users",id));
          setUsers(users.filter((user)=>user.id!==id))
        }catch(err){
          console.log(err)
        }
      }
    }
  return (
<>
    {/* <div className='flex flex-col gap-16 mt-7 border-solid border-[2px] border-black p-5'>
                        <div>
                        <img src={img} className="h-[35vh]" alt="" />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h2>{name}</h2>
                            <span>{email}</span>
                            <span>{contact}</span>
                            <p>{info}</p>
                            <Button color='green' onClick={()=>{
                                navigate(`/update/${id}`)
                            }}>UPDATE</Button>
                            <Button color='purple' onClick={handleModal}>View</Button>
                            {open && <ModalComp open={open}
                            setOpen={setOpen}
                            handleDelete={handleDelete}
                            {...user}
                            />}
                        </div>

    </div> */}
    
        
                   <GridColumn>
                    <Card>
                        {/* <Image src={img} wrapped ui={false} size='medium' style={{height:"238px",
                    width:"100%",borderRadius:"50%"}}/> */}
                        <div className='h-[238px] w-[100%] '>
                            <img src={img} className='h-[100%] w-[100%]' alt="" />
                        </div>
                        <CardContent>
                        <CardHeader ><span className='text-[2rem]'>{bhk} BHK Flat</span></CardHeader>
                        <CardMeta>
                            <div className='mt-[1vh] text-[1.2rem]'>
                                <span >{price} Thousand | </span>
                                <span>{area} sqft</span>
                            </div>
                        </CardMeta>
                        <CardDescription>
                            <span className='text-[1.2rem]'>{address}</span>
                        </CardDescription>
                        </CardContent>
                        <CardContent extra>
                        <div className='flex justify-between'>
                            <Button color='green' onClick={()=>{
                                    navigate(`/update/${id}`)
                                }}>UPDATE</Button>
                            <Button color='purple' onClick={handleModal} style={{paddingInline:"2.2vw"}}>View</Button>
                            {open && <ModalComp open={open}
                            setOpen={setOpen}
                            handleDelete={handleDelete}
                            {...user}
                            />}
                        </div>
                        </CardContent>
                    </Card>   
                    </GridColumn>     
        
   

</>
  )
}

export default ItemCard
