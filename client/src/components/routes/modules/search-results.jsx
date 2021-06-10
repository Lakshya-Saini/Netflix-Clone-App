import React from "react";
import MovieComponent from "./movie-component";

const SearchResults = (props) => {
  const { movies, history } = props;

  return (
    <React.Fragment>
      {movies.length > 0 ? (
        <div className="search-results">
          <h5>Search Results</h5>
          <div className="row mx-0">
            {movies.map((movie) => (
              <div className="col-md-3" key={movie.id}>
                <MovieComponent
                  id={movie.id}
                  image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  title={movie.title}
                  release_date={movie.release_date}
                  rating={movie.vote_average}
                  isMovieOrTV="movie"
                  history={history}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </React.Fragment>
  );
};

export default SearchResults;
