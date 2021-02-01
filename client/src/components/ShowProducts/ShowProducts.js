import React, { useEffect, useState } from 'react'
import Header from '../Home/Panel/Header';
import './ShowProducts.css';
import CardProduct from './CardProduct';
import DefaultSection from './DefaultSection';
import ClipLoader from "react-spinners/ClipLoader";
import { useDispatch } from 'react-redux';
import { getProductBySearcher } from '../../helpers/getFromAPI';
import InputSearcher from '../InputSearcher';

const ShowProducts = ( props ) => {

    const { lastProducts } = props;

    const dispatch = useDispatch();

    const [input, setInput] = useState( { product:'' } );

    const [isSearching, setIsSearching] = useState( false );

    const [productsBySearch, setProductsBySearch] = useState( [] );

    const [alert, setAlert] = useState( { type:null, message:'' } );

    useEffect(() => {

        setIsSearching( true );
        setProductsBySearch( [] );
        setAlert( { type:null, message:'' } );

        if ( !input.product ) {

            setIsSearching( false );
            return false;

        };

        const delay = setTimeout(() => {

            getProductBySearcher( input, setProductsBySearch, setIsSearching, setAlert, dispatch );

        }, 3000);

        return () => clearTimeout( delay );
        
    }, [ input, dispatch ]);

    return (
        <>
            <div className='search__products my-5 flex flex-col items-center justify-center'>
                <InputSearcher
                setInput={ setInput }
                setIsSearching={ setIsSearching }
                valueInput={ input.product }
                placeHolder='Busca el producto que necesitas'
                nameInput='product'
                />
            </div>
            { isSearching &&  
            <div className='flex items-center justify-center mt-30'>
                <ClipLoader size={ 60 }/>
            </div> }
            { productsBySearch.length > 0 &&  
            <div 
            className='flex flex-row flex-wrap justify-evenly bg-gray-200'> 
                { productsBySearch.map( ( product, index ) => (
                
                    <CardProduct key={ index } index={ index } product={ product }/>

                ) )}
            </div> }
            { productsBySearch.length === 0 && !isSearching && !alert.type && <DefaultSection
            lastProducts={ lastProducts }
            /> }
            { alert.type === 'search' 
            && 
            <h3 className='text-2xl text-center'> 
                { alert.message } 
            </h3> 
            }
        </>
    );
};

export default ShowProducts;
