import React, { Component } from "react";
import setAuthToken from "../../utils/setAuthToken";
import DesktopNavbar from "./desktop-navbar";
import MobileNavbar from "./mobile-navbar";

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      Home: false,
      TV: false,
      Movies: false,
      Search: false,
      scroll: false,
      isAuthenticated: false,
      screen: "",
    };
  }

  handleClick = (e) => {
    this.setState({
      [e.target.textContent]: true,
    });

    Array.from(e.target.parentElement.parentElement.children).forEach(
      (element) => {
        const child = element.children[0].textContent;

        if (child !== e.target.textContent) {
          this.setState({ [child]: false });
        }
      }
    );
  };

  componentDidMount() {
    document.addEventListener("scroll", (e) => {
      if (window.pageYOffset !== 0) {
        this.setState({ scroll: true });
      } else {
        this.setState({ scroll: false });
      }
    });

    window.addEventListener("resize", (e) => {
      if (window.innerWidth <= 1000) {
        const screen = "mobile";
        this.setState({ screen });
      } else {
        const screen = "desktop";
        this.setState({ screen });
      }
    });

    if (localStorage.getItem("jwtToken")) {
      this.setState({ isAuthenticated: true });
    }

    if (window.innerWidth <= 1000) {
      const screen = "mobile";
      this.setState({ screen });
    } else {
      const screen = "desktop";
      this.setState({ screen });
    }
  }

  handleLogout = (e) => {
    localStorage.removeItem("jwtToken");
    setAuthToken(false);

    window.location.href = "/login";
  };

  render() {
    const {
      scroll,
      screen,
      Home,
      TV,
      Movies,
      Search,
      isAuthenticated,
    } = this.state;

    const navClass = scroll
      ? `navbar navbar-expand-lg fixed-top scroll`
      : `navbar navbar-expand-lg fixed-top`;

    return (
      <React.Fragment>
        {screen === "desktop" ? (
          <DesktopNavbar
            navClass={navClass}
            logo="/img/Netflix-Logo.png"
            Home={Home}
            TV={TV}
            Movies={Movies}
            Search={Search}
            isAuthenticated={isAuthenticated}
            handleClick={this.handleClick}
            handleLogout={this.handleLogout}
          />
        ) : (
          <MobileNavbar
            navClass={navClass}
            logo="/img/Netflix-Logo.png"
            Home={Home}
            TV={TV}
            Movies={Movies}
            Search={Search}
            isAuthenticated={isAuthenticated}
            handleLogout={this.handleLogout}
          />
        )}
      </React.Fragment>
    );
  }
}

export default Navbar;
