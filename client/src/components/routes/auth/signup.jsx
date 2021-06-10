import React, { Component } from "react";
import { Circle } from "react-preloaders";
import { Link } from "react-router-dom";
import axios from "axios";
import isEmpty from "is-empty";
import Input from "../modules/input";
import Button from "../modules/button";
import ErrorMessage from "../modules/error-message";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      fullName: "",
      phoneNumber: "",
      password: "",
      isLoading: true,
      errors: {
        fullNameError: "",
        phoneNumberError: "",
        passwordError: "",
        userExistsError: "",
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

    const { fullName, phoneNumber, password } = this.state;

    const errors = {
      fullNameError: "",
      phoneNumberError: "",
      passwordError: "",
      userExistsError: "",
    };

    if (isEmpty(fullName)) {
      errors.fullNameError = "Full Name is required";
      this.setState({ errors });
      return;
    }

    if (!isEmpty(fullName) && fullName.length < 3) {
      errors.fullNameError = "Full Name must be atleast 3 characters";
      this.setState({ errors });
      return;
    }

    if (isEmpty(phoneNumber)) {
      errors.phoneNumberError = "Phone Number is required";
      this.setState({ errors });
      return;
    }

    if (!isEmpty(phoneNumber) && phoneNumber.length !== 10) {
      errors.phoneNumberError = "Invalid Phone Number";
      this.setState({ errors });
      return;
    }

    if (isEmpty(password)) {
      errors.passwordError = "Password is required";
      this.setState({ errors });
      return;
    }

    if (!isEmpty(password) && password.length !== 8) {
      errors.passwordError = "Password must be atleast 8 characters";
      this.setState({ errors });
      return;
    }

    const usersData = { fullName, phoneNumber, password };

    // Send Data to Backend
    axios
      .post("/api/users/signup", usersData)
      .then((res) => {
        if (res.data.userExists) {
          errors.userExistsError = res.data.userExists;
          this.setState({ errors });
          return;
        } else {
          this.props.history.push("/login");
        }
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { fullName, phoneNumber, password } = this.state;

    return (
      <React.Fragment>
        <div className="row mx-0">
          <div className="col-md-12 px-0">
            <div className="signup">
              <div className="signup-form">
                <h5>Sign Up</h5>
                <ErrorMessage message={this.state.errors.userExistsError} />
                <form onSubmit={this.handleSubmit}>
                  <Input
                    type="text"
                    id="fullName"
                    placeholder="Full Name"
                    handleChange={this.handleChange}
                    query={fullName}
                    icon="fa-user"
                  />
                  <ErrorMessage message={this.state.errors.fullNameError} />
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
                  <Button type="submit" id="signup-btn" value="Sign Up" />
                  <Link to="/login" className="login-link">
                    Already have account? Sign In
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

export default Signup;
