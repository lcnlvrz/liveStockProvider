import React from 'react';
import SentimentVeryDissatisfiedRoundedIcon from '@material-ui/icons/SentimentVeryDissatisfiedRounded';
import { centerVertically, outlineButton } from '../../constant';
import { Link } from 'react-router-dom';

const PageDoesnotExist = () => {
    return (
        <div
        className={ centerVertically }
        >
            <SentimentVeryDissatisfiedRoundedIcon
            style={{ fontSize:'150px' }}
            />
            <h1 className='font-semibold text-2xl'> 
                Pagina no encontrada 
            </h1>
            <Link to='/'>
                <button
                className={ outlineButton }
                >

                    Ir al Inicio

                </button>
            </Link>
        </div>
    );
};

export default PageDoesnotExist;
