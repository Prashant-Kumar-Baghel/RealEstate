import React, { useContext } from 'react'
import myContext from '../context/myContext';
import { Avatar } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

const AccountProfileTab = () => {
    const {userData}=useContext(myContext);
  return (
 <>
 

 <div className='flex gap-4 p-4 shadow-lg bg-white flex-col lg:flex-row'>
      {(userData?.avatar)?
              <span className="w-full h-[40vh] lg:w-[20%] lg:h-[25vh] rounded-sm bg-orange-400"></span>
              :
              <img src={userData?.photoURL} className="w-full h-[40vh] lg:w-[20%] lg:h-[25vh] rounded-sm" alt="" />
        }

      <div className='flex flex-col gap-3 lg:gap-4'>
        <div className=''>
        <span className='font-bold text-orange-500'>Agent of Property</span>
        <h4 className='text-[1.5rem] lg:text-[2rem] text-black'>{userData?.displayName}</h4>
        </div>
        <div className='flex flex-col gap-2'>
            <div className='flex gap-3 items-center'>
             <FontAwesomeIcon icon={faEnvelope} style={{color:"orange"}}/>
                <span className='text-[#898787] text-[1.2rem]'>{userData?.email}</span>
            </div>
            <div className='flex gap-3 items-center'>
             <FontAwesomeIcon icon={faPhone} style={{color:"orange"}} />
                <span className='text-[#898787] text-[1.2rem]'>{userData?.phoneNo}</span>
            </div>
        </div>
      </div>
    </div>



<div className="card common-card shadow-lg border-none mt-4">
<div className="card-body p-[24px]">
    <form action="#">
        <h6 className="loginRegister__title text-poppins font-bold">Get A Quote</h6>

        <div className="row gy-lg-4 gy-3">
            <div className="col-sm-6 col-xs-6">
                <label htmlFor="name" className="form-label ">Name</label>
                <input type="text" className="common-input" placeholder="Enter Your Name" id="name"/>
            </div>
            <div className="col-sm-6 col-xs-6">
                <label htmlFor="Email" className="form-label">Email</label>
                <input type="email" className="common-input" placeholder="Enter Your Email" id="Email"/>
            </div>
            <div className="col-sm-6 col-xs-6">
                <label htmlFor="Phone" className="form-label">Phone</label>
                <input type="tel" className="common-input" placeholder="Enter Your Phone" id="Phone"/>
            </div>
            <div className="col-sm-6 col-xs-6">
                <label htmlFor="Phone" className="form-label">Type</label>
                <div className="select-has-icon">
                    <select className="form-select common-input">
                        <option value="Type" disabled="" >Select Your Type</option>
                        <option value="1">Property Management</option>
                        <option value="1">Mortgage Server</option>
                        <option value="1">Consulting Service</option>
                        <option value="1">Home Buying</option>
                        <option value="1">Home Selling</option>
                        <option value="1">Escrow Service</option>
                    </select>
                </div>
            </div>
            <div className="col-sm-12">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea className="common-input h-[140px]" placeholder="Your Message" id="message"></textarea>
            </div>
            
            <div className="col-12">
                <button type="submit" className="btn btn-main w-100">Get a free service</button>
            </div>
        </div>
    </form>
</div>
</div>
 </>
  )
}

export default AccountProfileTab
