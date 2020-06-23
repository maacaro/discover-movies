import React, { useState, useEffect } from "react";
import apiclient from "../../api-client/";
import Movies from "./movies";

export default props => {
  const [fetchSate, setFetchState] = useState({
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
          "discover/movie?sort_by=popularity.desc"
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
  }, []);
  return <Movies {...props} fetchSate={fetchSate} />;
};
