import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class Movie extends Component {
  handleClick = (e) => {
    this.props.history.push(`/${this.props.isMovieOrTV}/${this.props.id}`);
  };

  render() {
    const { image, name, year, rating } = this.props;

    return (
      <Link to="#" onClick={this.handleClick}>
        <div className="movie">
          <img src={image} alt="img" />
          <h6>{name}</h6>
          <ul>
            <li>{year}</li>
            <li>
              <i className="fas fa-star"></i> {rating}
            </li>
          </ul>
        </div>
      </Link>
    );
  }
}

export default withRouter(Movie);
