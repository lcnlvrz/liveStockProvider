import React, { useState } from 'react'
import { centerVertically, outlineButton } from '../../../constant'
import LogoHome from '../../LogoHome';
import validator from 'validator';
import ClipLoader from "react-spinners/ClipLoader";
import axiosInstance from '../../../api/axiosConfig';
import { InputBase } from '@material-ui/core';

const FirstStep = ( props ) => {

    const { setSteps, setDataUser, dataUser } = props;

    const [alert, setAlert] = useState( { type:'', message:'' } );

    const [input, setInput] = useState( { email:'' } );

    const [loading, setLoading] = useState( false );

    return (
        <div className={ centerVertically }>
            <LogoHome/>
            <h1 className='text-2xl font-semibold'> 
                Olvide mi contraseña 
            </h1>
            <form 
            onSubmit={ (e) => {

                e.preventDefault();

                setAlert( { type:'', message:'' } );
                
                const isEmailValid = validator.isEmail( input.email );

                if ( !isEmailValid ) return setAlert( { type:'email', message:'El email no es valido' } );

                setLoading( true );

                axiosInstance.post( '/otp-forgotPassword', { email:input.email } )
                .then( (response) => {

                    setLoading( false );

                    setDataUser( { ...dataUser, email:input.email } );

                    setSteps( { firstStep:false, secondStep:true } );

                } )
                .catch( (err) => {

                    setLoading( false );

                    setAlert( { type:'email', message:err.response.data.message } );

                } );

            } }
            onChange={ (e) => setInput( { ...input, [ e.target.name ]:e.target.value } ) }
            className='w-3/4 space-y-5'>
                <div>
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
                <div className='text-center'>
                    <ClipLoader/> 
                </div> 
                : 
                <button
                style={{width:'100%' }}
                type='submit'
                className={ outlineButton }
                >
                    Enviar codigo 
                </button> }
            </form> 
        </div>
    );
};

export default FirstStep;
