import React from 'react';
import SectionHeading from './SectionHeading';
import FaqAccordion from './FaqAccordion';
import faqImg from '../images/faq-img.png'
const Faq = () => {
    return (
        <>
            <section className="faq py-[120px] mt-minus-120">
                <div className="container container-two">
                    <div className="row">
                        <div className="col-lg-6 pe-xl-5 pt-[10vh]">

                            <SectionHeading
                                headingClass="section-heading style-left"  
                                subtitle="Featured asked Questions"
                                subtitleClass="" 
                                title="Let us find the perfect property for you" 
                                renderDesc={false}
                                desc="Real estate is a lucrative ind involves the buying selling and reproperties. It Real estate is a lucrative ind involves. Real estate is a lucrative"
                                renderButton={false}
                                renderBesideDesc={false}
                                buttonClass="btn-main"
                                buttonText="View More"
                            />
                            
                            <FaqAccordion accordionClass="" itemClass=""/>
                            
                        </div>
                        <div className="col-lg-6  d-lg-block d-none">
                            <div className="faq-thumb">
                                <img src={faqImg} alt=''/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>   
        </>
    );
};

export default Faq;