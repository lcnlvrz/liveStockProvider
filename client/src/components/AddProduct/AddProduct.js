import { Button, InputBase, TextareaAutosize } from '@material-ui/core'
import React, { useEffect, useRef, useState } from 'react'
import Header from '../Home/Panel/Header'
import './AddProduct.css';
import { validateSubmitAddProduct } from '../../helpers/validators';
import { useDispatch, useSelector } from 'react-redux';
import ClipLoader from "react-spinners/ClipLoader";
import { submitAddProduct } from '../../helpers/submit';
import ImageUpload from './ImageUpload';
import { allPropsAddProduct } from './propsSettings';
import Snackbar from '@material-ui/core/Snackbar';
import { Redirect } from 'react-router-dom';
import { Alert, handleClose } from '../../helpers/materialUI';
import AlertInput from '../AlertInput';

const AddProduct = () => {

    const [open, setOpen] = React.useState(false);

    const [images, setImages] = React.useState([]);

    const dispatch = useDispatch();

    const [loading, setLoading] = useState( false );
    const [alert, setAlert] = useState( { type:'', message:'' } );
    const [input, setInput] = useState( { title:'', description:'', stock:'', price:'' } );

    const { propsTitle, propsStock, propsPrice, propsTextArea, propsButtonSubmit } = allPropsAddProduct( input );

    const submitForm = () => {

        setAlert( { type:'', message:'' } );

        const isValid = validateSubmitAddProduct( input, setAlert, images );
    
        if ( !isValid ) return false;

        submitAddProduct( images, dispatch, input, setLoading, setInput, setImages, setAlert, setOpen, provider );

    };

    const stock = useRef(null);
    const price = useRef(null);


    useEffect(() => {

        console.log( alert );


        if ( alert.type === 'stock' ) return stock.current.scrollIntoView();

        if ( alert.type === 'price' ) return price.current.scrollIntoView();
        
    }, [ alert ]);

    const provider = useSelector(state => state.provider);

    useEffect(() => {

        window.scrollTo(0, 0)
        
    }, []);

    if ( !provider.provider && !provider.isLoading ) return <Redirect to='/panel'/>

    return (
        <div className='flex text-center justify-center flex-col'>
            <div className='border-solid flex flex-col items-center text-left'>
                <h3 className='text-xl font-semibold mt-5 text-4xl text-center'> Agregar producto </h3>
                <form 
                onSubmit={ (e) => {

                    e.preventDefault();

                    if ( provider.isForDemo ) return false;

                    submitForm( e );

                } }
                onChange={ (e) => setInput({ ...input, [ e.target.name ]:e.target.value }) } 
                className='w-full flex items-center justify-center flex-col my-5 space-y-2'>
                    <div className='flex flex-col w-3/4'>
                        <div ref={ stock }></div>
                        <label> Titulo </label>
                        <InputBase 
                        style={ alert.type === 'title' ? { border:'1px solid red', borderRadius:'5px' } : { margin:0 } }
                        { ...propsTitle } />
                        { alert.type === 'title' 
                        && 
                        <span 
                        className='text-red-500  font-semibold'> 
                            { alert.message }
                        </span> }
                    </div>
                    
                    <div className='flex flex-col w-3/4'>
                        <label> Stock </label>
                        <div ref={ price }></div>
                        <InputBase
                        style={ alert.type === 'stock' ? { border:'1px solid red', borderRadius:'5px' } : { margin:0 } }
                        { ...propsStock } />
                        { alert.type === 'stock' && 
                        <span 
                        className='text-red-500 font-semibold'> 
                            { alert.message } 
                        </span> 
                        }
                        { alert.type !== 'stock' && <AlertInput message='Solo se permiten numeros enteros'/> }
                    </div>
                    <div className='flex flex-col w-3/4'>
                        <label> Precio </label>
                        <InputBase 
                        style={ alert.type === 'price' ? { border:'1px solid red', borderRadius:'5px' } : { margin:0 } }
                        { ...propsPrice }/>
                        { alert.type === 'price' && 
                        <span 
                        className='text-red-500 font-semibold'> 
                            { alert.message } 
                        </span> }
                        { alert.type !== 'price' && <AlertInput message='Solo se permiten numeros. Para los decimales, usar el punto.'/> }
                    </div>
                    <div className='flex flex-col w-3/4 container__more__details'>
                        <label> Descripcion detallada </label>
                        <TextareaAutosize
                        style={ alert.type === 'description' ? { border:'1px solid red', borderRadius:'5px', textAlign:'center', paddingLeft:'5px', paddingRight:'5px' } : { textAlign:'center', paddingLeft:'5px', paddingRight:'5px', borderRadius:'5px'  } } 
                        { ...propsTextArea } />
                        { alert.type === 'description' && 
                        <span 
                        className='text-red-500  font-semibold'> 
                            { alert.description } 
                        </span> }
                    </div>
                    <div className='flex flex-col items-center justify-between text-center space-y-5 h-full w-3/4'>
                        <ImageUpload 
                        loading={ loading }
                        setAlert={ setAlert }
                        alert={ alert }
                        images={ images } 
                        setImages={ setImages }/>
                        { loading 
                        ? 
                        <ClipLoader/> 
                        : 
                        <Button { ...propsButtonSubmit }> Publicar </Button> 
                        }
                    </div>
                    <Snackbar 
                    open={open}  
                    onClose={ (e, reason) => handleClose( e, reason, setOpen ) }>
                        <Alert
                        onClose={ (e, reason) => handleClose( e, reason, setOpen ) } 
                        severity="success">
                            Producto publicado con exito
                        </Alert>
                    </Snackbar>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
