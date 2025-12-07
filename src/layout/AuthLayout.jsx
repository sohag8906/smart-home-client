import React from 'react';
import Logo from '../components/logo/Logo';
import { Outlet } from 'react-router';
import smartImg from '../assets/smart.jpg'

const AuthLayout = () => {
    return (
        <div className='max-w-7xl  mx-auto'>
            <Logo></Logo>
             <div className='flex'>
                <div className='flex-1'>
                    <Outlet></Outlet>
                </div>
                <div className='flex-1'>
                    <img className='w-[400px] h-[400px] rounded-full' src={smartImg} alt="" />
                </div>
             </div>

        </div>
    );
};

export default AuthLayout;