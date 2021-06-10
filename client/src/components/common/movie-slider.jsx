import React from "react";
import Movie from "./movie";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MovieSlider = (props) => {
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
        },
      },
    ],
  };

  return (
    <div className="movie-slider">
      <Slider {...settings}>
        {props.isMovieOrTV === "tv"
          ? props.category &&
            props.category.map((show) => (
              <Movie
                key={show.id}
                id={show.id}
                image={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                name={show.name}
                year={show.first_air_date.substring(0, 4)}
                rating={show.vote_average}
                isMovieOrTV={props.isMovieOrTV}
              />
            ))
          : props.category &&
            props.category.map((show) => (
              <Movie
                key={show.id}
                id={show.id}
                image={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                name={show.title}
                year={show.release_date.substring(0, 4)}
                rating={show.vote_average}
                isMovieOrTV={props.isMovieOrTV}
              />
            ))}

        {props.relatedTVShow &&
          props.relatedTVShow.map((show) => (
            <Movie
              key={show.id}
              id={show.id}
              image={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
              name={show.name}
              year={show.first_air_date.substring(0, 4)}
              rating={show.vote_average}
              isMovieOrTV={props.isMovieOrTV}
            />
          ))}

        {props.relatedMovie &&
          props.relatedMovie.map((movie) => (
            <Movie
              key={movie.id}
              id={movie.id}
              image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              name={movie.title}
              year={movie.release_date.substring(0, 4)}
              rating={movie.vote_average}
              isMovieOrTV={props.isMovieOrTV}
            />
          ))}
      </Slider>
    </div>
  );
};

export default MovieSlider;
