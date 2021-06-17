import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Navbar from '../../app/components/Navbar';
import { Link } from 'react-router-dom';
import { signinUser } from '../../services';
import classes from './Signin.module.css';

const Signin = ({ history, setIsAuthenticated, setRole, setIsSuperAdmin }) => {
  const { register, handleSubmit, errors } = useForm();
  const [error, setError] = useState();
  const onSubmit = async values => {
    try {
      const res = await signinUser(values);

      if (res.data.ok && res.data.token) {
        localStorage.setItem('authToken', res.data.token);
        setIsAuthenticated(true);
        setRole(res.data.role);
        if (res.data.superAdmin) {
          setIsSuperAdmin(true);
          history.push('/admin');
        } else history.push('/dashboard');
      }
    } catch (err) {
      if (!err.response) {
        setError('Internal Server Error');
      } else setError(err.response.data.message);
    }
  };

  return (
    <>
      <Navbar />
      <div
        className={`mt-5 container ${classes.container}`}
        style={{ maxWidth: '30vw' }}
      >
        <h3 className='display-5 mb-4'>Sign In</h3>
        {error && (
          <div className='alert alert-danger' role='alert'>
            {error}
          </div>
        )}
        <form data-testid='signin-form' onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-3'>
            <label htmlFor='email' className='form-label'>
              Email Address
            </label>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              placeholder='Enter your mail'
              ref={register({
                required: true,
                pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
            />
            <p className='text-danger'>
              {errors.email && 'Invalid Email provided'}
            </p>
          </div>
          <div className='mb-3'>
            <label htmlFor='password' className='form-label'>
              Password
            </label>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              placeholder='Enter your password'
              ref={register({
                required: true,
              })}
            />
            <p className='text-danger'>
              {errors.password && 'Password cannot be empty'}
            </p>
          </div>
          <button
            data-testid='submit-btn'
            type='submit'
            className='mt-3 btn btn-primary w-100 btn-lg'
          >
            Sign In
          </button>
          <div className='mb-4'>
            <Link to='/Signup' className='navbar-brand'>
              Not an Existing User ?
              <br />
              Create your free Account here!
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signin;
