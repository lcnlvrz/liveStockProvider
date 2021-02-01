import axios from "axios";
import axiosInstance from "../api/axiosConfig";
import { clientIDimgur } from "../constant";
import { isAnyValueChange, isTokenClientValid, isTokenValid, validateFormAddUserClient, validateSubmitAddProduct } from "./validators";
import { setDeleteLasProductAddNew, setDeleteLastClientAddNew, setDeleteOneProduct, setNewClient, setNewProduct, setNewProductInfo, setProfilePhoto, setProviderInvalid } from '../actions/provider';
import { setProfilePhotoClient } from "../actions/client";
import { setCurrentProductInvalid, setCurrentProductUpdate } from "../actions/currentProduct";
import { handleCloseModal } from "./materialUI";

export const submitAddProduct = ( images, dispatch, input, setLoading, setInput, setImages, setAlert, setOpen, provider ) => {

    const { isActive } = provider;

    if ( !isActive ) {

        dispatch( setProviderInvalid() );
        setAlert( { type:'product', message:'Tu cuenta no esta activa' } );
        return false;

    };

    const formData = new FormData();

    formData.append( 'image', images[0].file );

    setLoading( true );

    axios.post( 'https://api.imgur.com/3/image', formData, { headers:{ Authorization:`Client-ID ${ clientIDimgur }` } } )
    .then( (response) => {

        const objectToPost = { title:input.title, description:input.description, stock:Number( input.stock ), price:Number( input.price ), image:response.data.data.link };

        const token = isTokenValid( dispatch );

        if ( !token ) return false;

        axiosInstance.post( '/product', objectToPost, { headers:{ authorization:token } } )
        .then( (response) => {

            setLoading( false );
            setImages( [] );
            setInput( { title:'', stock:'', price:'', description:'' } );
            setOpen( true );

            if ( provider.products.length === 10 ) {

                const products = [ ...provider.products ];

                products.pop();
                products.unshift( response.data.product );

                dispatch( setDeleteLasProductAddNew( products ) );
   

            } else {

                dispatch( setNewProduct( response.data.product ) );

            };

        } )
        .catch( (err) => {

            setLoading( false );
            setAlert( { type:'image', message:err.response.data.message } );

        } );

    } )
    .catch( (err) => {

        setLoading( false );
        setAlert( { type:'image', message:'Un error ocurrio al subir la imagen. Prueba de nuevo porfavor.' } )

    } );

}

export const submitChangeProfilePhoto = ( setAlert, dispatch, images, setLoading, user, setOpen, setImages, provider, isClient ) => {

    const { isActive } = provider;

    if ( !isActive && !isClient ) {

        dispatch( setProviderInvalid() );
        setAlert({ type:'image', message:'Tu cuenta no se encuentra activa.' });
        return false;

    };

    setAlert( { type:'', message:'' } );

    const token = isTokenValid( dispatch );
    const tokenClient = isTokenClientValid( dispatch );

    if ( !token && !tokenClient ) return false;

    const formData = new FormData();

    formData.append( 'image', images[0].file );

    setLoading( true );

    axios.post( 'https://api.imgur.com/3/image', formData, { headers:{  Authorization:`Client-ID ${ clientIDimgur }` } } )
    .then( (response) => {

        const profilePhoto = response.data.data.link;


        if ( user.isProvider && !user.isClient ) {

            axiosInstance.post ( '/profilePhoto', { profilePhoto }, { headers:{ authorization:token } } )
            .then( (response) => {

                setLoading( false );
                setOpen( true );
                dispatch( setProfilePhoto( response.data.profilePhoto ) );
                setImages( [] );


            } )
            .catch( (err) => {

                console.log( err.response );

                setLoading( false );
                setAlert( { type:'image', message:err.response.data.message } );

            } ); 

        } else if ( user.isClient && !user.isProvider ) {


            axiosInstance.post( '/profilePhoto-client', { profilePhoto }, { headers:{ authorization:tokenClient } } )
            .then( (response) => {

                setLoading( false );
                setOpen( true );
                dispatch( setProfilePhotoClient( response.data.profilePhoto ) );
                setImages( [] );

            } )
            .catch( (err) => {

                console.log( err.response );
                setLoading( false );
                setAlert( { type:'image', message:err.response.data.message } );

            } );

        }; 

    })
    .catch( (err) => {

        setLoading( false );
        setAlert( { type:'image', message:'Un error ocurrio al guardar la foto' } );

    } );
    

}

