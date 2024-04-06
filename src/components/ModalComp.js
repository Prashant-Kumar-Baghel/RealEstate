import React from 'react'
import { Button, Header, Image, Modal, ModalActions, ModalContent, ModalDescription, ModalHeader } from 'semantic-ui-react'


const ModalComp = ({price,bhk,address,area,open,setOpen,img,id,handleDelete}) => {
  return (
    <div>
        <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
       
        >
        <ModalHeader>User Details</ModalHeader>
        <ModalContent image>
            <Image size='medium' src={img} wrapped />
            <ModalDescription>
            <Header><span className='text-[2.2rem]'>{address}</span></Header>
            <p className='text-[1.5rem]'> {bhk} BHK Flat</p>
            <p className='text-[1.5rem]'>{price} Thousand</p> 
                <p className='text-[1.5rem]'>{area} sqft</p>
            
           
            </ModalDescription>
        </ModalContent>
        <ModalActions>
            <Button color='black' onClick={() => setOpen(false)}>
            cancel
            </Button>

            <Button
            content="Delete"
            labelPosition='right'
            icon='checkmark'
            onClick={()=>handleDelete(id)}
            positive
            />
        </ModalActions>
        </Modal> 
    </div>
  )
}

export default ModalComp
