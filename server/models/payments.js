const mongoose = require( 'mongoose' );

const Schema = mongoose.Schema;

const PaymentSchema = Schema({

    paymentID:{ type:Number, required:true, unique:true },
    orderID:{ type:Number, required:true, unique:true },
    payerID:{ type:Number, required:true },
    since:{ type:Number, required:true },
    until:{ type:Number, required:true },
    providerID:{ type:mongoose.Types.ObjectId, required:true, ref:'providers' }

});

module.exports = mongoose.model( 'payments', PaymentSchema );