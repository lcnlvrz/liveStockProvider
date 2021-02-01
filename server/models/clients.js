const mongoose = require( 'mongoose' );

const Schema = mongoose.Schema;

const ClientSchema = Schema({

    username:{ type:String, required:true, unique:true },
    password:{ type:String, required:true },
    createdAt:{ type:Number, required:true },
    providerID:{ type:mongoose.Types.ObjectId, ref:'providers', required:true },
    profilePhoto:{ type:String, required:false }
    

});

module.exports = mongoose.model( 'clients', ClientSchema );