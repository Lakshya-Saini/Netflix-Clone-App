import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Hero extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      rating: 0,
      releaseYear: 1900,
      name: "",
      overview: "",
      posterLink: "",
      videoLink: "",
      list: [],
      option: "",
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { tvShows, movies, option } = props;

    if (tvShows) {
      state.list = tvShows;
      state.option = option;
    }

    if (movies) {
      state.list = movies;
      state.option = option;
    }
    return null;
  }

  componentDidMount() {
    const show = this.state.list[
      Math.floor(Math.random() * this.state.list.length)
    ];

    const apiEndPoint1 = `https://api.themoviedb.org/3/search/${this.state.option}?api_key=97ea65d391f5cf300357025dff2916b8&language=en-US&page=1&include_adult=true&query=${show}`;

    let requestOne = axios.get(apiEndPoint1);

    axios
      .all([requestOne])
      .then(
        axios.spread((...responses) => {
          const response1 = responses[0];

          const {
            id,
            vote_average,
            overview,
            backdrop_path,
          } = response1.data.results[0];

          if (this.state.option === "tv") {
            const { name, first_air_date } = response1.data.results[0];
            const year = first_air_date.substring(0, 4);

            this.setState({ name: name, releaseYear: year });
          } else {
            const { title, release_date } = response1.data.results[0];
            const year = release_date.substring(0, 4);

            this.setState({ name: title, releaseYear: year });
          }

          this.setState({
            id: id,
            rating: vote_average,
            overview: overview,
            posterLink: backdrop_path,
          });
        })
      )
      .catch((err) => console.log(err));
  }

  render() {
    let image;
    if (this.state.posterLink) {
      image = `https://image.tmdb.org/t/p/w500/${this.state.posterLink}`;
    }

    return (
      <div
        id="heroSection"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url(${image})`,
        }}
      >
        <div id="heroSectionText">
          <ul>
            <li>
              <i className="fas fa-star"></i> {this.state.rating}
            </li>
            <li>{this.state.releaseYear}</li>
          </ul>
          <h2>{this.state.name}</h2>
          <p>{this.state.overview}</p>
          <Link
            to={`/${this.state.option}/${this.state.id}`}
            className="see-details-btn"
          >
            <i className="fas fa-play"></i> See Details
          </Link>
          {/* <Link
            to="#"
            className="add-to-playlist-btn"
            onClick={this.handleWatchlist}
          >
            <i className="fas fa-plus"></i> Add to Watchlist
          </Link> */}
        </div>
      </div>
    );
  }
}

export default Hero;
