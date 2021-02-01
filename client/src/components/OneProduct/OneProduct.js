import React, { useEffect, useState } from 'react';
import Header from '../Home/Panel/Header';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css';
import InnerImageZoom from 'react-inner-image-zoom';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/es'
import ClipLoader from "react-spinners/ClipLoader";
import { centerVertically } from '../../constant';
import ButtonsOnlyProvider from './ButtonsOnlyProvider';
import { getOneProduct } from '../../helpers/getFromAPI';

moment.locale('es');

const OneProduct = () => {

    useEffect(() => {

        window.scrollTo(0, 0);
        
    }, []);

    const provider = useSelector(state => state.provider);
    const client = useSelector(state => state.client);
    const currentProduct = useSelector(state => state.currentProduct);

    const dispatch = useDispatch();

    const [isProductStored, setIsProductStored] = useState( { isLoading:true, exists:false } );

    useEffect(() => {

        getOneProduct( currentProduct, provider, client, setIsProductStored, dispatch );
        
    }, [ provider, client, currentProduct, dispatch ]);

    if ( !isProductStored.isLoading && !isProductStored.exists ) return <Redirect to='/panel'/>

    if ( currentProduct.isLoading ) {

        return ( 

            <div className={ centerVertically }>
                <ClipLoader/> 
            </div>

         );

    } else {

        return (

            <div className='one__product__container'>
                <div className='product flex flex-wrap flex-initial items-center mx-10 justify-evenly mt-10'>
                    <InnerImageZoom
                    className='w-64 border-solid border-4'
                    zoomScale={ 0.1 } 
                    src={ currentProduct.image } 
                    zoomSrc={ currentProduct.image }/>
                    <div className='info__product'>
                        <div className='border-solid border-4 my-5 p-5 w-64'>
                            <h3 className='font-semibold text text-lg text-center'>  
                            { currentProduct.title }
                            </h3>
                            <hr className='py-1'/>
                            <h3 className='text-center'>
                                <span className='font-semibold text-black'>
                                Stock:
                                </span> { currentProduct.stock }
                            </h3>
                            <hr className='py-1'/>
                            <h3 className='text-center'>    
                                <span className='font-semibold text-black mr-1'>
                                Ultima actualizacion: 
                                </span>

                                { moment( currentProduct.lastUpdate ).fromNow() }
                            </h3>
                            <hr className='py-1'/>
                            <h2 className='text-center font-semibold text-2xl'> 
                                ARS ${ currentProduct.price }
                            </h2>
                        </div>
                        { provider.provider && <ButtonsOnlyProvider/> }
                    </div>
                </div>
                <div className='more__information__containerw-full mx-2 text-center my-5 space-y-5'>
                    <h3 className='font-semibold text-4xl'> 
                        Mas información 
                    </h3>
                    <p className='whitespace-pre-line mx-10 '> 
                        { currentProduct.description }
                    </p>
                </div>
            </div>

        );

    };
};

export default OneProduct
