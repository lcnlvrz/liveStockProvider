import React from 'react';
import { steps } from '../../../../constant';

import Step from './Step';

const ThirdPart = () => {

    return (

        <div className='py-5 space-y-10'>
            <h1 className='text-3xl font-bold mx-5'> 
                En tan solo 3 pasos 
            </h1>
            { steps.map( ( step, index ) => (

                    <Step
                    key={index}
                    title={ step.title }
                    text={ step.text }
                    Icon={ step.Icon }
                    />

            ) ) }
        </div>
    );
};

export default ThirdPart;
