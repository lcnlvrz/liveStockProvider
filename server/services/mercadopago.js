require( 'dotenv' ).config( '../' );
const axios = require( 'axios' );

const membershipLiveStockProvider = {
    
    "items":[{

    "title":"Live Stock Provider - Membresia - 1 mes",
    "description":"Pago de la membresia para poder obtener una cuenta y usar la aplicacion live stock provider, la app lider en la centralizacion de informacion por parte del proveedor a sus clientes",
    "quantity":1,
    "currency_id":"ARS",
    "unit_price":500

}],
"back_urls":{

    "success":"https://livestockprovider.netlify.app/successmp/",
    "failure":"https://livestockprovider.netlify.app/failuremp/",
    "pending":"https://livestockprovider.netlify.app/pendingmp/"

}

};


const getLinkMP = () => {

    try {

        return axios.post( 'https://api.mercadopago.com/checkout/preferences',  membershipLiveStockProvider, { headers:{ Authorization:`Bearer ${process.env.TOKEN_MP}` } } )
        
    } catch (error) {

        console.log( error );
        
    };

};

const getPayment = ( paymentID ) => {

    try {

        return axios.get( `https://api.mercadopago.com/v1/payments/${ paymentID }`, { headers:{ Authorization:`Bearer ${process.env.TOKEN_MP}` }} )

    } catch ( error ) {

        console.log( error )
        
    };

    

};


module.exports = { getLinkMP, getPayment };