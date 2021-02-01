import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useStylesUpdateInfo } from '../UpdateInfo/styles';
import { outlineButton } from '../../../../constant';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import { handleCloseModal } from '../../../../helpers/materialUI';
import { submitDeleteProduct } from '../../../../helpers/submit';

export default function DeleteProduct( props ) {

  const { setDeleteProduct } = props;

  const dispatch = useDispatch();

  const history = useHistory();
  
  const provider = useSelector(state => state.provider);

  const classes = useStylesUpdateInfo();
  const [open, setOpen] = React.useState(true);

  const currentProduct = useSelector(state => state.currentProduct);

  const [alert, setAlert] = useState( { type:'', message:'' } );

  const [loading, setLoading] = useState( false );


  return (
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={ () => handleCloseModal( setOpen, setDeleteProduct ) }
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
            <div className='w-80 bg-white outline-none rounded my-5 h-2/3 overflow-y-scroll'>
                <div className='h-full flex items-center justify-center flex-col space-y-5'>
                    <h3 className='text-3xl'> 
                        ¿Estas seguro/a? 
                    </h3>
                    <p className='text-center'> 
                        No vas a poder volver si tomas esta decision 
                    </p>
                    <div className='flex flex-row justify-evenly w-full'>
                        { loading 
                        ? 
                        <ClipLoader/> 
                        :
                        <> 
                        <button
                        onClick={ (e) => {

                            if ( provider.isForDemo ) return false;

                            submitDeleteProduct( currentProduct, dispatch, setLoading, setOpen, setDeleteProduct, history, setAlert, provider );

                        } }
                        className={ outlineButton } 
                        type='button'>

                            Eliminar

                        </button> 
                        <button
                        style={{ border:'1px solid black', color:'black' }}
                        className={ outlineButton }
                        onClick={ () => {

                            setDeleteProduct( false );

                        } } 
                        type='button'>

                            Cancelar

                        </button>
                        </> }
                    </div>
                    { alert.type === 'product' && 
                    <h3 className='text-red-500 font-semibold text-center'> 
                        { alert.message }
                    </h3> }
                </div>
            </div>
        </Fade>
      </Modal>
  );
}