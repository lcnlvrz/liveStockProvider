import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { centerVertically, outlineButton } from '../../../constant';
import { useState } from 'react';
import { signInProvider } from '../../../helpers/signIn';
import ClipLoader from "react-spinners/ClipLoader";
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LogoHome from '../../LogoHome';


const Provider = () => {

    const provider = useSelector(state => state.provider); 

    const history = useHistory();

    const dispatch = useDispatch();
    
    const [input, setInput] = useState( { user:'', password:''} );

    const [alert, setAlert] = useState( { type:'', message:''} );

    const [loading, setLoading] = useState( false );

    const propsInputUser = {  inputProps:{ maxLength:100 }, type:'text', name:'user',  label:"Usuario", value:input.user };

    const propsInputPassword = { inputProps:{ maxLength:100 }, type:'password', name:'password',  label:"Contraseña", value:input.password };

    const newURL = new URL( window.location.href );

    const accountCreated = newURL.searchParams.get( 'account_created' );

    const passwordChanged = newURL.searchParams.get( 'password_changed' );

    const membershipRenovated = newURL.searchParams.get( 'membership_renovated' );
    
    useEffect(() => {

        const currentURL = window.location.href;

        const newURL = new URL( currentURL );

        const isDemo = newURL.searchParams.get( 'is_demo' );

        if ( isDemo === 'true' ) {

            setInput({ user:'livestockprovider', password:'LiveStockProvider123' });


        };

        
    }, [ ]);

    if ( provider.providerID && !provider.isLoading ) return <Redirect to='/'/>

    return (
        <div className='flex items-center justify-center'>
            <div className={ `${centerVertically} w-3/4` }>
                <LogoHome/>
                    <h3 
                    className='font-semibold text-lg text-center'> 
                        Iniciar sesion | Proveedor
                    </h3>
                { accountCreated === 'true' &&
                <div className='w-3/4'> 
                    <h3 className='font-semibold text-green-500 text-center'> 
                        Cuenta creada con exito. Listo para ingresar 
                    </h3>
                </div>
                }
                { membershipRenovated === 'true' &&
                <div className='w-3/4'> 
                    <h3 className='font-semibold text-green-500 text-center'> 
                        Membresia renovada con exito. Listo para ingresar.
                    </h3>
                </div>
                }
                { passwordChanged === 'true' &&
                <div className='w-3/4'> 
                    <h3 className='font-semibold text-green-500 text-center'> 
                        Contraseña cambiada con exito.
                    </h3>
                </div>
                }
               <div>
                <form 
                onSubmit={ (e) => signInProvider( e, input, setAlert, setLoading, history, dispatch ) }
                onChange={ (e) => setInput( { ...input, [ e.target.name ]:e.target.value } ) }
                style={{ marginTop:0 }}
                >
                    <div className='flex flex-col mb-4 space-y-3'>
                        <TextField 
                        { ...propsInputUser }/>
                        <TextField 
                        { ...propsInputPassword }/>
                    </div>
                    
                    { alert.type === 'provider' && <span className='text-red-500 font-bold text-center'> 
                        { alert.message } 
                    </span> }
                    { loading 
                    ?
                    <div className='flex justify-center'>
                        <ClipLoader/> 
                    </div> 
                    :
                    <button
                    style={{ width:'100%' }}
                    type='submit' 
                    className={ outlineButton }>
                        Ingresar
                    </button>  }
                    <Link to='/contraseña/?is_forgot_password=true'>
                        <h3 className='font-sm text-light text-gray-500 cursor-pointer text-center my-5'> 
                            ¿Olvidaste tu contraseña? 
                        </h3>
                    </Link>
                </form>
                </div>
            </div>    
        </div> 
       
    );
};

export default Provider;
