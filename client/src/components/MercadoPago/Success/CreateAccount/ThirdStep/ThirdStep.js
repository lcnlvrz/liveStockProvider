import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import axiosInstance from '../../../../../api/axiosConfig';
import { centerVertically, linkSignInProvider } from '../../../../../constant';
import { validateFormAddUserClient } from '../../../../../helpers/validators';
import LogoHome from '../../../../LogoHome';
import UsernamePasswordInputs from '../../UsernamePasswordInputs';
import SuccessAlert from '../../../../SuccessAlert';


const ThirdStep = ( props ) => {

    const { paymentID, otp, emailUser } = props;

    const [input, setInput] = useState( { username:'', password:'' } );

    const [alert, setAlert] = useState( { type:'', message:'' } );

    const [loading, setLoading] = useState( false );

    const [isSuccess, setIsSuccess] = useState( false );

    const history = useHistory();

    return (
        <div 
        className={ centerVertically }>
            <LogoHome/>
            <form 
            onChange={ (e) => setInput( { ...input, [ e.target.name ]: e.target.value } ) }
            onSubmit={ (e) => {

                e.preventDefault();

                const isValid =  validateFormAddUserClient( input, setAlert );

                if ( !isValid ) return false;

                setLoading( true );

                axiosInstance.post( '/provider', { nameBusiness:input.username, password:input.password, typeOfAccount:'normal', email:emailUser, otp }, { headers:{ paymentID } } )
                .then( (response) => {

                    setIsSuccess( true );
                    setLoading( false );
                    setInput({ username:'', password:'' });
                    history.push( `${ linkSignInProvider }&account_created=true` );

                } )
                .catch( (err) => {

                    setLoading( false );
                    setAlert( { type:'error', message:err.response.data.message } );

                } );

            } }
            className='flex items-center flex-col space-y-5'>
                <UsernamePasswordInputs
                input={input}
                setAlert={setAlert}
                alert={alert}
                buttonMessage='Crear Cuenta'
                loading={loading}
                />
                { isSuccess 
                &&
                <SuccessAlert
                setCloseModal={ setIsSuccess }
                message='Cuenta creada con exito'
                severity='success'
                />
                }
            </form>
        </div>
    )
}

export default ThirdStep
