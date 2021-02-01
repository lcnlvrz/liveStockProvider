const jwt = require( 'jsonwebtoken' );
require('dotenv').config( { path:'../' } );
const Provider = require( '../models/providers' );
const mongoose = require( 'mongoose' );

const isTokenValid = ( req, res, next ) => {

    const { authorization } = req.headers;

    if ( !authorization ) return res.status( 404 ).send( { message:'The token is empty' } );

    jwt.verify( authorization, process.env.PRIVATE_SECRET_KEY_JWT, ( err, decoded ) => {

        if ( err ) return res.status( 403 ).send( { message:err.message } );

        if ( !decoded ) return res.status( 403 ).send({ message:'The token is invalid' });

        const { providerID } = decoded;

        res.locals.providerID = providerID;

        next();
    
    } );

};

module.exports = isTokenValid;