import React from 'react';
import { Link, NavLink, Outlet } from 'react-router';

import { BsCreditCard2FrontFill } from "react-icons/bs";
import { FaMotorcycle, FaUser, FaUserCheck } from 'react-icons/fa';
import { RiEBikeFill } from 'react-icons/ri';
import UseRole from '../hooks/UseRole';

const DashboardLayout = () => {
  const { role, roleLoading } = UseRole();

  if (roleLoading) {
    return <div>Loading role...</div>; // spinner or loader recommended
  }

  return (
    <div className="drawer lg:drawer-open max-w-7xl mx-auto">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <nav className="navbar w-full bg-base-300">
          <label htmlFor="my-drawer-4" className="btn btn-square btn-ghost">☰</label>
          <Link to='/'><div className="px-4">Smart Home Dashboard</div></Link>
        </nav>
        <Outlet />
      </div>

      <div className="drawer-side">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 w-64">
          <ul className="menu w-full grow">
            <li>
              <Link to='/'>Homepage</Link>
            </li>
            <li>
              <NavLink to='dashboard/users'><FaUserCheck /> Users</NavLink>
            </li>
            <li>
              <NavLink to='/dashboard/payment-history'><BsCreditCard2FrontFill /> Payment History</NavLink>
            </li>

            {role === 'admin' && <>
              <li>
                <NavLink to='/dashboard/approve-riders'><FaMotorcycle /> Approve Riders</NavLink>
              </li>
              <li>
                <NavLink to='/dashboard/assign-riders'><RiEBikeFill /> Assign Riders</NavLink>
              </li>
              <li>
                <NavLink to='/dashboard/users-management'><FaUser /> Users Management</NavLink>
              </li>
            </>}

            <li>
              <button>Settings</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;