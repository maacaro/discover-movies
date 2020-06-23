import React, { useEffect, useState } from "react";
import Search from "./components/search/";
import Movies from "./components/movies/";
import apiclient from "./api-client";

function App() {
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [fetchSate, setFetchState] = useState({
    loading: true,
    error: false,
    success: false,
    data: {
      images: {}
    }
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { images } = await apiclient("configuration");
        setFetchState({
          loading: false,
          error: false,
          success: true,
          data: { images }
        });
      } catch (err) {
        setFetchState({
          loading: false,
          error: true,
          success: false,
          data: {
            images: {}
          }
        });
        setError(err);
      }
    };
    fetchData();
  }, []);

  const {
    images: { base_url: baseURL, poster_sizes: posterSizes }
  } = fetchSate.data;
  return (
    <>
      <header>
        <div className="hero-text">
          <h1>Discover and Search Your Favourite Movies</h1>
          <Search onSearch={setSearchTerm} />
        </div>
      </header>
      <main>
        {fetchSate.loading === true && <div className="loader"></div>}
        {fetchSate.success === true && (
          <Movies
            imgUrl={`${baseURL}${posterSizes[2]}`}
            imgDetailUrl={`${baseURL}${posterSizes[3]}`}
            searchTerm={searchTerm}
          />
        )}
        {fetchSate.error === true && (
          <div>
            <span>something went wrong: {error} </span>
          </div>
        )}
      </main>
    </>
  );
}

export default App;
