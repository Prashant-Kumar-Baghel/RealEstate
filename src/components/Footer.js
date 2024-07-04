import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarker } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { LOGO_URL } from '../utils/constants';
import { faFacebook,faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faTwitter,faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
const Footer = () => {
  return (
    
    <div className='bg-[#191919]'>
      <div className=' container container-two grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4  gap-4 py-[8vh]'>
      {/* Location  */}
      <div >
          <h4 className='mb-[2vh] text-white text-[1.5rem] font-[600]'>Location and Direction</h4>
          <div className='flex flex-col gap-[10px]'>
            {/* Address */}
            <div>
              <div className='flex gap-[10px] items-center'>
                <FontAwesomeIcon className="text-white" icon={faMapMarker} />
                <span className="text-white text-[1.2rem]">Address</span>
              
              </div>
              <p className="text-white">Lorem ipsum, dolor sit amet <br />consectetur adipisicing elit.</p>
            </div>

          {/* Phone No:- */}
            <div>
              <div className='flex gap-[10px] items-center'>
              <FontAwesomeIcon className="text-white" icon={faPhone} />
                <span className="text-white text-[1.2rem]">Phone</span>
              </div>
              <a className="text-white" href="mailto:sarthakdigitalprerna@gmail.com">sarthakdigitalprerna@gmail.com</a>
            </div>

            {/* Email */}
            <div>
              <div className='flex gap-[10px] items-center'>
                <FontAwesomeIcon className="text-white" icon={faEnvelope} />
                <span className="text-white text-[1.2rem]">Email</span>
              </div>
              <a className="text-white" href="tel:8800755316">+91-8800755316</a>
            </div>
          </div>
      </div>

      {/* Company */}
      <div className='flex flex-col gap-[10px]'>
        <h4 className='mb-[2vh] text-white text-[1.5rem] font-[600]'>  Company</h4>
        <div>
          <Link className="text-white text-[1.2rem]  no-underline flex gap-3 items-center" to="/about"> <FontAwesomeIcon icon={faAngleDoubleRight} style={{ color: 'orange',fontSize:'1rem' }} /> <span className='hover:text-orange-500'> About Us</span></Link>
        </div>
        <div>
          <Link className="text-white text-[1.2rem] hover:text-orange-500 no-underline flex gap-3 items-center" to="/contact"> <FontAwesomeIcon icon={faAngleDoubleRight} style={{ color: 'orange',fontSize:'1rem' }} /> <span className='hover:text-orange-500'>Contact Us</span></Link>
        </div>
        <div>
          <Link className="text-white text-[1.2rem] hover:text-orange-500 no-underline flex gap-3 items-center" to="/"> <FontAwesomeIcon icon={faAngleDoubleRight} style={{ color: 'orange',fontSize:'1rem' }} /> <span className='hover:text-orange-500'>Terms & Conditions</span></Link>
        </div>
        <div>
          <Link className="text-white text-[1.2rem] hover:text-orange-500 no-underline flex gap-3 items-center" to="/"> <FontAwesomeIcon icon={faAngleDoubleRight} style={{ color: 'orange',fontSize:'1rem' }} /> <span className='hover:text-orange-500'> Privacy Policy</span></Link>
        </div>
      </div>

      {/* Links */}
      <div className='flex flex-col gap-[10px]'>
        <h4 className='mb-[2vh] text-white text-[1.5rem] font-[600]'>Links</h4>
        <div>
          <Link className="text-white text-[1.2rem] hover:text-orange-500 no-underline flex gap-3 items-center" to="/"> <FontAwesomeIcon icon={faAngleDoubleRight} style={{ color: 'orange',fontSize:'1rem' }} /> <span className='hover:text-orange-500'>Flat for Reant in Mohali</span></Link>
        </div>
        <div>
            <Link className="text-white text-[1.2rem] hover:text-orange-500 no-underline flex gap-3 items-center" to="/"><FontAwesomeIcon icon={faAngleDoubleRight} style={{ color: 'orange',fontSize:'1rem' }} /> <span className='hover:text-orange-500'>Flat for Reant in Zirakpur</span></Link>
        </div>
        <div>
           <Link className="text-white text-[1.2rem] hover:text-orange-500 no-underline flex gap-3 items-center" to="/"><FontAwesomeIcon icon={faAngleDoubleRight} style={{ color: 'orange',fontSize:'1rem' }} /> <span className='hover:text-orange-500'>Flat for Reant in Chandigarh</span></Link>
        </div>
        <div>
            <Link className="text-white text-[1.2rem] hover:text-orange-500 no-underline flex gap-3 items-center" to="/"><FontAwesomeIcon icon={faAngleDoubleRight} style={{ color: 'orange',fontSize:'1rem' }} /> <span className='hover:text-orange-500'>Flat for Reant in Manimajra</span></Link>
        </div>
        <div>
             <Link className="text-white text-[1.2rem] hover:text-orange-500 no-underline flex gap-3 items-center" to="/"><FontAwesomeIcon icon={faAngleDoubleRight} style={{ color: 'orange',fontSize:'1rem' }} /> <span className='hover:text-orange-500'>Flat for Rent in Sector 15</span></Link>
        </div>
      </div>

      {/* social media */}
      <div className='flex flex-col gap-[10px]'>
        <div>
          <img className="w-[100px] rounded-[4rem]"src={LOGO_URL} alt="" />
        </div>
        <div className='flex gap-[10px] flex-wrap'>
          <FontAwesomeIcon className="text-white text-[2rem] pr-3"icon={faFacebook} />
          <FontAwesomeIcon icon={faTwitter} className="text-white text-[2rem] pr-3" />
          <FontAwesomeIcon icon={faLinkedin} className="text-white text-[2rem] pr-3" />
          <FontAwesomeIcon icon={faInstagram} className="text-white text-[2rem] pr-3" />
          <FontAwesomeIcon icon={faYoutube} className="text-white text-[2rem] pr-3" />
        </div>
      </div>

      </div>
    </div>
  )
}

export default Footer