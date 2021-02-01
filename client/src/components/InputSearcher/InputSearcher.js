import { InputBase } from '@material-ui/core';
import React from 'react';
import SearchIcon from '@material-ui/icons/Search';

const InputSearcher = ( props ) => {

    const { setInput, setIsSearching, valueInput, placeHolder, nameInput } = props;

    return (
        <InputBase
        onChange={ (e) => {

            setInput({ [ nameInput ]:e.target.value });
            setIsSearching( true ); 

        } }
        value={ valueInput }
        placeholder={ placeHolder }
        fullWidth
        style={{ border:'1px solid #ccc', borderRadius:'5px' }}
        startAdornment={ 
        <SearchIcon/>
            }
        />
    )
}

export default InputSearcher
