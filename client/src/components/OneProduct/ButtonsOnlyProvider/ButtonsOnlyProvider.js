import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { Alert } from '../../../helpers/materialUI';
import UpdateInfo from './UpdateInfo';
import Snackbar from '@material-ui/core/Snackbar';
import DeleteProduct from './DeleteProduct';


const ButtonsOnlyProvider = () => {

    const [isUpdateInfo, setIsUpdateInfo] = useState( false );

    const [isNewUpdate, setIsNewUpdate] = useState( false );

    const [deleteProduct, setDeleteProduct] = useState( false );

    return (
        <div className='flex justify-between my-5'>
            <Button 
            type='button'
            onClick={ (e) => setIsUpdateInfo( true )}
            disableElevation
            variant="contained" 
            color="primary">
                <span className='capitalize'>
                    Actualizar
                </span>
            </Button>
            <Button 
            onClick={ () => {

                setDeleteProduct( true );

            } }
            style={{ outline:'none' }}
            disableElevation
            variant="contained" 
            color="secondary">
                <span className='capitalize'>
                    Eliminar
                </span>
            </Button>
            { isNewUpdate && 
             <Snackbar 
             open={true}  
             onClose={ () => setIsNewUpdate( false ) }>
                 <Alert
                 onClose={ () => setIsNewUpdate( false ) } 
                 severity="success">
                     Producto actualizado con exito
                 </Alert>
            </Snackbar> }
            { isUpdateInfo && 
            <UpdateInfo
            setIsNewUpdate={ setIsNewUpdate } 
            setCloseModal={ setIsUpdateInfo }/> }
            { deleteProduct && 
            <DeleteProduct setDeleteProduct={ setDeleteProduct }/> }
        </div>
    );
};

export default ButtonsOnlyProvider;
