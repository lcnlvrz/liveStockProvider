const initialState = {

    username:'',
    createdAt:0,
    clientID:'',
    providerID:{ products:[], _id:'', profilePhoto:'', username:'' },
    isLoading:true,
    profilePhoto:''

};


const client = ( state = initialState, action ) => {

    switch ( action.type ) {
        case 'SET_CLIENT':
            
            return action.payload;

        case 'SET_CLIENT_INVALID':

            return { ...state, username:null, createdAt:null, clientID:null, providerID:null, isLoading:false };

        case 'SET_CURRENT_PHOTO_CLIENT':

            return { ...state, profilePhoto:action.payload };
    
        default:
            return state;
    };

};

export default client;