import { useContext } from "react";
import { ABOUT_IMG_URL, ABOUT_URL } from "../utils/constants";
import MyState from "../context/myState";
import myContext from "../context/myContext";
const About=()=>{
    // const {rentImages}=useContext(myContext);
    // console.log("rentImages",rentImages);
    return(<>
        <h1 className="text-center font-bold text-[2rem] bg-cover bg-no-repeat bg-center h-[20vh] text-white py-10 mt-[4rem] md:mt-[6rem]" style={{ backgroundImage: `url(${ABOUT_IMG_URL})` }}>ABOUT US/</h1>
        <div className="max-w-[1180px] mx-auto px-[20px] overflow-hidden my-[5vh] flex-wrap">
            {/* text-image */}
            {/* {rentImages.map((imgURL)=>
                <img src={imgURL} alt="" className="w-[10vw] h-[18vh] rounded-sm"/>
            )} */}
            <div className="flex gap-[40px] md:items-start flex-col-reverse md:flex-row w-[100%]">
                <div className="md:w-[calc(45%-20px)] w-[100%] ">
                    <h2 className="text-green-600 text-[2rem] md:text-[3rem] mb-2"><b>About</b> Company</h2>
                    <p className="text-justify md:text-[1.2rem]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae quam vitae id quae error quasi asperiores repellat est, tempora fugit dolorem veniam rem ratione, consequuntur aperiam mollitia repudiandae repellendus! Dolores optio perferendis in, sint distinctio porro dolorem placeat laborum et?Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae quam vitae id quae error quasi asperiores repellat est, tempora fugit dolorem veniam rem ratione, consequuntur aperiam mollitia repudiandae repellendus! Dolores optio perferendis in, sint distinctio porro dolorem placeat laborum et?</p>
                </div>
                <div className="md:w-[calc(55%-20px)] w-[100%]">
                    <img className="w-[100%] h-[40vh] border-green-500" src={ABOUT_URL} alt="" />
                </div>
            </div>
        </div>
        {/* map */}
        <div className="mt-[10vh]">
                <h2 className="text-green-500 text-[2rem] mb-4 text-center md:text-[3rem]">Our <b>Company</b> Locations</h2>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.698682412772!2d76.68857587503625!3d30.69875288727499!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390feffaea0e29d5%3A0x1fa5fa633af789af!2sGSPL%20Tower!5e0!3m2!1sen!2sin!4v1704200629015!5m2!1sen!2sin" width="100%" height="450" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="google map"></iframe>
        </div>
        </>
    )
}
export default About ;
// import React from 'react'

// const About = () => {
//   return (
//     <div className='max-w-[1180px] mx-auto px-[20px] overflow-hidden'>
//       <h1>About</h1>
//     </div>
//   )
// }

// export default About
