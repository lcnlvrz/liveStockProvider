const nodemailer = require( 'nodemailer' );
const validator = require( 'validator' );
const generateOTP = require( '../helpers/generateOTP' );
const ProviderTemporary = require( '../models/providersTemporary' );
const Provider = require( '../models/providers' );
const moment = require( 'moment' );


const sendOTP = async ( req, res ) => {

    const otp = await generateOTP();

    const { email } = req.body;

    if ( !email ) return res.status( 404 ).send( { message:'The email is empty' } );

    const isEmailValid = validator.isEmail( email );

    if ( !isEmailValid ) return res.status( 403 ).send( { message:'The email is not valid' } );

    const filter = { email };
    
    Provider.findOne( filter, ( err, providerStored ) => {

        if ( err ) throw err;

        if ( providerStored ) return res.status( 409 ).send( { message:'El email ya fue registrado' } );

        ProviderTemporary.findOneAndDelete( { email }, ( err, providerStored ) => {

            if ( err ) throw err;
        

            const createdAt = moment().unix();

            const expireAt = moment().add( 30, 'minutes' ).unix();

            const newProviderTemporary = new ProviderTemporary( { otp, createdAt, expireAt, email } );

            newProviderTemporary.save( ( err, providerTemporaryStored ) => {

                if ( err ) throw err;

                if ( !providerTemporaryStored ) return res.status( 404 ).send( { message:'Un error ha ocurrido al guardar tu email' } );

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

                    res.status( 201 ).send( { message:'Codigo enviado al email' } );

                } );

            } );

        } );
    

    } );


};

const validateOTP = ( req, res ) => {

    const { email, otp } = req.body;

    if ( !email || !otp ) return res.status( 404 ).send( { message:'The email or OTP is empty' } );

    const isEmailValid = validator.isEmail( email );
    const isOTPValid = Number.isInteger( Number( otp ) );

    if ( !isEmailValid ) return res.status( 403 ).send( { message:'The email is not valid' } );

    if ( !isOTPValid ) return res.status( 403 ).send({ message:'The otp is not valid' });

    const filter = { email, otp };

    ProviderTemporary.findOne( filter, ( err, providerTemporaryStored ) => {

        if ( err ) throw err;

        if ( !providerTemporaryStored ) return res.status( 403 ).send( { message:'El codigo no es correcto' } );

        res.status( 200 ).send( { message:'El codigo es correcto' } );

    } );

};

module.exports = { sendOTP, validateOTP };