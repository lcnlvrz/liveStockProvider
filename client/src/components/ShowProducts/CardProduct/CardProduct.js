import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import ClipLoader from "react-spinners/ClipLoader";
import { useDispatch } from 'react-redux';
import { setCurrentProduct } from '../../../actions/currentProduct';

const CardProduct = ( props ) => {

    const dispatch = useDispatch();

    const [ref, inView] = useInView({
        triggerOnce: true,
        rootMargin: "0px 0px"
    });

    const { product, index, noObserver } = props;

    console.log( inView );

    if ( noObserver ) {

        return (

            <div
            onClick={ () => {

                const { image, stock, lastUpdate, price, description, title, _id } = product;

                const currentProductObj = {

                    title,
                    _id,
                    image,
                    stock,
                    lastUpdate,
                    price,
                    description,
                    isValid:true,
                    isLoading:false

                };

                dispatch( setCurrentProduct( currentProductObj ) );

            } }
            key={index}
            className='one__card my-3 mx-2  cursor-pointer transform hover:shadow-2xl bg-white'>
                <Link to={ `/product/mas-detalles/?product_id=${ product._id }` }>  
                    <div className='flex items-center justify-center'>
                        <img
                        className='h-40 object-cover w-full'
                        alt='' 
                        src={ product.image }
                        />
                    </div>
                    <div
                    style={{ width:'140px' }}
                    >
                        <h3 
                        className='my-3 truncate'> 
                            { product.title }
                        </h3>
                    </div>
                    <div
                    style={{ width:'140px' }}
                    >
                        <h3 className='truncate'> 
                            ARS${ product.price }
                        </h3>
                    </div>
                    <div
                    style={{ width:'140px' }}
                    >
                        <h3 className='text-gray-400 truncate'>      
                            Stock: { product.stock }
                        </h3>
                    </div>
                    <div className='text-right  show__more__details my-2'>
                        <span className='hover:bg-gray-200'> 
                            Ver mas detalles 
                            <ArrowForwardIosRoundedIcon
                            id='arrow__icon'
                            />
                        </span>
                    </div>
                </Link>   
            </div>

        );

    };

    return (
        <div
        data-inview={inView}
        ref={ ref }
        onClick={ () => {

            const { image, stock, lastUpdate, price, description, title, _id } = product;

            const currentProductObj = {

                title,
                _id,
                image,
                stock,
                lastUpdate,
                price,
                description,
                isValid:true,
                isLoading:false

            };

            dispatch( setCurrentProduct( currentProductObj ) );

        } }
        key={index}
        className='one__card my-3 mx-2  cursor-pointer transform hover:shadow-2xl bg-white'>
            { inView ?
            <Link to={ `/product/mas-detalles/?product_id=${ product._id }` }>  
                <div className='flex items-center justify-center'>
                    <img
                    className='h-40 object-cover w-full'
                    alt='' 
                    src={ product.image }
                    />
                </div>
                <div
                style={{ width:'140px' }}
                >
                    <h3 
                    className='my-3 truncate'> 
                        { product.title }
                    </h3>
                </div>
                <div
                style={{ width:'140px' }}
                >
                    <h3 className='truncate'> 
                        ARS${ product.price }
                    </h3>
                </div>
                <div
                style={{ width:'140px' }}
                >
                    <h3 className='text-gray-400 truncate'>      
                        Stock: { product.stock }
                    </h3>
                </div>
                <div className='text-right  show__more__details my-2'>
                    <span className='hover:bg-gray-200'> 
                        Ver mas detalles 
                        <ArrowForwardIosRoundedIcon
                        id='arrow__icon'
                        />
                    </span>
                </div>
            </Link>   
            :
            <ClipLoader/>}
        </div>
        
        
        
    )
}

export default CardProduct
