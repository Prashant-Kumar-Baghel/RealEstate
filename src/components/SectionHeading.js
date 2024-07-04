import React from 'react';
import Button from './Button';

const SectionHeading = (props) => {
    return (

        <>
            <div className={`section-heading ${props.headingClass}`}>
                <div className="section-heading__inner">
                    <span className={`section-heading__subtitle ${props.subtitleClass}`}>
                        <span className='px-[5px] py-[10px] rounded-[3px] mb-[10px] uppercase text-[0.875] tracking-[.11rem] bg-white'>
                            <h2 className='text-gradient font-[600] inline-block lg:text-[1.2rem]'>{props.subtitle}</h2>
                        </span> 
                    </span>
                    <h2 className="section-heading__title relative mb-0 mt-2 "> {props.title} </h2>
                    {
                        props.renderDesc && (
                            <p className="section-heading__desc">{props.desc}</p>
                        )
                    }
                </div>

                {
                    props.renderButton && (
                        <Button
                            btnLink={props.buttonLink}
                            btnClass={props.buttonClass}
                            btnText={props.buttonText}
                            spanClass="icon-right"
                            iconClass="fas fa-arrow-right"
                        />
                    )
                }
                {
                    props.renderBesideDesc && (
                        <p className="section-heading__desc">{props.desc}</p>
                    )
                }
            </div>
        </>
    );
};

export default SectionHeading;  


