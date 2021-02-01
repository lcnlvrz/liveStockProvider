const Provider = require( '../models/providers' );
const validator = require( 'validator' );
const bcrypt = require( 'bcryptjs' );
const jwt = require( 'jsonwebtoken' );
const moment = require( 'moment' );
const Payment = require( '../models/payments' );
const Joi = require( 'joi' );
const ProviderTemporary = require( '../models/providersTemporary' );
const { object } = require('joi');
const { getPaymentStatus } = require('./mercadopago');
const generateOTP = require('../helpers/generateOTP');
const nodemailer = require( 'nodemailer' );

require( 'dotenv' ).config( { path:'../' } );

const objectProvider = Joi.object({

    username:Joi.string()
    .custom( ( value, helpers ) => {

        const regexUsername = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/igm;

        const usernameAfterValidation = regexUsername.test( value );

        if ( !usernameAfterValidation ) return helpers.error( 'any.invalid' );

        return true;

    } ),
    password:Joi.string()
    .custom( ( ( value, helpers ) => {

        const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

        const passwordAfterValidation = regexPassword.test( value );

        if ( !passwordAfterValidation ) return helpers.error( 'any.invalid' );

        return true;

    } ) )

});

const populateProvider = [

    { path:'products', options:{ sort:{ 'createdAt':-1 }, limit:10 } }, 
    { path:'clients', select:[ 'username', 'createdAt', 'providerID', 'profilePhoto' ], options:{ sort:{ 'createdAt':-1 }, limit:10 }},
    { path:'payments', options:{ sort:{ 'since':-1 } }, limit:1 }];

const createNewProvider = ( req, res ) => {

    const { nameBusiness:nameBusinessUpperCase, password, typeOfAccount, email, otp } = req.body;

    const nameBusiness = nameBusinessUpperCase.toLowerCase();

    if ( !typeOfAccount ) return res.status( 404 ).send( { message:'The type of account is empty' } );

    if ( !otp ) return res.status( 404 ).send( { message:'The otp code is empty' } );

    if ( !email ) return res.status( 404 ).send( { message:'The email is empty' } );

    if ( !nameBusiness ) return res.status( 404 ).send( { message:'The name business is empty' } );

    if ( !password ) return res.status( 404 ).send( { message:'The password is empty' } );

    const validation = objectProvider.validate( { username:nameBusiness, password } );

    const isOTPValid = Number.isInteger( Number( otp ) );

    const isEmailValid = validator.isEmail( email );

    if ( !isOTPValid ) return res.status( 404 ).send( { message:'The OTP code is not a number' } );

    if ( !isEmailValid ) return res.status( 403 ).send( { message:'The email is not valid' } ); 

    if ( validation.error ) return res.status( 403 ).send( { message:validation.error } );

    if ( typeOfAccount !== 'basic' && typeOfAccount !== 'normal' && typeOfAccount !== 'pro' ) return res.status( 403 ).send( { message:'The type of account is not valid' } );

    Provider.findOne( { nameBusiness }, ( err, isProviderAlreadyExist ) => {

        if ( err ) throw err;

        if ( isProviderAlreadyExist ) return res.status( 409 ).send( { message:'El nombre de usuario ya existe.' } );
        
        bcrypt.hash( password, 15, ( err, hash ) => {

            if ( err ) throw err;
    
            if ( !hash ) return res.status( 404 ).send( { message:'The hash is invalid' } );
    
            const nameBusinessLowerCase = nameBusiness.toLowerCase();
    
            const createdAt = moment().unix();
    
            const providerSchemaObj = { nameBusiness:nameBusinessLowerCase, password:hash, createdAt, typeOfAccount, isActive:true, email, otp };
    
            const newProvider = new Provider( providerSchemaObj );
    
            newProvider.save( ( err, providerStored ) => {
    
                if ( err ) throw err; 
    
                if ( !providerStored ) return res.status( 500 ).send( { message:'Exception ocurred in the moment to save the new provider' } );

                const { payerID, paymentID, orderID } = res.locals;

                const { _id:providerID } = providerStored;

                const since = moment().unix();
                const until = moment().add( 30, 'days' ).unix();

                const objectPayment = {

                    payerID,
                    paymentID,
                    orderID,
                    providerID,
                    since,
                    until

                };

                const newPayment = new Payment( objectPayment );

                newPayment.save( ( err, paymentStored ) => {

                    if ( err ) throw err;

                    if ( !paymentStored ) return res.status( 500 ).send( { message:'Un error ha ocurrido al guardar el pago' } );

                    const filter = { _id:providerID };

                    const update = { $push:{ payments:paymentStored._id } };

                    Provider.updateOne( filter, update, ( err, updated ) => {

                        if ( err ) throw err;

                        if ( !updated ) return res.status( 500 ).send( { message:'Un error ocurrio al guardar el pago' } );

                        ProviderTemporary.findOneAndDelete( { email, otp }, ( err, deleted ) => {

                            if ( err ) throw err;

                            if ( !deleted ) return res.status( 404 ).send( { message:'The temporaryProvider doesnt exist' } );

                            res.status( 201 ).send( { message:'New provider saved successfully' } );

                        } );

                        

                    } );

                } ); 
    
            } );
                
        } );

    } );

};

