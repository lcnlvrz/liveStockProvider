const jwt = require( 'jsonwebtoken' );
const { response } = require('../app');
require( 'dotenv' ).config( '../' );
const Client = require( '../models/clients' );

const isClientValid = ( req, res, next ) => {

    const { authorization } = req.headers;

    if ( !authorization ) return res.status( 404 ).send( { message:'The token provided is empty' } );

    jwt.verify( authorization, process.env.PRIVATE_SECRET_KEY_JWT, ( err, decoded ) => {

        if ( err ) return res.status( 403 ).send( { message:err.message } );

        if ( !decoded ) return res.status( 403 ).send( { message:'The token is invalid' } );

        const { clientID, providerID } = decoded;

        const filter = { _id:clientID };

        Client.findOne( filter, ( err, clientStored ) => {

            if ( err ) throw err;

            if ( !clientStored ) return res.status( 404 ).send( { message:'The client dont exist' } );
            
            res.locals.clientID = clientID;
            res.locals.providerID = providerID;

            next();

        } );

    } );

};

module.exports = isClientValid;