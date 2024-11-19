import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useCurrentUser } from "../contexts/CurrentUserContext";

const ProtectedRoute = ({ children, ...rest }) => {
  const currentUser = useCurrentUser();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        currentUser ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/no-results",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
