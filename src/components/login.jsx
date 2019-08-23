import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import "./login.css";

export default class Login extends Component {
  state = {
    errorMesaage: "",
    resetMessage: ""
  };

  baseUrl = "https://blooming-stream-45371.herokuapp.com/api/v2/people";

  constructor() {
    super();
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.errorMessage = "";
  }

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.props.history.push("/user");
    }
  }

  setRedirect = () => {
    this.props.history.push("/register");
  };

  togglePassword = () => {
    if (this.refs.pswd.type == "text") {
      this.refs.pswd.type = "password";
    } else {
      this.refs.pswd.type = "text";
    }
  };

  forgotPassword = event => {
    let uname = this.refs.eid.value;
    if (uname == "" || uname == null || uname == undefined) {
      this.setState({
        errorMessage: "Please provide your email address"
      });
    } else {
      var formBody = {
        email: this.refs.eid.value
      };
      fetch(this.baseUrl + "/reset_password", {
        method: "POST",
        body: JSON.stringify(formBody),
        headers: new Headers({
          "Content-Type": "application/json"
        })
      })
        .then(response => {
          return response.json();
        })
        .then(result => this.onResetPassword(result))
        .catch(error => {
          this.setState({
            errorMessage: error,
            resetMessage: ""
          });
        });
    }
  };

  onResetPassword(result) {
    if (result.error_code == 400) {
      this.setState({
        errorMessage: result.message,
        resetMessage: ""
      });
    } else {
      this.setState({
        errorMessage: "",
        resetMessage: result.message
      });
    }
  }

  handleFormSubmit(event) {
    event.preventDefault();
    var formBody = {
      email: event.target.uname.value,
      password: event.target.pswd.value
    };
    fetch(this.baseUrl + "/authenticate", {
      method: "POST",
      body: JSON.stringify(formBody),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(response => {
        return response.json();
      })
      .then(result => this.setUsetState(result))
      .catch(error => {
        this.setState({
          errorMessage: error,
          resetMessage: ""
        });
      });
  }

  setUsetState(result) {
    if (result.error_code == 400) {
      this.setState({
        errorMessage: result.message,
        resetMessage: ""
      });
    } else {
      localStorage.setItem("token", result.authentication_token);
      localStorage.setItem("user", result.person.display_name);
      localStorage.setItem("key", result.person.role.key);
      if (result.person.role.key == "admin") {
        this.props.history.push("/admin");
      } else {
        this.props.history.push("/user");
      }
    }
  }

  render() {
    return (
      <div className="login-container">
        <div className="login-heading-container">
          <div className="login-heading">Welcome!</div>
          <div className="login-heading">Please login to continue.</div>
        </div>
        <div className="login-body-container">
          <form onSubmit={this.handleFormSubmit}>
            <input
              type="text"
              ref="eid"
              name="uname"
              placeholder="Email"
              required
            />
            <input
              type="password"
              name="pswd"
              ref="pswd"
              placeholder="Password"
              required
            />
            <div className="show-password-container">
              <div className="toggle-body">
                <input type="checkbox" onClick={this.togglePassword} />
                <label htmlFor="html">Show Password</label>
              </div>
              <div className="forgot-body">
                <span onClick={this.forgotPassword}>Forgot Password?</span>
              </div>
            </div>
            <div className="error-message">{this.state.errorMessage}</div>
            <div className="reset-message">{this.state.resetMessage}</div>
            <div className="button-container">
              <button className="primary-button">Login</button>
              <a className="link-button" onClick={this.setRedirect}>
                Sign up
              </a>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
