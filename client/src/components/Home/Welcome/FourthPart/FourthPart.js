import React, { useState } from 'react';
import axiosInstance from '../../../../api/axiosConfig';
import { outlineButtonWhite } from '../../../../constant';
import ClipLoader from "react-spinners/ClipLoader";

const FourthPart = ( ) => {


    const [loading, setLoading] = useState( false );

    return (
        <div>
            <div className='bg-black flex px-5'>
                <div className='one_plan flex flex-col my-5'>
                    <h1 className='text-white text-4xl'> 
                        Membresia
                    </h1>
                    <div className='flex flex-col space-y-10'>
                        <h3 className='text-white text-lg my-5 leading-7'> 
                            Una cuenta, funcional en todos los dispositivos, sin limite de informacion y usuarios
                        </h3>
                        <h1 
                        style={{ marginTop:0 }}
                        className='text-white text-5xl font-bold'> 
                            $500 ars/mes
                        </h1>
                        { loading 
                        ?
                        <div className='w-full text-center'> 
                            <ClipLoader 
                            color='white'/>
                        </div> 
                        : 
                        <button
                        onClick={ () => {

                            setLoading( true );

                            axiosInstance.post( '/create-mp-link'  )
                            .then( (response) => {

                                const { redirect } = response.data;

                                window.location.href = redirect;
                            

                            } )
                            .catch( (err) => {

                                console.log( err );
                                setLoading( false ); 

                            } );

                        } }
                        type='button'
                        className={ outlineButtonWhite }
                        >
                            Adquirir o Renovar Ahora
                        </button> 
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FourthPart
