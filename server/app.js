const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const cors = require( 'cors' );
const helmet = require( 'helmet' );
require( 'dotenv' ).config();

const app = express();
app.use( bodyParser.urlencoded( { extended:false } ) );
app.use( bodyParser.json( { limit:'10mb' } ) );
app.use( helmet() );
app.use( cors() ); 

const providersRoute = require( './routers/providers' );
const productRoute = require( './routers/products' );
const clientRoute = require( './routers/clients' );
const mercadopagoRoute = require( './routers/mercadopago' );
const providerTemporaryRoute = require( './routers/providersTemporary' );

app.use( `/api/${ process.env.API_VERSION }`, providersRoute );
app.use( `/api/${ process.env.API_VERSION }`, productRoute );
app.use( `/api/${ process.env.API_VERSION }`, clientRoute );
app.use( `/api/${ process.env.API_VERSION }`, mercadopagoRoute );
app.use( `/api/${ process.env.API_VERSION }`, providerTemporaryRoute );


module.exports = app;