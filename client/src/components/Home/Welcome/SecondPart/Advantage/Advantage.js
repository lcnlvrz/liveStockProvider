import React from 'react';

const Advantage = (props) => {

    const { title, text, FirstIcon, SecondIcon } = props;

    return (
        <div 
        className='flex flex-col py-5 mx-5'>
            <div
            style={{ transition:'opacity 5s', opacity:1 }}
            >  
                <div className='space-x-5'>
                    <FirstIcon
                    style={{ color:'white', fontSize:'50px' }}
                    />
                    <SecondIcon
                    style={{ color:'white', fontSize:'50px' }}
                    />
                </div>
                <h3 className='text-white font-bold text-lg mt-5'>  
                    { title }
                </h3>
                <p className='text-white'> 
                    { text }
                </p>
            </div> 
        </div>
    );
};

export default Advantage;
