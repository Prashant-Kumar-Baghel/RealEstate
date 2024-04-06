import React from 'react'
import { GOOGLE_URL } from '../utils/constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const ReviewSlider = (props) => {
    const{name,review}=props.reviewdata;
  return (
    <>
            <div className="review-box flex flex-col justify-center items-center gap-[10px] p-[20px] border-[5px] border-[solid] border-green-500">
                        <img className="h-[5vh] rounded-full bg-white" src={GOOGLE_URL} alt=""/>
                        <h5>{name}</h5>
                        <div className="flex text-[#FDC93B]">
                            <FontAwesomeIcon icon={faStar}  />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                        <p className='text-center'>{review}</p>
        </div>

    </>
  )
}

export default ReviewSlider