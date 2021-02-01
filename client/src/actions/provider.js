
export const setProviderInvalid = () => {

    return { type:'SET_PROVIDER_INVALID' };

};

export const setProvider = ( providerInfo ) => {

    return { type:'SET_PROVIDER', payload:providerInfo };

};

export const setNewProduct = ( newProduct ) => {

    return { type:'ADD_NEW_PRODUCT', payload:newProduct }

};

export const setNewClient = ( newClient ) => {

    return { type:'ADD_NEW_CLIENT', payload:newClient }; 

};

export const setProfilePhoto = ( newProfilePhoto ) => {

    return { type:'SET_PROFILE_PHOTO', payload:newProfilePhoto };

};

export const setNewProductInfo = ( indexToChange, newInfo ) => {

    return { type:'SET_UPDATE_PRODUCT_INFO', payload:{ indexToChange, newInfo } };

};

export const setDeleteOneProduct = ( idProductToDelte ) => {

    return { type:'DELETE_ONE_PRODUCT', payload:idProductToDelte };

};

export const setDeleteOneClient = ( clientIDToDelete ) => {

    return { type:'DELETE_ONE_CLIENT', payload:clientIDToDelete };

};

export const setDeleteLasProductAddNew = ( newProducts ) => {

    return { type:'DELETE_LAST_PRODUCT_ADD_NEW', payload:newProducts };

};

export const setDeleteLastClientAddNew = ( newClients ) => {

    return { type:'DELETE_LAST_CLIENT_ADD_NEW', payload:newClients };

};