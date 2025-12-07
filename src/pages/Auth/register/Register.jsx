import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';

import axios from 'axios';
import UseAxiosSecure from '../../../hooks/UseAxiosSecure';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const {registerUser, updateUserProfile} = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const axiosSecure = UseAxiosSecure();

    

    const handleRegister = (data) => {
       
    const profileImg = data.photo[0];

        registerUser(data.email, data.password)
        .then(() =>{
            
            // store the image and get the photo url
            const formData = new FormData();
            formData.append('image', profileImg);
           const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`

            axios.post(image_API_URL, formData)
            .then(res => {
                const photoURL = res.data.data.url;

                // CREATE USER IN THE DATABASE
                const userInfo = {
                    email: data.email,
                    displayName: data.name,
                     photoURL : photoURL

                }
                axiosSecure.post('/users',userInfo )
                .then(res =>{
                    if(res.data.insertedId){
                        console.log('user created in the database')
                    }
                })
                 


                 // update user profile
                 const userProfile = {
                    displayName : data.name,
                     photoURL : photoURL
                 }
                 updateUserProfile(userProfile)
                 .then(() =>{
                    console.log('user profile updated done')
                    navigate(location.state || '/');
                 })
                 .catch(error =>{
                    console.log(error)
                 })
            })
           
        })
        .catch(error =>{
            console.log(error)
        })
    };

    return (
        <div className="card mt-8 bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
            <h3 className='text-3xl text-center'>Welcome to smart home</h3>
          <p className='text-center'>please register</p>
            <form className="card-body" onSubmit={handleSubmit(handleRegister)}>
                <fieldset className="fieldset">
                    {/* name field */}
                    <label className="label">Name</label>
                    <input
                        type="text"
                        {...register('name', { required: true })}
                        className="input"
                        placeholder="Your Name"
                    />
                    {errors.name && <p className="text-red-500">Name is required.</p>}
                    {/* photo field */}
                    <label className="label">photo</label>
                    
                    <input
                        type="file"
                        {...register('photo', { required: true })}
                        className="file-input"
                        placeholder="Your Photo"
                    />
                    {errors.name && <p className="text-red-500">photo is required.</p>}


                    {/* Email field */}
                    <label className="label">Email</label>
                    <input
                        type="email"
                        {...register('email', { required: true })}
                        className="input"
                        placeholder="Email"
                    />
                    {errors.email && <p className="text-red-500">Email is required.</p>}

                    {/* Password field */}
                    <label className="label">Password</label>
                    <input
                        type="password"
                        {...register('password', { required: true, minLength: 6,
                            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/



                         })}
                        className="input"
                        placeholder="Password"
                    />
                    {errors.password && (
                        <p className="text-red-500">
                            {errors.password.type === 'required' && 'Password is required.'}
                            {errors.password.type === 'minLength' && 'Password must be 6 characters or longer.'}
                        </p>
                    )}
                    {
                        errors.password?.type==='pattern'&& <p className='text-red-500'>password must have at least one uppercase, at least one lowercase, at least one number, and at least one special characters</p>
                    }

                    <div>
                        <a className="link link-hover">Forgot password?</a>
                    </div>

                    <button type="submit" className="btn  btn-neutral mt-4">Register</button>
                </fieldset>
                 <p>Already have an account <Link 
                 state={location.state}
                 className='text-blue-400 underline' to='/login'>Login</Link> </p>
            </form>
           
        </div>
    );
};

export default Register;
