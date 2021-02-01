import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useAuth from '../../../hooks/useAuth';
import CardProduct from '../CardProduct';


const DefaultSection = () => {

    const { lastProducts } = useAuth();

    return (
        <>
            <div className='flex items-center justify-center'>
                <h3 className='font-semibold text-center absolute text-white text-2xl'> 
                    Ultimos productos agregados! 
                </h3>
                <img 
                className='h-28 w-full object-cover'
                alt=''
                src='https://images7.alphacoders.com/320/320434.jpg'/>
            </div>
            <div className='all__cards flex flex-wrap flex-row text-center items-center justify-evenly bg-gray-200'>
                
                { lastProducts.map( ( product, index ) => (
                    
                    <CardProduct
                    noObserver={ true }
                    key={ index } 
                    product={ product } index={index}/>

                ) ) }
                
            </div>
        </>
    );
};

export default DefaultSection;
