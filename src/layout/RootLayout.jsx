import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../pages/shared/footer/Footer';
import Navbar from '../pages/shared/Navbar/Navbar';

const RootLayout = () => {
    return (
        <div className='max-w-7xl bg-gray-200 mx-auto'>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;