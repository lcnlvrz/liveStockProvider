
const initialState = { 
    
    isLoading:true,
    provider:'',
    providerID:'',
    products:[],
    clients:[],
    createdAt:0,
    typeOfAccount:'',
    isActive:false,
    profilePhoto:''
};


const provider = ( state = initialState, action ) => {

    switch (action.type) {
        case 'SET_PROVIDER':
            
            return action.payload;

        case 'SET_PROVIDER_INVALID':

            return { provider:null, providerID:null, isLoading:false, products:null };

        case 'ADD_NEW_PRODUCT':

            return { ...state, products:[ action.payload, ...state.products ] };

        case 'DELETE_LAST_PRODUCT_ADD_NEW':

            return { ...state, products:action.payload };

            
        case 'ADD_NEW_CLIENT':
            return { ...state, clients:[ action.payload, ...state.clients ] };

        case 'DELETE_LAST_CLIENT_ADD_NEW':

            return { ...state, clients:action.payload };

        case 'SET_PROFILE_PHOTO':

            return { ...state, profilePhoto:action.payload };

        case 'SET_UPDATE_PRODUCT_INFO':

            const copyProducts = [ ...state.products ];

            copyProducts[ action.payload.indexToChange ] = { ...copyProducts[ action.payload.indexToChange ], ...action.payload.newInfo };

            return { ...state, products:copyProducts };

        case 'DELETE_ONE_PRODUCT':

            const photosUpdate = state.products.filter( ( product ) => {

                return product._id !== action.payload;

            } );

            return { ...state, products:photosUpdate };

        case 'DELETE_ONE_CLIENT':

            const clientsUpdated = state.clients.filter( ( client ) => {

                return client._id !== action.payload;

            });

            return { ...state, clients:clientsUpdated };

        default:
            return state;
    };

};

export default provider;