import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import UseAxiosSecure from '../../../hooks/UseAxiosSecure';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { registerUser, updateUserProfile } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const axiosSecure = UseAxiosSecure();

    const handleRegister = (data) => {
        const profileImg = data.photo[0];

        // Firebase Auth-এ user create
        registerUser(data.email, data.password)
            .then(() => {
                const formData = new FormData();
                formData.append('image', profileImg);
                const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;

                axios.post(image_API_URL, formData)
                    .then(res => {
                        const photoURL = res.data.data.url;

                        // MongoDB
                        const userInfo = {
                            email: data.email,
                            displayName: data.name,
                            photoURL: photoURL
                        };

                        axiosSecure.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('User created in DB:', res.data.insertedId);
                                } else {
                                    console.log('User already exists or failed:', res.data.message);
                                }
                            })
                            .catch(err => console.log(err));

                        // Firebase user profile update
                        const userProfile = {
                            displayName: data.name,
                            photoURL: photoURL
                        };

                        updateUserProfile(userProfile)
                            .then(() => {
                                console.log('User profile updated');
                                navigate(location.state || '/');
                            })
                            .catch(error => console.log(error));
                    })
                    .catch(err => console.log('Image upload error:', err));
            })
            .catch(error => console.log('Firebase register error:', error));
    };

    return (
        <div className="card mt-8 w-full max-w-sm mx-auto shrink-0 shadow-2xl bg-green-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <h3 className='text-3xl mt-3 text-center'>Welcome to Smart Home</h3>
            <p className='text-center mb-4'>Please register</p>

            <form className="card-body" onSubmit={handleSubmit(handleRegister)}>
                <fieldset className="fieldset space-y-4">

                    <label className="label">Name</label>
                    <input 
                        type="text" 
                        {...register('name', { required: true })} 
                        className="input bg-white dark:bg-gray-700 dark:text-gray-100" 
                        placeholder="Your Name" 
                    />
                    {errors.name && <p className="text-red-500 text-sm">Name is required.</p>}

                    <label className="label">Photo</label>
                    <input 
                        type="file" 
                        {...register('photo', { required: true })} 
                        className="file-input bg-white dark:bg-gray-700 dark:text-gray-100" 
                    />
                    {errors.photo && <p className="text-red-500 text-sm">Photo is required.</p>}

                    <label className="label">Email</label>
                    <input 
                        type="email" 
                        {...register('email', { required: true })} 
                        className="input bg-white dark:bg-gray-700 dark:text-gray-100" 
                        placeholder="Email" 
                    />
                    {errors.email && <p className="text-red-500 text-sm">Email is required.</p>}

                    <label className="label">Password</label>
                    <input 
                        type="password" 
                        {...register('password', {
                            required: true,
                            minLength: 6,
                            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/
                        })} 
                        className="input bg-white dark:bg-gray-700 dark:text-gray-100" 
                        placeholder="Password" 
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm">
                            {errors.password.type === 'required' && 'Password is required.'}
                            {errors.password.type === 'minLength' && 'Password must be 6 characters or longer.'}
                            {errors.password.type === 'pattern' && 'Password must have uppercase, lowercase, number & special character.'}
                        </p>
                    )}

                    <button 
                        type="submit" 
                        className="btn btn-neutral mt-4 dark:bg-green-600 dark:hover:bg-green-700 dark:text-white w-full"
                    >
                        Register
                    </button>
                </fieldset>

                <p className='mt-2 text-center dark:text-gray-300'>
                    Already have an account? 
                    <Link state={location.state} className='text-blue-500 dark:text-blue-400 underline ml-1' to='/login'> Login</Link>
                </p>
            </form>
        </div>
    );
};

export default Register;
