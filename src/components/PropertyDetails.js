import React from 'react';
import PropertyDetailsSection from './PropertyDetailsSection';
// import PageTitle from '../common/PageTitle';
import Breadcrumb from './Breadcrumb';

const PropertyDetails = () => {

    
    return (
        <>
        {/* <PageTitle title="CityScape - Property Details" /> */}


            {/* BreadCrumb */}
            <Breadcrumb
                pageTitle="Property Details"
                pageName="Properties"
            />

            {/* Property Details Section */}
            <PropertyDetailsSection/>

            

           
        </>
    );
};

export default PropertyDetails;
