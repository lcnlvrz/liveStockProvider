const express = require( 'express' );
const ProviderTemporaryController = require( '../controllers/providersTemporary' );
const app = express.Router();

app.post( '/provider-temporary', ProviderTemporaryController.sendOTP );

app.post( '/otp', ProviderTemporaryController.validateOTP );

module.exports = app;