import React, { useState } from "react";

export default Movies;

function Movies({ movies, imgUrl, imgDetailUrl }) {
  const [movieDetail, setMovieDetail] = useState({
    shouldLightBoxBeOpen: false,
    movie: {}
  });
  const handleImageClick = movie => () => {
    setMovieDetail({ shouldLightBoxBeOpen: true, movie: { ...movie } });
  };
  const handleLightBoxOnClose = () =>
    setMovieDetail({ shouldLightBoxBeOpen: false, movie: {} });
  const { shouldLightBoxBeOpen, movie } = movieDetail;
  return (
    <>
      <ul>
        {movies.map(
          ({
            poster_path: posterPath,
            id,
            original_title: title,
            overview,
            vote_average: rate,
            release_date: releaseDate,
            popularity
          }) => (
            <li key={id}>
              <img
                src={`${imgUrl}${posterPath}`}
                alt={title}
                onClick={handleImageClick({
                  title,
                  overview,
                  rate,
                  releaseDate,
                  popularity,
                  image: `${imgDetailUrl}${posterPath}`
                })}
              />
            </li>
          )
        )}
      </ul>
      {shouldLightBoxBeOpen && (
        <LightBox
          movie={{
            ...movie
          }}
          onClose={handleLightBoxOnClose}
        />
      )}
    </>
  );
}

function LightBox({ movie, onClose }) {
  return (
    <div className="modal">
      <span className="close" onClick={onClose}>
        &times;
      </span>
      <div className="modal-content">
        <h1>{movie.title}</h1>
        <img src={movie.image} alt={movie.title} />
        <p>
          <span>
            <b>Overview:</b>
            {movie.overview}
          </span>
        </p>
        <span>
          <b>Rate: </b>
          {movie.rate}
        </span>
        <span>
          <b>Release Date: </b>
          {movie.releaseDate}
        </span>
        <span>
          <b>Popularity: </b>
          {movie.popularity}
        </span>
      </div>
    </div>
  );
}
