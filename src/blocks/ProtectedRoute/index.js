import React from "react";
import { Route, Redirect } from "react-router-dom";

export const ProctectedRoute = ({
  component: Component,
  isAuthed,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthed ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};
