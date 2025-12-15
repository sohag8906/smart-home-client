import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
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

        // 1️⃣ Firebase Auth-এ user create
        registerUser(data.email, data.password)
            .then(() => {
                
                const formData = new FormData();
                formData.append('image', profileImg);
                const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;

                axios.post(image_API_URL, formData)
                    .then(res => {
                        const photoURL = res.data.data.url;

                        //  MongoDB
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

                        // 4️⃣ Firebase user profile update
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
        <div className="card mt-8 bg-green-200 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
            <h3 className='text-3xl text-center'>Welcome to Smart Home</h3>
            <p className='text-center'>Please register</p>
            <form className="card-body" onSubmit={handleSubmit(handleRegister)}>
                <fieldset className="fieldset">
                    <label className="label">Name</label>
                    <input type="text" {...register('name', { required: true })} className="input" placeholder="Your Name" />
                    {errors.name && <p className="text-red-500">Name is required.</p>}

                    <label className="label">Photo</label>
                    <input type="file" {...register('photo', { required: true })} className="file-input" />
                    {errors.photo && <p className="text-red-500">Photo is required.</p>}

                    <label className="label">Email</label>
                    <input type="email" {...register('email', { required: true })} className="input" placeholder="Email" />
                    {errors.email && <p className="text-red-500">Email is required.</p>}

                    <label className="label">Password</label>
                    <input type="password" {...register('password', {
                        required: true,
                        minLength: 6,
                        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/
                    })} className="input" placeholder="Password" />
                    {errors.password && (
                        <p className="text-red-500">
                            {errors.password.type === 'required' && 'Password is required.'}
                            {errors.password.type === 'minLength' && 'Password must be 6 characters or longer.'}
                            {errors.password.type === 'pattern' && 'Password must have uppercase, lowercase, number & special character.'}
                        </p>
                    )}

                    <button type="submit" className="btn btn-neutral mt-4">Register</button>
                </fieldset>

                <p className='mt-2'>Already have an account? 
                    <Link state={location.state} className='text-blue-400 underline' to='/login'> Login</Link>
                </p>
            </form>
        </div>
    );
};

export default Register;
