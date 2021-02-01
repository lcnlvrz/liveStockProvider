import { Avatar, IconButton } from '@material-ui/core';
import React, { useState } from 'react';
import moment from 'moment';
import { useInView } from 'react-intersection-observer';
import ClipLoader from "react-spinners/ClipLoader";
import DeleteIcon from '@material-ui/icons/Delete';
import axiosInstance from '../../../api/axiosConfig';
import { isTokenValid } from '../../../helpers/validators';
import { useDispatch, useSelector } from 'react-redux';
import { setDeleteOneClient } from '../../../actions/provider';
moment.locale('es');


const ClientCard = ( props ) => {

    const dispatch = useDispatch();

    const { client, noObserver } = props;

    const [ref, inView] = useInView({
        triggerOnce: true,
        rootMargin: "0px 0px"
    });

    const [loading, setLoading] = useState( false );

    const provider = useSelector(state => state.provider);

    const date = new Date(client.createdAt*1000);

    if ( noObserver ) {

        return (

            <div
            className='flex items-center justify-between'>
                <div className='flex items-center mx-5'>
                    <Avatar
                    src={ client.profilePhoto }
                    />
                    <div className='flex flex-col ml-5'>
                        <h4> Username: 
                        <span className='font-semibold'> { client.username } </span> </h4>
                        <h4> Creado: 
                            <span className='font-semibold'> { moment( date ).fromNow() } 
                            </span> 
                        </h4>
                    </div>
                </div>
                <div className='mr-5'>
                    { loading 
                    ? 
                    <ClipLoader/> 
                    :  
                    <IconButton
                    onClick={ () => {

                        if ( provider.isForDemo ) return false; 

                        const token = isTokenValid();

                        if ( !token ) return false;

                        const clientID = client._id;

                        setLoading( true );

                        axiosInstance.delete( '/delete-client', { data:{ clientID }, headers:{ authorization:token }} )
                        .then( (response) => {

                            setLoading( false );
                            dispatch( setDeleteOneClient( clientID ) );
                            

                        } )
                        .catch( (err) => {

                            setLoading( false );
                            console.log( err );

                        } );

                    } }
                    style={{ color:'red', outline:'none' }}
                    >
                        <DeleteIcon/>
                    </IconButton> }
                </div>
            </div>

        );

    };

    return (
        <div
        data-inview={ inView }
        ref={ ref } 
        className='flex items-center justify-between'>
            { inView ?  
            <>
                <div className='flex items-center mx-5'>
                    <Avatar
                    src={ client.profilePhoto }
                    />
                    <div className='flex flex-col ml-5'>
                        <h4> Username: 
                        <span className='font-semibold'> { client.username } </span> </h4>
                        <h4> Creado: 
                            <span className='font-semibold'> { moment( date ).fromNow() } 
                            </span> 
                        </h4>
                    </div>
                </div>
                <div className='mr-5'>
                    { loading 
                    ? 
                    <ClipLoader/> 
                    :  
                    <IconButton
                    onClick={ () => {

                        if ( provider.isForDemo ) return false; 

                        const token = isTokenValid();

                        if ( !token ) return false;

                        const clientID = client._id;

                        setLoading( true );

                        axiosInstance.delete( '/delete-client', { data:{ clientID }, headers:{ authorization:token }} )
                        .then( (response) => {

                            setLoading( false );
                            dispatch( setDeleteOneClient( clientID ) );
                            

                        } )
                        .catch( (err) => {

                            setLoading( false );
                            console.log( err );

                        } );

                    } }
                    style={{ color:'red', outline:'none' }}
                    >
                        <DeleteIcon/>
                    </IconButton> }
                </div>
            </> 
            :
            <div className='flex items-center justify-center text-center w-full'>
                <ClipLoader/>
            </div>
            }
        </div>
    )
}

export default ClientCard
