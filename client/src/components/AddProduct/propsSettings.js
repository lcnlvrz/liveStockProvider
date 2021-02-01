

export const allPropsAddProduct = ( input ) => {

    const propsTitle = { 
    inputProps:{ maxLength:100 },
    name:'title',
    placeholder:'Trata de ser breve y conciso',
    required:true,
    value:input.title,
    fullWidth:true,
    id:'input__add__product__form' };

    const propsStock = { 

        inputProps:{ maxLength:100 },
        name:'stock',
        required:true,
        value: input.stock,
        fullWidth:true,
        id:'input__add__product__form',

    };

    const propsPrice = {

        inputProps:{ maxLength:100 },
        name:'price',
        required:true,
        value: input.price,
        fullWidth:true,
        id:'input__add__product__form'

    };

    const propsTextArea = {

        placeholder:'No mas de 1000 letras',
        rowsMin:10,
        name:'description',
        required:true,
        value: input.description ,
        maxLength: 1000,
        rowsMax: 10 

    };
    
    const propsButtonSubmit = {

        type:'submit',
        fullWidth:true,
        disableElevation:true,
        style:{ textTransform:'none' },
        className:'publicar__button',
        variant:"contained",
        color:"primary" ,
        component:"button"

    };


    return { propsTitle, propsStock, propsPrice, propsTextArea, propsButtonSubmit };

}


