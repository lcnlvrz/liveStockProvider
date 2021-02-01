import { IconButton } from '@material-ui/core';
import React, { useState } from 'react';
import { linkSignInClient, linkSignInProvider, linkValidatePayment, liveStockProviderLogo, outlineButton } from '../../../../constant';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import Drawer from '@material-ui/core/Drawer';
import clsx from 'clsx';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PaymentRoundedIcon from '@material-ui/icons/PaymentRounded';
import FaceRoundedIcon from '@material-ui/icons/FaceRounded';
import { useStylesFirstPart } from './styles';
import { Link } from 'react-router-dom';
import ChildCareRoundedIcon from '@material-ui/icons/ChildCareRounded';
import HourglassEmptyRoundedIcon from '@material-ui/icons/HourglassEmptyRounded';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import TrainIcon from '@material-ui/icons/Train';
import AssignmentTurnedInRoundedIcon from '@material-ui/icons/AssignmentTurnedInRounded';

const FirstPart = ( props ) => {

    const { setTakeUserTo } = props;

    const classes = useStylesFirstPart();

    const [state, setState] = useState({ right: false
    });

    const toggleDrawer = (anchor, open) => (event) => { setState({ ...state, [anchor]: open });};

    const list = (anchor) => (
        <div
        className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
        })}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <ListItem
                    onClick={ () => {

                        console.log( 'click!' );
                        setTakeUserTo({ part:'secondPart' });

                    } } 
                    button>
                        <ListItemIcon>
                            <CheckCircleRoundedIcon
                            style={{ color:'black' }}
                            />
                        </ListItemIcon>
                        <ListItemText primary='Beneficios y ventajas' />
                </ListItem>
                <ListItem
                onClick={ () => {

                    console.log( 'click!' );
                    setTakeUserTo({ part:'thirdPart' });

                } } 
                button>
                    <ListItemIcon>
                        <TrainIcon
                        style={{ color:'black' }}
                        />
                    </ListItemIcon>
                    <ListItemText primary='Guia' />
                </ListItem>
                <Link to={ `${linkSignInProvider}&is_demo=true` }>
                    <ListItem button>
                        <ListItemIcon>
                            <HourglassEmptyRoundedIcon
                            style={{ color:'black' }}
                            />
                        </ListItemIcon>
                        <ListItemText primary='Probar demo' />
                    </ListItem>
                </Link>
                <Link to={ linkSignInProvider }>
                    <ListItem button>
                        <ListItemIcon>
                            <FaceRoundedIcon
                            style={{ color:'black' }}
                            />
                        </ListItemIcon>
                        <ListItemText primary='Iniciar sesion como Proveedor' />
                    </ListItem>
                </Link>
                <Link to={ linkSignInClient }>
                    <ListItem button>
                        <ListItemIcon>
                            <ChildCareRoundedIcon
                            style={{ color:'black' }}
                            />
                        </ListItemIcon>
                        <ListItemText primary='Iniciar sesion como Cliente' />
                    </ListItem>
                </Link>
                <ListItem
                onClick={ () => {

                    console.log( 'click!' );
                    setTakeUserTo({ part:'fourthPart' });

                } } 
                button>
                    <ListItemIcon>
                        <PaymentRoundedIcon
                        style={{ color:'black' }}
                        />
                    </ListItemIcon>
                    <ListItemText primary='Pagar membresia' />
                </ListItem>
                <Link to={ linkValidatePayment }>
                    <ListItem
                    button>
                        <ListItemIcon>
                            <AssignmentTurnedInRoundedIcon
                            style={{ color:'black' }}
                            />
                        </ListItemIcon>
                        <ListItemText primary='Validar pago' />
                    </ListItem>
                </Link>
            </List>
        </div>
        );

    return (
        <div>
            <header>
                <div className='flex flex-row justify-between mx-5 my-5'>
                    <img 
                    className='w-36 h-16'
                    alt='live stock provider'
                    src={ liveStockProviderLogo }
                    />
                    <IconButton
                    onClick={toggleDrawer('right', true)}
                    style={{ outline:'none', color:'black' }}
                    >
                        <MenuRoundedIcon/>
                    </IconButton>
                </div>
                <div>
                    <Drawer anchor='right' open={state['right']} onClose={toggleDrawer('right', false)}>
                        {list('right')}
                    </Drawer>
                </div>
            </header>
            <div className='mx-5 space-y-5 my-5'>
                <h1 className='text-3xl font-semibold text-gray-500'> 
                    Brinda <span className='font-bold text-gray-800'>informacion esencial</span> a tus clientes 
                </h1>
                <h3 className='font-semibold'> 
                    Centraliza la informacion necesaria de tus productos en un solo lugar, de manera segura y visible para quien vos quieras.
                </h3>
                <div className='flex flex-row'>
                    <Link to='/proveedor-o-cliente'>
                        <button
                        className={ `${outlineButton} mr-5` }
                        type='button'
                        >
                            Iniciar Sesion
                        </button>
                    </Link>
                    <Link to={ `${linkSignInProvider}&is_demo=true` }>
                        <button
                        type='button'
                        className={ outlineButton }
                        >
                            Probar demo
                        </button>
                    </Link>
                </div>
            </div> 
        </div>
    )
}

export default FirstPart
