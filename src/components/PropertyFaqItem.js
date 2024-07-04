import React from 'react';

const PropertyFaqItem = ({itemClass, faq, activeAccordion, handleAccordionClick }) => {

    return (
        <>
            <div className={`accordion-item
                ${itemClass} 
                ${activeAccordion === faq.id ? 'active' : ''}`} 
                key={faq.id}
                >
                <h5 className="accordion-header">
                    <button className="accordion-button" onClick={() => handleAccordionClick(faq.id) } type="button">
                        {faq.Question}
                    </button>
                </h5>
                {
                  activeAccordion === faq.id &&  <div className="accordion-body">
                        <p className="accordion-body__desc fs-18 text-[1.2rem]">{faq.Answer}</p>
                    </div>
                }
            </div>
        </>
    );
};

export default PropertyFaqItem;