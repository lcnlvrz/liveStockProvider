import { InputBase } from '@material-ui/core';
import React, { useState } from 'react';
import { centerVertically, linkSignInProvider, outlineButton } from '../../../constant';
import LogoHome from '../../LogoHome';
import { validatePassword } from '../../../helpers/validators';
import AlertPassword from '../../AddClients/AlertPassword';
import axiosInstance from '../../../api/axiosConfig';
import ClipLoader from "react-spinners/ClipLoader";
import { useHistory } from 'react-router-dom';

const ThirdStep = ( props ) => {

    const [input, setInput] = useState( { password:'' } );

    const { dataUser } = props;

    const [alert, setAlert] = useState( { type:'', password:'' } );

    const [loading, setLoading] = useState( false );

    const history = useHistory();

    return (
        <div className={ centerVertically }>
            <LogoHome/>
            <h1 className='text-2xl font-semibold text-center'> 
                Cambiar Contraseña 
            </h1>
            <form 
            onSubmit={ (e) => {

                e.preventDefault();

                setAlert( { type:'', message:'' } );
                
                const isPasswordValid = validatePassword( input.password );

                if ( !isPasswordValid ) return setAlert( { type:'password', message:'La contraseña no cumple los requisitos' } );

                setLoading( true );

                axiosInstance.post( '/change-password', { email:dataUser.email, otp:dataUser.otp, password:input.password } )
                .then( ( response ) => {

                    setLoading( false );
                    history.push( `${ linkSignInProvider }&password_changed=true` );


                } )
                .catch( (err) => {

                    setLoading( false );
                    setAlert( { type:'passwordFetch', message:err.response.data.message } );
                   
                } )

            } }
            onChange={ (e) => setInput( { ...input, [ e.target.name ]:e.target.value } ) }
            className='flex flex-col w-3/4 space-y-5'>
                <div>
                    <label> Nueva Contraseña </label>
                    <InputBase
                    type='password'
                    inputProps={{ maxLength:'100' }}
                    name='password'
                    style={{ borderRadius:'5px', border:'1px solid #ccc', width:'100%', paddingLeft:'5px', paddingRight:'5px' }}
                    />
                    <AlertPassword
                    setAlert={ setAlert }
                    alert={ alert }
                    />
                </div>
                { alert.type === 'passwordFetch' && 
                <h3 className='text-red-500 font-semibold text-center'> 
                    { alert.message } 
                </h3>  }
                { loading 
                ? 
                <div className='text-center'>
                    <ClipLoader/> 
                </div>
                : 
                <button
                type='submit'
                className={ outlineButton }
                >
                    Cambiar Contraseña

                </button> }
            </form>
        </div>
    );
};

export default ThirdStep;
