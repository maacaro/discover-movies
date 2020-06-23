import React from "react";

export default Movies;

function Movies({ movies, imgUrl }) {
  return (
    <ul>
      {movies.map(({ poster_path: posterPath, id, original_title: title }) => (
        <li key={id}>
          <img src={`${imgUrl}${posterPath}`} alt={title} />
        </li>
      ))}
    </ul>
  );
}
