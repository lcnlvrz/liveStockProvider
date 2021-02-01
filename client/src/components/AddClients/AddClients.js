import { InputBase } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Header from '../Home/Panel/Header';
import Snackbar from '@material-ui/core/Snackbar';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Alert, handleClose } from '../../helpers/materialUI';
import { submitAddClient } from '../../helpers/submit';
import { propsInputsAddClient } from './propsSettings';
import AlertPassword from './AlertPassword';
import AlertUsername from './AlertUsername';
import SubmitAPI from './SubmitAPI.js';


const AddClients = () => {

    const dispatch = useDispatch();

    const [input, setInput] = useState( { username:'', password:'' } );

    const [alert, setAlert] = useState( { type:'', message:'' } );

    const [loading, setLoading] = useState( false );

    const [open, setOpen] = React.useState(false);

    const provider = useSelector(state => state.provider);

    const propsUsername = propsInputsAddClient( alert, input, 'username' );
    const propsPassword = propsInputsAddClient( alert, input, 'password' );

    useEffect(() => {

        window.scrollTo(0, 0)
        
    }, []);

    if ( !provider.provider && !provider.isLoading ) return <Redirect to='/panel'/>;

    return (
        <>
            <div className='w-full flex items-center justify-center flex-col'>
                <h2 className='font-semibold text-lg my-5 text-4xl'> 
                    Agregar Cliente
                </h2>
                <form
                onSubmit={ (e) => {

                    e.preventDefault(e)

                    if ( provider.isForDemo ) return setAlert( { type:'client', message:'Esta cuenta es una demo. No puedes realizar esta accion.' } );

                    submitAddClient( e, setAlert, input, setLoading, setOpen, setInput, dispatch, provider )

                } } 
                onChange={ (e) => setInput( { ...input, [ e.target.name ]:e.target.value } ) }
                className='w-full flex items-center justify-center flex-col space-y-2'>
                    <div className='my-3 w-full flex items-center justify-center flex-col space-y-2'>
                        <div className='flex flex-col w-3/4'>
                            <label> Nombre de usuario </label>
                            <InputBase { ...propsUsername }/>
                            <AlertUsername alert={ alert } setAlert={ setAlert }/>
                        </div>
                        <div className='flex flex-col w-3/4'>
                            <label> Contraseña </label>
                            <InputBase { ...propsPassword }/>
                            <AlertPassword alert={ alert } setAlert={ setAlert }/>
                        </div>
                    </div>
                    <SubmitAPI loading={ loading } />
                    { alert.type === 'client' 
                    && 
                    <h3 className='text-red-500 font-semibold text-lg text-center mx-5'> 
                        { alert.message } 
                    </h3> }
                    <Snackbar 
                    open={open}  
                    onClose={ (e, reason) => handleClose( e, reason, setOpen ) }>
                        <Alert
                        onClose={ (e, reason) => handleClose( e, reason, setOpen ) } 
                        severity="success">
                            Cliente creado con exito
                        </Alert>
                    </Snackbar>
                </form>
            </div>
        </>
    );
};

export default AddClients;
