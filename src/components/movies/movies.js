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
        <>
          <div className="review">
            <Rating />
          </div>
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
        </>
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

function Rating() {
  const [rate, setRate] = useState(0);
  const handleStarClick = value => () => {
    setRate(value);
  };
  return (
    <>
      <h2>Avg. Review</h2>
      <div>
        <span
          className={(rate > 0 && "fa fa-star checked") || "fa fa-star"}
          onClick={handleStarClick(2)}
        ></span>
        <span
          className={(rate > 2 && "fa fa-star checked") || "fa fa-star"}
          onClick={handleStarClick(4)}
        ></span>
        <span
          className={(rate > 4 && "fa fa-star checked") || "fa fa-star"}
          onClick={handleStarClick(6)}
        ></span>
        <span
          className={(rate > 6 && "fa fa-star checked") || "fa fa-star"}
          onClick={handleStarClick(8)}
        ></span>
        <span
          className={(rate > 8 && "fa fa-star checked") || "fa fa-star"}
          onClick={handleStarClick(10)}
        ></span>
        <span> & Up</span>
      </div>
    </>
  );
}
