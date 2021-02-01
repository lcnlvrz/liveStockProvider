

export const setClient = ( client ) => {

    return { type:'SET_CLIENT', payload:client };

};

export const setClientInvalid = () => {

    return { type:'SET_CLIENT_INVALID' };

};

export const setProfilePhotoClient = ( newProfilePhoto ) => {

    return { type:'SET_CURRENT_PHOTO_CLIENT', payload:newProfilePhoto };

};