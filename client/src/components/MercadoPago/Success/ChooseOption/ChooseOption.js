import React from 'react';
import { centerVertically, outlineButton } from '../../../../constant';

const ChooseOption = ( props ) => {

    const { setKindOfAccount } = props;
    
    return (
        <div 
        className={ `${ centerVertically }` }>
            <h1 className='text-3xl font-semibold text-center'> 
                Elegi una opcion 
            </h1>
            <button
            onClick={ () => setKindOfAccount( { type:'newAccount' } ) }
            style={{ width:'90%' }}
            className={ outlineButton }
            type='button'
            >
                Crear cuenta
            </button>
            <button 
            onClick={ () => setKindOfAccount( { type:'alreadyHaveAccount' } ) }
            style={{ width:'90%' }}
            className={ outlineButton }
            type='button'
            >
                Ya tengo cuenta
            </button>
        </div>
    );
};

export default ChooseOption;
