const { getPayment } = require("../services/mercadopago");
const Payment = require( '../models/payments' );


const isPaymentApproved = async ( req, res, next ) => {

    const { paymentid:paymentID } = req.headers;
    
    const isString = typeof paymentID;

    if ( isString !== 'string' ) return res.status( 403 ).send( { message:'The payment id is not a string' } );

    getPayment( paymentID )
    .then( (response) => {

        const { status, collector_id, transaction_amount } = response.data;

        const { id:orderID } = response.data.order;

        const { id:payerID } = response.data.payer;
    
        if ( status === 'approved' && collector_id === Number(process.env.MP_USER_ID) && transaction_amount === 500 ) {

            const filter = { paymentID, orderID, payerID };

            console.log( payerID );

            Payment.findOne( filter, ( err, paymentStored ) => {

                if ( err ) throw err;

                if ( paymentStored ) return res.status( 400 ).send( { message:'Tu membresia ya tiene una cuenta o ya fue renovada' } );

                res.locals.paymentID = Number( paymentID );
                res.locals.orderID = Number( orderID );
                res.locals.payerID = Number( payerID );

                next();

            } );

        } else if( status === 'in_process' && collector_id === Number(process.env.MP_USER_ID) && transaction_amount === 500 ){

            res.status( 401 ).send( { message:'El pago continua en estado pendiente.' } );

        } else {

            res.status( 500 ).send( { message:'Un error ocurrio al obtener el estado del pago' } );

        };

    } )
    .catch( (error) => {

        res.status( 404 ).send( { message:'La identificacion del pago no es valida' } );

    } );


};

module.exports = isPaymentApproved;