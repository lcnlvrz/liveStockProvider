import React from 'react';
import { Link } from 'react-router-dom';
import { centerVertically, linkSignInClient, linkSignInProvider, outlineButtonWhite } from '../../constant';

const ProviderOrClient = () => {

    return (
        <div 
        className={ `${ centerVertically } bg-black h-screen` }>
            <h1 
            className='text-4xl font-bold text-white text-center'> 
                Iniciar Sesion Como:
            </h1>
            <Link 
            className='text-center w-full'
            to={ linkSignInClient }>
                <button
                style={{ width:'80%' }}
                type='button'
                className={ outlineButtonWhite }
                >
                    Cliente
                </button>
            </Link>
            <Link 
            className='text-center w-full'
            to={ linkSignInProvider }>
                <button
                style={{ width:'80%' }}
                type='button'
                className={ outlineButtonWhite }
                >
                    Proveedor
                </button>
            </Link>
        </div>
    );
};

export default ProviderOrClient;
