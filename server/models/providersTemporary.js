const mongoose = require( 'mongoose' );

const Schema = mongoose.Schema;

const ProviderTemporary = Schema({

    otp:{ type:Number, required:true, unique:true },
    email:{ type:String, required:true, unique:true },
    createdAt:{ type:Number, required:true },
    expireAt:{ type:Number, required:true }

});

module.exports = mongoose.model( 'providers-temporary', ProviderTemporary);