import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';

const DashboardLayout = () => {
    return (
        <div className="flex min-h-screen">
            <div className='flex'>
            <aside className="w-64 bg-gray-100 p-4">
                <NavLink to='/'><h2 className="text-xl font-bold mb-4">Home Page</h2></NavLink>
                <ul>
                    <li className="mb-2"><Link to="profile">My Profile</Link></li>
                    <li className="mb-2"><Link to="myBookings">My Bookings</Link></li>
                    <li className="mb-2"><Link to="bookingCancellation">Booking Cancellation</Link></li>
                    <li className="mb-2"><Link to="paymentHistory">Payment History</Link></li>
                </ul>
            </aside>
            <div>
                <NavLink to='/'><h2 className="text-xl font-bold mt-4">User Dashboard</h2></NavLink>
            </div>
            </div>

            <main className="flex-1 p-4">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;
