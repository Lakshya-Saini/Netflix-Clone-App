import React, { Component } from "react";
import { Link } from "react-router-dom";

class DesktopNavbar extends Component {
  render() {
    const {
      navClass,
      logo,
      Home,
      TV,
      Movies,
      Search,
      isAuthenticated,
      handleClick,
      handleLogout,
    } = this.props;

    return (
      <React.Fragment>
        <nav className={`desktopNavbar ${navClass}`}>
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="Logo" />
          </Link>
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link
                to="/"
                className={Home ? "nav-link active" : "nav-link"}
                onClick={handleClick}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/tv-shows/all"
                className={TV ? "nav-link active" : "nav-link"}
                onClick={handleClick}
              >
                TV
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/movies/all"
                className={Movies ? "nav-link active" : "nav-link"}
                onClick={handleClick}
              >
                Movies
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/search"
                className={Search ? "nav-link active" : "nav-link"}
                onClick={handleClick}
              >
                Search
              </Link>
            </li>
          </ul>
          <div className="row mx-0">
            <div className="col-md-12 signin">
              {isAuthenticated ? (
                <Link to="#" onClick={handleLogout}>
                  Logout
                </Link>
              ) : (
                <Link to="/login">Sign In</Link>
              )}
            </div>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}
export default DesktopNavbar;
