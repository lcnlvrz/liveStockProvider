import { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../components/Home/Panel/Header";
export const HeaderContext = createContext();

export default function HeaderProvider ( props ){

    const { children } = props;

    const provider = useSelector(state => state.provider);
    const client = useSelector(state => state.client);
    const currentProduct = useSelector(state => state.currentProduct);

    const [currentUser, setCurrentUser] = useState( { name:'', profilePhoto:'' } );

    useEffect(() => {

        if ( provider.providerID && !client.clientID && !provider.isLoading && !client.isLoading ) {
      
            setCurrentUser( { name:provider.provider, profilePhoto:provider.profilePhoto } );
      
        } else if ( !provider.providerID && client.clientID && !provider.isLoading && !client.isLoading  ) {
      
            setCurrentUser( { name:client.username, profilePhoto:client.profilePhoto  } );
            
        };
        
      }, [ provider, client ]);

    if ( provider.isLoading || client.isLoading ) return null;

    return <HeaderContext.Provider value={ currentUser }>
        <Header/>
        { children }
    </HeaderContext.Provider>


};
