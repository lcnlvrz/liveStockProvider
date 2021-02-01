import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";

const useAuth = () => useContext( AuthContext );

export default useAuth;