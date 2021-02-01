import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { centerVertically, linkValidatePayment } from '../../../constant';
import TimerIcon from '@material-ui/icons/Timer';
import { dataMercadoPago } from '../../../helpers/getFromURL';
import { useSelector } from 'react-redux';


const Pending = () => {

    const provider = useSelector(state => state.provider);
    const client = useSelector(state => state.client);

    const { siteID, status, paymentID } = dataMercadoPago();

    if ( ( provider.provider && !provider.isLoading ) || ( client.username && !client.isLoading ) ) return <Redirect to='/panel'/>

    if ( siteID !== 'MLA' || status !== 'in_process' || !paymentID ) return <Redirect to='/'/>

    return (
        <div className={ centerVertically }>
            <TimerIcon
            style={{ fontSize:'100px' }}
            />
            <h1 className='text-3xl font-bold'>
                Pago pendiente 
            </h1>
            <h3 className='text-center mx-5'> 
                En el momento en que MercadoPago haya aprobado el pago, debes ir a 
                <Link 
                className='mx-1 text-blue-400 hover:text-blue-700 hover:font-semibold'
                to={ linkValidatePayment }> 
                    Validar Pago 
                </Link> 
                para continuar con el proceso 
            </h3>
        </div>
    );
};

export default Pending;
