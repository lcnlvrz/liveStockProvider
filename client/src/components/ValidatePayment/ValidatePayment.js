import { InputBase } from '@material-ui/core';
import React, { useState } from 'react';
import axiosInstance from '../../api/axiosConfig';
import { centerVertically, outlineButton } from '../../constant';
import ClipLoader from "react-spinners/ClipLoader";
import { useHistory } from 'react-router-dom';
import LogoHome from '../LogoHome';

const ValidatePayment = () => {

    const [input, setInput] = useState( { paymentID:'' } );

    const [alert, setAlert] = useState( { type:'', message:'' } );

    const [loading, setLoading] = useState( false );

    const history = useHistory();


    return (
        <div className={ centerVertically }>
            <LogoHome/>
            <div className='w-3/4 text-center space-y-5'>
                <h1 className='font-semibold text-3xl'> 
                    Validar Pago 
                </h1>
                <p className='text-center font-medium'> 
                    Si tu pago se encuentra en pendiente u ocurrio algun otro inconveniente, puedes validar tu pago rellenando los siguientes datos: 
                </p>
            </div>
            <form 
            onSubmit={ (e) => {

                e.preventDefault();

                setAlert( { type:'', message:'' } );

                const isNumber = Number.isInteger( Number(input.paymentID) );

                if ( !isNumber ) return setAlert( { type:'NaN', message:'Solo se permiten numeros' } );

                setLoading( true );

                axiosInstance.get( '/payment-status', { headers:{ paymentID:input.paymentID } } )
                .then( (response) => {

                    setLoading( false );
                    history.push( `/successmp/?site_id=MLA&status=approved&payment_id=${ input.paymentID }` );

                } )
                .catch( (err) => {

                    setAlert( { type:'paymentID', message:err.response.data.message } );
                    setLoading( false );

                } );


            } }
            onChange={ ( e ) => setInput( { ...input, [ e.target.name ]:e.target.value } ) }
            className='w-3/4 flex flex-col text-left space-y-5'>
                <label> 
                    Identificador de pago 
                </label>
                <InputBase
                value={ input.payment }
                name='paymentID'
                fullWidth
                style={{ border:'1px solid #ccc', borderRadius:'5px', margin:0, paddingLeft:'5px', paddingRight:'5px' }}
                />
                { ( alert.type === 'NaN'|| alert.type === 'paymentID' ) 
                && 
                <h3 className='text-red-500 font-bold text-center'> 
                    { alert.message } 
                </h3> }
                { loading 
                ?
                <div className='text-center'>
                    <ClipLoader/> 
                </div> 
                : 
                <button 
                className={ outlineButton }
                type='submit'>
                    Verificar
                </button> }
            </form>
        </div>
    );
};

export default ValidatePayment;
