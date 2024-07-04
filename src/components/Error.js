import React from 'react'
import { useRouteError } from 'react-router-dom'
import { ERROR_URL } from '../utils/constants';
const Error = () => {
    const err=useRouteError();
  return (
    <div className='error flex flex-col justify-center items-center my-[5vh]'>
        <h1 className="text-[6rem] text-gray-300 font-bold">{err.status}</h1>
        <h2 className='text-[2rem] font-[500]'>{err.statusText}</h2>
        <p className='text-xl'>Seems like you have lost your way. Let's bring you back home to</p>
        <img src={ERROR_URL} alt="" className='w-[25vw]' />
    </div>
  )
}

export default Error