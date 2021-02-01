import { setProvider, setProviderInvalid } from "../actions/provider";
import axiosInstance from "./axiosConfig";


export const getProviderInfo = ( dispatch ) => {

    const token = localStorage.getItem( 'token' );

    if ( !token ) return dispatch( setProviderInvalid() );

    axiosInstance.get( '/provider-info', { headers:{ authorization:token } } )
    .then( response => {

        const { isActive } = response.data.provider;

        if ( !isActive ) {

            dispatch( setProviderInvalid() );
            return false;

        };

        dispatch( setProvider( response.data.provider ) );

    })
    .catch( (err) => {

        dispatch( setProviderInvalid() );
        localStorage.removeItem( 'token' );


    } );

};