import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../socialLogin/SocialLogin';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signInUser, signInGoogle } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Email/Password login
  const handleLogin = (data) => {
    signInUser(data.email, data.password)
      .then(result => {
        console.log('User logged in:', result.user);
        navigate(location.state || '/');
      })
      .catch(error => {
        console.log('Login error:', error.message);
        alert(error.message);
      });
  };

  // Google login
  const handleGoogleLogin = () => {
    signInGoogle()
      .then(result => {
        console.log('Google user:', result.user);
        navigate(location.state || '/');
      })
      .catch(error => {
        console.log('Google login error:', error.message);
        alert(error.message);
      });
  };

  return (
    <div className="card mt-8 bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
      <h3 className='text-3xl text-center'>Welcome Back</h3>
      <p className='text-center'>Please login</p>

      <form className="card-body" onSubmit={handleSubmit(handleLogin)}>
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input
            type="email"
            {...register('email', { required: true })}
            className="input"
            placeholder="Email"
          />
          {errors.email && <p className='text-red-500'>Email is required</p>}

          <label className="label">Password</label>
          <input
            type="password"
            {...register('password', { required: true, minLength: 6 })}
            className="input"
            placeholder="Password"
          />
          {errors.password?.type === 'minLength' && (
            <p className='text-red-500'>Password must be 6 characters or longer</p>
          )}

          <div><a className="link link-hover">Forgot password?</a></div>

          <button type="submit" className="btn btn-neutral mt-4 w-full">Login</button>
        </fieldset>
      </form>

      <p className='text-center mt-2'>
        Don't have an account? 
        <Link state={location.state} className='text-blue-400 underline ml-1' to='/register'>
          Register
        </Link>
      </p>

      <div className="divider">OR</div>

      <button
        onClick={handleGoogleLogin}
        className="btn btn-outline btn-primary w-full mb-4"
      >
        Login with Google
      </button>
    </div>
  );
};

export default Login;
