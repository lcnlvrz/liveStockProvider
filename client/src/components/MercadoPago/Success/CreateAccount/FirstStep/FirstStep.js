import { InputBase } from '@material-ui/core';
import React, { useState } from 'react';
import { centerVertically, outlineButton } from '../../../../../constant';
import LogoHome from '../../../../LogoHome';
import validator from 'validator';
import axiosInstance from '../../../../../api/axiosConfig';
import ClipLoader from "react-spinners/ClipLoader";

const FirstStep = ( props ) => {

    const { setSteps, setEmailUser } = props;

    const [input, setInput] = useState( { email:'' } );

    const [alert, setAlert] = useState( { type:'', message:'' } );

    const [loading, setLoading] = useState( false );

    return (
        <div className={ centerVertically }>
            <LogoHome/>
            <h3 className='text-lg font-semibold'> Crear Cuenta </h3>
            <form
            onSubmit={ (e) => {

                e.preventDefault();

                setAlert( { type:'', message:'' } );
                
                const isEmailValid = validator.isEmail( input.email );

                if ( !isEmailValid ) return setAlert({ type:'email', message:'El email no es valido' });

                setLoading( true );

                axiosInstance.post( '/provider-temporary', input )
                .then( (response) => {

                    setLoading( false );
                    setEmailUser( input.email );
                    setSteps( { firstStep:false, secondStep:true, thirdStep:false } );
                    

                } )
                .catch( (err) => {

                    setLoading( false );
                    setAlert( { type:'email', message:err.response.data.message } );

                } );


            } }
            onChange={ (e) => setInput({ ...input, [ e.target.name ]:e.target.value }) } 
            className='flex flex-col items-center w-3/4 space-y-5'>
                <div className='w-full'>
                    <label className='w-full'> 
                        Email 
                    </label>
                    <InputBase
                    name='email'
                    required
                    style={{ border:'1px solid #ccc', borderRadius:'5px', width:'100%', paddingLeft:'5px', paddingRight:'5px' }}
                    />
                    { alert.type === 'email' 
                    && 
                    <h3 className='text-red-500 font-semibold'> 
                        { alert.message } 
                    </h3> }
                </div>
                { loading 
                ? 
                <ClipLoader/> 
                : 
                <button
                style={{width:'100%' }}
                type='submit'
                className={ outlineButton }
                >
                    Validar Email
                </button> }
            </form>
        </div>
    );
};

export default FirstStep;
