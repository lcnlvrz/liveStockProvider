import React from 'react';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import { centerVertically, linkSignInProvider, outlineButton } from '../../../constant';
import { Link, Redirect } from 'react-router-dom';
import { dataMercadoPago } from '../../../helpers/getFromURL';
import { useSelector } from 'react-redux';

const Failure = () => {

    const provider = useSelector(state => state.provider);
    const client = useSelector(state => state.client);

    if ( ( provider.provider && !provider.isLoading ) || ( client.username && !client.isLoading ) ) return <Redirect to='/panel'/>  

    const  { status, siteID } = dataMercadoPago();

    if ( status !== 'null' || siteID !== 'MLA' ) return <Redirect to='/'/>

    return (
        <div className={ centerVertically }>
            <SentimentVeryDissatisfiedIcon
            style={{ fontSize:'100px' }}
            />
            <h1 className='font-bold text-center'> 
                Lamentamos que no hayas querido continuar con la membresia 
            </h1>
            <span className='font-light text-center text-sm'> 
                Si no te decides, puedes probar nuestra demo sin compromisos. 
            </span> 
            <Link to={ `${ linkSignInProvider }&is_demo=true` }>
                <button
                type='button'
                className={ outlineButton }
                >
                    Probar Demo
                </button>
            </Link>
        </div>
    );
};

export default Failure;
