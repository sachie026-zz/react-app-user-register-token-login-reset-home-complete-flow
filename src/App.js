import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./App.css";

export default class App extends Component {
  state = {
    user: localStorage.getItem("user"),
    token: localStorage.getItem("token"),
    key: localStorage.getItem("key")
  };

  handleChange = event => {
    const input = event.target;
    const value = input.type === "checkbox" ? input.checked : input.value;

    this.setState({ [input.name]: value });
  };

  componentDidMount() {}

  render() {
    if (!this.state.user || !this.state.key) {
      return <Redirect to="/login" />;
    } else {
      if (this.state.key == "admin") {
        return <Redirect to="/admin" />;
      }
      return <Redirect to="/user" />;
    }
  }
}
