import React, { Component } from "react";
import { Circle } from "react-preloaders";
import { withRouter } from "react-router-dom";
import Hero from "../common/hero";
import Categories from "../common/categories";

class AllTVShows extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      tvShows: [
        "Lucifer",
        "Game of Thrones",
        "Asur",
        "Betaal",
        "Breathe: Into the Shadows",
        "Tom Clancy's  Jack Ryan",
      ],
      apiEndPoints: [
        {
          url:
            "https://api.themoviedb.org/3/tv/popular?api_key=97ea65d391f5cf300357025dff2916b8&language=en-US&page=5",
          category: "Trending TV Series",
          option: "tv",
        },
        {
          url:
            "https://api.themoviedb.org/3/tv/popular?api_key=97ea65d391f5cf300357025dff2916b8&language=en-US&page=3",
          category: "TV Series You Might Like",
          option: "tv",
        },
        {
          url:
            "https://api.themoviedb.org/3/tv/popular?api_key=97ea65d391f5cf300357025dff2916b8&language=en-US&page=2",
          category: "Popular TV Series",
          option: "tv",
        },
        {
          url:
            "https://api.themoviedb.org/3/tv/top_rated?api_key=97ea65d391f5cf300357025dff2916b8&language=en-US&page=1",
          category: "Top Rated Series",
          option: "tv",
        },
        {
          url:
            "https://api.themoviedb.org/3/tv/73375/similar?api_key=97ea65d391f5cf300357025dff2916b8&language=en-US&page=1",
          category: "Non Stop Action",
          option: "tv",
        },
        {
          url:
            "https://api.themoviedb.org/3/tv/72844/similar?api_key=97ea65d391f5cf300357025dff2916b8&language=en-US&page=1",
          category: "Horror TV Series",
          option: "tv",
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
        <Hero tvShows={this.state.tvShows} option="tv" />
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

export default withRouter(AllTVShows);
