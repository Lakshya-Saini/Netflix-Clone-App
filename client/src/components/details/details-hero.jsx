import React from "react";
import { Link } from "react-router-dom";

const DetailsHero = (props) => {
  let image = `https://image.tmdb.org/t/p/w500/${props.bgImage}`;
  let rating = props.rating;
  let releaseYear = props.releaseYear;
  let title = props.title;
  let overview = props.overview;

  if (props.video.length > 0) {
    var videoLink = props.video[0].key;
  }

  return (
    <div className="row mx-0">
      <div className="col-md-12 px-0">
        <div
          className="details-hero"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url(${image})`,
          }}
        >
          <div className="details-hero-text">
            <ul>
              <li>
                <i className="fas fa-star"></i> {rating}
              </li>
              <li>{releaseYear}</li>
            </ul>
            <h2>{title}</h2>
            <p>{overview}</p>
            <Link to={`/watch/${videoLink}/video`} className="watch-now-btn">
              <i className="fas fa-play"></i> Watch Now
            </Link>
            {/* <Link
              to="#"
              className="add-to-playlist-btn"
              onClick={() => handleWatchlist(id)}
            >
              <i className="fas fa-plus"></i> Add to Watchlist
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsHero;
