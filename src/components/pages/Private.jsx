import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../../App";

const Private = ({ children, ...rest }) => {
  const { isSignedIn } =  useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return (
          isSignedIn ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        )
      }
      }
    />
  );
}

export default Private;
