import React from "react";

const DetailsSummary = (props) => {
  let poster = `https://image.tmdb.org/t/p/w500/${props.poster}`;
  let overview = props.overview;
  let genres = props.genres;
  let characters = props.characters;
  let directors = props.directors;
  let run_time = props.run_time;
  let rating = props.rating;
  let title = props.title;
  let vote_count = props.vote_count;

  let max_star_cast = 18;

  return (
    <div className="row mx-0">
      <div className="col-md-12 px-0">
        <div className="details-summary">
          <div className="row mx-0">
            <div className="col-md-3 px-0 poster">
              <img src={poster} alt="poster" />
              <h5>{title}</h5>
              <ul>
                <li>{run_time} min</li>
                <li>
                  <i className="fas fa-star"></i> {rating}
                </li>
                <li>
                  <i className="fas fa-users"></i> {vote_count}
                </li>
              </ul>
            </div>
            <div className="col-md-9 px-0">
              <h5>Overview</h5>
              <p>{overview}</p>

              <h5>Genres</h5>
              <ul>
                {genres.map((genre) => (
                  <li key={genre.id}>{genre.name}</li>
                ))}
              </ul>

              {characters.length > 0 ? <h5>Starring</h5> : ""}
              <div className="row mx-0">
                {characters.slice(0, max_star_cast).map(
                  (character) =>
                    character.profile_path && (
                      <div
                        className="col-md-2 pl-0 starring"
                        key={character.id}
                      >
                        <img
                          src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`}
                          alt="character"
                        />
                        <h5>{character.name}</h5>
                      </div>
                    )
                )}
              </div>

              {directors.length > 0 ? <h5>Director</h5> : ""}
              <div className="row mx-0">
                <ul>
                  {directors.map((director) => (
                    <li key={director.id}>{director.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsSummary;
