import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import "./register.css";

export default class Register extends Component {
  state = {
    errorMesaage: "",
    paswd_reqs: ""
  };

  baseUrl = "https://blooming-stream-45371.herokuapp.com/api/v2/people";

  constructor() {
    super();
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount() {
    this.getPasswordCriteria();
  }

  getPasswordCriteria() {
    fetch(this.baseUrl + "/password_requirements", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(response => {
        return response.json();
      })
      .then(result => {
        let criteria = "";
        for (let [key, value] of Object.entries(result)) {
          criteria += `${key}: ${value}\n`;
        }

        this.setState({
          errorMessage: "",
          paswd_reqs: criteria
        });
      })
      .catch(error => {});
  }

  showPasswordCriteria = () => {};

  setRedirect = () => {
    this.props.history.push("/login");
  };

  togglePassword = () => {
    if (this.refs.pswd.type == "text") {
      this.refs.pswd.type = "password";
    } else {
      this.refs.pswd.type = "text";
    }

    if (this.refs.pswd2.type == "text") {
      this.refs.pswd2.type = "password";
    } else {
      this.refs.pswd2.type = "text";
    }
  };

  handleFormSubmit(event) {
    event.preventDefault();
    let pswd = event.target.pswd.value;
    let pswd2 = event.target.pswd2.value;

    let pattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
    if (pswd.length >= 8 && pattern.test(pswd)) {
      if (pswd != pswd2) {
        this.setState({
          errorMessage: "Password not matching"
        });
      } else {
        var formBody = {
          display_name: event.target.dname.value,
          email: event.target.uname.value,
          password: event.target.pswd.value
        };
        fetch(this.baseUrl + "/create", {
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
              errorMessage: error
            });
          });
      }
    } else {
      this.setState({
        errorMessage: "Invalid Password"
      });
    }
  }

  setUsetState(result) {
    if (result.error_code == 400) {
      this.setState({
        errorMessage: result.message
      });
    } else {
      this.props.history.push("/login");
    }
  }

  render() {
    return (
      <div className="register-container">
        <div className="register-heading-container">
          <span className="register-heading">
            Please tell us a little about you!
          </span>
        </div>
        <div className="register-body-container">
          <form onSubmit={this.handleFormSubmit}>
            <input
              type="text"
              name="dname"
              ref="dn"
              placeholder="Display name"
              required
            />
            <input
              type="text"
              ref="eid"
              name="uname"
              placeholder="Email"
              required
            />
            <input
              type="password"
              ref="pswd"
              name="pswd"
              placeholder="Password"
              required
            />
            <input
              type="password"
              name="pswd2"
              ref="pswd2"
              placeholder="Password Again"
              required
            />
            <div className="show-password-container">
              <div className="toggle-body">
                <input type="checkbox" onClick={this.togglePassword} />
                <label htmlFor="html">Show Password</label>
              </div>
              <div className="forgot-body">
                <span onClick={this.showPasswordCriteria}>
                  <div className="password-criteria-body">
                    {this.state.paswd_reqs}
                  </div>
                  Password Criteria
                </span>
              </div>
            </div>
            <div className="error-message">{this.state.errorMessage}</div>
            <div className="button-container">
              <button className="primary-button">Sign Up</button>
              <a className="link-button" onClick={this.setRedirect}>
                Login
              </a>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
