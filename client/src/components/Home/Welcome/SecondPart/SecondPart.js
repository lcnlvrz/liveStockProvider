import React from 'react';
import Advantage from './Advantage';
import { advantages } from '../../../../constant';

const SecondPart = () => {


    return (
        <div className='bg-black space-y-20'>
            { advantages.map( ( advantage, index ) => (

                <Advantage
                key={ index }
                title={ advantage.title }
                text={ advantage.text }
                FirstIcon={ advantage.firstIcon }
                SecondIcon={ advantage.secondIcon }
                />

            ) ) }
        </div>
    );
};

export default SecondPart;
