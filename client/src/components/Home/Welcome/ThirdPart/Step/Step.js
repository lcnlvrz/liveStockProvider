import React from 'react';

const Step = ( props ) => {

    const { title, text, Icon } = props;

    return (
        <div className='steps mx-5 my-5'>
            <Icon
            style={{ fontSize:'50px' }}
            />
            <h3 className='font-semibold text-lg'>
                { title }
            </h3>
            <p> 
               { text }
            </p>
        </div>
    );
};

export default Step;
