import { Link } from 'react-router-dom';
import Navbar from '../../app/components/Navbar';

import classes from './Home.module.css';

const Home = () => {
  return (
    <>
      <Navbar />
      <div
        className='d-flex flex-column justify-content-center align-items-center'
        style={{
          backgroundImage: `url(/assets/bg.jpg)`,
          minHeight: '92vh',
          width: '100vw',
          backgroundSize: 'cover',
        }}
      >
        <img src='/assets/logo.png' alt='company logo' height='150px' />
        <h2 data-testid='message' className={`display-5 mb-5 ${classes.text}`}>
          The best place to buy and sell your products
        </h2>
        <Link className='mt-5 btn btn-primary btn-lg' to='/signin'>
          Get Started Now
        </Link>
      </div>
    </>
  );
};

export default Home;
