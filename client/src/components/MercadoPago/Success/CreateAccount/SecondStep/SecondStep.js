import { InputBase } from '@material-ui/core';
import React, { useState } from 'react';import { centerVertically, outlineButton } from '../../../../../constant';
import ClipLoader from "react-spinners/ClipLoader";
import LogoHome from '../../../../LogoHome';
import axiosInstance from '../../../../../api/axiosConfig';
;


const SecondStep = ( props ) => {

    const { setSteps, emailUser, setOTP } = props;


    const [input, setInput] = useState( { otp:'' } );

    const [loading, setLoading] = useState( false );

    const [alert, setAlert] = useState( { type:'', message:'' } );

    return (
        <div className={ centerVertically }>
            <LogoHome/>
            <h3 className='text-lg font-semibold'> Crear Cuenta </h3>
            <p className='text-center font-semibold w-3/4'> 
                Hemos enviado un correo a { emailUser } con un codigo para comprobar la identidad
            </p>
            <form
            onSubmit={ (e) => {

                e.preventDefault();

                setAlert( { type:'', message:'' } );
                
                const isOTPvalid = Number.isInteger( Number( input.otp ) );

                if ( !isOTPvalid ) return setAlert( { type:'otp', message:'Unicamente se aceptan numeros' } );

                setLoading( true );

                axiosInstance.post( '/otp', { email:emailUser, otp:input.otp } )
                .then( (response) => {

                    setLoading( false );
                    setOTP( Number(input.otp) );
                    setSteps( { firstStep:false, secondStep:false, thirdStep:true } );

                } )
                .catch( (err) => {

                    setLoading( false );
                    setAlert( { type:'otp', message:err.response.data.message } );

                } );
                

            } }
            onChange={ (e) => setInput({ ...input, [ e.target.name ]:e.target.value }) } 
            className='flex flex-col items-center w-3/4 space-y-5'>
                <div className='w-full'>
                    <label className='w-full'> 
                        Codigo compuesto de numeros 
                    </label>
                    <InputBase
                    inputProps={{ maxLength:'4' }}
                    name='otp'
                    required
                    style={{ border:'1px solid #ccc', borderRadius:'5px', width:'100%', paddingLeft:'5px', paddingRight:'5px' }}
                    />
                    { alert.type === 'otp' 
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
                    Comprobar Codigo
                </button> }
            </form>
        </div>
    );
};

export default SecondStep;
