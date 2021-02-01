const currentURL = window.location.href;

const newURL = new URL( currentURL );

export const getProductIDfromURL = () => {

    const productID = newURL.searchParams.get( 'product_id' );

    return productID;

};


export const getIsSignInFromURL = () => {

    const signIn = newURL.searchParams.get( 'auth' );

    return signIn;

};

export const getIsMercadoPagoLink = () => {

    const idSite = newURL.searchParams.get( 'site_id' );

    return idSite;

};

export const getIsValidatePayment = () => {

    const isMemberShip = newURL.searchParams.get( 'kind_of' );

    const isToKnowValidate = newURL.searchParams.get( 'to_know' );
    
    if ( isMemberShip === 'membership' && isToKnowValidate === 'validation' ) return true;

    return false;    

};

export const dataMercadoPago = () => {

    const urlToGetParams = new URL( window.location.href );

    const paymentID = urlToGetParams.searchParams.get( 'payment_id' );

    const siteID = urlToGetParams.searchParams.get( 'site_id' );

    const status = urlToGetParams.searchParams.get( 'status' );

    return { paymentID, siteID, status };

};

export const getIsForgotPassword = () => {

    const isForgotPassword = newURL.searchParams.get( 'is_forgot_password' );

    if ( isForgotPassword === 'true' ) return true;

    return false;

};