import React from 'react'
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from '../contexts/AuthProvider';


export const RutasProtegidasUser = () => {
  
    const {user,authenticated} = useAuth()
    if(!authenticated){
        return (<Outlet/>)
    } 
    else{
        return (<Navigate to="/" replace />)
    }

}
