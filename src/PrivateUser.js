import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateUser = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem("id") ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export default PrivateUser;
