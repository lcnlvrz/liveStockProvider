import { Button, InputBase } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Header from '../Home/Panel/Header';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import ImageUpload from '../AddProduct/ImageUpload';
import ClipLoader from "react-spinners/ClipLoader";
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import PersonIcon from '@material-ui/icons/Person';
import { submitChangeProfilePhoto } from '../../helpers/submit';

const MyAccount = () => {

    const dispatch = useDispatch();

    const provider = useSelector(state => state.provider);
    const client = useSelector(state => state.client);

    const [user, setUser] = useState( {

        nameBusiness:'',
        accountCreatedOn:'',
        typeOfAccount:'',
        profilePhoto:'',
        isProvider:false,
        isClient:false

    } );

    useEffect(() => {

        if ( provider.providerID && !client.clientID && !provider.isLoading && !client.isLoading ) {

            setUser({

                nameBusiness:provider.provider,
                accountCreatedOn:moment.unix( provider.createdAt ).format("MM/DD/YYYY"),
                typeOfAccount:provider.typeOfAccount,
                isProvider:true,
                isClient:false,
                profilePhoto:provider.profilePhoto

            });
    
        } else if ( !provider.providerID && client.clientID && !provider.isLoading && !client.isLoading  ) {
    
            setUser( {

                nameBusiness:client.username,
                accountCreatedOn:moment.unix( client.createdAt ).format("MM/DD/YYYY"),
                typeOfAccount:'cliente',
                isProvider:false,
                isClient:true,
                profilePhoto:client.profilePhoto
            
           } ); 
            
        };

        
    }, [ provider, client ]);

    const [images, setImages] = React.useState([]);

    const [alert, setAlert] = useState( { type:'', message:'' } );

    const [loading, setLoading] = useState( false );

    const [open, setOpen] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    };

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    };

    useEffect(() => {

        window.scrollTo(0, 0)
        
    }, []);


    return (
        <>
           <div className='flex items-center justify-center flex-col'>

                <h3 className='font-semibold text-lg text-4xl my-5'> 
                    Mi cuenta 
                </h3>

                <div className='credentials flex flex-row justify-evenly items-start flex-wrap w-full h-full'>
                    <div 
                    style={{ width:'290px' }}
                    className='flex flex-col items-start justify-left text-center mx-5 my-5'>
                        <h3 className='text-lg'> 
                            Actual foto de perfil: 
                        </h3>
                        { user.profilePhoto ?  
                        <img 
                        className='w-72 mb-2 object-contain h-52 rounded object-center'
                        alt=''
                        src={ user.profilePhoto }
                        /> 
                        :
                        <div 
                        style={{ background:'#bdbdbd' }}
                        className='w-72 mb-2 object-cover h-52 rounded flex items-center justify-center'>
                            <PersonIcon
                            style={{ fontSize:'100px', color:'white' }}
                            />
                        </div>
                        }
                        <ImageUpload
                        loading={ loading }
                        setAlert={ setAlert }
                        alert={ alert }
                        images={ images } 
                        setImages={ setImages }
                        />
                        { images.length > 0 && !loading &&
                        <div className='mt-5 w-full'>
                            <Button
                            style={{ width:'141px' }}
                            onClick={ () => {

                                if ( provider.isForDemo ) return false;

                                submitChangeProfilePhoto( setAlert, dispatch, images, setLoading, user, setOpen, setImages, provider, true );

                            } }
                            variant="contained" 
                            color="primary" 
                            disableElevation
                            >
                                <span className='capitalize '> Subir foto </span>
                            </Button>
                        </div>  
                        }
                        { images.length > 0 && loading &&
                        <div className='my-5 flex items-center w-full justify-center'> 
                            <ClipLoader/>
                        </div> }
                    </div>
                    <div className='flex flex-col sticky top-32 bg-white w-72 my-5 mx-5'>
                        <div className='flex flex-col my-2'> 
                            <label> Nombre de usuario </label>
                            <InputBase
                            disabled
                            name='nameBusiness'
                            value={ user.nameBusiness ? user.nameBusiness : '' }
                            style={{ border:'1px solid #ccc', borderRadius:'5px', fontWeight:600, color:'black' }}
                            />
                        </div>
                        <div className='flex flex-col my-2'> 
                            <label> Cuenta creada el </label>
                            <InputBase
                            disabled
                            name='accountCreatedOn'
                            value={ user.accountCreatedOn ? user.accountCreatedOn : '' }
                            style={{ border:'1px solid #ccc', borderRadius:'5px', fontWeight:600, color:'black' }}
                            />
                        </div>
                        <div className='flex flex-col my-2'> 
                            <label> 
                                Tipo de cuenta 
                            </label>
                            <InputBase
                            disabled
                            id='capitalize__input'
                            name='accountCreatedOn'
                            value={ user.typeOfAccount ? user.typeOfAccount : '' }
                            style={{ border:'1px solid #ccc', borderRadius:'5px', fontWeight:600, color:'black', textTransform:'capitalize' }}
                            />
                        </div>
                        <div className='flex flex-col my-2 text-sm'> 
                            <p> Para realizar cambios de datos criticos ( contraseña, nombre de negocio, plan, etc ) debe comunicarse con el dueño de la aplicacion. </p>
                        </div>
                    </div>
                </div>
                <Snackbar 
                open={open}  
                onClose={handleClose}>
                    <Alert
                    onClose={handleClose} severity="success">
                        Foto de perfil actualizada
                    </Alert>
                </Snackbar>
           </div>
        </>
    );
};

export default MyAccount;