export const submitAddClient = ( e, setAlert, input, setLoading, setOpen, setInput, dispatch, provider ) => {

    e.preventDefault();

    setAlert( { type:'', message:'' } );

    const isValid =  validateFormAddUserClient( input, setAlert );

    if ( !isValid ) return false;

    const token = isTokenValid();

    if ( !token ) return false;

    const { isActive } = provider;

    if ( !isActive ) {

        dispatch( setProviderInvalid() );
        setAlert( { type:'client', message:'Tu cuenta no esta activa.' } );
        return false;

    };

    setLoading( true );

    axiosInstance.post( '/client', input, { headers:{ authorization:token } } )
    .then( (response) => {

        setLoading( false );
        setOpen( true );
        setInput( { username:'', password:'' } );

        if ( provider.clients.length === 10 ) {

            const clients = [ ...provider.clients ];
            clients.pop();
            clients.unshift( response.data.newClient );

            dispatch( setDeleteLastClientAddNew( clients ) );


        } else {

            dispatch( setNewClient( response.data.newClient ) );

        };


    } )
    .catch( (err) => {
    
        setLoading( false );
        setAlert( { type:'client', message:err.response.data.message } );
    
    

    } );

};


export const submitUpdateProductInfo = ( e, input, dispatch, setAlert, currentProduct, setLoading, provider, setOpen, setCloseModal, setIsNewUpdate ) => {

    e.preventDefault();
    
    const { isActive } = provider;

    if ( !isActive ) {

        dispatch( setProviderInvalid() );
        setAlert( { type:'product', message:'Tu cuenta nos se encuentra activa' } );
        return false;

    };

    const { title, stock, price, description } = input;

    if ( !title || !stock || !price || !description ) {

      return false;

    };

    const token = isTokenValid( dispatch );

    if ( !token ) return false;

    setAlert( { type:'', message:'' } );

    const validation = validateSubmitAddProduct( input, setAlert, [ 0 ] );

    if ( !validation ) return false;

    const initialValues = { 
      
      title:currentProduct.title,
      stock:currentProduct.stock.toString(),
      price:currentProduct.price.toString(),
      description:currentProduct.description 

    };

    const isChangeAtLeastOne = isAnyValueChange( initialValues, input );

    if ( !isChangeAtLeastOne ) return setAlert( { type:'product', message:'No hay nuevos cambios' } );

    const fixNumbersInput = { ...input, stock:Number( input.stock ), price:Number( input.price ) };

    const productID = currentProduct._id;

    setLoading( true ); 

    axiosInstance.post( '/update-product', { input:fixNumbersInput, productID }, { headers:{ authorization:token } } )
    .then( (response) => {

      setLoading( false );

      const indexProductChange = provider.products.findIndex( ( product ) => {

        return product._id === productID;

      } );


      dispatch( setCurrentProductUpdate( response.data.productUpdate ) );

      if ( indexProductChange !== -1 ) {

        dispatch( setNewProductInfo( indexProductChange, response.data.productUpdate ) );

      };

      setIsNewUpdate( true );
      handleCloseModal( setOpen, setCloseModal );


    } )
    .catch( (err) => {

      setLoading( false ); 
      setAlert( { type:'product', message:err.response.data.message } );
      console.log( err );

    } );

};

export const submitDeleteProduct = ( currentProduct, dispatch, setLoading, setOpen, setDeleteProduct, history, setAlert, provider ) => {

    const productID = currentProduct._id;

    const token = isTokenValid( dispatch );

    if ( !token || !productID ) return false;

    const { isActive } = provider;

    if ( !isActive ) {

        dispatch( setProviderInvalid() );
        setAlert( { type:'product', message:'Tu cuenta no se encuentra activa.' } );
        return false;

    };

    setLoading( true );

    axiosInstance.delete( '/delete-product', { data:{ productID }, headers:{ authorization:token } } )
    .then( (response) => {

        setLoading( false );

        console.log( productID );

        dispatch( setDeleteOneProduct( productID ) );
        handleCloseModal( setOpen, setDeleteProduct );
        setDeleteProduct( false );
        dispatch( setCurrentProductInvalid() );

        history.push( '/mis-productos' );

    } )
    .catch( (err) => {

        setLoading( false );
        // setAlert( { type:'product', message:err.response.data.message } );
        console.log( err );

    } );

}