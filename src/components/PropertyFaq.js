import React, { useContext, useState } from 'react';
import FaqItem from './FaqItem';
import PropertyFaqItem from './PropertyFaqItem';

const PropertyFaq = ({cityDetails,accordionClass,itemClass}) => {

    const [activeAccordion, setActiveAccordion] = useState(null); 
    
    const handleAccordionClick = (faqId) => {
        setActiveAccordion(activeAccordion === faqId ? null : faqId); 
    }
    
    // --------------------- Finding the city .--------------
    // const {cityList}=useContext(useState);
    console.log("cityDetailsfaq",cityDetails)
    const {faqArray}=cityDetails;

    return (
        <>
            <div className={`common-accordion accordion ${accordionClass}`}>
                {
                    faqArray.map((faq, faqIndex) => {
                        return (
                            <PropertyFaqItem 
                                itemClass={itemClass}
                                faq={faq} 
                                key={faqIndex}   
                                faqIndex={faqIndex}
                                activeAccordion={activeAccordion}
                                handleAccordionClick={handleAccordionClick}
                            />
                        )
                    })
                }
            </div>   
        </>
    );
};

export default PropertyFaq;