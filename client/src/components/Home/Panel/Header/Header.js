import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { liveStockProviderLogo } from '../../../../constant'
import { Avatar } from '@material-ui/core'
import useHeader from '../../../../hooks/useHeader'
import { useSelector } from 'react-redux'

const Header = () => {

    const currentUser = useHeader();

    const provider = useSelector(state => state.provider);
    const currentProduct = useSelector(state => state.currentProduct);
    const client = useSelector(state => state.client);

    if ( provider.isLoading || currentProduct.isLoading || client.isLoading ) return false;

    return (
        <header className='flex justify-between p-2 items-center border-black w-full shadow sticky top-0 bg-white z-10'>
                <Link to='/panel'>
                    <img
                    alt='header'
                    className='object-contain w-20 md:object-scale-down' 
                    src={ liveStockProviderLogo }
                    />
                </Link>
                <div className='w-2/4'>
                    <div
                    className='text-center flex items-center justify-center'
                    style={{ width:'100%' }}
                    >
                        <h3 className='font-sans font-normal md:text-lg text-sm truncate'> 
                            Bienvenido
                            <span className='font-semibold ml-1 hover:text-yellow-500 hover:pointer cursor-pointer truncate text-center'>
                                { currentUser.name }!
                            </span>       
                        </h3>
                    </div> 
                </div>
                <Link to='/mi-cuenta'>
                    <Avatar
                    src={ currentUser.profilePhoto }
                    className='cursor-pointer w-20 hover:shadow'
                    />
                </Link>
        </header>
    );
  
};

export default Header
