import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentCooker, logoutCooker } from "./actions/authActions";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import AtelierAll from "./components/atelier/AtelierAll";
import Register from "./components/Register";
import Login from "./components/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import AtelierAdd from "./components/dashboard/AtelierAdd";
import AtelierCuisinier from "./components/dashboard/AtelierCuisinier";
import AtelierEdit from "./components/dashboard/AtelierEdit";
import AtelierInscrive from "./components/atelier/AtelierInscrive";


// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentCooker(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutCooker());

    // Redirect to login
    window.location.href = "./login";
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Navbar />
            <div className="container-fluid">
                <Route exact path="/" component={Home} />
                <Route exact path="/ateliers" component={AtelierAll} />
                <Route
                  exact
                  path="/inscription/:atelierId"
                  component={AtelierInscrive}
                />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Switch>
                  <PrivateRoute exact path="/dashboard" component={Dashboard} />
                  <Switch>
                    <PrivateRoute
                      exact
                      path="/ajout-atelier/:cookerId"
                      component={AtelierAdd}
                    />
                    <PrivateRoute
                      exact
                      path="/mes-ateliers/:cookerId"
                      component={AtelierCuisinier}
                    />
                    <PrivateRoute
                      Route
                      path="/modifier-atelier/:atelierId"
                      exact
                      component={AtelierEdit}
                    />
                  </Switch>
                </Switch>
              </div>
            <Footer />
            </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
