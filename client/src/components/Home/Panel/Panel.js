import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import './Panel.css';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import { centerVertically, images, imagesClient } from '../../../constant';
import { useStylesPanel } from './styles';
import { setClientInvalid } from '../../../actions/client';
import { setProviderInvalid } from '../../../actions/provider';
import { setCurrentProductClear } from '../../../actions/currentProduct';
import useAuth from '../../../hooks/useAuth';


const Panel = () => {

    console.log(useAuth());

    const dispatch = useDispatch();

    const provider = useSelector(state => state.provider);

    const client = useSelector(state => state.client);

    const [imagesPanel, setImagesPanel] = useState( [] );

    useEffect(() => {

      if ( provider.providerID && !client.clientID && !provider.isLoading && !client.isLoading ) {

        setImagesPanel( images );

      } else if ( !provider.providerID && client.clientID && !provider.isLoading && !client.isLoading  ) {

        setImagesPanel( imagesClient );
        
      };
      
    }, [ provider, client ]);

    const history = useHistory();

    const classes = useStylesPanel();

    return (
        <div className='panel__container h-screen'>
            <div
            style={{ height:'100vh' }} 
            className={ centerVertically }>
                <div 
                style={{ height:'100vh' }}
                className={classes.root}>
                    {imagesPanel.map((image) => (
                        <ButtonBase
                        onClick={ () => {

                            if ( image.isLogout ) {

                                dispatch( setClientInvalid() );
                                dispatch( setProviderInvalid() );
                                dispatch( setCurrentProductClear() );
                                localStorage.removeItem( 'token' );
                                localStorage.removeItem( 'tokenClient' );
                                history.push( '/' );

                            } else {

                                history.push( image.route );

                            };

                        } }
                        focusRipple
                        key={image.title}
                        className={classes.image}
                        focusVisibleClassName={classes.focusVisible}
                        style={{
                            width: image.width,
                            height:'auto'
                        }}
                        >
                            <span
                                className={classes.imageSrc}
                                style={{
                                backgroundImage: `url(${image.url})`,
                                }}
                            />
                            <span className={classes.imageBackdrop} />
                            <span className={classes.imageButton}>
                                <Typography
                                component="span"
                                variant="subtitle1"
                                color="inherit"
                                className={classes.imageTitle}
                                >
                                {image.title}
                                <span className={classes.imageMarked} />
                                </Typography>
                            </span>
                        </ButtonBase>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Panel
