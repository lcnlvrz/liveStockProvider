export const propsInputsAddClient = ( alert, input, usernameORpassword ) => {

    let style = {};

    if ( alert.type === 'username' ) {

        style = { border:'1px solid red', borderRadius:'5px' };

    } else {

        style = { margin:0 };

    };

    const propsInitial = {

        fullWidth:true,
        inputProps:{ maxLength:'50' },
        style,
        id:'',
        type:''

    };

    let propsFinal = {};

    if ( usernameORpassword === 'username' ) {

        propsFinal = { ...propsInitial, name:'username', value:input.username, type:'text', id:'input__add__product__form2' };

    } else {

        propsFinal = { ...propsInitial, name:'password', value:input.password, type:'password', id:'input__add__product__form' };

    }


    return propsFinal;

};