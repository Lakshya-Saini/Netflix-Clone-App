import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Navbar from "./components/common/navbar/navbar";
import LandingPage from "./components/routes/landing-page";
import AllTVShows from "./components/routes/all-tv-shows";
import AllMovies from "./components/routes/all-movies";
import Search from "./components/routes/search";
import Details from "./components/details/details";
import VideoPlayer from "./components/common/video-player";
import Login from "./components/routes/auth/login";
import Signup from "./components/routes/auth/signup";
import PrivateRoute from "./components/private-route/PrivateRoute";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isAuthenticated: false,
    };
  }

  componentDidMount() {
    if (localStorage.getItem("jwtToken")) {
      const token = localStorage.getItem("jwtToken");
      const decoded = jwt_decode(token);

      axios
        .get(`/api/users/user/${decoded.id}`)
        .then((res) => {
          if (res.data.unauthorisedUser) {
            localStorage.removeItem("jwtToken");
            window.location.href = "/login";
          }
          if (res.data.user) {
            this.setState({ isAuthenticated: true });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <div className="container-fluid px-0">
            <div className="row mx-0">
              <div className="col-md-12 px-0">
                <Navbar />
                <Switch>
                  <Route exact path="/signup" component={Signup}></Route>
                  <Route exact path="/login" component={Login}></Route>
                  <Route exact path="/" component={LandingPage}></Route>
                  <Route
                    exact
                    path="/tv-shows/all"
                    component={AllTVShows}
                  ></Route>
                  <Route
                    exact
                    path="/movies/all"
                    component={AllMovies}
                    auth={this.state.isAuthenticated}
                  ></Route>
                  <Route
                    exact
                    path="/search"
                    component={Search}
                    auth={this.state.isAuthenticated}
                  ></Route>
                  <PrivateRoute
                    exact
                    path="/:option/:id"
                    component={Details}
                    auth={this.state.isAuthenticated}
                  />
                  <PrivateRoute
                    exact
                    path="/watch/:id/video"
                    component={VideoPlayer}
                    auth={this.state.isAuthenticated}
                  />
                  <Route exact path="/" component={LandingPage} />
                  <Redirect to="/" />
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
