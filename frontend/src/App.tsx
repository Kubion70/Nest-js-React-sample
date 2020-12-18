import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import HomePage from "./pages/Home.page";
import DefaultTemplate from "./templates/Default.template";
import LoginPage from "./pages/Login.page";
import axios from 'axios';
import RegisterPage from "./pages/Register.page";

export default function App() {
    axios.defaults.baseURL = "http://localhost:8080";

  return (
      <Router>
        <Switch>
          <DefaultTemplate>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/signup" component={RegisterPage} />
          </DefaultTemplate>
        </Switch>
      </Router>
  );
}