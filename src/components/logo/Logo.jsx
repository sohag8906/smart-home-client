import React from 'react';
import logo from '../../assets/home.png';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/">
      <div className="flex items-center space-x-3">
        {/* Logo Image */}
        <img
          className="w-[70px] h-[70px] rounded-full object-cover border-2 border-gray-300 dark:border-gray-500"
          src={logo}
          alt="Smart Home Logo"
        />

        {/* Logo Text */}
        <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white hidden sm:inline">
          SmartHome
          <span className="text-green-600 dark:text-green-400">Decor</span>
        </span>
      </div>
    </Link>
  );
};

export default Logo;
