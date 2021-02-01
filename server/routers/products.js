const express = require( 'express' );

const app = express.Router();

const isTokenValid = require( '../middleware/isTokenValid' );
const isTokenClientValid = require( '../middleware/isClientValid' );
const isMemberShipValid = require( '../middleware/isMemberShipValid' );

const ProductController = require( '../controllers/products' );

app.post( '/product', [ isTokenValid ], [ isMemberShipValid ], ProductController.createProduct );

app.get( '/specific-product', [ isTokenValid ], [ isMemberShipValid ] ,ProductController.searchProduct );

app.get( '/specific-product-as-client', [ isTokenClientValid ], [ isMemberShipValid ] ,ProductController.searchProduct );

app.get( '/one-product', [ isTokenValid ], [ isMemberShipValid ] ,ProductController.searchOneProduct );

app.get( '/one-product-as-client', [ isTokenClientValid ], [ isMemberShipValid ] ,ProductController.searchOneProduct );

app.post( '/update-product', [ isTokenValid ], [ isMemberShipValid ] , ProductController.updateProduct );

app.delete( '/delete-product', [ isTokenValid ], [ isMemberShipValid ] , ProductController.deleteProduct );

module.exports = app;