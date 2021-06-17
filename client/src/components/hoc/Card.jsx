import React from 'react';

const Card = ({ children, style }) => {
  return (
    <div
      style={{
        boxShadow: '3px 1px 8px 0px rgba(0,0,0,0.33)',
        borderRadius: 20,
        background: '#fff',
        ...style,
      }}
      className='p-3 container'
    >
      {children}
    </div>
  );
};

export default Card;
