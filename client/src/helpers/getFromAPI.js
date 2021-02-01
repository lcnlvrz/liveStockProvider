import { setCurrentProduct, setCurrentProductInvalid } from "../actions/currentProduct";
import axiosInstance from "../api/axiosConfig";
import { getProductIDfromURL } from "./getFromURL";
import { isTokenClientValid, isTokenValid } from "./validators";


export const getOneProduct = ( currentProduct, provider, client, setIsProductStored, dispatch ) => {

    const productID = getProductIDfromURL();

    if ( !currentProduct.isValid ) {

        if ( provider.providerID && !client.clientID && !provider.isLoading && !client.isLoading ) {

           const token = localStorage.getItem( 'token' );

           axiosInstance.get( '/one-product', { headers:{ authorization:token, productID } }  )
           .then( (response) => {

                setIsProductStored( { isLoading:false, exists:true } );
                dispatch( setCurrentProduct( response.data.product ) );

           } )
           .catch( (err) => {

                setIsProductStored( { isLoading:false, exists:false } );
                dispatch( setCurrentProductInvalid() );
                console.log( err );

           } );

        } else if ( !provider.providerID && client.clientID && !provider.isLoading && !client.isLoading ) {

            const tokenClient = localStorage.getItem( 'tokenClient' );

            axiosInstance.get( '/one-product-as-client', { headers:{ authorization:tokenClient, productID } }  )
           .then( (response) => {

                setIsProductStored( { isLoading:false, exists:true } );
                dispatch( setCurrentProduct( response.data.product ) );
            

           } )
           .catch( (err) => {

                setIsProductStored( { isLoading:false, exists:false } );
                console.log( err );

           } );

        };

    } else {

        setIsProductStored( { isLoading:false, exists:true } );

    };

};

export const getProductBySearcher = ( input, setProductsBySearch, setIsSearching, setAlert, dispatch ) => {

    if ( !input.product ){

        setProductsBySearch( [] );
        setIsSearching( false );
        setAlert( { type:null, message:'' } );
        return false;

    };

    setProductsBySearch( [] );
    setAlert( { type:null, message:'' } );

    

        const token = isTokenValid( dispatch );
        const tokenClient = isTokenClientValid( dispatch );

        if ( !token && !tokenClient ) return false;

        if ( token && !tokenClient ) {

            axiosInstance.get( '/specific-product', { headers:{ authorization:token, search:input.product } } )
            .then( (response) => {

                setIsSearching( false );
                setProductsBySearch( response.data.products );

            } )
            .catch( (err) => {

                setAlert( { type:'search', message:'No se encontro ningun producto con tu busqueda. Intenta con otro termino.' } );
                setIsSearching( false ); 

            }); 

        } else if( !token && tokenClient ){

            axiosInstance.get( '/specific-product-as-client', { headers:{ authorization:tokenClient, search:input.product } } )
            .then( (response) => {

                setIsSearching( false );
                setProductsBySearch( response.data.products );

            } )
            .catch( (err) => {

                console.log( err.response );

                setAlert( { type:'search', message:'No se encontro ningun producto con tu busqueda. Intenta con otro termino.' } );
                setIsSearching( false ); 

            }); 

        };
   

};