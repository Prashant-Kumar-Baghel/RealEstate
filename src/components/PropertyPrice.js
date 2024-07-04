import React from 'react'

const PropertyPrice = () => {
  return (
   <section className='pt-[15vh] lg:pt-[20vh] pb-[10vh]'>
     <div className="container container-two ">
        <h1 className='mb-5 text-[2rem] lg:text-[3rem] font-bold'>Not sure which plan is for you?</h1>
        <div className='flex gap-5 flex-col lg:flex-row '>
            <div className='flex flex-col gap-3 border-[2px] border-solid border-orange-400 p-4'>
                <h3 className='text-[2rem] font-bold'>Premium</h3>
                <p className='text-[1.2rem]'>Take our short quiz to save the guesswork and allow us to personalize our recommendations for you.</p>
                <div className='flex flex-col'>
                <span className='text-[1rem]' >Starts at </span>
                <span className='line-through price-font text-[1.8rem] text-gray-500'>₹ 24000</span>
                <span className='price-font text-[1.8rem] font-bold'>₹ 10000</span>
                <span>/month for 12 months</span>
                </div>
                <button className='rounded-full border-[1px] border-solid border-transparent font-[700] text-[1rem] uppercase px-[20px] py-[12px]  text-white hover:bg-[hsl(21,88%,66%)] post-btn '>Buy Now</button>
            </div>
            

            <div className='flex flex-col gap-3 border-[2px] border-solid border-orange-400 p-4'>
                <h3 className='text-[2rem] font-bold'>Standard</h3>
                <p className='text-[1.2rem]'>Take our short quiz to save the guesswork and allow us to personalize our recommendations for you.</p>
                <div className='flex flex-col'>
                <span className='text-[1rem]' >Starts at </span>
                <span className='price-font line-through text-[1.8rem] '>₹ 14000</span>
                <span className='price-font text-[1.8rem] font-bold'>₹ 5000</span>
                <span>/month for 12 months</span>
                </div>
                <button className='rounded-full border-[1px] border-solid border-transparent font-[700] text-[1rem] uppercase px-[20px] py-[12px]  text-white hover:bg-[hsl(21,88%,66%)] post-btn '>Buy Now</button>
            </div>
        </div>
    </div>
   </section>
  )
}

export default PropertyPrice
