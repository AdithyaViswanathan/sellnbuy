import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../../components/hoc/Card';
import { toast } from 'react-toastify';

import ProductCard from './components/ProductCard';
import { getAllProducts } from '../../services';

const Dashboard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await getAllProducts();

        setProducts(response.data.products);
      } catch (err) {
        if (!err.response) {
          toast.error('Internal Server Error');
        } else toast.error(err.response.data.message);
      }
    })();
  }, []);
  const addToCart = async productId => {
    try {
      await axios.post(
        'http://localhost:8000/api/v1/orders',
        { productId },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );
      toast.success('Added to cart successfully');
    } catch (err) {
      if (!err.response) {
        toast.error('Internal Server Error');
      } else toast.error(err.response.data.message);
    }
  };
  return (
    <div style={{ minHeight: '92vh', backgroundColor: '#F0F1F5' }}>
      <div className='pt-4 container'>
        <div className='row'>
          {products.length === 0 && (
            <h4 className='display-5 text-center'>No products found</h4>
          )}
          {products.map(product => (
            <div key={product.id} className='col-md-3 mb-4'>
              <Card
                style={{
                  marginBottom: '2rem',
                }}
              >
                <ProductCard product={product} addToCart={addToCart} />
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
