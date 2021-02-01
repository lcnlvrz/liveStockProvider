import React from 'react';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import InfoIcon from '@material-ui/icons/Info';

const AlertUsername = ( props ) => {

    const { alert, setAlert } = props;

    if ( alert.type === 'username' ) {

        return (

            <div className='flex flex-row items-start justify-start mt-2'>
                <WarningRoundedIcon
                style={{ color:'red' }}
                />
                <h3 className='text-sm font-semibold ml-1 text-red-500'>
                    { alert.message }
                    <span
                    onClick={ () => setAlert( { type:'', message:'' } ) }
                    className='underline cursor-pointer text-green-500 mx-1 hover:text-green-700'>
                        Entendido
                    </span>
                </h3>
            </div> 

        );

    } else {

        return (

            <div className='flex flex-row items-start justify-start mt-2'>
                <InfoIcon
                style={{ color:'#3f51b5' }}
                />
                <h3 className='text-sm font-semibold ml-1'>
                    Solo se permiten letras, . y _
                </h3>
            </div>

        );

        
    };

};

export default AlertUsername
