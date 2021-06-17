import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Navbar from '../../app/components/Navbar';
import { signupUser } from '../../services';

import classes from './Signup.module.css';

const Signup = ({ history }) => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async values => {
    try {
      await signupUser(values);
      history.push('/signin');
    } catch (err) {
      if (!err.response) toast.error('Internal Server Error');
      else toast.error(err.response.data.message);
    }
  };

  return (
    <>
      <Navbar />
      <div
        className={`mt-5 container ${classes.container}`}
        style={{ maxWidth: '30vw' }}
      >
        <h3 className='display-5 mb-4'>Register Now</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-3'>
            <label htmlFor='name' className='form-label'>
              Name
            </label>
            <input
              type='name'
              className='form-control'
              id='name'
              name='name'
              ref={register({
                required: true,
                minLength: 4,
              })}
              placeholder='Enter your name'
            />
            <p className='text-danger'>
              {errors.name && 'Invalid Name provided'}
            </p>
          </div>
          <div className='mb-3'>
            <label htmlFor='email' className='form-label'>
              Email Address
            </label>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              placeholder='email@email.com'
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
              placeholder='Enter a strong password'
              ref={register({
                required: true,
                minLength: 4,
              })}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='userType' className='form-label'>
              User Type
            </label>
            <select
              id='userType'
              name='userType'
              className='mdb-select md-form form-control'
              ref={register({
                required: true,
              })}
            >
              <option selected>Select the User Type</option>
              <option value='admin'>Admin</option>
              <option value='user'>User</option>
            </select>
          </div>
          <div className='mb-3'>
            <label htmlFor='contact' className='form-label'>
              Contact Number
            </label>
            <input
              type='tel'
              className='form-control'
              id='contact'
              name='contact'
              placeholder='Enter your contact number'
              ref={register({
                required: true,
                minLength: 10,
                maxLength: 10,
              })}
            />
            <p className='text-danger'>
              {errors.contact && 'Contact should be of 10 digits'}
            </p>
          </div>
          <button type='submit' className='mt-3 btn btn-primary w-100 btn-lg'>
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default Signup;
