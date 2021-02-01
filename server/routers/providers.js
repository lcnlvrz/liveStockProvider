const express = require( 'express' );
require( 'dotenv' ).config( { path:'../' } );

const app = express.Router();
const ProviderController = require( '../controllers/providers' );
const isPaymentApproved = require('../middleware/isPaymentApproved');
const isTokenValid = require( '../middleware/isTokenValid' );
const isMemberShipValid = require( '../middleware/isMemberShipValid' );

app.post( `/provider`, [ isPaymentApproved ],  ProviderController.createNewProvider );

app.post( '/signIn-provider', ProviderController.signInProvider );

app.get( '/provider-info', [ isTokenValid ], [isMemberShipValid], ProviderController.providerInfo );

app.post( '/profilePhoto', [ isTokenValid ], [ isMemberShipValid ], ProviderController.updateProfilePhoto );

app.post( '/renovate-membership', [ isPaymentApproved ], ProviderController.renovateMembership );

app.post( '/otp-forgotPassword', ProviderController.otpForgotPassword );

app.post( '/verify-otp', ProviderController.verifyOTP );

app.post( '/change-password', ProviderController.changePassword );

module.exports = app;

