import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class MobileNavbar extends Component {
  constructor() {
    super();
    this.state = {
      left: 100,
    };
  }

  openNavbar = () => {
    this.setState({ left: 0 });
  };

  closeNavScreen = () => {
    this.setState({ left: 100 });
  };

  handleClick = (e) => {
    this.setState({
      [e.target.textContent]: true,
      left: 100,
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

  openLogin = () => {
    this.setState({ left: 100 });
    this.props.history.push("/login");
  };

  render() {
    const {
      navClass,
      logo,
      Home,
      TV,
      Movies,
      Search,
      isAuthenticated,
      handleLogout,
    } = this.props;

    return (
      <React.Fragment>
        <nav className={`mobileNavbar ${navClass}`}>
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="Logo" />
          </Link>
          <div className="row mx-0">
            <div className="col-md-12 toggle-btn">
              <Link to="#" className="shadow-none" onClick={this.openNavbar}>
                <i className="fas fa-bars"></i>
              </Link>
            </div>
          </div>
        </nav>
        <div
          className="mobile-nav-screen"
          style={{ left: this.state.left + "%" }}
        >
          <Link
            to="#"
            className="close-nav-screen"
            onClick={this.closeNavScreen}
          >
            <i className="fas fa-times"></i>
          </Link>
          <ul className="navbar-nav">
            <li className="nav-item">
              {isAuthenticated ? (
                <Link to="#" onClick={handleLogout} className="nav-link">
                  Logout
                </Link>
              ) : (
                <Link to="#" className="nav-link" onClick={this.openLogin}>
                  Sign In
                </Link>
              )}
            </li>
            <li className="nav-item">
              <Link
                to="/"
                className={Home ? "nav-link active" : "nav-link"}
                onClick={this.handleClick}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/tv-shows/all"
                className={TV ? "nav-link active" : "nav-link"}
                onClick={this.handleClick}
              >
                TV
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/movies/all"
                className={Movies ? "nav-link active" : "nav-link"}
                onClick={this.handleClick}
              >
                Movies
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/search"
                className={Search ? "nav-link active" : "nav-link"}
                onClick={this.handleClick}
              >
                Search
              </Link>
            </li>
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(MobileNavbar);
