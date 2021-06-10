import React, { Component } from "react";
import { Circle } from "react-preloaders";
import { withRouter } from "react-router-dom";
import Hero from "../common/hero";
import Categories from "../common/categories";

class AllMovies extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      movies: [
        "Avengers: EndGame",
        "6 Underground",
        "Extraction",
        "Jumanji: The Next Level",
        "Jack Ryan: Shadow Recruit",
        "Life",
      ],
      apiEndPoints: [
        {
          url:
            "https://api.themoviedb.org/3/movie/top_rated?api_key=97ea65d391f5cf300357025dff2916b8&language=en-US&page=1",
          category: "Top Rated",
          option: "movie",
        },
        {
          url:
            "https://api.themoviedb.org/3/movie/upcoming?api_key=97ea65d391f5cf300357025dff2916b8&language=en-US&page=1",
          category: "Upcoming",
          option: "movie",
        },
        {
          url:
            "https://api.themoviedb.org/3/movie/19995/similar?api_key=97ea65d391f5cf300357025dff2916b8&language=en-US&page=1",
          category: "Sci-Fi",
          option: "movie",
        },
        {
          url:
            "https://api.themoviedb.org/3/movie/539537/similar?api_key=97ea65d391f5cf300357025dff2916b8&language=en-US&page=1",
          category: "Thriller",
          option: "movie",
        },
        {
          url:
            "https://api.themoviedb.org/3/movie/299534/similar?api_key=97ea65d391f5cf300357025dff2916b8&language=en-US&page=1",
          category: "Non Stop Action",
          option: "movie",
        },
        {
          url:
            "https://api.themoviedb.org/3/movie/138843/similar?api_key=97ea65d391f5cf300357025dff2916b8&language=en-US&page=1",
          category: "Horror",
          option: "movie",
        },
      ],
    };
  }

  componentDidMount() {
    this.setState({ isLoading: false });
  }

  render() {
    return (
      <React.Fragment>
        <Hero movies={this.state.movies} option="movie" />
        {this.state.apiEndPoints.map((api) => (
          <Categories
            key={api.category}
            apiEndPoint={api.url}
            categoryName={api.category}
            option={api.option}
          />
        ))}
        <Circle color={"#e50914"} customLoading={this.state.isLoading} />
      </React.Fragment>
    );
  }
}

export default withRouter(AllMovies);
