import { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getProviderInfo } from "../api/providerInfo";
import ClipLoader from "react-spinners/ClipLoader";
import { centerVertically } from "../constant";
import { getIsForgotPassword, getIsMercadoPagoLink, getIsSignInFromURL, getIsValidatePayment, getProductIDfromURL } from "../helpers/getFromURL";
import { getInfoClient } from "../api/clientInfo";
import { setCurrentProductInvalid } from "../actions/currentProduct";

export const AuthContext = createContext();

export default function AuthProvider( props ){

    const history = useHistory();

    const dispatch = useDispatch();

    const { children } = props; 

    const { isLoading:isLoadingClient, clientID } = useSelector(state => state.client);

    const { isLoading, provider } = useSelector(state => state.provider);

    const [user, setUser] = useState({

        provider:null,
        isLoading:true

    });

    useEffect(() => {

        const isSignIn = getIsSignInFromURL();

        const siteID = getIsMercadoPagoLink();

        const token = localStorage.getItem( 'token' );

        const isForgotPassword = getIsForgotPassword();

        const isValidateMembership = getIsValidatePayment()

        if ( ( isSignIn === 'sign_in' || siteID === 'MLA' || isValidateMembership || isForgotPassword ) && !token ) {

            setUser( { provider:false, isLoading:false } );
            return false;

        };
        
        if ( !isLoading && !provider && !isLoadingClient && !clientID ) {
            
            history.push( '/' );
            setUser( { provider:false, isLoading:false } );

        } else if( provider !== '' ) {

            setUser( { provider:true, isLoading:false } );
        
        };

    }, [ isLoading, dispatch, provider, history, isLoadingClient, clientID ]);

    const isViewingOneProduct = getProductIDfromURL();


    useEffect(() => {

        if ( !isViewingOneProduct ) dispatch( setCurrentProductInvalid() );

        getProviderInfo( dispatch );
        getInfoClient( dispatch );
        
    }, [ dispatch, isViewingOneProduct ]);

    
  const providerCompleteObj = useSelector(state => state.provider);
  const client = useSelector(state => state.client);
  const [lastProducts, setLastProducts] = useState( [] );

  useEffect(() => {

    if ( providerCompleteObj.providerID && !client.clientID && !providerCompleteObj.isLoading && !client.isLoading ) {

        setLastProducts( providerCompleteObj.products );

    } else if ( !providerCompleteObj.providerID && client.clientID && !providerCompleteObj.isLoading && !client.isLoading  ) {

        setLastProducts( client.providerID.products );
        
    };
    
}, [ providerCompleteObj, client ]);
    
    if ( isLoading || user.isLoading || isLoadingClient ) return (

        <div className={ centerVertically }>
            <ClipLoader/> 
        </div>

    );

    const values = { user, lastProducts };

    return <AuthContext.Provider value={ values }> { children } </AuthContext.Provider>

};


