import { Navigate } from "react-router-dom";
import React, {Component} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";

export const withAuthRedirect = (Component: () => JSX.Element) => {
   return (props:any) => {
       const { isAuthorized } = useSelector((store:RootState)=> store.auth);
        if (!isAuthorized) {
            return <Navigate to='/login' />
        }
        return <Component {...props}/>
    }
}
