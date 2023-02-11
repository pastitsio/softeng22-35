
import React, { Component } from "react";

const users = [
  { username: "user1", password: "pass1" },
  { username: "user2", password: "pass2" },
  { username: "user3", password: "pass3" }
];

function authenticate(username, password) {
  for (let user of users) {
    if (user.username === username && user.password === password) {
      return true;
    }
  }
  return false;
}

class Login extends Component {
  state = {
    username: "",
    password: "",
    error: "",
    loggedIn: false
  };

  handleSubmit = event => {
    event.preventDefault();
    if (authenticate(this.state.username, this.state.password)) {
      this.setState({
        loggedIn: true
      });
    } else {
      this.setState({
        error: "Login failed. Incorrect username or password."
      });
    }
  };

  handleUsernameChange = event => {
    this.setState({
      username: event.target.value
    });
  };

  handlePasswordChange = event => {
    this.setState({
      password: event.target.value
    });
  };

  render() {
    if (this.state.loggedIn) {
      return <h1>Welcome!</h1>;
    }
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={this.state.username}
            onChange={this.handleUsernameChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={this.state.password}
            onChange={this.handlePasswordChange}
          />
        </div>
        <button type="submit">Login</button>
        {this.state.error && <div>{this.state.error}</div>}
      </form>
    );
  }
}

export default Login;
