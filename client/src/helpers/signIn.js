import axiosInstance from "../api/axiosConfig";
import { setProvider } from "../actions/provider";
import { validateFormAddUserClient } from "./validators";
import { setClient } from "../actions/client";
import { setCurrentProductInvalid } from "../actions/currentProduct";

export const signInProvider = ( e, inputData, setAlert, setLoading, history, dispatch ) => {

    e.preventDefault();

    setAlert({ type:'', message:'' });

    const { user, password } = inputData;
    
    if ( !user || !password ) return false;

    const isValid = validateFormAddUserClient( { username:user, password }, setAlert );

    if ( !isValid ) return setAlert( { type:'provider', message:'El proveedor no existe' } );

    setLoading( true );

    axiosInstance.post( '/signIn-provider', inputData )
    .then( (response) => {

        setLoading( false );
        
        const token = response.data.token;

        localStorage.setItem( 'token', token );
        dispatch( setProvider( response.data.provider ) );
        dispatch( setCurrentProductInvalid() );
        history.push( '/panel' );

    } )
    .catch( err => {

        setLoading( false );
        setAlert( { type:'provider', message:err.response.data.message } );

    } );

};

export const signInClient = ( e, setAlert, setLoading, input, dispatch, history ) => {


    e.preventDefault();
    setAlert( { type:'', message:'' } );
    const isValid = validateFormAddUserClient( input, setAlert );

    if ( !isValid ) return setAlert( { type:'client', message:'El cliente no existe.' } );

    setLoading( true );

    axiosInstance.post( '/signIn-client', input )
    .then( (response) => {

        
        setLoading( false );
        localStorage.setItem( 'tokenClient', response.data.token );
        dispatch( setClient( response.data.client ) );
        dispatch( setCurrentProductInvalid() );
        history.push( '/panel' );

    } )
    .catch( (err) => {

        console.log( err.response );
        setLoading( false );
        setAlert( { type:'client', message:err.response.data.message } );

    } );


}