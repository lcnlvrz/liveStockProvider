

export const setCurrentProduct = ( currentProduct ) => {

    return { type:'SET_CURRENT_PRODUCT', payload:currentProduct };

};

export const setCurrentProductInvalid = () => {

    return { type:'SET_CURRENT_PRODUCT_INVALID' };

};

export const setCurrentProductClear = () => {

    return { type:'CLEAR_CURRENT_PRODUCT' };

};

export const setCurrentProductUpdate = ( productUpdate ) => {

    return { type:'SET_UPDATE_CURRENT_PRODUCT', payload:productUpdate };

};