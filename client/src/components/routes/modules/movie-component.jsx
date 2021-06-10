import React, { Component } from "react";

class MovieComponent extends Component {
  handleClick = () => {
    if (this.props.id) {
      this.props.history.push(`/${this.props.isMovieOrTV}/${this.props.id}`);
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="movie" onClick={this.handleClick}>
          <img src={this.props.image} alt="img" />
          <h6>{this.props.title}</h6>
          <ul>
            <li>{this.props.release_date}</li>
            <li>
              <i className="fas fa-star"></i> {this.props.rating}
            </li>
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

export default MovieComponent;
