import React, { useState, useEffect } from "react";
import apiclient from "../../api-client/";
import Movies from "./movies";

export default ({ searchTerm, ...props }) => {
  const [fetchState, setFetchState] = useState({
    loading: true,
    error: false,
    success: false,
    data: {
      movies: []
    }
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { results: movies } = await apiclient(
          (searchTerm === "" && "discover/movie?sort_by=popularity.desc") ||
            `/search/movie?query=${searchTerm}`
        );
        setFetchState({
          loading: false,
          error: false,
          success: true,
          data: { movies }
        });
      } catch (err) {
        setFetchState({
          loading: false,
          error: true,
          success: false,
          data: {
            movies: []
          }
        });
        console.log(err);
      }
    };
    fetchData();
  }, [searchTerm]);
  return <Movies {...props} fetchState={fetchState} />;
};
