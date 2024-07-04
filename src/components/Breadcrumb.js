import React from 'react';
import { Link } from 'react-router-dom';
import BreadcrumbImage from '../images/breadcrumb-img.png';
import { faAngleRight,  faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Breadcrumb = (props) => {
    return (
        <>
            {/* =============================== Breadcrumb Start ===========================    */}
            <section className="breadcrumb pb-[120px] pt-[48vh]">
                <img src={BreadcrumbImage} alt="" className="breadcrumb__img"/>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="breadcrumb__wrapper">
                                <h2 className="breadcrumb__title text-[3.5rem] lg:text-[5rem]"> {props.pageTitle}</h2>
                                <ul className="breadcrumb__list">
                                    <li className="breadcrumb__item">
                                        <Link to="/" className="breadcrumb__link"> <FontAwesomeIcon icon={faHome} /> Home</Link> 
                                    </li>
                                    <li className="breadcrumb__item"><FontAwesomeIcon icon={faAngleRight} /></li>
                                    <li className="breadcrumb__item"> <span className="breadcrumb__item-text"> {props.pageName}  </span> </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* =============================== Breadcrumb End ===========================    */}
        </>
    );
};

export default Breadcrumb;