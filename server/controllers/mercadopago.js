const mercadopago = require( 'mercadopago' );
require( 'dotenv' ).config( '../' );
const axios = require( 'axios' );
const { getLinkMP, getPayment } = require('../services/mercadopago');


const createLinkMP = async ( req, res ) => {

    getLinkMP()
    .then( (response) => {

        const { init_point, sandbox_init_point } = response.data;

        res.status( 200 ).send( { message:'Mercado Pago links created successfully', redirect:init_point, sandbox:sandbox_init_point } );

    } )
    .catch( (err) => {

        res.status( 500 ).send( { message:'Exception executed to create link mercadoPago' } );

    } );

};

const getPaymentStatus = async ( req, res ) => {

    const { paymentid:paymentID } = req.headers;

    const isNumber = Number.isInteger( Number( paymentID ) );

    if ( !isNumber ) return res.status( 403 ).send( { message:'The payment id is not a string' } );

    getPayment( paymentID )
    .then( (response) => {

        const { status, collector_id, transaction_amount } = response.data;

        if ( status === 'approved' && collector_id === Number(process.env.MP_USER_ID) && transaction_amount === 500 ) return res.status( 200 ).send( { message:'Payment approved with success. Ready to create an account' } ); 

        if ( status === 'in_process' && collector_id === Number(process.env.MP_USER_ID) && transaction_amount === 500 ) return res.status( 401 ).send( { message:'Tu pago no fue acreditado por el momento' } );

       

    } )
    .catch( (error) => {

        res.status( 404 ).send( { message:'La identificacion de pago no es valida' } );

    } );

};


module.exports = { createLinkMP, getPaymentStatus };