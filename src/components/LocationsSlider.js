import React from 'react'

const LocationsSlider = (props) => {
    const {cityLink,name}=props.locationdata;
  return (
    <div className="relative bg-cover bg-center bg-no-repeat h-[60vh] mb-[5vh]" style={{backgroundImage: `url(${cityLink})`}}>
    <div className="absolute inset-0 bg-black opacity-50"></div>
    <h2 className="relative z-10 flex justify-center items-center text-white text-[2.5rem] h-[100%] text-shadow font-[600]">{name}</h2>
    </div>
  )
}

export default LocationsSlider;