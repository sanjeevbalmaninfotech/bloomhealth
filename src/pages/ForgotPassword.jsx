import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useForgotPasswordMutation } from '../services/authAPI';
import { Logo } from '../components/logo';

const ForgotPassword = () => {

  const [email, setEmail] = useState('');

  const [forgotPassword] = useForgotPasswordMutation();

  const handleForgotPassword = (e) => {
    e.preventDefault();
    forgotPassword(email);
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4'>
      <div className='bg-white shadow-lg rounded-2xl p-8 w-full max-w-md'>
        {/* Title */}
        <div className="flex justify-center mb-6">
          <Logo className="h-12 w-auto" />
        </div>
        <h1 className='text-2xl font-semibold text-center text-gray-800'>Forgot Password</h1>
        <p className='text-gray-500 text-center mt-2'>
          Enter your email address and we’ll send you a link to reset your password.
        </p>

        {/* Form */}
        <form className='mt-8 space-y-6'>
          <div className='relative'>
            <input
              type='email'
              placeholder='Enter your email'
              required
              onChange={(e) => setEmail(e.target.value)}
              className='w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#157fc1] focus:outline-none'
            />
          </div>

          <button
            type='submit'
            onClick={(e) => handleForgotPassword(e)}
            className='w-full bg-[#157fc1] text-white py-2.5 rounded-lg hover:bg-[#11679c] transition'
          >
            Send Reset Link
          </button>
        </form>

        {/* Back to login */}
        <div className='mt-6 text-center'>
          <Link to='/login' className='text-[#157fc1] hover:underline text-sm'>
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
