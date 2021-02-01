import { InputBase } from '@material-ui/core';
import React, { useState } from 'react'
import { centerVertically, outlineButton } from '../../../constant';
import ClipLoader from "react-spinners/ClipLoader";
import LogoHome from '../../LogoHome';
import axiosInstance from '../../../api/axiosConfig';

const SecondStep = ( props ) => {

    const { setSteps, dataUser, setDataUser } = props;

    const [input, setInput] = useState( { otp:'' } );

    const [loading, setLoading] = useState( false );

    const [alert, setAlert] = useState( { type:'', message:'' } );

    return (
        <div className={ centerVertically }>
            <LogoHome/>
            <div className='w-3/4 text-center font-semibold'>
                <p> 
                    Hemos enviado un correo a { dataUser.email } con un codigo para verificar la identidad 
                </p>
            </div>
            <form
            onSubmit={ (e) => {
                
                e.preventDefault();

                setAlert( { type:'', message:'' } );

                const isOTPvalid = Number.isInteger( Number( input.otp ) );

                if ( !isOTPvalid ) return setAlert( { type:'otp', message:'El codigo tiene que ser numeros' } );

                setLoading( true );

                axiosInstance.post( '/verify-otp', { email:dataUser.email, otp:input.otp } )
                .then( (response) => {

                    setLoading( false );
                    setDataUser( { ...dataUser, otp:input.otp } );
                    setSteps( { firstStep:false, secondStep:false, thirdStep:true } );

                } )
                .catch( (err) => {

                    setLoading( false );
                    console.log( err.response.data );
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

    )
}

export default SecondStep
