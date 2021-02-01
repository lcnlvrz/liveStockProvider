import React from 'react'
import { Link } from 'react-router-dom';
import { liveStockProviderLogo } from '../../constant';

const LogoHome = () => {
    return (
        <Link 
        className='w-full text-center flex items-center justify-center'
        to='/'>
            <img 
            className='w-60 my-5 h-3/4'
            alt='live stock provider logo'
            src={ liveStockProviderLogo }/>
        </Link>
    );
};

export default LogoHome;
