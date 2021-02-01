import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import HaveAnAccount from './HaveAnAccount';
import CreateAccount from './CreateAccount';
import ChooseOption from './ChooseOption';
import { dataMercadoPago } from '../../../helpers/getFromURL';
import { useSelector } from 'react-redux';

const Sucess = () => {

    const [kindOfAccount, setKindOfAccount] = useState( { type:'' } );

    const provider = useSelector(state => state.provider);
    const client = useSelector(state => state.client);
    
    const { paymentID, siteID, status } = dataMercadoPago();

    if ( ( provider.provider && !provider.isLoading ) || ( client.username && !client.isLoading ) ) return <Redirect to='/panel'/>

    if ( siteID !== 'MLA' || !paymentID || status !== 'approved' ) return <Redirect to='/'/>

    if ( !kindOfAccount.type ) return <ChooseOption setKindOfAccount={ setKindOfAccount }/>

    if ( kindOfAccount.type === 'newAccount' )  return <CreateAccount  paymentID={ paymentID }/>

    return <HaveAnAccount paymentID={ paymentID }/>;


};

export default Sucess
