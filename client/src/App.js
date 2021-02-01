import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home';
import Provider from './components/SignIn/Provider';
import ShowProducts from './components/ShowProducts';
import OneProduct from './components/OneProduct';
import AddProduct from './components/AddProduct';
import AddClients from './components/AddClients';
import MyAccount from './components/MyAccount';
import AuthProvider from './Providers/AuthProvider';
import Client from './components/SignIn/Client/Client';
import MyProvider from './components/MyProvider';
import DeleteClient from './components/DeleteClient';
import ProviderOrClient from './components/ProviderOrClient';
import Success from './components/MercadoPago/Success';
import Failure from './components/MercadoPago/Failure';
import Pending from './components/MercadoPago/Pending';
import ValidatePayment from './components/ValidatePayment';
import ForgotPassword from './components/ForgotPassword';
import { Helmet } from 'react-helmet-async';
import Panel from './components/Home/Panel';
import HeaderProvider from './Providers/HeaderProvider';
import PageDoesnotExist from './components/PageDoesnotExist';


function App() {


  return (
      <Router>
        <AuthProvider>
          <Switch>
            
            <Route path='/' exact={ true }>
              <Helmet>
                <title> 
                  Inicio - Live Stock Provider
                </title>
              </Helmet>
              <Home />
            </Route>

            <Route path='/proveedor/'>
              <Helmet>
                <title> 
                  Iniciar Sesion - Proveedor - Live Stock Provider 
                </title>
              </Helmet>
              <Provider />
            </Route>
            
            <Route path='/cliente/'>
              <Helmet>
                <title> Iniciar Sesion - Cliente - Live Stock Provider </title>
              </Helmet>
              <Client/>
            </Route>

            <Route path='/contraseña/'>
              <Helmet>
                <title> Cambiar Contraseña - Live Stock Provider </title>
              </Helmet>
              <ForgotPassword/>
            </Route>

            <Route path='/payment/'>
              <Helmet>
                <title> Validar Membresia - Live Stock Provider </title>
              </Helmet>
              <ValidatePayment/>
            </Route>

            <Route path='/pendingmp/'>
              <Helmet>
                <title> Pago Pendiente - Live Stock Provider </title>
              </Helmet>
              <Pending/>
            </Route>

            <Route path='/failuremp/'>
              <Helmet>
                <title> Pago Cancelado - Live Stock Provider </title>
              </Helmet>
              <Failure/>
            </Route>

            <Route path='/successmp/'>
              <Helmet>
                <title> Pago Aceptado - Live Stock Provider </title>
              </Helmet>
              <Success/>
            </Route>

            <Route path='/proveedor-o-cliente' exact={ true }>
              <Helmet>
                <title> Tipo de Cuenta - Live Stock Provider </title>
              </Helmet>
              <ProviderOrClient />
            </Route>

            <Route path={ [ '/panel', '/agregar-cliente', '/eliminar-cliente','/agregar-producto', '/mis-productos', '/mi-proveedor','/mi-cuenta', '/product/mas-detalles/' ] }>
              <HeaderProvider>
                <Route path='/panel' exact={ true }>
                  <Panel/>
                </Route>

                <Route path='/agregar-cliente' exact={ true }>
                  <Helmet>
                    <title> Agregar Cliente - Live Stock Provider </title>
                  </Helmet>
                  <AddClients/>
                </Route>

                <Route path='/eliminar-cliente' exact={ true }>
                  <Helmet>
                    <title> Eliminar Cliente - Live Stock Provider </title>
                  </Helmet>
                  <DeleteClient />
                </Route>

                <Route path='/agregar-producto' exact={ true }>
                  <Helmet>
                    <title> Agregar Producto - Live Stock Provider </title>
                  </Helmet>
                  <AddProduct/>
                </Route>

                <Route path='/mis-productos' exact={ true }>
                  <Helmet>
                    <title> Mis productos - Live Stock Provider </title>
                  </Helmet>
                  <ShowProducts/>
                </Route>

                <Route path='/mi-proveedor' exact={ true }>
                  <Helmet>
                    <title> 
                      Mi Proveedor - Live Stock Provider </title>
                  </Helmet>
                  <MyProvider />
                </Route>

                  
                <Route path='/mi-cuenta' exact={ true }>
                  <Helmet>
                    <title> Mi cuenta - Live Stock Provider </title>
                  </Helmet>
                  <MyAccount />
                </Route>

                <Route path='/product/mas-detalles/'>
                  <Helmet>
                    <title> Producto - Mas Detalles - Live Stock Provider </title>
                  </Helmet>
                  <OneProduct/>
                </Route>
              </HeaderProvider>
            </Route>
            <Route>
              <Helmet>
                <title> 
                  Pagina No Encontrada - Live Stock Provider
                </title>
              </Helmet>
              <PageDoesnotExist/>
            </Route>
          </Switch>
        </AuthProvider>
      </Router>
  );
};

export default App;
