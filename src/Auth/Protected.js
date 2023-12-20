import { Navigate } from "react-router-dom";
import { Context } from "./authContext";
import { useContext } from "react";
export function Protected({children}) {
    const{user} = useContext(Context)
if(!user){
    return <Navigate to="/login" replace/>
}
else{
    return children
}
}

