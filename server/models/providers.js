const mongoose = require( 'mongoose' );

const Schema = mongoose.Schema;

const Provider = Schema({

    nameBusiness:{

        type:String,
        required:true,
        unique:true

    },
    password:{

        type:String,
        required:true

    },
    typeOfAccount:{ type:'String', required:true },
    isActive:{ type:Boolean, required:true },
    createdAt:{ type:Number, required:true },
    profilePhoto:{ type:String, required:false, default:'' },
    products:[{

        type:mongoose.Types.ObjectId,
        ref:'products',
        default:[]


    }],
    clients:[{

        type:mongoose.Types.ObjectId,
        ref:'clients',
        default:[]

    }],
    payments:[{

        type:mongoose.Types.ObjectId,
        ref:'payments',
        default:[]

    }],
    email:{ type:String, required:true, unique:true },
    otp:{ type:Number, required:true },
    isForDemo:{ type:Boolean, required:false }

});

module.exports = mongoose.model( 'providers', Provider );