const initialState = {

    title:'',
    _id:'',
    image:'',
    stock:'',
    lastUpdate:'',
    price:0,
    description:0,
    isValid:false,
    isLoading:true

};

const currentProduct = ( state = initialState, action ) => {

    switch (action.type) {
        case 'SET_CURRENT_PRODUCT':
            
            return action.payload;

        case 'SET_CURRENT_PRODUCT_INVALID':

            return { ...state, isLoading:false };

        case 'CLEAR_CURRENT_PRODUCT':

            return { ...initialState };

        case 'SET_UPDATE_CURRENT_PRODUCT':
            return { ...state, ...action.payload };
    
        default:
            return state;
    };

};

export default currentProduct;