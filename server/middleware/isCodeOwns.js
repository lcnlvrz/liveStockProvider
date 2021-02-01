require( 'dotenv' ).config({ path:'../' });
const validator = require( 'validator' );

const isCodeOwns = ( req, res, next ) => {

    const { authorization } = req.headers;

    if ( !authorization ) return res.status( 404 ).send( { message:'The authorization is empty' } );

    const isAuthorizationValid = typeof authorization;

    if ( isAuthorizationValid !== 'string' ) return res.status( 403 ).send( { message:'The authorization is not an string' } );

    if ( authorization !== process.env.PRIVATE_CODE_OWN ) return res.status( 403 ).send( { message:'The authorization is not valid' } );

    next();
    

};

module.exports = isCodeOwns;