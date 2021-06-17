import React from 'react';

const ProductCard = ({ product, addToCart }) => {
  const { id, User: user, image, name, price } = product;

  return (
    <>
      <img
        style={{
          borderRadius: 20,
          height: '250px',
          width: '100%',
          objectFit: 'cover',
        }}
        src={image}
        alt='Card cap'
      />
      <div className='mt-2'>
        <h5
          className='display-6'
          style={{ fontSize: '1.5rem', fontWeight: 'bold' }}
        >
          {name}
        </h5>
        <h6 className='display-6' style={{ fontSize: '1rem' }}>
          {user.name}
        </h6>
        <hr />
        <div
          onClick={() => addToCart(id)}
          className='d-flex align-items-center justify-content-between'
          style={{
            cursor: 'pointer',
          }}
        >
          <img src='/assets/cart.svg' alt='cart logo' />
          <h4
            className='text-end display-6'
            style={{ fontSize: '1.8rem', fontWeight: 'bold' }}
          >
            &#x20B9;{price}
          </h4>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
