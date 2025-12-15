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
    <h2 className='text-3xl font-bold italic '> <span className='text-pink-400 italic'>Smart</span>
  <span className='text-4xl text-green-400 italic'>H</span>ome
</h2>

</div>
</Link>


    );
};

export default Logo;