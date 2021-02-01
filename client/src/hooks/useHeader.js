import { useContext } from "react";
import { HeaderContext } from "../Providers/HeaderProvider";

const useHeader = () => useContext( HeaderContext );

export default useHeader;