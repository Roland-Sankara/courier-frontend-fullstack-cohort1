import React from 'react';
import validate from './validateInfo'
import useForm from './UseForm';
import './Form.css';
import { Link } from 'react-router-dom';


const FormSignin = ({ submitForm }) => {
  const { handleChange, handleSubmit, values, errors, isSubmitting } = useForm(
    submitForm,
    validate
  );

  return (
    <div className='form-content-right'>
      <form onSubmit={handleSubmit} className='form' noValidate>
        <a href="home"><h1>Safe Courier</h1></a>
        <h2>
          We help users deliver parcels to different  destinations & provides courier quotes based on weight categories
        </h2>

        {/* Username or email field */}
        <div className='form-inputs'>
          <label className='form-label'>Username</label>
          <input
            className='form-input'
            type='text'
            name='username'
            placeholder='Enter your username'
            value={values.username}
            onChange={handleChange}
          />
          {errors.username && <p>{errors.username}</p>}
        </div>

        {/* Password field */}
        <div className='form-inputs'>
          <label className='form-label'>Password</label>
          <input
            className='form-input'
            type='password'
            name='password'
            placeholder='Enter your password'
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>

        <button className='form-input-btn' type='submit'>{isSubmitting?'Loading . . .' : 'Sign In'}</button>
        <span className='form-input-login'>
          Do not have an account? Sign up <Link to='./'>here</Link>
        </span>
      </form>
    </div>
  );
};

export default FormSignin;