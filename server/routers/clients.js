const express = require( 'express' );
const app = express.Router();
const isTokenValid = require( '../middleware/isTokenValid' );
const ClientController = require( '../controllers/clients' );
const isClientValid = require( '../middleware/isClientValid' );
const isMemberShipValid = require( '../middleware/isMemberShipValid' );

app.post( '/signIn-client', ClientController.signInClient );

app.post( '/client', [ isTokenValid ], [ isMemberShipValid ], ClientController.createClient );

app.get( '/client-info', [ isClientValid ], [ isMemberShipValid ], ClientController.clientInfo );

app.post( '/profilePhoto-client', [ isClientValid ], [ isMemberShipValid ], ClientController.profilePhoto );

app.get( '/client-searcher', [ isTokenValid ], [ isMemberShipValid ], ClientController.searchClient );

app.delete( '/delete-client', [ isTokenValid ], [ isMemberShipValid ], ClientController.deleteClient );

module.exports = app;