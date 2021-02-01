const Joi = require( 'joi' );
const bcrypt = require( 'bcryptjs' );
const ClientModel = require( '../models/clients' );
const Provider = require( '../models/providers' );
const moment = require( 'moment' );
const jwt = require( 'jsonwebtoken' );
const { default: validator } = require('validator');
const isClientValid = require('../middleware/isClientValid');
require( 'dotenv' ).config( '../' );

const clientPopulateQuery = { 

    path:'providerID', 
    select:'products profilePhoto nameBusiness isActive', 
    populate:{

        path:'products', 
        options:{ 
        sort:{ 'createdAt':-1 },
        limit:10 } 

    }  
};

const clientObject = Joi.object({

    username:Joi.string()
    .min( 1 )
    .max( 50 )
    .custom( ( value, helpers ) => {

        const regexUsername = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/igm;

        const usernameAfterValidation = regexUsername.test( value );

        if ( !usernameAfterValidation ) return helpers.error( 'any.invalid' );

        return true;

    } ),
    password:Joi.string()
    .min( 1 )
    .max( 100 )
    .custom( ( value, helpers ) => {

        const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

        const passwordAfterValidation = regexPassword.test( value );

        if ( !passwordAfterValidation ) return helpers.error( 'any.invalid' );

        return true;

    } )
    
});

const createClient = ( req, res ) => {

    const client = req.body;

    const { username, password } = req.body;

    if ( !username || !password ) return res.status( 404 ).send( { message:'The input data are empty' } );

    const validation = clientObject.validate( client );

    if ( validation.error ) return res.status( 403 ).send( { message:validation.error } );

    ClientModel.findOne( { username }, ( err1, alreadyExists ) => {

        if ( err1 ) throw err1;
        
        if ( alreadyExists ) return res.status( 400 ).send( { message:'El nombre de usuario ya existe. Pruebe con otro' } );

        bcrypt.hash( password, 15, ( err2, hash ) => {

            if ( err2 ) throw err2;
    
            if ( !hash ) return res.status( 500 ).send({ message:'Error happened at crypt the password' });
    
            const createdAt = moment().unix();
            const providerID = res.locals.providerID;

            const usernameLowerCase = username.toLowerCase();
    
            const clientUpdated = { username:usernameLowerCase, password:hash, createdAt, providerID };
    
            const newClient = new ClientModel( clientUpdated );
    
            newClient.save( ( err3, clientStored ) => {
    
                if ( err3 ) throw err3; 
    
                if ( !clientStored ) return res.status( 500 ).send( { message:'Error happened at save the new client' } );

                const { createdAt, username, providerID, _id } = clientStored;
                
                const clientToReturn = { createdAt, username, providerID, _id };

                const filter = { _id:providerID };
                const update = { $push:{ clients:_id } };

                Provider.updateOne( filter, update, ( err4, updated ) => {

                    if ( err4 ) throw err4;

                    if ( !updated ) return res.status( 403 ).send( { message:'The providers user dont exist' } );

                    res.status( 201 ).send( { message:'Client added successfully', newClient:clientToReturn } );

                } );

            } );
    
        } );

 
    } );

};

