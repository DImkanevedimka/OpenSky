import React, { Component } from "react";
import Modal from "react-modal";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import "./App.css";
import Login from "../Login";
import Dashboard from "../Dashboard";
import { ProctectedRoute } from "../../blocks/ProtectedRoute";

Modal.setAppElement("#root");

class App extends Component {
  state = {
    isLoged: localStorage.getItem("logedIn") === "true" || false
  };

  login = () => {
    localStorage.setItem("logedIn", true);
    this.setState({ isLoged: true });
  };

  render() {
    const { isLoged } = this.state;
    return (
      <Router>
        <ProctectedRoute
          isAuthed={isLoged}
          path="/dashboard"
          component={Dashboard}
        />
        <Route
          path="/login"
          render={props => <Login onLogin={this.login} {...props} />}
        />
        <Redirect to={isLoged ? "/dashboard" : "/login"} />
        <Route />
      </Router>
    );
  }
}

export default App;
