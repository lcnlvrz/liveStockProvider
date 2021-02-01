import { Button } from '@material-ui/core';
import React from 'react'
import ClipLoader from "react-spinners/ClipLoader";

const SubmitAPI = ( props ) => {

    const { loading } = props;

    if ( loading ) {

        return <ClipLoader/>; 

    } else {

        return (

            <Button
            type='submit'
            disableElevation
            style={{ textTransform:'none' }}
            variant="contained"
            color="primary"
            >
                Crear cuenta
            </Button>

        );

    };

};

export default SubmitAPI
