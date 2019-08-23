import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Home from "./components/home";
import Register from "./components/register";
import Login from "./components/login";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";

const routing = (
  <Router>
    <div className="page-container">
      <Route exact path="/" component={App} />
      <Route
        exact
        path="/admin"
        component={() => <Home isAdmin={true} />}
        type="admin"
      />
      <Route
        exact
        path="/user"
        component={() => <Home isAdmin={false} />}
        type="user"
      />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
