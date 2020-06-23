import React, { useState } from "react";

export default Movies;

function Movies({ imgUrl, imgDetailUrl, fetchSate }) {
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
  const { movies } = fetchSate.data;

  return (
    <>
      {fetchSate.loading === true && <div className="loader"></div>}
      {fetchSate.success === true && (
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
                  src={
                    (posterPath && `${imgUrl}${posterPath}`) ||
                    "https://via.placeholder.com/185x277"
                  }
                  alt={title}
                  onClick={handleImageClick({
                    title,
                    overview,
                    rate,
                    releaseDate,
                    popularity,
                    image:
                      (posterPath && `${imgDetailUrl}${posterPath}`) ||
                      "https://via.placeholder.com/342×502px"
                  })}
                />
              </li>
            )
          )}
        </ul>
      )}
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
