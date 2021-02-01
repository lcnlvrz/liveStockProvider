import { setClientInvalid } from "../actions/client";
import { setProviderInvalid } from "../actions/provider";


export const validateSubmitAddProduct = ( inputData, setAlert, images ) => {

    const { title, stock, price, description } = inputData;

    if ( !title || !stock || !price || !description ) return false;

    if ( images.length === 0 ) return setAlert( { type:'image', message:'La imagen es necesaria' } );

    const isTitleValid = validateTitle(title);
    const isStockValid = validateStock( Number(stock) );
    const isPriceValid = validatePrice( Number(price) );
    const isDescriptionValid = validateDescriptionLength( description );

    if ( !isTitleValid ) {

        setAlert({ type:'title', message:'Solo se admiten letras y numeros'} );

        return false;

    };

    if ( !isStockValid ){

        setAlert( { type:'stock', message:'Solo se admiten numeros enteros' } );

        return false;

    };

    if ( !isPriceValid ) {

        setAlert( { type:'price', message:'Solo se admiten numeros enteros y decimales' } );

        return false;

    };

    if ( !isDescriptionValid ){

        setAlert( { type:'description', message:'1000 letras es lo maximo' } );

        return false;
    }; 

    return true;
}



const validateTitle = ( title ) => {

    const isString = typeof title;

    if ( isString !== 'string' || title.length > 200 ) return false;

    return true;

};

const validateStock = ( stock ) => {

    const isNumber = Number.isInteger( stock );

    const stockCopy = stock;

    const isDecimal = stockCopy.toString().split( '.' );

    if ( !isNumber || isDecimal.length > 1 ) return false;

    if ( !isNumber ) return false;

    return true;

};

const validatePrice = ( price ) => {

    const isNumber = Number.isInteger( price );
    const isDecimal = isFloat( price );

    if ( !isNumber && !isDecimal ) return false;

    return true;

};

function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
}

const validateDescriptionLength = ( description ) => {

    if ( description.length > 1000 ) return false;

    return true;

};


export const isTokenValid = ( dispatch ) => {

    const token = localStorage.getItem( 'token' );

    if ( !token ) {

        dispatch( setProviderInvalid() );
        return false;

    };

    return token;

};

export const isTokenClientValid = ( dispatch ) => {

    const tokenClient = localStorage.getItem( 'tokenClient' );

    if ( !tokenClient ) {

        dispatch( setClientInvalid() );
        return false;

    };
    
    return tokenClient;

};

const validateUsername = ( username ) => {

    const regexUsername = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/igm;

    const usernameAfterValidation = regexUsername.test( username );

    if ( !usernameAfterValidation ) return false;

    return true;

};

export const validatePassword = ( password ) => {

    const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

    const passwordAfterValidation = regexPassword.test( password );

    if ( !passwordAfterValidation ) return false;

    return true;

};


export const validateFormAddUserClient = ( inputData, setAlert ) => {

    setAlert( { type:'', message:'' } );

    const { username, password } = inputData;

    const isUsernameValid = validateUsername( username );
    const isPasswordValid = validatePassword( password );

    if ( !isUsernameValid ) {

        setAlert( { type:'username', message:'El nombre de usuario no cumple con las reglas.' } );

        return false;

    };

    if ( !isPasswordValid ) {

        setAlert( { type: 'password', message:'La contraseña es invalida. No cumple con los requerimientos' } );

        return false;

    };

    return true;


};


export const isAnyValueChange = ( initialValues, finalValues ) => {

    const valuesInitialObj = Object.values( initialValues );
    const valuesFinalObj = Object.values( finalValues );

    const check = valuesFinalObj.map( ( value, index ) => {

      if ( value !== valuesInitialObj[ index ] ) return 'change';

      return true;

    } );

    console.log( check );


    const indexBoolean = check.indexOf( 'change' );

    if ( indexBoolean !== -1 ) return true;

    return false;

};
