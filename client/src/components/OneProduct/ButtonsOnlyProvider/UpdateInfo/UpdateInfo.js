import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useStylesUpdateInfo } from './styles';
import { handleCloseModal } from '../../../../helpers/materialUI';
import { InputBase, TextareaAutosize } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { outlineButton } from '../../../../constant';
import ClipLoader from "react-spinners/ClipLoader";
import { submitUpdateProductInfo } from '../../../../helpers/submit';

export default function UpdateInfo( props ) {

  const { setCloseModal, setIsNewUpdate } = props;

  const dispatch = useDispatch();

  const currentProduct = useSelector(state => state.currentProduct);
  const { title, stock, price, description } = useSelector(state => state.currentProduct);
  const provider = useSelector(state => state.provider);

  const classes = useStylesUpdateInfo();
  const [open, setOpen] = React.useState( true );

  const [alert, setAlert] = useState( { type:'', message:'' } );

  const [input, setInput] = useState( {

    title:title.toString(),
    stock:stock.toString(),
    price:price.toString(),
    description:description.toString()

  } );

  const [loading, setLoading] = useState( false );

  return (
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={ () => {

          if ( loading ) return false;

          handleCloseModal( setOpen, setCloseModal );

        } }
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div
          className='w-80 bg-white outline-none rounded my-5 h-full overflow-y-scroll'>
            <form 
            onSubmit={ (e) => {

              e.preventDefault();

              if ( provider.isForDemo ) return false;

              submitUpdateProductInfo( e, input, dispatch, setAlert, currentProduct, setLoading, provider, setOpen, setCloseModal, setIsNewUpdate, provider );

            } }
            onChange={ ( e ) => setInput( { ...input, [ e.target.name ]:e.target.value } ) }
            className='flex flex-col items-center h-full justify-evenly'>
              <div className='space-y-1 w-3/4'>
                <div className='flex flex-col text-left'>
                  <label> Titulo </label>
                  <InputBase
                  inputProps={{ maxLength:100 }}
                  value={ input.title }
                  name='title'
                  style={{ border:'1px solid #ccc', borderRadius:'5px', padding:'0px 5px' }}
                  />
                  { alert.type === 'title' && <span className='text-red-500 font-semibold'> { alert.message } </span> }
                </div>
                <div className='flex flex-col text-left'>
                  <label> Stock </label>
                  <InputBase
                  name='stock'
                  inputProps={{ maxLength:100 }}
                  value={ input.stock }
                  style={{ border:'1px solid #ccc', borderRadius:'5px', padding:'0px 5px' }}
                  />
                  { alert.type === 'stock' && <span className='text-red-500 font-semibold'> { alert.message } </span> }
                </div>
                <div className='flex flex-col text-left w-full'>
                  <label> Precio </label>
                  <InputBase
                  inputProps={{ maxLength:100 }}
                  value={ input.price }
                  name='price'
                  style={{ border:'1px solid #ccc', borderRadius:'5px', padding:'0px 5px' }}
                  />
                  { alert.type === 'price' && <span className='text-red-500 font-semibold'> { alert.message } </span> }
                </div>
                <div className='flex flex-col text-left w-full'>
                  <label> Detalles </label>
                  <TextareaAutosize
                  rowsMax={ 4 }
                  maxLength={ 1000 }
                  rowsMin={ 4 }
                  value={ input.description }
                  name='description'
                  style={{ border:'1px solid #ccc', borderRadius:'5px', padding:'0px 5px', outline:'none', resize:'none' }}
                  />
                  { alert.type === 'description' && <span className='text-red-500 font-semibold'> { alert.message } </span> }
                </div>
              </div>
              <div className='w-3/4 space-y-3 my-5 flex flex-col items-center justify-center'>
              { alert.type === 'product' && <span className='text-red-500 font-semibold'> { alert.message } </span> }
                { loading 
                ?
                <div className='flex items-center justify-center'> 
                  <ClipLoader/>
                </div> 
                :
                <>  
                  <button 
                  type='submit'
                  className={ `${ outlineButton } w-full` }>
                    Actualizar
                  </button> 
                  <button 
                  type='button'
                  onClick={ () => {

                    if ( loading ) return false;

                    handleCloseModal( setOpen, setCloseModal );

                  } }
                  style={{ color:'black', borderColor:'black' }}
                  className={ `${ outlineButton } w-full` }>
                    Cancelar
                  </button>
                </> 
                }
              </div>
            </form>
          </div>
        </Fade>
      </Modal>
  );
}