import React, { Component } from "react";
import { Circle } from "react-preloaders";
import { Link } from "react-router-dom";
import isEmpty from "is-empty";
import axios from "axios";
import Input from "../modules/input";
import Button from "../modules/button";
import ErrorMessage from "../modules/error-message";
import setAuthToken from "../../utils/setAuthToken";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      phoneNumber: "",
      password: "",
      isLoading: true,
      errors: {
        phoneNumberError: "",
        passwordError: "",
        invalidUserError: "",
      },
    };
  }

  componentDidMount() {
    this.setState({ isLoading: false });

    if (localStorage.getItem("jwtToken")) {
      this.props.history.push("/");
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { phoneNumber, password } = this.state;

    const errors = {
      phoneNumberError: "",
      passwordError: "",
      invalidUserError: "",
    };

    if (isEmpty(phoneNumber)) {
      errors.phoneNumberError = "Phone Number is required";
      this.setState({ errors });
      return;
    }

    if (!isEmpty(phoneNumber) && phoneNumber.length !== 10) {
      errors.phoneNumberError = "Phone Number is invalid";
      this.setState({ errors });
      return;
    }

    if (isEmpty(password)) {
      errors.passwordError = "Password is required";
      this.setState({ errors });
      return;
    }

    const usersData = { phoneNumber, password };

    // Send Data to Backend
    axios
      .post("/api/users/signin", usersData)
      .then((res) => {
        if (res.data.incorrectPhoneNumber) {
          errors.invalidUserError = res.data.incorrectPhoneNumber;
          this.setState({ errors });
          return;
        }

        if (res.data.incorrectPassword) {
          errors.invalidUserError = res.data.incorrectPassword;
          this.setState({ errors });
          return;
        }

        const { token } = res.data;

        localStorage.setItem("jwtToken", token);
        setAuthToken(token);

        window.location.href = "/";
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { phoneNumber, password } = this.state;

    return (
      <React.Fragment>
        <div className="row mx-0">
          <div className="col-md-12 px-0">
            <div className="login">
              <div className="login-form">
                <h5>Sign In</h5>
                <ErrorMessage message={this.state.errors.invalidUserError} />
                <form onSubmit={this.handleSubmit}>
                  <Input
                    type="number"
                    id="phoneNumber"
                    placeholder="Phone Number"
                    handleChange={this.handleChange}
                    query={phoneNumber}
                    icon="fa-phone"
                  />
                  <ErrorMessage message={this.state.errors.phoneNumberError} />
                  <Input
                    type="password"
                    id="password"
                    placeholder="Password"
                    handleChange={this.handleChange}
                    query={password}
                    icon="fa-key"
                  />
                  <ErrorMessage message={this.state.errors.passwordError} />
                  <Button type="submit" id="login-btn" value="Sign In" />
                  <Link to="/" className="forgot-password-link">
                    Forgot Password
                  </Link>
                  <Link to="/signup" className="signup-link">
                    New to Netflix? Signup Now
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
        <Circle color={"#e50914"} customLoading={this.state.isLoading} />
      </React.Fragment>
    );
  }
}

export default Login;