const signInProvider = ( req, res ) => {

    const { user, password } = req.body;

    if ( !user || !password ) return res.status( 404 ).send( { message:'The provider data are empty' } );

    const validation = objectProvider.validate( { username:user, password } );

    if ( validation.error ) return res.status( 403 ).send( { message:validation.error } );

    const filter = { nameBusiness:user.toLowerCase() };

    Provider.findOne( filter, ( err, providerStored ) => {

        if ( err ) throw err;

        if ( !providerStored ) return res.status( 404 ).send( { message:'El proveedor no existe' } );

        if ( !providerStored.isActive ) return res.status( 403 ).send( { message:'Tu membresia expiro. Renuevala para poder acceder a tu cuenta' } );

        const currentDate = moment().unix();

        const lastMembership = providerStored.payments[0];

        const { until:expireMembership } = lastMembership;

        console.log( providerStored.payments );

        if ( currentDate > expireMembership ) return res.status( 403 ).send( { message:'Tu membresia ya caduco. Renuevala.' } );

        bcrypt.compare( password, providerStored.password, ( err, success ) => {

            if ( err ) throw err;

            if ( !success ) return res.status( 403 ).send( { message:'La contraseña no es correcta' } );

            const providerID = providerStored._id;

            const payload = { providerID };

            jwt.sign( payload, process.env.PRIVATE_SECRET_KEY_JWT, { expiresIn:1209600 }, ( err, token ) => {

                if ( err ) throw err;

                const { nameBusiness, _id:providerID, products, clients, createdAt, typeOfAccount, isActive, profilePhoto, payments, isForDemo } = providerStored;

                const provider = { isLoading:false, provider:nameBusiness, providerID, products, clients, createdAt, typeOfAccount, isActive, profilePhoto, payments, isForDemo };

                res.status( 200 ).send( { message:'Provider founded successfully', token, provider } ); 

            } );
                
        } );

    } ).populate( populateProvider )


};

const providerInfo = ( req, res ) => {

    const providerID = res.locals.providerID;

    const filter = { _id:providerID };

    Provider.findOne( filter, ( err, providerStored ) => {

        if ( err ) throw err;

        if ( !providerStored ) return res.status( 404 ).send( { message:'The provider dont exist' } );

        if ( !providerStored.isActive ) return res.status( 403 ).send( { message:'Your plan was expired. Please, renovate it' } );

        const { nameBusiness, products, clients, createdAt, typeOfAccount, isActive, profilePhoto, isForDemo } = providerStored;

        const provider = { isLoading:false, provider:nameBusiness, providerID, products, clients, createdAt, typeOfAccount, isActive, profilePhoto, isForDemo };

        res.status( 200 ).send( { message:'Provider founded succesfully', provider } );

    } ).populate( populateProvider );

};

const updateProfilePhoto = ( req, res ) => {

    const { profilePhoto } = req.body;

    if ( !profilePhoto ) return res.status( 404 ).send( { message:'The profile photo is not valid' } );

    const isProfilePhotoValid = validator.isURL( profilePhoto );

    if ( !isProfilePhotoValid ) return res.status( 403 ).send( { message:'The photos url is not an url' } );

    const providerID = res.locals.providerID;

    const filter = { _id:providerID };
    const update = { profilePhoto };

    Provider.updateOne( filter, update, ( err, updated ) => {

        if ( err ) throw err;

        if ( !updated ) return res.status( 404 ).send( { message:'The provider dont exist' } );

        res.status( 200 ).send( { message:'Profile photo updated successfully', profilePhoto } );

    } );

};

