import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom";
// import { withRouter } from "react-router-dom";
import "./home.css";

class Home extends Component {
  baseUrl = "https://blooming-stream-45371.herokuapp.com/api/v2/people";

  token = localStorage.getItem("token");
  state = {
    userDetails: "",
    user: "",
    showDN: false
  };

  constructor(props) {
    super(props);
    this.userLogout = this.userLogout.bind(this);
    this.DN = this.props.isAdmin ? "Admin Page" : "User Page";
  }

  componentDidMount() {
    this.fetchUserDetails();
  }

  forgotPassword = event => {
    let uname = this.state.userDetails.email;
    if (uname == "" || uname == null || uname == undefined) {
      this.setState({
        errorMessage: "Please provide your email address"
      });
    } else {
      var formBody = {
        email: this.state.userDetails.email
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
      alert(result.message);
    } else {
      alert(result.message);
    }
  }

  fetchUserDetails() {
    fetch(this.baseUrl + "/me", {
      method: "GET",
      headers: new Headers({
        Authorization: this.token,
        "Content-Type": "application/json"
      })
    })
      .then(response => {
        return response.json();
      })
      .then(result => {
        this.setUsetState(result);
      })
      .catch(error => {
        this.props.history.push("/login");
      });
  }

  setUsetState(result) {
    if (result.error_code == 400) {
    } else {
      this.setState({
        userDetails: result,
        user: result.role.key
      });
    }
  }

  toggleDN = () => {
    this.setState({
      showDN: !this.state.showDN
    });
  };

  userLogout = () => {
    localStorage.clear();
    this.props.history.push("/login");
  };

  getAccountAge(dt) {
    const date1 = new Date(dt);
    const date2 = new Date();
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays + " Days";
  }

  getLastUpdated(dt) {
    let d = new Date(dt);
    return d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
  }

  getDN(str) {
    console.log("str", str);
    if (str) return str.toUpperCase().slice(0, 2);
    else return "";
  }

  render() {
    return (
      <section className="home-container">
        <div className="home-heading">{this.state.user.toUpperCase()}</div>
        <div
          onClick={this.toggleDN}
          className={"dn-collapsed " + (this.state.showDN ? "dn-hidden" : "")}
        >
          {this.getDN(this.state.userDetails.display_name)}
        </div>
        <div
          className={"dn-expanded " + (this.state.showDN ? "" : "dn-hidden")}
        >
          <div className="hide-dn" onClick={this.toggleDN}>
            Close
          </div>
          <div className="user-display-name">
            {this.state.userDetails.display_name}
          </div>
          <div className="user-email">{this.state.userDetails.email}</div>
          <div className="user-account-age">
            <div className="label">Account Age:</div>
            <div className="value">
              {this.getAccountAge(this.state.userDetails.created_at)}
            </div>
          </div>
          <div className="user-security">
            <div className="heading">Security</div>
            <div className="security-container">
              <div className="last-updated">Last Updated:</div>
              <div className="value">
                {this.getLastUpdated(this.state.userDetails.updated_at)}
              </div>
            </div>
          </div>
          <div className="user-reset-password" onClick={this.forgotPassword}>
            Reset Password
          </div>
          <div className="user-logout" onClick={this.userLogout}>
            Logout
          </div>
        </div>
      </section>
    );
  }
}

export default withRouter(Home);
