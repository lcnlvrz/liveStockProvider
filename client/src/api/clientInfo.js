import { setClient, setClientInvalid } from "../actions/client";
import axiosInstance from "./axiosConfig";

export const getInfoClient = ( dispatch ) => {

    const tokenClient = localStorage.getItem( 'tokenClient' );

    if ( !tokenClient ) {

        dispatch( setClientInvalid() );
        return false;

    };
    
    axiosInstance.get( '/client-info', { headers:{ authorization:tokenClient } } )
    .then( (response) => {

        dispatch( setClient( response.data.client ) );

    } )
    .catch( (err) => {

        dispatch( setClientInvalid() );
        localStorage.removeItem( 'tokenClient' );

    } );


};