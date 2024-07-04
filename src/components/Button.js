import React from 'react';
import { Link } from 'react-router-dom';

const Button = (props) => {
    return (
        <Link to={`${props.btnLink}`} className={`${props.btnClass} btn`}>
            {props.btnText}
            <span className={`icon ${props.spanClass}`}> <i className={`${props.iconClass}`}></i> </span> 
        </Link>
    );
};

export default Button;