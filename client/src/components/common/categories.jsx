import React, { Component } from "react";
import MovieSlider from "../common/movie-slider";
import axios from "axios";

class Categories extends Component {
  constructor() {
    super();
    this.state = {
      apiEndPoint: "",
      categoryName: "",
      option: "",
      list: [],
    };
  }

  static getDerivedStateFromProps(props, state) {
    state.apiEndPoint = props.apiEndPoint;
    state.categoryName = props.categoryName;
    state.option = props.option;
    return null;
  }

  componentDidMount() {
    axios
      .get(this.state.apiEndPoint)
      .then((res) => this.setState({ list: res.data.results }))
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="categories">
        <h5>{this.state.categoryName}</h5>
        <MovieSlider
          category={this.state.list}
          isMovieOrTV={this.state.option}
        />
      </div>
    );
  }
}

export default Categories;
