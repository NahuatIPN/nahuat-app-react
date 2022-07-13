import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthProvider } from "../app/services/Auth";
import PrivateRoute from "./PrivateRoute";
import { privatePageList, publicPageList } from "./Pages";


const Routing = () => {
  return (
    <AuthProvider>
      <Router>
          {/* Solo routes autorizados */}
          {privatePageList.map((prop, key)=>{
            return <PrivateRoute exact path={prop.path} key={key} component={prop.component} />
          })}
          {/* Solo routes autorizados */}
          
          {/* Solo routes publicas */}
          {publicPageList.map((prop, key)=>{
            return  <Route exact path={prop.path} key={key} component={prop.component} />
          })}
          {/* Solo routes publicas */}
      </Router>
    </AuthProvider>
  );
};

export default Routing;
