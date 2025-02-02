import React from 'react';

const Button = ({
  className,
  variant = 'default',
  size = 'small',
  children,
  onClick,
  ...props
}) => {
  return (
    <button
      className={`btn ${variant} ${size} ${className || ''}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
