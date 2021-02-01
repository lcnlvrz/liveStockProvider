const validator = require( 'validator' );
const moment = require( 'moment' );
const Joi = require( 'joi' );
const Provider = require( '../models/providers' );
const Product = require( '../models/products' );

const productObject = Joi.object({

    title:Joi.string()
    .min( 1 )
    .max( 100 )
    .required(),
    stock:Joi.number()
    .integer()
    .min( 1 )
    .max( 10000 ),
    price:Joi.number()
    .min( 1 )
    .max( 10000000 ),
    description:Joi.string()
    .min( 1 )
    .max( 1000 ),
    image: Joi.string()
    .custom( ( value, helpers ) => {

        const isImageValid = validator.isURL( value );

        if ( !isImageValid ) return helpers.error( 'any.invalid' );

        return true;

    } ),
    providerID: Joi.string()
    .alphanum()
    .length( 24 ),
    lastUpdate:Joi.string()
    .custom( ( value, helpers ) => {

        const isValidDate = moment( value ).isValid();

        if ( !isValidDate ) return helpers.error( 'any.invalid' );

        return true;

    } ),
    createdAt:Joi.number()
    
});

const updateObject = Joi.object({

    title:Joi.string()
    .min( 1 )
    .max( 100 )
    .required(),
    stock:Joi.number()
    .integer()
    .min( 1 )
    .max( 10000 ),
    price:Joi.number()
    .min( 1 )
    .max( 10000000 ),
    description:Joi.string()
    .min( 1 )
    .max( 1000 ),
    lastUpdate:Joi.string()
    .custom( ( value, helpers ) => {

        const isValidDate = moment( value ).isValid();

        if ( !isValidDate ) return helpers.error( 'any.invalid' );

        return true;

    } ),
    productID:Joi.string()
    .alphanum()
    .length( 24 )
    
});

const createProduct = ( req, res ) => {

    const product = req.body;

    const { title, stock, price, description, image } = req.body;

    if ( !title || !stock || !price || !description || !image ) return res.status( 404 ).send( { message:'The data of product is empty' } );

    const providerID = res.locals.providerID;
    const lastUpdate = moment().format();
    const createdAt = moment().unix();

    const productUpdated = { ...product, providerID, lastUpdate, createdAt };

    const isProductValid = productObject.validate( productUpdated );

    if ( isProductValid.error ) return res.status( 403 ).send( { message:isProductValid.error } );

    const newProduct = new Product( productUpdated );

    newProduct.save( ( err, productStored ) => {

        if ( err ) throw err;

        if ( !productStored ) return res.status( 404 ).send( { message:'The product stored is not valid' } );

        const productID = productStored._id; 

        const filter = { _id:providerID };
        const update = { $push:{ products:productID } };

        Provider.findOneAndUpdate( filter, update, ( err, updated ) => {

            if ( err ) throw err;

            if ( !updated ) return res.status( 404 ).send( { message:'The provider dont exist' } );

            res.status( 200 ).send( { message:'Product created successfully', product:productStored } );

        }  );
            
    } );

};

const searchProduct = ( req, res ) => {

    const { search } = req.headers;

    const string = typeof search;

    if ( string !== 'string' ) return res.status( 403 ).send( { message:'The search is not a string' } );

    if ( !search ) return res.status( 404 ).send( { message:'The search is empty' } );

    const productPattern = new RegExp( '^'+search );

    const providerID = res.locals.providerID;

    Product.find( { $or:[{ title:{ $regex: productPattern, $options:'i' }}, { description:{ $regex:productPattern, $options:['m', 's', 'i', 'x'] }}], providerID }, ( err, products ) => {

        if ( err ) throw err;

        if ( products.length === 0 ) return res.status( 404 ).send( { message:'The term searched not founded any products' } );

        res.status( 200 ).send( { message:'Products founded!', products } );

    } ).limit( 10 );


};

const searchOneProduct = ( req, res ) => {

    const { productid:productID } = req.headers;

    if ( !productID ) return res.status( 404 ).send( { message:'The productID is empty' } );

    const idObject = Joi.object({

        productID:Joi.string()
        .alphanum()
        .length( 24 )

    });

    const validation = idObject.validate( { productID } );

    if ( validation.error ) return res.status( 403 ).send( { message:validation.error } );

    const providerID = res.locals.providerID;
    
    const filter = { providerID, _id:productID };

    Product.findOne( filter, ( err, productStored ) => {

        if ( err ) throw err;
        
        if ( !productStored ) return res.status( 404 ).send( { message:'The product dont exist' } );

        const { image, stock, lastUpdate, price, description, title, _id } = productStored;

        const productToReturn = {

            title,
            _id,
            image,
            stock,
            lastUpdate,
            price,
            description,
            isValid:true,
            isLoading:false

        };

        res.status( 200 ).send( { message:'Product founded successfully', product:productToReturn } );


    } );

};

const updateProduct = ( req, res ) => {

    const { input, productID } = req.body;

    if ( !input ) return res.status( 404 ).send( { message:'The input data is empty' } );

    const lastUpdate = moment().format();

    const validation = updateObject.validate( { ...input, productID, lastUpdate } );

    if ( validation.error ) return res.status( 403 ).send( { message:validation.error } );

    const providerID = res.locals.providerID;

    const filter = { _id:productID, providerID };
    const update = { ...input, lastUpdate };

    Product.updateOne( filter, update, { new:true }, ( err, updated ) => {

        if ( err ) throw err;

        if ( !updated ) return res.status( 404 ).send( { message:'The product does not exist' } );

        res.status( 200 ).send( { message:'Producto actualizado con exito', productUpdate:input } );

    } );


};

const deleteProduct = ( req, res ) => {

    const { productID } = req.body;

    if ( !productID ) return res.status( 404 ).send( { message:'The product ID is empty' } );

    const isProductIDValid = validator.isMongoId( productID );

    if ( !isProductIDValid ) return res.status( 404 ).send( { message:'The productID is not valid' } );

    const providerID = res.locals.providerID;

    const filter = { _id:productID, providerID };

    Product.deleteOne( filter, ( err, deleted ) => {

        if ( err ) throw err;

        if ( !deleted ) return res.status( 404 ).send( { message:'The product does not exist' } );

        const filter = { _id:providerID };

        const update = { $pull:{ products:productID } };

        Provider.updateOne( filter, update, ( err, updated ) => {

            if ( err ) throw err;

            if ( !updated ) return res.status( 404 ).send( { message:'The provider doesnt exist' } );
            
            res.status( 200 ).send( { message:'Producto eliminado con exito' } );

        } );    

    } );

};

module.exports = { createProduct, searchProduct, searchOneProduct, updateProduct, deleteProduct }; 