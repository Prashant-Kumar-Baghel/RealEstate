import React from 'react'
import { CONTACT_URL } from '../utils/constants'
const Contact = () => {
  return (
    <>
     <div className='max-w-[1180px] mx-auto px-[20px] overflow-hidden mt-[17vh] flex gap-[40px] sm:items-center sm:flex-row flex-col-reverse sm:mt-[14vh] lg:mt-[18ch]'>
        <div className="form sm:w-[calc(50%-20px)] w-[100%]">
            <h2 className='text-center font-bold text-[2.5rem] text-green-600 mb-[40px]'>Contact Form</h2>
            <form action="" className='flex flex-col gap-[30px]'>
               <label htmlFor="nameId">
                   <input className="px-[20px] py-[10px] w-[100%] bg-gray-200 rounded-[27px] font-[500] text-[1.1rem]" type="text" id='nameId' required placeholder='Name'/>
               </label>
               <label htmlFor="emailId">
                   <input className="px-[20px] py-[10px] w-[100%] bg-gray-200 rounded-[27px] font-[500] text-[1.1rem]" type="email" id='emailId' required placeholder='Email'/>
               </label>
               <label htmlFor="contactId">
                   <input className="px-[20px] py-[10px] w-[100%] bg-gray-200 rounded-[27px] font-[500] text-[1.1rem]" type="tel" id='contactId' required placeholder='Contact'/>
               </label>
               
                <input className="bg-green-700 text-gray-50 text-center text-[1.1rem] px-[20px] py-[10px] w-[100%] rounded-[27px] font-[500] cursor-pointer"type="submit" value="Submit Your Details"/>
            </form>
        </div>
        <div className='sm:w-[calc(60%-20px)] w-[100%]'>
            <img className="w-[100%] border-double border-red-700 border-[4px] rounded-[20px] " src={CONTACT_URL} alt="" />
        </div>
     </div>
     {/* map */}
     <div className="mt-[5vh]">
                <h2 className="text-green-500 text-[2.5rem] mb-4 text-center">Our <b>Company</b> Locations</h2>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.698682412772!2d76.68857587503625!3d30.69875288727499!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390feffaea0e29d5%3A0x1fa5fa633af789af!2sGSPL%20Tower!5e0!3m2!1sen!2sin!4v1704200629015!5m2!1sen!2sin" width="100%" height="450" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="google map"></iframe>
        </div>
        
    </>
  )
}

export default Contact