import React, { useEffect, useState } from "react";
import Search from "./components/search/";
import Movies from "./components/movies/";
import apiclient from "./api-client";

function App() {
  const [error, setError] = useState(null);
  const [fetchSate, setFetchState] = useState({
    loading: true,
    error: false,
    success: false,
    data: {
      movies: [],
      images: {}
    }
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ images }, { results: movies }] = await Promise.all([
          apiclient("configuration"),
          apiclient("discover/movie?sort_by=popularity.desc")
        ]);
        setFetchState({
          loading: false,
          error: false,
          success: true,
          data: { movies, images }
        });
      } catch (err) {
        setFetchState({
          loading: false,
          error: true,
          success: false,
          data: {
            movies: [],
            images: {}
          }
        });
        setError(err);
      }
    };
    fetchData();
  }, []);

  const {
    images: { base_url: baseURL, poster_sizes: posterSizes },
    movies
  } = fetchSate.data;
  return (
    <>
      <header>
        <div className="hero-text">
          <h1>Discover and Search Your Favourite Movies</h1>
          <Search />
        </div>
      </header>
      <main>
        {fetchSate.success === true && (
          <Movies
            movies={movies}
            imgUrl={`${baseURL}${posterSizes[2]}`}
            imgDetailUrl={`${baseURL}${posterSizes[3]}`}
          />
        )}
        {fetchSate.loading === true && <div className="loader"></div>}
      </main>
    </>
  );
}

export default App;
