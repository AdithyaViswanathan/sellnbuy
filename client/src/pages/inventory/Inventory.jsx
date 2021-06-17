import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../../components/hoc/Card';
import { toast } from 'react-toastify';
import { getUserProducts } from '../../services';

const Inventory = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await getUserProducts();
        setProducts(response.data.products);
      } catch (err) {
        if (!err.response) {
          toast.error('Internal Server Error');
        } else toast.error(err.response.data.message);
      }
    })();
  }, []);
  const removeProduct = async productId => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/products/${productId}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      toast.success('Deleted the Product successfully');

      setProducts(
        products.map(product => {
          if (product.id === productId) {
            product.isActive = false;
          }

          return product;
        })
      );
    } catch (err) {
      if (!err.response) {
        toast.error('Internal Server Error');
      } else toast.error(err.response.data.message);
    }
  };
  return (
    <div style={{ minHeight: '95vh', backgroundColor: '#F0F1F5' }}>
      <div className='pt-4 container'>
        <div className='row'>
          {products.length !== 0 && (
            <h4 className='display-5 text-center'>Your Inventory</h4>
          )}
        </div>
        <div className='row'>
          {products.length === 0 && (
            <h4 className='display-5 text-center'>Your Inventory is Empty</h4>
          )}
          {products.map(({ image, name, price, isActive, id }) => (
            <div key={id} className='col-md-3'>
              <Card
                style={{
                  backgroundColor: isActive ? '#fff' : '#cdd0cb',
                  marginBottom: '2rem',
                }}
              >
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
                    <hr />
                    {isActive && (
                      <div
                        onClick={() => removeProduct(id)}
                        className='d-flex align-items-center justify-content-between'
                        style={{
                          cursor: 'pointer',
                        }}
                      >
                        <img src='/assets/trash.svg' alt='delete logo' />
                        <h4
                          className='text-end display-6'
                          style={{ fontSize: '1.8rem', fontWeight: 'bold' }}
                        >
                          &#x20B9;{price}
                        </h4>
                      </div>
                    )}
                  </div>
                </>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Inventory;
