import React from 'react';
import Slider from "react-slick";

import SectionHeading from './SectionHeading';
import TestimonialItem from './TestimonialItem'
import { testimonialData } from '../utils/mockdata';

var settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 1500,
    dots: false,
    pauseOnHover: true,
    arrows: true,
    centerMode: true,
    prevArrow: <button type="button" className="slick-prev"><i className="fas fa-arrow-left"></i></button>,
    nextArrow: <button type="button" className="slick-next"><i className="fas fa-arrow-right"></i></button>,
};

const Testimonial = () => {
    return (
        <>
        <section className="testimonials-three py-[120px] bg-[#F7F7F7]">
            <div className="container container-two">
                <div className="testimonials-three__inner position-relative">
                    <div className="row align-items-center gy-4">
                        <div className="col-lg-5">
                            <div className="testimonials-three__box">

                                <SectionHeading
                                    headingClass="section-heading style-left mb-0"  
                                    subtitle="clients testimonial"
                                    subtitleClass="" 
                                    title="Happy Clients, Happy Homes: What People Are Saying about us" 
                                    renderDesc={false}
                                    desc="Real estate is a lucrative ind involves the buying selling and reproperties. It Real estate is a lucrative ind involves. Real estate is a lucrative"
                                    renderButton={false}
                                    renderBesideDesc={true}
                                    buttonClass="btn-main"
                                    buttonText="View More"
                                />
                                
                            </div>
                        </div>

                        <div className="col-lg-7">
                            <div className="testimonials-three__wrapper overflow-hidden">
                                <Slider {...settings}>
                                    {
                                        testimonialData.map((testimonialThreeItem, testimonialThreeItemIndex) => {
                                            return (
                                                <TestimonialItem testimonialThreeItem={testimonialThreeItem} key={testimonialThreeItemIndex}/>
                                            )
                                        })
                                    }
                                </Slider>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>    
        </>
    );
};

export default Testimonial;