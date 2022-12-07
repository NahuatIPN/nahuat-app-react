import React, { useContext } from "react";
import { Route, Redirect , Switch} from "react-router-dom";
import { AuthContext } from "../app/services/Auth";


const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const {currentUser} = useContext(AuthContext);
  return (
    <Switch>
      <Route
        {...rest}
        render={routeProps =>
          !!currentUser ? (
            <RouteComponent {...routeProps} />
          ) : (
            <Redirect to={"/nahuat-app-react"} />
          )
        }
      />
    </Switch>
  );
};


export default PrivateRoute