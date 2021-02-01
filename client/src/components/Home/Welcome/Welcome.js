import React, { Fragment, useEffect, useRef, useState } from 'react'
import FirstPart from './FirstPart';
import SecondPart from './SecondPart';
import ThirdPart from './ThirdPart';
import FourthPart from './FourthPart';
import FifthPart from './FifthPart';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Welcome = () => {

    const [takeUserTo, setTakeUserTo] = useState( { part:'' } );

    const provider = useSelector(state => state.provider);
    const client = useSelector(state => state.client);

    const secondPart = useRef( null );
    const thirdPart = useRef( null );
    const fourthPart = useRef( null );

    useEffect(() => {

        window.scrollTo(0, 0);
        
    }, []);

    useEffect(() => {

        const behavior = { behavior:'smooth' };

        if ( takeUserTo.part === 'secondPart' ) return secondPart.current.scrollIntoView( behavior );
        if ( takeUserTo.part === 'thirdPart' ) return thirdPart.current.scrollIntoView( behavior );
        if ( takeUserTo.part === 'fourthPart' ) return fourthPart.current.scrollIntoView( behavior );
        
    }, [takeUserTo]);

    if ( ( provider.provider && !provider.isLoading ) || ( client.username && !client.isLoading ) ) return <Redirect to='/panel'/> 

    return (
        <>
            <FirstPart
            setTakeUserTo={ setTakeUserTo }
            takeUserTo={ takeUserTo }
            />
            <div ref={ secondPart }></div>
            <SecondPart/>
            <div ref={ thirdPart }></div>
            <ThirdPart/>
            <div ref={ fourthPart }></div>
            <FourthPart/>
            <FifthPart/>
        </>  
    );
};

export default Welcome;
