import React, { Component } from "react";
import { Circle } from "react-preloaders";
import Hero from "../common/hero";
import Categories from "../common/categories";

class LandingPage extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      tvShows: [
        "Lost In Space",
        "The Witcher",
        "Lucifer",
        "Game of Thrones",
        "Stranger Things",
      ],
      apiEndPoints: [
        {
          url:
            "https://api.themoviedb.org/3/tv/popular?api_key=97ea65d391f5cf300357025dff2916b8&language=en-US",
          category: "Trending TV Shows",
          option: "tv",
        },
        {
          url:
            "https://api.themoviedb.org/3/movie/popular?api_key=97ea65d391f5cf300357025dff2916b8&language=en-US",
          category: "Popular On Netflix",
          option: "movie",
        },
        {
          url:
            "https://api.themoviedb.org/3/movie/now_playing?api_key=97ea65d391f5cf300357025dff2916b8&language=en-US",
          category: "Recommended For You",
          option: "movie",
        },
        {
          url:
            "https://api.themoviedb.org/3/movie/259693/similar?api_key=97ea65d391f5cf300357025dff2916b8&language=en-US",
          category: "Horror Movies",
          option: "movie",
        },
        {
          url:
            "https://api.themoviedb.org/3/movie/24428/similar?api_key=97ea65d391f5cf300357025dff2916b8&language=en-US",
          category: "Blockbuster Action",
          option: "movie",
        },
      ],
      videoURL: [
        "https://www.youtube.com/watch?v=X2FOi4YZCDM",
        "https://www.youtube.com/watch?v=F4W5c_3_rhs",
        "https://www.youtube.com/watch?v=QNNcl2mEHzQ",
        "https://www.youtube.com/watch?v=Rszr56AH3Co",
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

export default LandingPage;
