import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route } from "react-router-dom";


const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
    let user = JSON.parse(localStorage.getItem('user'))
  return (
    <Fragment>
     
        <Route
          {...rest}
          render={(props) => {
          
        
            if (isAdmin === true && user.data.user.role !== "Admin") {
              return <Navigate to="/login" />;
            }

            return <Component {...props} />;
          }}
        />
    
    </Fragment>
  );
};

export default ProtectedRoute;