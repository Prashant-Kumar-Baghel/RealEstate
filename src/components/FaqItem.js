import React from 'react';

const FaqItem = ({itemClass, faq, activeAccordion, handleAccordionClick }) => {
    const {btnText, bodyText} = faq; 

    return (
        <>
            <div className={`accordion-item
                ${itemClass} 
                ${activeAccordion === faq.id ? 'active' : ''}`} 
                key={faq.id}
                >
                <h5 className="accordion-header">
                    <button className="accordion-button" onClick={() => handleAccordionClick(faq.id) } type="button">
                        {btnText}
                    </button>
                </h5>
                {
                  activeAccordion === faq.id &&  <div className="accordion-body">
                        <p className="accordion-body__desc fs-18 text-[1.2rem]">{bodyText}</p>
                    </div>
                }
            </div>
        </>
    );
};

export default FaqItem;