import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const Button = ({ onClick, type, className, children }) => {
    return (
        <button onClick={onClick} type={type} className={`btn ${className}`}>
            {children}
        </button>
    );
};

Button.propTypes = {
    onClick: PropTypes.func,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};

Button.defaultProps = {
    type: 'button',
};


export const LinkBtn = ({ linkto, className, children }) => {
    return (
        <Link to={linkto} className={`btn ${className ? 'button-primary' : 'button-secondary'} ${className}`}>
            {children}
        </Link>
    );
};

Link.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};