const signInClient = ( req, res ) => {

    const client = req.body;

    const { username, password } = req.body;

    if ( !username ) return res.status( 404 ).send( { message:'The username is empty' } );

    if ( !password ) return res.status( 404 ).send( { message:'The password is empty' } );

    const validation = clientObject.validate( client );

    if ( validation.error ) return res.status( 403 ).send( { message:validation.error } );

    const usernameLowerCase = username.toLowerCase();

    const filter = { username:usernameLowerCase };

    ClientModel.findOne( filter, ( err, clientStored ) => {

        if ( err ) throw err;

        if ( !clientStored ) return res.status( 404 ).send( { message:'El cliente no existe' } );

        const { isActive, _id } = clientStored.providerID;

        if ( !isActive ) return res.status( 403 ).send( { message:'Tu proveedor no actualizo la membresia.' } );

        const filter = { _id };

        Provider.findOne( filter, ( err, providerStored ) => {

            if ( err ) throw err;

            if ( !providerStored ) return res.status( 404 ).send( { message:'The provider doesnt exist' } );

            const { payments } = providerStored;

            const { until } = payments[0];

            const currentTime = moment().unix();

            if ( currentTime > until ) return res.status( 403 ).send( { message:'La membresia de tu proveedor caduco. Dile que la renueve' } );

            bcrypt.compare( password, clientStored.password, ( err, success ) => {

                if ( err ) throw err;

                console.log( success );
                
                if ( !success ) return res.status( 403 ).send( { message:'La contraseña es incorrecta' } );
                
                const { username, createdAt, _id, providerID, profilePhoto } = clientStored;
    
                const payload = { clientID:_id, providerID:providerID._id };
    
                jwt.sign( payload, process.env.PRIVATE_SECRET_KEY_JWT, { expiresIn:1209600 }, ( err, token ) => {
    
                    if ( err ) throw err;
    
                    if ( !token ) return res.status( 500 ).send( { message:'Un error ha ocurrido al iniciar la sesion.' } );
    
                    const clientLogin = { username, createdAt, clientID:_id, providerID, isLoading:false, profilePhoto };
    
                    console.log( providerID );
    
                    res.status( 200 ).send( { message:'Sesion iniciada con exito', client:clientLogin, token } );
    
                } ); 
    
            } );



        } ).populate( { path:'payments', options:{ sort:{ 'since':-1 }, limit:1 } } );


    } ).populate( clientPopulateQuery );

};

const clientInfo = ( req, res ) => {

    const clientID = res.locals.clientID;

    const filter = { _id:clientID };

    ClientModel.findOne( filter, ( err, clientStored ) => {

        if ( err ) throw err;

        if ( !clientStored ) return res.status( 404 ).send( { message:'The client dont exist' } );
        
        const { username, createdAt, providerID, _id:clientID, profilePhoto } = clientStored;

        const clientToReturn = { username, createdAt, providerID, isLoading:false, clientID, profilePhoto };

        res.status( 200 ).send( { message:'Client founded successfully', client:clientToReturn } );

    } ).populate( clientPopulateQuery );

};

const profilePhoto = ( req, res ) => {

    const { profilePhoto } = req.body;

    if ( !profilePhoto ) return res.status( 404 ).send( { message:'The profile photo is empty' } );

    const isProfilePhotoValid = validator.isURL( profilePhoto );

    if ( !isProfilePhotoValid ) return res.status( 403 ).send( { message:'The profile photo is not a valid url' } );

    const providerID = res.locals.providerID;
    const _id = res.locals.clientID;

    const filter = { _id, providerID };
    const update = { profilePhoto };

    ClientModel.updateOne( filter, update, ( err, updated ) => {

        if ( err ) throw err;

        if ( !updated ) return res.status( 404 ).send( { message:'The user dont exist' } );

        res.status( 200 ).send( { message:'Profile photo updated successfully', profilePhoto } );

    } );

};

const searchClient = ( req, res ) => {

    const { client } = req.headers;

    if ( !client ) return res.status( 404 ).send( { message:'The client term is empty' } );

    const isClientValid = typeof client;

    if ( isClientValid !== 'string' ) return res.status( 403 ).send( { message:'The client term is not a valid string' } );

    const clientPattern = new RegExp( '^'+client );

    const filter = { username:{ $regex:clientPattern, $options:'i' } };

    ClientModel.find( filter, ( err, clients ) => {

        if ( err ) throw err;
        
        if ( clients.length === 0 ) return res.status( 404 ).send( { message:'Any user has the usernames query' } );

        res.status( 200 ).send( { message:'Clients founded!', clients } );

    } );


};

const deleteClient = ( req, res ) => {

    const { clientID } = req.body;

    if ( !clientID ) return res.status( 404 ).send( { message:'The clientID is empty' } );

    const isClientIDValid = validator.isMongoId( clientID );

    if ( !isClientIDValid ) return res.status( 403 ).send( { message:'The client id is not a mongoid' } );

    const providerID = res.locals.providerID;

    const filter = { _id:clientID, providerID };

    ClientModel.deleteOne( filter, ( err, deleted ) => {

        if ( err ) throw err;

        if ( !deleted ) return res.status( 404 ).send( { message:'The client doesnt exist' } );

        res.status( 200 ).send( { message:'Client deleted successfully' } ); 

    } );

};

module.exports = { createClient, signInClient, clientInfo, profilePhoto, searchClient, deleteClient }