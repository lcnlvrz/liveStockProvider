const MercadoPagoController = require( '../controllers/mercadopago' );

const express = require( 'express' );
const app = express.Router();

app.post( '/create-mp-link', MercadoPagoController.createLinkMP );

app.get( '/payment-status', MercadoPagoController.getPaymentStatus );

module.exports = app;