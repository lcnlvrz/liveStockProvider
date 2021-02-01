import React from 'react';
import { liveStockProviderLogo } from '../../../../constant';

const FifthPart = () => {
    
    return (
        <footer className='p-5 space-y-5'>
            <img 
            className='w-28'
            alt='live stock provider'
            src={ liveStockProviderLogo }
            />
            <p className='text-sm'>
                © 2020 Live Stock Provider. Todos los derechos reservados.
            </p>
            <p className='text-sm'> 
                Desarrolado y distribuido por Luciano Alvarez. 
            </p>
        </footer>
    )
}

export default FifthPart
