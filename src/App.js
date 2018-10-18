import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <div className="container">
            <h1>Hello</h1>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
