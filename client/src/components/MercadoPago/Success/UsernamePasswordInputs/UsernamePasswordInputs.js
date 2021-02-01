import { InputBase } from '@material-ui/core';
import React from 'react';
import { outlineButton } from '../../../../constant';
import AlertPassword from '../../../AddClients/AlertPassword';
import AlertUsername from '../../../AddClients/AlertUsername';
import ClipLoader from "react-spinners/ClipLoader";

const UsernamePasswordInputs = ( props ) => {

    const { input, setAlert, alert, buttonMessage, loading } = props;

    return (
        <div className='space-y-5  flex flex-col items-center'>
            <div className='flex flex-col items-center space-y-5'>
                <div className='w-3/4'>
                    <label> Nombre de usuario </label>
                    <InputBase
                    name='username'
                    value={ input.username }
                    style={{ border:'1px solid #ccc', borderRadius:'5px', width:'100%', paddingLeft:'5px', paddingRight:'5px' }}
                    />
                    <AlertUsername
                    alert={ alert }
                    setAlert={ setAlert }
                    />
                </div>
                <div className='w-3/4'>
                    <label> Contraseña </label>
                    <InputBase
                    type='password'
                    name='password'
                    value={ input.password }
                    style={{ border:'1px solid #ccc', borderRadius:'5px', width:'100%', paddingLeft:'5px', paddingRight:'5px' }}
                    />
                    <AlertPassword
                    alert={ alert }
                    setAlert={ setAlert }/>
                </div>
                { alert.type === 'error' &&
                <div className='w-3/4'> 
                    <h3 className='text-red-500 font-semibold text-center'> { alert.message } 
                    </h3>
                </div> }
                { loading 
                ? 
                <ClipLoader/> 
                :
                <div className='w-3/4'>
                    <button
                    style={{ width:'100%' }}
                    className={ outlineButton } 
                    type='submit'>
                        { buttonMessage }
                    </button>  
                </div>  
                }
            </div>

        </div>
    );
};

export default UsernamePasswordInputs;
