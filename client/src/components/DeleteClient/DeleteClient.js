import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../../api/axiosConfig';
import { isTokenValid } from '../../helpers/validators';
import Header from '../Home/Panel/Header';
import InputSearcher from '../InputSearcher';
import ClientCard from './ClientCard';
import DefaultClients from './DefaultClients';
import ClipLoader from "react-spinners/ClipLoader";
import { Redirect } from 'react-router-dom';

const DeleteClient = () => {

    const [input, setInput] = useState( { client:'' } );

    const dispatch = useDispatch();

    const [isSearching, setIsSearching] = useState( false );
    const [clientsSearcher, setClientsSearcher] = useState([]);

    const [alert, setAlert] = useState( { type:'', message:'' } );

    const [loading, setLoading] = useState( false );

    const provider = useSelector(state => state.provider);

    useEffect(() => {

        window.scrollTo(0, 0)
        
    }, []);

    useEffect(() => {

        if ( !input.client ) {

            setIsSearching( false );
            setClientsSearcher( [] );
            setAlert( { type:'', message:'' } );
            return false;

        };

        const delay = setTimeout(() => {

            const token = isTokenValid( dispatch );

            if ( !token ) return false;

            setIsSearching( true );

            axiosInstance.get( '/client-searcher', { headers:{ authorization:token, client:input.client } } )
            .then( (response) => {

                setClientsSearcher( response.data.clients );
                setIsSearching( false );

            } )
            .catch( (err) => {

                setIsSearching( false );
                setAlert( { type:'client', message:'Ningun cliente coincide con tu busqueda.' } );
                setClientsSearcher( [] );

            } );
            
    
        }, 3000);
    
        return () => clearTimeout( delay );
        
    }, [ input, dispatch ]);

    if ( !provider.provider && !provider.isLoading ) return <Redirect to='/panel'/>

    return (
        <div className='space-y-5 my-5'>
            <div className='mx-5'>
                <InputSearcher
                setInput={ setInput }
                setIsSearching={ setIsSearching }
                valueInput={ input.client }
                placeHolder='Busca el cliente a eliminar'
                nameInput='client'
                />
            </div>
            { !isSearching && clientsSearcher.length === 0 && !alert.type && <DefaultClients/> }
            { !isSearching && clientsSearcher.length > 0 && 
            clientsSearcher.map( ( client, index ) => (

                <ClientCard
                loading={ loading }
                setLoading={ setLoading }
                client={ client }
                key={ index }
                />

            ) )}
            { !isSearching && clientsSearcher.length === 0 && input.client && alert.type === 'client' && 
            <h3 className='font-semibold text-2xl text-center mx-5'> 
                { alert.message } 
            </h3> }
            { isSearching && 
            <div className='w-full text-center '>
                <ClipLoader/>
            </div> }
        </div>
    );
};

export default DeleteClient;
