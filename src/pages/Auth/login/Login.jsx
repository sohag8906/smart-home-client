import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signInUser, signInGoogle } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  
  const handleLogin = async (data) => {
    try {
      const result = await signInUser(data.email, data.password);
      console.log('User logged in:', result.user);
      navigate(location.state?.from || '/'); 
    } catch (error) {
      console.error('Login error:', error.message);
      alert(error.message);
    }
  };

  // Google login
  const handleGoogleLogin = async () => {
    try {
      const result = await signInGoogle();
      console.log('Google user:', result.user);
      navigate(location.state?.from || '/');
    } catch (error) {
      console.error('Google login error:', error.message);
      alert(error.message);
    }
  };

  return (
    <div className="card mt-8 bg-green-200 w-full max-w-sm mx-auto shadow-2xl">
      <h3 className="text-3xl text-center mt-4">Welcome Back</h3>
      <p className="text-center mb-4">Please login</p>

      <form className="card-body" onSubmit={handleSubmit(handleLogin)}>
        <label className="label">Email</label>
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
          {...register('email', { required: true })}
        />
        {errors.email && <p className="text-red-500 text-sm">Email is required</p>}

        <label className="label mt-2">Password</label>
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full"
          {...register('password', { required: true, minLength: 6 })}
        />
        {errors.password?.type === 'required' && <p className="text-red-500 text-sm">Password is required</p>}
        {errors.password?.type === 'minLength' && <p className="text-red-500 text-sm">Password must be at least 6 characters</p>}

        <div className="mt-2">
          <a className="link link-hover text-sm">Forgot password?</a>
        </div>

        <button type="submit" className="btn btn-neutral w-full mt-4">Login</button>
      </form>

      <p className="text-center mt-4 text-sm">
        Don't have an account? 
        <Link to="/register" state={location.state} className="text-blue-500 underline ml-1">
          Register
        </Link>
      </p>

      <div className="divider">OR</div>

      <button
        onClick={handleGoogleLogin}
        className="btn btn-outline btn-primary font-bold text-black w-full mb-4"
      >
        <FcGoogle />
        Login with Google
      </button>
    </div>
  );
};

export default Login;
