import React, { Component } from "react";
import { Circle } from "react-preloaders";
import DetailsHero from "./details-hero";
import DetailsSummary from "./details-summary";
import DetailsRelated from "./details-related";
import axios from "axios";

class Details extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      id: "",
      option: "",
      bgImage: "",
      title: "",
      overview: "",
      releaseYear: 1900,
      rating: 0,
      video: "",
      poster: "",
      genres: [],
      characters: [],
      directors: [],
      run_time: 0,
      vote_count: 0,
      related: [],
    };
  }

  static getDerivedStateFromProps(props, state) {
    state.id = props.match.params.id;
    state.option = props.match.params.option;
    return null;
  }

  componentDidMount() {
    this.setState({ isLoading: false });

    if (this.state.option === "movie") {
      const apiEndPoint1 = `https://api.themoviedb.org/3/movie/${this.state.id}?api_key=97ea65d391f5cf300357025dff2916b8&language=en-US`;
      const apiEndPoint2 = `https://api.themoviedb.org/3/movie/${this.state.id}/credits?api_key=97ea65d391f5cf300357025dff2916b8`;
      const apiEndPoint3 = `https://api.themoviedb.org/3/movie/${this.state.id}/videos?api_key=97ea65d391f5cf300357025dff2916b8&language=en-US`;
      const apiEndPoint4 = `https://api.themoviedb.org/3/movie/${this.state.id}/similar?api_key=97ea65d391f5cf300357025dff2916b8&language=en-US&page=1`;

      let requestOne = axios.get(apiEndPoint1);
      let requestTwo = axios.get(apiEndPoint2);
      let requestThree = axios.get(apiEndPoint3);
      let requestFour = axios.get(apiEndPoint4);

      axios
        .all([requestOne, requestTwo, requestThree, requestFour])
        .then(
          axios.spread((...responses) => {
            const response1 = responses[0];
            const response2 = responses[1];
            const response3 = responses[2];
            const response4 = responses[3];

            this.setState({
              bgImage: response1.data.backdrop_path,
              title: response1.data.title,
              overview: response1.data.overview,
              rating: response1.data.vote_average,
              releaseYear: response1.data.release_date.substring(0, 4),
              poster: response1.data.poster_path,
              genres: response1.data.genres,
              run_time: response1.data.runtime,
              vote_count: response1.data.vote_count,
              characters: response2.data.cast,
              video: response3.data.results,
              related: response4.data.results,
            });
          })
        )
        .catch((err) => console.log(err));
    }

    if (this.state.option === "tv") {
      const apiEndPoint1 = `https://api.themoviedb.org/3/tv/${this.state.id}?api_key=97ea65d391f5cf300357025dff2916b8&language=en-US`;
      const apiEndPoint2 = `https://api.themoviedb.org/3/tv/${this.state.id}/credits?api_key=97ea65d391f5cf300357025dff2916b8&language=en-US`;
      const apiEndPoint3 = `https://api.themoviedb.org/3/tv/${this.state.id}/videos?api_key=97ea65d391f5cf300357025dff2916b8&language=en-US`;
      const apiEndPoint4 = `https://api.themoviedb.org/3/tv/${this.state.id}/similar?api_key=97ea65d391f5cf300357025dff2916b8&language=en-US&page=1`;

      let requestOne = axios.get(apiEndPoint1);
      let requestTwo = axios.get(apiEndPoint2);
      let requestThree = axios.get(apiEndPoint3);
      let requestFour = axios.get(apiEndPoint4);

      axios
        .all([requestOne, requestTwo, requestThree, requestFour])
        .then(
          axios.spread((...responses) => {
            const response1 = responses[0];
            const response2 = responses[1];
            const response3 = responses[2];
            const response4 = responses[3];

            this.setState({
              bgImage: response1.data.backdrop_path,
              title: response1.data.name,
              overview: response1.data.overview,
              rating: response1.data.vote_average,
              releaseYear: response1.data.last_air_date.substring(0, 4),
              poster: response1.data.poster_path,
              genres: response1.data.genres,
              characters: response2.data.cast,
              directors: response1.data.created_by,
              run_time: response1.data.episode_run_time,
              vote_count: response1.data.vote_count,
              video: response3.data.results,
              related: response4.data.results,
            });
          })
        )
        .catch((err) => console.log(err));
    }
  }

  render() {
    const {
      id,
      bgImage,
      title,
      overview,
      releaseYear,
      rating,
      video,
      poster,
      genres,
      characters,
      directors,
      run_time,
      vote_count,
      option,
      related,
    } = this.state;

    return (
      <div className="details">
        <DetailsHero
          id={id}
          bgImage={bgImage}
          title={title}
          overview={overview.substring(0, 200) + "..."}
          releaseYear={releaseYear}
          rating={rating}
          video={video}
        />
        <DetailsSummary
          title={title}
          poster={poster}
          overview={overview}
          genres={genres}
          characters={characters}
          directors={directors}
          run_time={run_time}
          rating={rating}
          vote_count={vote_count}
        />
        <DetailsRelated option={option} related={related} />
        <Circle color={"#e50914"} customLoading={this.state.isLoading} />
      </div>
    );
  }
}

export default Details;
