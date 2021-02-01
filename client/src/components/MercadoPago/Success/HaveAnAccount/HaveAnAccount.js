import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axiosInstance from '../../../../api/axiosConfig';
import { centerVertically, linkSignInProvider } from '../../../../constant';
import { validateFormAddUserClient } from '../../../../helpers/validators';
import LogoHome from '../../../LogoHome';
import UsernamePasswordInputs from '../UsernamePasswordInputs';

const HaveAnAccount = ( props ) => {

    const { paymentID } = props;

    const history = useHistory();

    const [input, setInput] = useState( { username:'', password:'' } );

    const [alert, setAlert] = useState( { type:'', message:'' } );

    const [loading, setLoading] = useState( false );

    return (
            <div className={ centerVertically }>
                <LogoHome/>
                <form 
                className='flex flex-col items-center'
                onSubmit={ (e) => {

                    e.preventDefault();

                    const validation = validateFormAddUserClient( input, setAlert );

                    if ( !validation ) return false;

                    setLoading( true );
                
                    axiosInstance.post( '/renovate-membership', input, { headers:{ paymentID } } )
                    .then( (response) => {

                        setLoading( false );
                        history.push( `${ linkSignInProvider }&membership_renovated=true` );

                    } )
                    .catch( (err) =>{

                        setLoading( false );
                        setAlert( { type:'error', message:err.response.data.message } );

                    } );

                

                } }
                onChange={ (e) => setInput( { ...input, [ e.target.name ]:e.target.value } ) }
                >
                    <UsernamePasswordInputs
                    input={ input }
                    loading={ loading }
                    buttonMessage='Renovar membresia'
                    alert={ alert }
                    setAlert={ setAlert }
                    />
                </form>
            </div>
    );
};

export default HaveAnAccount;
