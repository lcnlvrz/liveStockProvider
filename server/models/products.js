const mongoose = require( 'mongoose' );

const Schema = mongoose.Schema;

const productSchema = Schema({

    title:{ type:String, required:true },
    stock: { type:Number, required:true },
    price:{ type:Number, required:true },
    description:{ type:String, required:true },
    image:{ type:String, required:true },
    lastUpdate:{ type:String, required:true },
    providerID:{ type:mongoose.Types.ObjectId, required:true, ref:'providers' },
    createdAt:{ type:Number, required:true },
    type:Object


});

module.exports = mongoose.model( 'products', productSchema );