import React from "react";
import { Route, Redirect } from "react-router-dom";

const Private = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem("user") ? (
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

export default Private;
