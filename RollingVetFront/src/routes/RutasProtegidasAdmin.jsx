import React from 'react'
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from '../contexts/AuthProvider';

const RutasProtegidasAdmin = () => {
  
    const {user,authenticated} = useAuth();

    if(authenticated && user.admin==true){
        return (<Outlet/>)
    }
    else{
        return (<Navigate to='/' replace/>)
    }

}

export default RutasProtegidasAdmin