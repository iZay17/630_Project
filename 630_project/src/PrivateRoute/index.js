import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute =  ({ children }) => {
        return localStorage.getItem("email") ? children : <Navigate to="/Login"/> ;
};

export default PrivateRoute;