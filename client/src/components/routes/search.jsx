import React, { Component } from "react";
import { Circle } from "react-preloaders";
import Form from "./modules/form";
import SearchResults from "./modules/search-results";
import axios from "axios";

class Search extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      searchQuery: "",
      movies: [],
      searchResults: "",
    };
  }

  componentDidMount() {
    this.setState({ isLoading: false });
  }

  handleChange = (e) => {
    this.setState({ searchQuery: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const apiEndPoint1 = `https://api.themoviedb.org/3/search/movie?api_key=97ea65d391f5cf300357025dff2916b8&language=en-US&query=${this.state.searchQuery}&page=1&include_adult=false`;

    let requestOne = axios.get(apiEndPoint1);

    axios.all([requestOne]).then(
      axios.spread((...responses) => {
        let response1 = responses[0];

        if (response1.data.results.length === 0) {
          this.setState({
            searchResults: "Sorry, No Result(s) Found",
            searchQuery: "",
          });
        }

        if (response1.data.results.length > 0) {
          this.setState({ movies: response1.data.results, searchQuery: "" });
        }
      })
    );
  };

  render() {
    const { isLoading, searchQuery, movies } = this.state;

    return (
      <React.Fragment>
        <div className="row mx-0">
          <div className="col-md-12 px-0">
            <Form
              searchQuery={searchQuery}
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
            />
            <SearchResults movies={movies} history={this.props.history} />
          </div>
        </div>
        <Circle color={"#e50914"} customLoading={isLoading} />
      </React.Fragment>
    );
  }
}

export default Search;
