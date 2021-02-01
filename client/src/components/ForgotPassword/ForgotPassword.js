import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import ThirdStep from './ThirdStep';

const ForgotPassword = () => {

    const provider = useSelector(state => state.provider);
    const client = useSelector(state => state.client);

    const [steps, setSteps] = useState( { firstStep:true, secondStep:false } );

    const [dataUser, setDataUser] = useState({ email:'', otp:'' });

    if ( ( provider.provider && !provider.isLoading ) || ( client.username && !client.isLoading ) ) return <Redirect to='/panel'/>

    if ( steps.firstStep ) return <FirstStep setSteps={setSteps} dataUser={ dataUser } setDataUser={ setDataUser }/>

    if ( steps.secondStep ) return <SecondStep setSteps={ setSteps } setDataUser={ setDataUser } dataUser={ dataUser }/>

    if ( steps.thirdStep ) return <ThirdStep dataUser={ dataUser }/>


};

export default ForgotPassword;
