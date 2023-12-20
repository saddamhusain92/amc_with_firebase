import React from 'react';

const Button = ({ onClick, children }) => {
 return (
    <button {...attribute}  onClick={onClick}>
      {children}
    </button>
 );
};

export default Button;