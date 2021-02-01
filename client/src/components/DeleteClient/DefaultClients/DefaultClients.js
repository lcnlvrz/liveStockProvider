import React from 'react';
import { useSelector } from 'react-redux';
import ClientCard from '../ClientCard';

const DefaultClients = () => {

    const { clients } = useSelector(state => state.provider);

    return (
        <>
            <h3 className='font-semibold text-center text-2xl'> 
                Ultimos clientes agregados 
            </h3>
            { clients.length > 0 && clients.map( ( client, index ) => (

                <ClientCard
                noObserver={ true }
                client={ client }
                key={ index }
                />

            ) ) }
        </>
    );
};

export default DefaultClients;
