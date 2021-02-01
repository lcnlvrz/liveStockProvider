import { TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { centerVertically, outlineButton } from '../../../constant';
import ClipLoader from "react-spinners/ClipLoader";
import LogoHome from '../../LogoHome';
import { signInClient } from '../../../helpers/signIn';

const Client = () => {

    const dispatch = useDispatch();

    const history = useHistory();

    const propsInputUser = {  inputProps:{ maxLength:100 }, type:'text', name:'username', label:"Usuario" };

    const propsInputPassword = { inputProps:{ maxLength:100 }, type:'password', name:'password',  label:"Contraseña" };


    const [input, setInput] = useState( {

        username:'',
        password:''

    } );

    const [loading, setLoading] = useState( false );

    const [alert, setAlert] = useState( { type:'', message:'' } );

    const provider = useSelector(state => state.provider);

    if ( provider.providerID && !provider.isLoading ) return <Redirect to='/'/>

    return (
        <div className='flex items-center justify-center'>
            <div className={ `${centerVertically} w-3/4` }>
                <LogoHome/>
                <h3 className='font-semibold text-lg text-center'> 
                    Iniciar sesion | Cliente
                </h3>
                <div className='flex flex-col space-y-5'>
                    <form
                    onSubmit={ (e) => {

                        signInClient( e, setAlert, setLoading, input, dispatch, history );

                    } }
                    onChange={ (e) => setInput( { ...input, [ e.target.name ]:e.target.value } ) }
                    >
                        <div className='flex flex-col mb-4 space-y-3'>
                            <TextField 
                            { ...propsInputUser }/>
                            <TextField 
                            { ...propsInputPassword }/>
                        </div>
                        { alert.type === 'client' &&
                        <h3 className='mb-5 text-center text-red-500 font-semibold'> 
                            { alert.message } 
                        </h3> }
                        { loading 
                        ?
                        <div className='flex items-center justify-center'>
                            <ClipLoader/> 
                        </div> 
                        : 
                        <button
                        style={{ width:'100%' }}
                        type='submit' 
                        className={ outlineButton }>
                                Ingresar
                        </button> }
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Client;
