import React, { useState } from 'react'
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import ThirdStep from './ThirdStep';

const CreateAccount = ( props ) => {

    const { paymentID } = props;

    const [steps, setSteps] = useState( { firstStep:true, secondStep:false, thirdStep:false } );

    const [emailUser, setEmailUser] = useState( '' );

    const [OTP, setOTP] = useState( 0 );

    if ( steps.firstStep ) return <FirstStep setSteps={ setSteps } setEmailUser={ setEmailUser }/>

    if ( steps.secondStep ) return <SecondStep setSteps={ setSteps } emailUser={ emailUser } 
    setOTP={ setOTP }/>

    if ( steps.thirdStep ) return <ThirdStep paymentID={ paymentID } otp={ OTP } emailUser={ emailUser }/>

       
};

export default CreateAccount