const renovateMembership = ( req, res ) => {
    
    const providerCredentials = req.body;

    const { username, password } = req.body;

    if ( !username || !password ) return res.status( 404 ).send( { message:'The provider data are empty' } );

    const validation = objectProvider.validate( providerCredentials );

    if ( validation.error ) return res.status( 403 ).send( { message:validation.error } );

    const filter = { nameBusiness:username };

    Provider.findOne( filter, ( err, providerStored ) => {

        if ( err ) throw err;

        if ( !providerStored ) return res.status( 404 ).send( { message:'El usuario no existe' } );

        bcrypt.compare( password, providerStored.password, ( err, success ) => {

            if ( err ) throw err;

            if ( !success ) return res.status( 401 ).send( { message:'La contraseña no es correcta' } );

            const { payerID, paymentID, orderID } = res.locals;

            const since = moment().unix();
            const until = moment().add( 30, 'days' ).unix();
            
            const objectPayment = {

                payerID,
                paymentID,
                orderID,
                providerID:providerStored._id,
                since,
                until

            };

            const newPayment = new Payment( objectPayment );

            newPayment.save( ( err, newPayment ) => {

                if ( err ) throw err;

                if ( !newPayment ) return res.status( 500 ).send( { message:'Un error ocurrio al guardar el pago' } );

                const update = { $push:{ payments:newPayment._id } };

                Provider.findOneAndUpdate( filter, update, ( err, updated ) => {

                    if ( err ) throw err;

                    if ( !updated ) return res.status( 404 ).send( { message:'Un error ha ocurrido al guardar el pago' } );

                    res.status( 201 ).send( { message:'Membresia renovada, list para volver a usar la cuenta' } );

                } ); 

            } );

        } );

    } );
    

};

const otpForgotPassword = async ( req, res ) => {

    const otp = await generateOTP();

    const { email } = req.body;

    if ( !email ) return res.status( 404 ).send( { message:'The email is empty' } );

    const isEmailValid = validator.isEmail( email );

    if ( !isEmailValid ) return res.status( 404 ).send( { message:'The email is not valid' } );

    const filter = { email };
    const update = { otp };

    Provider.findOneAndUpdate( filter, update, ( err, providerStored ) => {

        if ( err ) throw err;

        if ( !providerStored ) return res.status( 404 ).send( { message:'El email no existe' } );

        const transporter = nodemailer.createTransport({

            service:'gmail',
            auth: {
                user:'lucianoalvarez1212@gmail.com',
                pass:'mlxfiiboldawtvpe'
            }
    
        });

        const mailDetails = {

            from: 'lucianoalvarez1212@gmail.com',
            to: email,
            subject: 'Verificacion correo electronico Live Stock Provider',
            html:`<p> El codigo para validar tu correo es: </p>
            <h1> ${ otp } </h1>`
        };

        transporter.sendMail( mailDetails, ( err, info ) => {

            if ( err ) throw err;

            if ( !info ) return res.status( 500 ).send( { message:'The email didnt send' } );

            res.status( 200 ).send( { message:'OTP sented successfully' } );

        } );

    } );

};

const verifyOTP = ( req, res ) => {

    const { email, otp } = req.body;

    if ( !email || !otp ) return res.status( 404 ).send( { message:'The verify OTP data are empty' } );

    const isEmailValid = validator.isEmail( email );
    const isValidOTP = Number.isInteger( Number( otp ) );

    if ( !isEmailValid ) return res.status( 403 ).send( { message:'The email is not valid' } );

    if ( !isValidOTP ) return res.status( 403 ).send( { message:'The otp code is not valid' } );

    const filter = { email, otp };

    Provider.findOne( filter, ( err, providerStored ) => {

        if ( err ) throw err;

        if ( !providerStored ) return res.status( 404 ).send( { message:'El codigo no es correcto' } );

        res.status( 200 ).send( { message:'El codigo es valido' } );

    } );

};

const changePassword = ( req, res ) => {

    const { email, otp, password } = req.body;

    if ( !email || !otp || !password ) return res.status( 404 ).send( { message:'The change password data is empty' } );
    
    const isEmailValid = validator.isEmail( email );
    const isOTPValid = Number.isInteger( Number( otp ) );

    const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

    const passwordAfterValidation = regexPassword.test( password );

    if ( !isEmailValid ) return res.status( 403 ).send( { message:'The email is not valid' } );
    if ( !isOTPValid ) return res.status( 403 ).send( { message:'The otp code is not valid' } );
    if ( !passwordAfterValidation ) return res.status( 403 ).send( { message:'The password is not valid' } );
    
    bcrypt.hash( password, 15, ( err, hash ) => {

        if ( err ) throw err;

        if ( !hash ) return res.status( 500 ).send( { message:'The hash is empty' } );

        const filter = { email, otp };

        const update = { password:hash };

        Provider.findOneAndUpdate( filter, update, ( err, providerStored ) => {

            if ( err ) throw err;

            if ( !providerStored ) return res.status( 404 ).send( { message:'The user doesnt exist' } );

            res.status( 200 ).send( { message:'Password changed successfully' } ); 

        } );

    } );


};

module.exports = { createNewProvider, signInProvider, providerInfo, updateProfilePhoto, renovateMembership, otpForgotPassword, verifyOTP, changePassword };