import React, { Component } from "react";
import MovieSlider from "../common/movie-slider";

class DetailsRelated extends Component {
  constructor() {
    super();
    this.state = {
      option: "",
      related: [],
    };
  }

  static getDerivedStateFromProps(props, state) {
    state.option = props.option;
    state.related = props.related;
    return null;
  }

  render() {
    return (
      <div className="row mx-0">
        <div className="col-md-12 px-0">
          <div className="details-related-tv-shows-or-movies">
            <h5>
              Related {this.state.option === "tv" ? "TV Shows" : "Movies"}
            </h5>
            {this.state.option === "tv" ? (
              <MovieSlider
                relatedTVShow={this.state.related}
                isMovieOrTV={this.state.option}
              />
            ) : (
              <MovieSlider
                relatedMovie={this.state.related}
                isMovieOrTV={this.state.option}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default DetailsRelated;
