import React from 'react';
import InfoIcon from '@material-ui/icons/Info';

const AlertInput = ( props ) => {

    const { message } = props;

    return (
        <div className='flex flex-row items-start justify-start mt-2'>
            <InfoIcon
            style={{ color:'#3f51b5' }}
            />
            <h3 className='text-sm font-semibold ml-1'>
                { message }
            </h3>
        </div>
    );
};

export default AlertInput;
