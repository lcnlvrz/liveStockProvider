const Provider = require( '../models/providers' );
const moment = require( 'moment' );

const isMemberShipValid = ( req, res, next ) => {

    const providerID = res.locals.providerID;

    const clientID = res.locals.clientID;

    const filter = { _id:providerID };

    Provider.findOne( filter, ( err, providerStored ) => {

        if ( err ) throw err; 

        if ( !providerStored ) return res.status( 404 ).send( { message:'The provider doesnt exist' } );

        const { payments } = providerStored;

        const { until } = payments[0];

        const currentDate = moment().unix();

        if ( currentDate > until && !clientID ) return res.status( 403 ).send( { message:'Tu membresia ya caduco. Necesitas renovarla.' } );

        if ( currentDate > until && clientID ) return res.status( 403 ).send( { message:'La membresia de tu proveedor caduco. Dile que la renueve.' } );


        next();

    } ).populate( { path:'payments', options:{ sort:{ since:-1 }, limit:1 } } );

};

module.exports = isMemberShipValid;