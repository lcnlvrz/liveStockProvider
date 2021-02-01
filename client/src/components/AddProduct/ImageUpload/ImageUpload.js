import { Button } from '@material-ui/core';
import React, { useEffect, useRef } from 'react';
import ImageUploading from 'react-images-uploading';

const ImageUpload = ( props ) => {

    const { images, setImages, alert, setAlert, loading } = props;

    const onChange = (imageList, addUpdateIndex) => {

        const size = imageList[0].file.size;

        if ( size > 1000000 ) return setAlert( { type:'image', message:'Imagen demasiado grande. El maximo es 1MB' } );

        if ( alert.type === 'image' ) {
            setAlert( { type:'', message:'' } );
        } 
        setImages(imageList); 
    };

    const imagePreview = useRef( null );

    useEffect(() => {

       if ( imagePreview.current ) return imagePreview.current.scrollIntoView();
        
    }, [ images ]);

    return (
        <ImageUploading
        required
        value={images}
        onChange={onChange}
        maxNumber={ 1 }
        dataURLKey="data_url"
        >
        {({
        imageList,
        onImageUpload,
        onImageRemoveAll,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps,
        }) => (
        <div className="upload__image-wrapper w-full">
            { images.length === 0 &&  
            <button
            className='bg-gray-500 rounded p-2 text-white font-semibold hover:bg-gray-900'
            style={isDragging ? { color: 'red' } : undefined}
            onClick={ (e) => {

                e.preventDefault();
                onImageUpload();
                console.log( 'uploaded!' );

            } }
            {...dragProps}
            >
                Hace click o arrastra una imagen aca!
            </button> }
            {imageList.map((image, index) => (
            <div 
            key={index} 
            ref={ imagePreview }
            className="image-item items-center text-center flex flex-col">
                <h3 
                className='text-2xl'> 
                    Preview de la imagen:
                </h3>
                <img
                className='my-10 rounded' 
                src={image['data_url']} 
                alt="" 
                width="200" />
                { !loading &&  
                <div className="image-item__btn-wrapper">
                    <Button
                    fullWidth
                    onClick={() => onImageUpdate(index)} 
                    variant='outlined'>
                        <span className='capitalize'>
                            Cambiar imagen
                        </span>
                        
                    </Button>
                </div> }
            </div>
            ))}
            { alert.type === 'image' 
            &&
            <div className='mt-5 text-center'> 
                <span className='text-red-500  font-semibold text-lg my-'>
                    { alert.message }
                </span>
            </div> 
            }
        </div>
        )}
    </ImageUploading>
    )
}

export default ImageUpload;
