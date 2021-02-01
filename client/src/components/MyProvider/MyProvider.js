import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const MyProvider = () => {

    const { providerID, isLoading } = useSelector(state => state.client);

    if ( !providerID && !isLoading ) return <Redirect to='/'/>

    return (
        <div className='flex items-center justify-center my-5 flex-col'>
            <h3 className='text-3xl font-semibold'> 
                Mi proveedor 
            </h3>
            <div className='my-5 flex items-center flex-col justify-center'>
                <img 
                className='w-52'
                alt=''
                src={ providerID.profilePhoto }
                />
                <h4 className='font-light text-3xl'> 
                    { providerID.nameBusiness } 
                </h4>
            </div>
        </div>
    );
};

export default MyProvider;
