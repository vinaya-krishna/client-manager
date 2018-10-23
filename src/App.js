import React, { Component } from "react";
import "./App.css";

import { UserIsAuthenticated, UserIsNotAuthenticated } from "./Others/auth";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Dashboard from "./components/layout/Dashboard";
import Navbar from "./components/layout/Navbar";
import PageNotFound from "./components/layout/PageNotFound";
import AddClient from "./components/clients/AddClient";
import EditClient from "./components/clients/EditClient";
import Detail from "./components/clients/ClientDetail";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Settings from "./components/settings/Settings";

import { Provider } from "react-redux";
import store from "./store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Navbar />
            <div className="container">
              <Switch>
                <Route
                  exact
                  path="/login"
                  component={UserIsNotAuthenticated(Login)}
                />
                <Route
                  exact
                  path="/register"
                  component={UserIsNotAuthenticated(Register)}
                />
                <Route
                  exact
                  path="/"
                  component={UserIsAuthenticated(Dashboard)}
                />
                <Route
                  exact
                  path="/client/add"
                  component={UserIsAuthenticated(AddClient)}
                />
                <Route
                  exact
                  path="/client/edit/:id"
                  component={UserIsAuthenticated(EditClient)}
                />
                <Route
                  exact
                  path="/settings"
                  component={UserIsAuthenticated(Settings)}
                />
                <Route exact path="/client/:id" component={Detail} />
                <Route component={PageNotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
