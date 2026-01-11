import React from 'react';

import logo from '../../assets/home.png'
import { Link } from 'react-router';

const Logo = () => {
    return (
        <Link to='/'>
        <div className='flex items-center  space-x-3'>
    <img 
        className='w-[70px] h-[70px] rounded-full object-cover' 
        src={logo} 
        alt="Smart Home Logo" 
    />
   
<span className="ml-2 text-xl font-bold text-gray-800 hidden sm:inline">
                SmartHome<span className="text-green-600">Decor</span>
              </span>


</div>
</Link>


    );
};

export default Logo;